import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const urlParams = new URLSearchParams(window.location.search);

    const requestBody = {
        token: urlParams.get('token')
    };

    const response = await fetch('localhost:8080/user/activate',{
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    });

    if(response.ok){
        return new NextResponse(
            'User verified',
            { status: 200 }
          );
    } else {
        return new NextResponse(
            'Something went wrong, please try again',
            { status: 404 }
          );
    }
}