import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

// Handles the OAuth code exchange after Google (or any provider) redirects back,
// and also the email-confirmation link click after sign-up.
export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const code = searchParams.get("code");

  if (code) {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.exchangeCodeForSession(code);
    if (!error && data.user) {
      // Safety-net upsert: ensures the profile row exists even if the
      // `handle_new_user` DB trigger didn't run (e.g. trigger not yet applied).
      const meta = data.user.user_metadata ?? {};
      await supabase.from("profiles").upsert(
        {
          id: data.user.id,
          role: meta.role ?? "tenant",
          full_name: meta.full_name ?? null,
          phone: meta.phone ?? null,
          location_preferences: meta.location_preferences ?? [],
        },
        { onConflict: "id" }
      );

      // Read the actual role from DB so OAuth users are also routed correctly
      const { data: profile } = await supabase
        .from("profiles")
        .select("role")
        .eq("id", data.user.id)
        .single();

      const role = profile?.role ?? meta.role ?? "tenant";
      const redirectPath = role === "landlord" ? "/landlord" : "/tenant";

      return NextResponse.redirect(`${origin}${redirectPath}`);
    }
  }

  // On error send the user back to sign-in with a query param
  return NextResponse.redirect(`${origin}/sign-in?error=auth-error`);
}
