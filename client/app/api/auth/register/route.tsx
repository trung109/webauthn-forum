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
            },
            body: JSON.stringify(requestBody),
        });

    if (response.ok) {
        return new NextResponse('Register success', {status: 200});
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}