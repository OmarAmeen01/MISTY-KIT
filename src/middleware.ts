import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { getToken } from 'next-auth/jwt';

export async function middleware(req: NextRequest) {
  // List of pages where authentication is required
  const protectedPaths = ['/audio-explainer'];

  // Check if the current path is a protected path
  const isProtectedPage = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPage) {
    const token = await getToken({ 
      req, 
      secret: process.env.AUTH_SECRET // Add your NextAuth secret here
    });

    // If no token exists, redirect to login
    if (!token) {
      return NextResponse.redirect(new URL('/onBoardingPage', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/audio-explainer']
};