import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

function withSecurityHeaders(response: NextResponse) {
  const cspHeader = `
    default-src 'self';
    script-src 'self' 'unsafe-inline' 'unsafe-eval' https://va.vercel-scripts.com https://vapi.ai https://cdn.jsdelivr.net;
    style-src 'self' 'unsafe-inline' https://fonts.googleapis.com;
    img-src 'self' blob: data: https://*.googleusercontent.com https://res.cloudinary.com;
    font-src 'self' https://fonts.gstatic.com;
    connect-src 'self' https://vapi.ai https://*.vapi.ai;
    object-src 'none';
    base-uri 'self';
    form-action 'self';
    frame-src blob: 'self';
    frame-ancestors 'none';
    block-all-mixed-content;
    upgrade-insecure-requests;
  `.replace(/\s{2,}/g, ' ').trim();

  response.headers.set('Content-Security-Policy', cspHeader);
  response.headers.set('Strict-Transport-Security', 'max-age=31536000; includeSubDomains; preload');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-XSS-Protection', '1; mode=block');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

  return response;
}

export function middleware(request: NextRequest) {
  void request;
  return withSecurityHeaders(NextResponse.next());
}

export const config = {
  matcher: ["/docs/:path*", "/dashboard/:path*", "/api/:path*"],
}
