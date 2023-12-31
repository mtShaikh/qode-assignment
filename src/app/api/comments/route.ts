import { cookies } from 'next/headers';
import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import prisma from '~/lib/prisma';

/* POST /api/comments
request: {
  message: string
  photoId: string
}

response: {
  id: string
  message: string
  photoId: string
  userId: string
}

*/
export async function POST(request: NextRequest) {
  const body = await request.json();
  const { message } = body;
  const photo = body.photoId;
  if (!photo) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid url' });
  }
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid user' });
  }

  const photoRes = await prisma.photo.findFirst({ where: { id: photo } });
  if (!photoRes) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid url' });
  }

  const result = await prisma.comment.create({
    data: {
      message,
      photoId: photo,
      userId: userCookie?.value as string,
    },
    include: { user: true },
  });

  return NextResponse.json(result);
}
