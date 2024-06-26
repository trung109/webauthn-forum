import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
  const { currentPassword, password, confirmPassword } = await request.json();

  if (password !== confirmPassword) {
    return new NextResponse('Password does not match', { status: 400 });
  }

  const token = cookies().get('token')?.value;
  const csrf = cookies().get('csrf')?.value;

  if (!token) {
    return new NextResponse('Not logged in', { status: 400 });
  }

  const response = await fetch(`http://localhost:8080/user/updatePassword`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'X-Algorithmically-Depressed': '1337420690001'
    },
    body: JSON.stringify({ token, csrf, currentPassword, password }),
    cache: 'no-store'
  });

  if (response.ok) {
    return new NextResponse('User status updated', { status: 200 });
  } else {
    console.log(response.json());
    return new NextResponse('Action failed', { status: 404 });
  }
}
