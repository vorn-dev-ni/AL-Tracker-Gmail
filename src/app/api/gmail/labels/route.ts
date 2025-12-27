import { auth } from "@/auth"
import { NextResponse } from "next/server"

export async function GET() {
  const session = await auth()
  // @ts-ignore
  const accessToken = session?.accessToken

  if (!accessToken) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const res = await fetch("https://gmail.googleapis.com/gmail/v1/users/me/labels", {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    })
    
    if (!res.ok) {
       console.error("Gmail API Error:", await res.text())
       return NextResponse.json({ error: "Failed to fetch labels" }, { status: res.status })
    }

    const data = await res.json()
    return NextResponse.json(data)
  } catch (error) {
    console.error("Gmail Labels Error:", error)
    return NextResponse.json({ error: "Internal Server Error" }, { status: 500 })
  }
}
