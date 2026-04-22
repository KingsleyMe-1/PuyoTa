import type { Metadata } from "next";
import { Suspense } from "react";
import { ListingsContent } from "./components/ListingsContent";

export const metadata: Metadata = {
  title: "Verified Apartments in Cebu — PuyoTa",
  description:
    "Browse 158+ verified apartments, bedspaces, and co-living spaces in Cebu City. Filter by location, budget, and amenities. No ghosting, no fake prices.",
};

export default function ListingsPage() {
  return (
    <Suspense>
      <ListingsContent />
    </Suspense>
  );
}
