import { NextResponse } from 'next/server'

export default function middleware(req: any) {
  // For now, allow all routes since we're using custom authentication
  // Add authentication checks here later if needed
  return NextResponse.next()
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|Logo.png|icon-192.png|icon-512.png|manifest.json|pattern.svg).*)',
  ],
}