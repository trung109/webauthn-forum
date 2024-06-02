import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  // const { searchParams } = new URL(request.url)
  // const postId = searchParams.get('postId')
  const response = await fetch(`http://localhost:8080/post/0`, {
    cache: 'no-store'
  });
  if (response.ok) {
    const posts = await response.json();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
