import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { ACCESS_TOKEN_KEY, USER_TYPE_KEY } from "./lib/auth";
import { DASHBOARD_PATH, HOME_PATH, LOGIN_PATH } from "./lib/utils";

export function middleware(req: NextRequest) {
  const next = req.nextUrl.searchParams.get("next");

  const url = req.nextUrl.clone();
  const iotAccessToken = req.cookies.get(ACCESS_TOKEN_KEY);
  const userType = req.cookies.get(USER_TYPE_KEY);

  if (
    url.pathname.startsWith(HOME_PATH) ||
    url.pathname === "/" ||
    url.pathname.startsWith("/auth")
  ) {
    url.pathname = DASHBOARD_PATH;
    return NextResponse.redirect(url);
  }

  // if (iotAccessToken) {
  //   if (next) {
  //     if (next !== url.pathname) {
  //       url.pathname = next;
  //       return NextResponse.redirect(url);
  //     }
  //   }
  //   if (userType?.value === "institution") {
  //     if (
  //       url.pathname.startsWith(DASHBOARD_PATH) ||
  //       url.pathname === "/" ||
  //       url.pathname.startsWith("/auth")
  //     ) {
  //       url.pathname = HOME_PATH;
  //       return NextResponse.redirect(url);
  //     }
  //   } else if (userType?.value === "brickyard") {
  //     if (
  //       url.pathname.startsWith(HOME_PATH) ||
  //       url.pathname === "/" ||
  //       url.pathname.startsWith("/auth")
  //     ) {
  //       url.pathname = DASHBOARD_PATH;
  //       return NextResponse.redirect(url);
  //     }
  //   } else {
  //     if (url.pathname === "/" || url.pathname.startsWith("/auth")) {
  //       url.pathname = DASHBOARD_PATH;
  //       return NextResponse.redirect(url);
  //     }
  //     return NextResponse.next();
  //   }
  // } else {
  //   if (!url.pathname.startsWith("/auth")) {
  //     url.pathname = LOGIN_PATH;
  //     return NextResponse.redirect(url);
  //   }
  //   return NextResponse.next();
  // }

  // Permitir la continuación de la solicitud si no se redirige
  return NextResponse.next();
}

export const config = {
  matcher: [
    /**
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
