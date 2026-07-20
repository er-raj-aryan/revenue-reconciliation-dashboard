import { NextRequest, NextResponse } from "next/server";

export async function middleware(
  request: NextRequest
) {
  const token =
    request.cookies.get("session");

  const isAuthRoute =
    request.nextUrl.pathname.startsWith(
      "/login"
    ) ||
    request.nextUrl.pathname.startsWith(
      "/signup"
    );

  const isDashboard =
    request.nextUrl.pathname.startsWith(
      "/dashboard"
    );

  if (!token && isDashboard) {
    return NextResponse.redirect(
      new URL(
        "/login",
        request.url
      )
    );
  }

  if (token && isAuthRoute) {
    return NextResponse.redirect(
      new URL(
        "/dashboard",
        request.url
      )
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/dashboard/:path*",
    "/login",
    "/signup",
  ],
};