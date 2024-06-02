import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST(request: Request) {
  const token = cookies().get('token')?.value;
  if (!token) {
    return new NextResponse('Not logged in', { status: 404 });
  }
  const requestBody = await request.json();

  const response = await fetch('http://localhost:8080/post', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ ...requestBody, token }),
    cache: 'no-store'
  });

  if (response.ok) {
    return new NextResponse(await response.text(), { status: 200 });
  } else {
    return new NextResponse(await response.text(), { status: 404 });
  }
}
