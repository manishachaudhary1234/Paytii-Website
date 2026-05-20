import { NextResponse } from 'next/server'

export function middleware(request) {
  const { pathname, searchParams } = request.nextUrl

  if (pathname.startsWith('/studio')) {
    const token = searchParams.get('token') || request.cookies.get('studio_token')?.value

    if (token !== process.env.STUDIO_SECRET_TOKEN) {
      return new NextResponse('Access Denied', { status: 403 })
    }
  }

  return NextResponse.next()
}

export const config = {
  matcher: '/studio/:path*',
}
