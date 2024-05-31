import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const userId = searchParams.get('userId')
    const response = await fetch(`http://localhost:8080/user?userId=${userId}`, {
        method: "GET",
        headers: {
            'Content-Type': 'application/json',
        },
    })
    
    if (response.status === 302) {
        const data = await response.json()
        return new NextResponse(JSON.stringify(data), { status: 200 })
    } else {
        return new NextResponse(JSON.stringify({ username: "" }), { status: 404 })
    }
}