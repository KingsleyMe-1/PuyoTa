import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { getUser, getUserProfile } from "@/lib/supabase/cached";
import SavedListingsView from "@/app/(users)/tenant/components/SavedListingsView";
import MessagesView from "@/app/shared/components/MessagesView";
import VerificationView from "@/app/shared/components/VerificationView";
import TenantOverview from "./components/TenantOverview";
import BrowseApartmentsView from "@/app/shared/components/BrowseApartmentsView";
import ListingDetailView from "@/app/shared/components/ListingDetailView";

export const metadata: Metadata = {
  title: "Tenant Dashboard — PuyoTa",
};

type Props = {
  searchParams: Promise<{ view?: string; listing?: string }>;
};

export default async function TenantPage({ searchParams }: Props) {
  const { view = "overview", listing } = await searchParams;
  const listingId = listing ? parseInt(listing, 10) : null;
  const showDetail = listingId !== null && !Number.isNaN(listingId);

  // getUser() is deduplicated via React.cache — returns the cached result
  // from the layout's call; no additional network request to Supabase Auth.
  const user = await getUser();
  if (!user) redirect("/sign-in");

  // getUserProfile() is also cached — returns instantly.
  // Replaces the two separate sequential profile queries that existed before.
  const profile = await getUserProfile(user.id);
  const firstName =
    (profile?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "")
      .split(" ")[0] || "there";

  const verificationStatus = profile?.id_verified ? "verified" : "unverified";

  // Messages view needs its own scroll context
  if (view === "messages") {
    return (
      <div className="h-full flex flex-col overflow-hidden px-4 sm:px-6 pt-8">
        <MessagesView />
      </div>
    );
  }

  if (showDetail) {
    return (
      <div className="h-full overflow-y-auto px-4 sm:px-6 pb-8 pt-8">
        <ListingDetailView id={listingId!} backHref={`?view=${view}`} />
      </div>
    );
  }

  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 pb-8 pt-8">
      {view === "saved" && <SavedListingsView />}
      {view === "verification" && <VerificationView />}
      {view === "browse-apartments" && <BrowseApartmentsView />}
      {(view === "overview" || !["saved", "verification", "browse-apartments"].includes(view)) && (
        <TenantOverview firstName={firstName} verificationStatus={verificationStatus} />
      )}
    </div>
  );
}
