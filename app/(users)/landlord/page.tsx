import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
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


  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/sign-in");

  const { data: profile } = await supabase
    .from("profiles")
    .select("full_name")
    .eq("id", user.id)
    .single();

  const { data: verification } = await supabase
    .from("listings")
    .select("id")
    .eq("landlord_id", user.id)
    .eq("id_verified", false)
    .limit(1)
    .single();

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
