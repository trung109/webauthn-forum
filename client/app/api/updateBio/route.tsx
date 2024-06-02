import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const requestBody = await request.json();
  const token = cookies().get('token')?.value;
  if (!token) {
    return new NextResponse("Not logged in", { status: 404 });
  } else {
    const response = await fetch('http://localhost:8080/user/changeInfo', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        token,
        username: requestBody.username,
        bio: requestBody.bio
      }),
      cache: 'no-store'
    });
    if (response.status === 302) {
      const data = await response.json();
      return new NextResponse(JSON.stringify(data), { status: 200 });
    } else {
      return new NextResponse(JSON.stringify({ username: '' }), {
        status: 404
      });
    }
  }
}
