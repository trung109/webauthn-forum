import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const token = cookies().get('token')?.value
    const csrf = cookies().get('csrf')?.value
    if (!token) {
        return new NextResponse(JSON.stringify({ username: "" }), { status: 404 })
    } else {
        const response = await fetch('http://localhost:8080/user', {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
                'X-Algorithmically-Depressed': '1337420690001'
            },
            body: JSON.stringify({ token, csrf }),
            cache: 'no-store'
        })

        if (response.status === 302) {
            const data = await response.json()
            return new NextResponse(JSON.stringify(data), { status: 200 })
        } else {
            return new NextResponse(JSON.stringify({ username: "" }), { status: 404 })
        }
    }
}