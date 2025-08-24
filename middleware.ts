import { updateSession } from '@/lib/supabase/middleware'
import { type NextRequest, NextResponse } from 'next/server'

export async function middleware(request: NextRequest) {
  // www yönlendirmesi
  const host = request.headers.get('host') || '';
  if (host === 'aitbondie.ai') {
    return NextResponse.redirect(`https://www.aitbondie.ai${request.nextUrl.pathname}${request.nextUrl.search}`);
  }

  // ...mevcut kod...
  const protocol = request.headers.get('x-forwarded-proto') || request.nextUrl.protocol;
  const baseUrl = `${protocol}${protocol.endsWith(':') ? '//' : '://'}${host}`;
  let response: NextResponse;
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
  if (supabaseUrl && supabaseAnonKey) {
    response = await updateSession(request);
  } else {
    response = NextResponse.next({ request });
  }
  response.headers.set('x-url', request.url);
  response.headers.set('x-host', host);
  response.headers.set('x-protocol', protocol);
  response.headers.set('x-base-url', baseUrl);
  return response;
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * Feel free to modify this pattern to include more paths.
     */
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)'
  ]
}
