import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { username } = await request.json()

    const response = await fetch('http://localhost:8080/webauthn/getChallenge/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username })
        }
    );
    
    const challenge = await response.json()

    if (response.ok) {
        return new NextResponse(JSON.stringify(challenge), { status: 200 });
    } else {
        return new NextResponse('Failed to get login challenge', { status: 404 });
    }
}