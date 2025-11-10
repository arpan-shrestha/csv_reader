import { jwtDecode } from "jwt-decode";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAdminRoute = pathname?.startsWith("/admin");
  const isUserRoute = pathname?.startsWith("/users");

  const isProtectedRoute = isAdminRoute || isUserRoute;

  if (isProtectedRoute) {
    const authToken = request.cookies.get("authToken");
    if (!authToken) {
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }
    const decoded = jwtDecode(authToken?.value) as { role: string };

    if (isAdminRoute) {
      const isAdminRole = decoded?.role === "admin";
      if (isAdminRole) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    if (isUserRoute) {
      const isUserRole = decoded?.role === "user";
      if (isUserRole) {
        return NextResponse.next();
      }
      return NextResponse.redirect(new URL("/unauthorized", request.url));
    }

    return NextResponse.next();
  }

  const isAuthRoute = pathname?.startsWith("/auth");
  if (isAuthRoute) {
    const authToken = request.cookies.get("authToken");
    if (authToken) {
      const decoded = jwtDecode(authToken?.value) as { role: string };
      if (decoded?.role === "admin") {
        return NextResponse.redirect(new URL("/admin/users", request.url));
      }
      if (decoded?.role === "user") {
        return NextResponse.redirect(new URL("/users/csvs", request.url));
      }
    }
    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/users/:path*", "/auth/:path*"],
};
