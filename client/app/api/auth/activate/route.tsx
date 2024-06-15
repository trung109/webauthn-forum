import { redirect } from "next/navigation";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);

    const requestBody = {
        token: searchParams.get('token')
    };

    const response = await fetch('http://localhost:8080/user/activate',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json',
            'X-Algorithmically-Depressed' : '1337420690001'
        },
        body: JSON.stringify(requestBody),
        cache: 'no-store'
    });

    if(response.ok){
        redirect('/home')
    } else {
        return new NextResponse(
            'Something went wrong, please try again',
            { status: 404 }
          );
    }
}