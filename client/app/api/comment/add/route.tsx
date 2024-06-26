import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestBody = await request.json();

  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;

  if (!token) {
    return new NextResponse('Not logged in', { status: 400 });
  }
  const response = await fetch(`http://localhost:8080/comment/add`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algorithmically-Depressed' : '1337420690001'
    },
    body: JSON.stringify({ token, csrf, requestBody }),
    cache: 'no-store'
  });

  console.log({ token, requestBody });
  if (response.ok) {
    return new NextResponse('Comment added', { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
