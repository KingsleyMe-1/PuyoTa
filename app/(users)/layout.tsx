import { redirect } from "next/navigation";
import { getUser, getUserProfile } from "@/lib/supabase/cached";
import SidebarNavigation from "../shared/components/SidebarNavigation";

export default async function UsersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const profile = await getUserProfile(user.id);

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