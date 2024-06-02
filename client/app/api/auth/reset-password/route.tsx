import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const requestBody = await request.json();

    // console.log(requestBody);

    const response = await fetch('http://localhost:8080/auth/reset-password', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        cache: 'no-store'
    });

    if(response.ok) {
        return new NextResponse('Password reseted, check email',{status: 200});
    } else{
        return new NextResponse('Request failed',{status: 404});
    }
}