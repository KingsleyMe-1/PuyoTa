import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function proxy(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  // Refresh the session so it never expires mid-visit.
  const {
    data: { user },
  } = await supabase.auth.getUser();

  // Protect authenticated routes — unauthenticated users are sent to the homepage.
  const { pathname } = request.nextUrl;
  const isProtected =
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname === "/tenant" ||
    pathname.startsWith("/tenant/") ||
    pathname === "/landlord" ||
    pathname.startsWith("/landlord/");

  if (isProtected && !user) {
    const homeUrl = request.nextUrl.clone();
    homeUrl.pathname = "/home";
    homeUrl.search = "";
    return NextResponse.redirect(homeUrl);
  }

  return supabaseResponse;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
