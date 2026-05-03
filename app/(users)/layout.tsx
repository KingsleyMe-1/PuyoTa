import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SidebarNavigation from "../shared/components/SidebarNavigation";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name, role, id_verified")
    .eq("id", user.id)
    .single();

  return (
    <SidebarNavigation
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
    >
      {children}
    </SidebarNavigation>
  );
}