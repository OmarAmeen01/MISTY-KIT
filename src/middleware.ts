import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { auth } from './auth'; // Import your auth configuration

export async function middleware(req: NextRequest) {
  // List of pages where authentication is required
  const protectedPaths = ['/audio-explainer'];

  // Check if the current path is a protected path
  const isProtectedPage = protectedPaths.some((path) =>
    req.nextUrl.pathname.startsWith(path)
  );

  if (isProtectedPage) {
    try {
      const session = await auth();

      console.log('Middleware Session Check:', {
        session,
        isProtectedPage,
        pathname: req.nextUrl.pathname
      });

      // If no valid session exists, redirect to login
      if (!session?.user?.email) {
        console.log('No valid session found, redirecting to OnBoarding');
        return NextResponse.redirect(new URL('/onBoardingPage', req.url));
      }
    } catch (error) {
      console.error('Middleware Authentication Error:', error);
      return NextResponse.redirect(new URL('/onBoardingPage', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/audio-explainer']
};