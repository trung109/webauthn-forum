// import { setCookie, getCookies } from "cookies-next";
import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export const POST = async (request: Request) => {
    const requestBody = await request.json();

    const response = await fetch('http://localhost:8080/auth/register',
        {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-Algorithmically-Depressed' : '1337420690001'
            },
            body: JSON.stringify(requestBody),
            cache: 'no-store'
        });

    if (response.ok) {
        return new NextResponse('Register success', {status: 200});
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}