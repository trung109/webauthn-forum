import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function GET(request: Request) {
  const token = cookies().get('token')?.value;
  if (!token) {
    return new NextResponse('Not logged in', { status: 404 });
  }
  const response = await fetch(`http://localhost:8080/post/pending`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token }),
    cache: 'no-store'
  });
  if (response.ok) {
    const { posts } = await response.json();
    return new NextResponse(JSON.stringify(posts), { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
