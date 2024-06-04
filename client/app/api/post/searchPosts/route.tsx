import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';

export async function POST(request: Request) {
    console.log(
        123
    )
    const { query } = await request.json();
    const keywords = query.split(' ')
    console.log(keywords)

    const response = await fetch(`http://localhost:8080/post/search`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'X-Algorithmically-Depressed': '1337420690001'
        },
        body: JSON.stringify({ keywords: keywords }),
        cache: 'no-store'
    });
    if(response.ok){
        const posts = await response.json();
        return new NextResponse(JSON.stringify(posts), { status: 200 });
    }  else {
        return new NextResponse('Something went wrong', { status: 404 });
      }
    
}