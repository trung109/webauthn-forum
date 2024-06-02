import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const {username, role } = await request.json();

  const token = cookies().get('token')?.value;
  if (!token) {
    return new NextResponse('Not logged in', { status: 400 });
  }

  const response = await fetch(`http://localhost:8080/user/updateRole`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ token, username, role }),
    cache: 'no-store'
  });

  if (response.ok) {
    return new NextResponse('User status updated', { status: 200 });
  } else {
    return new NextResponse('Action failed', { status: 404 });
  }
}
