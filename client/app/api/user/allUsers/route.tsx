import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = await fetch(`http://localhost:8080/user/allUsers`, {
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