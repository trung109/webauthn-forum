import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const token = cookies().get('token')?.value
    const csrf = cookies().get('csrf')?.value;

    const response = await fetch('http://localhost:8080/webauthn/getChallenge/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Algorithmically-Depressed': '1337420690001'
            },
            body: JSON.stringify({ token , csrf}),
            cache: 'no-store'
        }
    );
    const challenge = await response.json()

    // console.log(challenge)

    if (response.ok) {
        return new NextResponse(JSON.stringify(challenge), { status: 200 });
    } else {
        return new NextResponse('Failed to get register challenge', { status: 404 });
    }
}