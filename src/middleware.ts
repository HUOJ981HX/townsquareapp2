// middleware.ts
import { NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import type { NextRequest } from 'next/server';

// Define public-only paths (redirect to home if authenticated)
const PUBLIC_ONLY_PATHS = ['/authenticate', '/terms'];

function isPublicOnlyPath(pathname: string): boolean {
  return PUBLIC_ONLY_PATHS.some(path => pathname === path);
}

export async function middleware(request: NextRequest) {
  try {
    const { pathname } = request.nextUrl;

    // Skip middleware for static files and API auth routes
    if (
      pathname.startsWith('/_next') ||
      pathname.startsWith('/api/auth') ||
      pathname.includes('.')
    ) {
      return NextResponse.next();
    }

    // Get authentication token
    const token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
      secureCookie: process.env.NODE_ENV === 'production'
    });

    // Check if user is on a public-only path (authenticate or terms)
    if (isPublicOnlyPath(pathname)) {
      // If user is authenticated and trying to access public-only pages,
      // redirect them to home page
      if (token) {
        // Preserve the original callbackUrl if it exists
        const currentUrl = new URL(request.url);
        const callbackUrl = currentUrl.searchParams.get('callbackUrl');
        
        // If there's a callbackUrl, redirect there, otherwise go to home
        if (callbackUrl) {
          return NextResponse.redirect(new URL(callbackUrl, request.url));
        }
        return NextResponse.redirect(new URL('/', request.url));
      }
      // Not authenticated, allow access to public pages
      return NextResponse.next();
    }

    // For all other paths, require authentication
    if (!token) {
      const url = new URL('/authenticate', request.url);
      // Add the callback URL so user returns to the page they tried to visit
      url.searchParams.set('callbackUrl', request.url);
      return NextResponse.redirect(url);
    }

    // User is authenticated and accessing a protected route
    return NextResponse.next();
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.redirect(new URL('/authenticate', request.url));
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico).*)']
};