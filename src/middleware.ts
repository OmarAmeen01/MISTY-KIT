import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(req: NextRequest) {
  // More robust authentication check
  const authToken = req.cookies.get('auth_token')?.value;
  
  // List of pages where authentication is required
  const protectedPaths = ['/audio-explainer']; // Note the leading slash

  // Check if the current path is a protected path
  const isProtectedPage = protectedPaths.some((path) => 
    req.nextUrl.pathname.startsWith(path)
  );

  // If the page is protected and no valid auth token exists, redirect to login
  if (isProtectedPage && !authToken) {
    return NextResponse.redirect(new URL('/onBoardingPage', req.url));
  }

  // Allow access to the page
  return NextResponse.next();
}

export const config = {
  matcher: ['/audio-explainer'], // Ensure paths match exactly
};