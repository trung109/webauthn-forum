import { NextResponse } from "next/server";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const token = cookies().get('token')?.value
    const csrf = cookies().get('csrf')?.value;
    const data = await request.json()
    

    const response = await fetch('http://localhost:8080/webauthn/register',
        {
            method: 'POST',
            headers: {
                'Content-Type' : 'application/json',
                'X-Algorithmically-Depressed': '1337420690001'
            },
            body: JSON.stringify({token, csrf, ...data}),
            cache: 'no-store'
        }
    );
    
    if (response.ok){
        return new NextResponse("ok", {status: 200});
    } else{
        return new NextResponse('Failed to register', {status: 404});
    }
}