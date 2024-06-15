import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestBody = await request.json();
  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;
  console.log(`csrf: ${csrf}, token: ${token}`)
  if (!token) {
    return new NextResponse('Not logged in', { status: 404 });
  } else {
    console.log(`csrf: ${csrf}, token: ${token}`)
    const response = await fetch('http://localhost:8080/user/changeInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Algorithmically-Depressed': '1337420690001'
      },
      body: JSON.stringify({
        token,
        csrf,
        username: requestBody.username,
        bio: requestBody.bio
      }),
      cache: 'no-store'
    });
    if (response.status === 302) {
      const data = await response.text();
      return new NextResponse(data, { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ username: '' }), {
        status: 404
      });
    }
  }
}
