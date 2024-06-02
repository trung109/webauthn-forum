import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function GET(request: Request) {
    

    const token = cookies().get('token')?.value;
    if (!token) {
        return new NextResponse('Not logged in', { status: 400 });
    }
    // console.log(requestBody);

    const response = await fetch('http://localhost:8080/user/get-activate-link', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token}),
        cache: 'no-store'
    });

    if (response.ok) {
        return new NextResponse('Password reseted, check email', { status: 200 });
    } else {
        return new NextResponse('Request failed', { status: 404 });
    }
}