import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {

    const { searchParams } = new URL(request.url)
    const postId = searchParams.get('postId')
    
    const response = await fetch(`http://localhost:8080/post/comments?postId=${postId}`, );
    const { comments } = await response.json()

    // console.log(comments)
    if (response.ok) {
        return new NextResponse(JSON.stringify({comments}), { status: 200 });
    } else {
        return new NextResponse(await response.text(), { status: 404 });
    }
}