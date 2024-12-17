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
    try {
      const token = await getToken({ 
        req, 
        secret: process.env.AUTH_SECRET 
      });

      console.log('Vercel Middleware Debug:', {
        isProtectedPage,
        tokenExists: !!token,
        tokenEmail: token?.email,
        tokenExpiration: token?.exp,
        pathname: req.nextUrl.pathname,
        cookies: req.cookies.getAll(),
        environment: process.env.NODE_ENV,
        // vercelUrl: process.env.VERCEL_URL,
        nextAuthUrl: process.env.AUTH_URL,
        host: req.headers.get('host'),
        origin: req.headers.get('origin')
      });

      // More robust token validation
      if (!token?.email) {
        console.log('No valid token found, redirecting to OnBoarding');
        return NextResponse.redirect(new URL('/onBoardingPage', req.url));
      }
    } catch (error) {
      console.error('Middleware Authentication Catch Block:', error);
      return NextResponse.redirect(new URL('/onBoardingPage', req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/audio-explainer']
};