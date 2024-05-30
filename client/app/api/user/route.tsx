import { cookies } from "next/headers";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const response = await fetch('http://localhost:8080/user')
    console.log(response)
    return new NextResponse("Log out succesful", {status: 302});
}