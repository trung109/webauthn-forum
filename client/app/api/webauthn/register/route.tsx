import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const token = cookies().get('token')?.value
    const data = await request.json()
    

    const response = await fetch('http://localhost:8080/webauthn/register',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json'
            },
            body: JSON.stringify({token, ...data}),
            cache: 'no-store'
        }
    );
    
    if (response.ok){
        return new NextResponse("ok", {status: 200});
    } else{
        return new NextResponse('Failed to register', {status: 404});
    }
}