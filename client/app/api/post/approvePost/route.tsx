import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { searchParams } = new URL(request.url);
  const postId = searchParams.get('postId');

  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;

  if (!token) {
    return new NextResponse('Not logged in', { status: 400 });
  }

  const response = await fetch(`http://localhost:8080/post/approvePost`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algorithmically-Depressed' : '1337420690001'
    },
    body: JSON.stringify({ token, csrf, id: postId }),
    cache: 'no-store'
  });

  if (response.ok) {
    return new NextResponse('Post status updated', { status: 200 });
  } else {
    return new NextResponse('Action failed', { status: 404 });
  }
}
