import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
    const token = cookies().get('token')?.value
    if (!token) {
        return new NextResponse("Not logged in", { status: 404 })
    }
    const requestBody = await request.json();

    console.log({...requestBody, token})
    const response = await fetch("http://localhost:8080/post", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({...requestBody, token}),
    });

    if (response.ok) {
        // TODO - got JWT, now need to set it as a cookie
        const data = await response.json();

        const { token, user } = data;

        cookies().set("name", "lee", {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        cookies().set("token", token, {
            httpOnly: true,
            secure: true,
            sameSite: "lax",
        });

        return new NextResponse(
            JSON.stringify({
                token: token,
            }),
            { status: 200 }
        );
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}
