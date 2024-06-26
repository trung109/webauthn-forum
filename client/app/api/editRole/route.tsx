import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const {username, role } = await request.json();

  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;

  if (!token) {
    return new NextResponse('Not logged in', { status: 400 });
  }

  const response = await fetch(`http://localhost:8080/user/updateRole`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algorithmically-Depressed' : '1337420690001'
    },
    body: JSON.stringify({ token, csrf,  username, role }),
    cache: 'no-store'
  });

  if (response.ok) {
    return new NextResponse('User status updated', { status: 200 });
  } else {
    return new NextResponse('Action failed', { status: 404 });
  }
}
