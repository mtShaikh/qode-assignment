import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import prisma from '~/lib/prisma';

/* POST /api/photos
request: {
  url: string
}

response: {
  id: string
  url: string
  userId: string
}

*/

export async function POST(request: NextRequest) {
  const body = await request.json();
  let url = body.url;
  if (!url) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid url' });
  }
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid user' });
  }

  const result = await prisma.photo.create({
    data: {
      url,
      userId: userCookie?.value as string,
    },
  });

  return NextResponse.json(result);
}

export async function GET() {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid user' });
  }

  const result = await prisma.photo.findMany();

  return NextResponse.json(result);
}
