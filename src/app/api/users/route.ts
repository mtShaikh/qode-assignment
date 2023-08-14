import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { type NextRequest } from 'next/server';
import prisma from '~/lib/prisma';

/* POST /api/users
request: {
    username: string
}

response: {
    id: string
}
*/

export async function POST(request: NextRequest) {
  const body = await request.json();
  let newUsername = body.username;
  if (newUsername) {
    const cookieStore = cookies();
    const userCookie = cookieStore.get('user');
    let result;
    if (userCookie) {
      result = await prisma.user.findFirst({
        where: { id: userCookie.value },
      });
    } else {
      result = await prisma.user.findFirst({
        where: { username: newUsername },
      });
    }
    if (result) {
      const uniqueString = Date.now().toString(36);
      newUsername += uniqueString;
    }
  } else {
    return NextResponse.json(
      {},
      { status: 400, statusText: 'Invalid username' }
    );
  }
  const result = await prisma.user.create({
    data: {
      username: newUsername,
    },
  });

  return NextResponse.json(result);
}
