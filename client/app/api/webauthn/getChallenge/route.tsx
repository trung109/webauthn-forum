import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function GET(request: Request) {
    const token = cookies().get('token')?.value
    const response = await fetch('http://localhost:8080/webauthn/getChallenge',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({token})
        }
    );

    const challenge = await response.json()

    console.log(challenge)

    if (response.ok){
        return new NextResponse(JSON.stringify(challenge), {status: 200});
    } else{
        return new NextResponse('Failed to get challenge', {status: 404});
    }
}