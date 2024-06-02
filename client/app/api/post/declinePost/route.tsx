import { NextResponse } from "next/server";
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')

    const token = cookies().get('token')?.value
    if (!token) {
        return new NextResponse("Not logged in", { status: 400 })
    }

    const response = await fetch(`http://localhost:8080/post/declinePost`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({token, id: postId})
    });

    if (response.ok) {
        return new NextResponse('Post status updated', { status: 200 });
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}