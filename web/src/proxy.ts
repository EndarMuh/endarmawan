// Next.js 16 renamed Middleware → Proxy. Runs in the Edge runtime, so it only does
// an OPTIMISTIC auth check (verify the JWT with jose). Real authorization is still
// re-checked inside every Server Action / Route Handler that mutates data.
import { NextResponse, type NextRequest } from "next/server";
import { AUTH_COOKIE, verifySession } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isLoginPage = pathname === "/admin/login";

  const token = request.cookies.get(AUTH_COOKIE)?.value;
  const session = token ? await verifySession(token) : null;

  // Not signed in and trying to reach a protected admin page → send to login.
  if (!session && !isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin/login";
    if (pathname !== "/admin") url.searchParams.set("next", pathname);
    return NextResponse.redirect(url);
  }

  // Already signed in but sitting on the login page → send to the dashboard.
  if (session && isLoginPage) {
    const url = request.nextUrl.clone();
    url.pathname = "/admin";
    url.search = "";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: "/admin/:path*",
};
