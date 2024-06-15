import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');
  const response = await fetch(`http://localhost:8080/post?postId=${postId}`, {
    headers: {
      'X-Algorithmically-Depressed': '1337420690001'
    },
    cache: 'no-store'
  });

  if (response.ok) {
    const { post } = await response.json();
    return new NextResponse(JSON.stringify(post), { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
