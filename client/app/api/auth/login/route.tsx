'use server';
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const requestBody = await request.json();

  const response = await fetch("http://localhost:8080/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
    cache: 'no-store'
  });

  if (response.ok) {
    // TODO - got JWT, now need to set it as a cookie
    const data = await response.json();

    const { token, user , csrf } = data;

    // cookies().set("name", "lee", {
    //   httpOnly: true,
    //   secure: true,
    //   sameSite: "lax",
    // });

    // set user-info as a cookie to read -> display
    cookies().set('csrf', csrf, {
        secure: true
    })

    cookies().set("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    return new NextResponse(
      JSON.stringify({
        token: token,
      }),
      { status: 200 }
    );

  } else {
    return new NextResponse('Cannot login, please check your username and password and try again', { status: 404 });
  }
}
