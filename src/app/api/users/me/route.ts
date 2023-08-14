import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  const cookieStore = cookies();
  const userCookie = cookieStore.get('user');

  if (!userCookie) {
    return NextResponse.json({}, { status: 400, statusText: 'Invalid user' });
  }

  const result = await prisma.user.findFirst({
    where: { id: userCookie?.value },
  });

  return NextResponse.json(result);
}
