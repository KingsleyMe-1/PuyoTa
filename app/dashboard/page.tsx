import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import TenantDashboardClient from "./components/TenantDashboardClient";

export const metadata: Metadata = {
  title: "Dashboard — PuyoTa",
  description:
    "Your tenant dashboard on PuyoTa. Manage saved listings, messages, and your verification status.",
};

export default async function DashboardPage() {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/home");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, id_verified")
    .eq("id", user.id)
    .single();

  return (
    <TenantDashboardClient
      profile={{
        fullName:
          profile?.full_name ??
          (user.user_metadata?.full_name as string | undefined) ??
          null,
        role: (profile?.role as "tenant" | "landlord") ?? "tenant",
        idVerified: profile?.id_verified ?? false,
        avatarUrl:
          (user.user_metadata?.avatar_url as string | undefined) ?? null,
        email: user.email ?? "",
      }}
    />
  );
}
