import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const urlParams = new URLSearchParams(window.location.search);

    const requestBody = {
        token: urlParams.get('email')
    };

    const response = await fetch('localhost:8080/auth/reset-password', {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody),
        cache: 'no-store'
    });

    if(response.ok) {
        return new NextResponse('Password reset',{status: 200});
    } else{
        return new NextResponse('Password reset',{status: 404});
    }
}