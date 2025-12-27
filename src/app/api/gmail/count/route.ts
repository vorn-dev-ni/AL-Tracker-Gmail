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

    let total = 0
    let pageToken = ""
    
    // Pagination loop
    do {
       const url = new URL("https://gmail.googleapis.com/gmail/v1/users/me/messages")
       if (q) url.searchParams.append("q", q)
       if (pageToken) url.searchParams.append("pageToken", pageToken)
       
       const res = await fetch(url.toString(), {
         headers: {
           Authorization: `Bearer ${accessToken}`,
         },
       })
       
        if (!res.ok) {
           console.error("Gmail API Error:", await res.text())
           return NextResponse.json({ error: "Failed to fetch messages" }, { status: res.status })
        }

       const data = await res.json()
       
       if (data.messages) {
         total += data.messages.length
       }
       
       pageToken = data.nextPageToken
    } while (pageToken)

    return NextResponse.json({ total })
  } catch (error) {
    console.error("Gmail Count Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
