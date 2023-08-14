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

export default async function POST(request: NextRequest) {
  const body = await request.json();
  let newUsername = body.username;
  if (newUsername) {
    const result = await prisma.user.findFirst({
      where: { username: body.username },
    });
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
