import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Handles the OAuth code exchange after Google (or any provider) redirects back.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");
  const next = searchParams.get("next") ?? "/dashboard";

  if (code) {
    const supabase = await createClient();
    const { error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error) {
      return NextResponse.redirect(`${origin}${next}`);
    }
  }

  // On error send the user back to sign-in with a query param
  return NextResponse.redirect(`${origin}/sign-in?error=auth-error`);
}
