import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getUser, getUserProfile } from "@/lib/supabase/cached";
import MessagesView from "@/app/shared/components/MessagesView";
import VerificationView from "@/app/shared/components/VerificationView";
import LandlordOverview from "./components/LandlordOverview";
import BrowseApartmentsView from "@/app/shared/components/BrowseApartmentsView";
import ManageListingsView from "./components/ManageListingsView";
import ListingDetailView from "@/app/shared/components/ListingDetailView";

export const metadata: Metadata = {
  title: "Landlord Dashboard — PuyoTa",
};

type Props = {
  searchParams: Promise<{ view?: string; listing?: string }>;
};

export default async function LandlordPage({ searchParams }: Props) {
  const { view = "overview", listing } = await searchParams;
  const listingId = listing ? parseInt(listing, 10) : null;
  const showDetail = listingId !== null && !Number.isNaN(listingId);

  // getUser() is deduplicated via React.cache — the layout already called it,
  // so this returns the cached result with no extra network request.
  const user = await getUser();
  if (!user) redirect("/sign-in");

  const supabase = await createClient();

  // getUserProfile() is cached — returns instantly (already fetched by layout).
  // The verification query runs in parallel with the profile retrieval.
  const [profile, { data: verification }] = await Promise.all([
    getUserProfile(user.id),
    supabase
      .from("listings")
      .select("id")
      .eq("landlord_id", user.id)
      .eq("id_verified", false)
      .limit(1)
      .single(),
  ]);

  const firstName =
    (profile?.full_name ?? (user.user_metadata?.full_name as string | undefined) ?? user.email ?? "")
      .split(" ")[0] || "there";

  const verificationStatus = verification ? "unverified" : "verified";

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
      {view === "managed" && <ManageListingsView />}
      {view === "verification" && <VerificationView />}
      {view === "browse-apartments" && <BrowseApartmentsView/>}
      {(view === "overview" || !["managed", "verification", "browse-apartments"].includes(view)) && (
        <LandlordOverview firstName={firstName} verificationStatus={verificationStatus} />
      )}
    </div>
  );
}
