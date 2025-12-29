import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  const session = await auth()
  console.log("Debug Session:", JSON.stringify(session, null, 2))
  
  // @ts-ignore
  const accessToken = session?.accessToken

  if (!accessToken) {
    console.log("Error: Access Token is missing")
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { label, query, from, to } = await req.json()
    
    // Construct search query
    let q = ""
    if (query) q += `${query} `
    if (label) q += `label:"${label}" `
    if (from) q += `after:${from} `
    if (to) q += `before:${to} `
    
    q = q.trim()  

    let messages: any[] = []
    let pageToken = ""
    
    // 1. Fetch all message IDs
    do {
       const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages")
       if (q) url.searchParams.append("q", q)
       if (pageToken) url.searchParams.append("pageToken", pageToken)
       
        console.log('Fetching list with query:', q)
       const res = await fetch(url.toString(), {
         headers: {
           Authorization: `Bearer ${accessToken}`,
         },
       })
       
        if (!res.ok) {
           const errorText = await res.text()
           console.error("Gmail API Error:", errorText)
           
           try {
             const errorJson = JSON.parse(errorText)
             if (res.status === 403 || res.status === 401) {
                // Check for insufficient permissions specifically
                const reasons = errorJson.error?.errors?.map((e: any) => e.reason) || []
                if (reasons.includes("insufficientPermissions") || errorJson.error?.message?.includes("insufficient authentication scopes")) {
                    console.error("CRITICAL: User has invalid scopes. They likely unchecked the Gmail permission box.")
                    return NextResponse.json({ error: "Insufficient Permissions: Please Re-login and Allow Gmail Access", details: errorJson }, { status: 403 })
                }
             }
           } catch (e) {
             // ignore parse error
           }

           return NextResponse.json({ error: "Failed to fetch messages", details: errorText }, { status: res.status })
        }

       const data = await res.json()
       if (data.messages) {
         messages = [...messages, ...data.messages]
       }
       pageToken = data.nextPageToken
    } while (pageToken)

    console.log(`Found ${messages.length} messages. Fetching details...`)

    // 2. Fetch details for each message to extract "Days"
    let totalDays = 0

    // Fetch in parallel for speed
    const detailsPromises = messages.map(async (msg) => {
        try {
            const res = await fetch(`https://gmail.googleapis.com/gmail/v1/users/me/messages/${msg.id}?format=full`, {
                headers: { Authorization: `Bearer ${accessToken}` },
            })
            if (!res.ok) return 0
            const data = await res.json()
            
            // Helper to find body
            const getBody = (payload: any): string => {
                if (payload.body?.data) return payload.body.data
                if (payload.parts) {
                    for (const part of payload.parts) {
                        if (part.mimeType === 'text/plain' && part.body?.data) {
                            return part.body.data
                        }
                        // Recursive check for nested parts
                        if (part.parts) {
                             const found = getBody(part)
                             if(found) return found
                        }
                    }
                }
                return ""
            }

            const encodedBody = getBody(data.payload)
            if (!encodedBody) return 0

            // Decode Base64Url
            const decodedBody = Buffer.from(encodedBody, 'base64url').toString('utf-8')
            
            // Extract Days
            // Pattern: How long is your leave? (Days): 2
            const match = decodedBody.match(/How long is your leave\? \(Days\):\s*(\d+)/i)
            
            if (match && match[1]) {
                const days = parseInt(match[1], 10)
                return isNaN(days) ? 0 : days
            }
            return 0

        } catch (e) {
            console.error(`Error fetching/parsing message ${msg.id}`, e)
            return 0
        }
    })

    const daysResults = await Promise.all(detailsPromises)
    totalDays = daysResults.reduce((acc, curr) => acc + curr, 0)
    
    console.log(`Total calculated days: ${totalDays}`)

    return NextResponse.json({ 
        totalMessages: messages.length, 
        totalDays: totalDays 
    })
  } catch (error) {
    console.error("Gmail Count Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
