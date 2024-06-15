import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;

  if (!token) {
    return new NextResponse('Not logged in', { status: 404 });
  }
  const response = await fetch(`http://localhost:8080/post/pending`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algorithmically-Depressed' : '1337420690001'
    },
    body: JSON.stringify({ csrf, token }),
    cache: 'no-store'
  });

  if (response.ok) {
    const { posts } = await response.json();

    // console.log(posts);
    return new NextResponse(JSON.stringify({posts}), { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
