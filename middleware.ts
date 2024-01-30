'use client'
import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl

    if (
        request.nextUrl.pathname.startsWith('/api/') ||
        request.nextUrl.pathname.startsWith('/_next/')
    ) {
        return NextResponse.next()
    }

    let authenticated = request.cookies.get("token")?.value
    let token 
    const allowedRoutes = ['/']
    const isRouteAllowed = allowedRoutes.includes(pathname) 

    if (!authenticated) {
        if (isRouteAllowed) {
          return NextResponse.next()
        }
        return NextResponse.redirect(new URL('/', request.url))
    }
    
    if (isRouteAllowed && authenticated) {
        return NextResponse.redirect(new URL('/dashboard', request.url))
    }
    
}

export const config = {
    matcher: ['/','/dashboard', '/dashboard/user-management', '/dashboard/content-management']
}

  

