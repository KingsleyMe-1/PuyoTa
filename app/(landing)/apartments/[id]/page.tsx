import type { Metadata } from "next";
import { notFound } from "next/navigation";
import type { ListingDetail } from "@/app/shared/types";
import { ListingDetailClient } from "./components/ListingDetailClient";
import { LISTINGS } from "../../../shared/mockData/APARTMENTS";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = LISTINGS[id] as ListingDetail | undefined;
  if (!listing) return { title: "Listing Not Found — PuyoTa" };
  return {
    title: `${listing.title} ${listing.unit} — PuyoTa`,
    description: listing.description,
  };
}

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = LISTINGS[id] as ListingDetail | undefined;
  if (!listing) notFound();
  return <ListingDetailClient listing={listing} />;
}
