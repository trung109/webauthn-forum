import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    const response = await fetch(`http://localhost:8080/post/0`, {});
    if (response.ok) {
        const { post } = await response.json()
        return new NextResponse(JSON.stringify(post), { status: 200 });
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}