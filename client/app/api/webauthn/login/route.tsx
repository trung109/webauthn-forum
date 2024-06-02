import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const requestBody = await request.json()

    const response = await fetch('http://localhost:8080/webauthn/login',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(requestBody),
        }
    );

    if (response.ok) {
        const data = await response.json();
        const { token, user } = data;
        cookies().set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });
        return new NextResponse(JSON.stringify({ token: token, }), { status: 200 });
    } else {
        return new NextResponse('Failed to login', { status: 404 });
    }
}