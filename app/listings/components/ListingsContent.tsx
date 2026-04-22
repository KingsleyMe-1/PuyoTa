"use client";

import { useState, useMemo } from "react";
import { LayoutGrid, List, ChevronLeft, ChevronRight, SlidersHorizontal } from "lucide-react";
import { FilterSidebar, type Filters } from "./FilterSidebar";
import { ListingCard, type Listing } from "./ListingCard";

/* ─── Mock Data ──────────────────────────────────────────── */
const ALL_LISTINGS: Listing[] = [
  {
    id: 1,
    title: "Skyline Loft Residences",
    price: 28000,
    location: "Cebu IT Park, Cebu City",
    image: "https://picsum.photos/seed/skyline-loft/600/400",
    beds: 1,
    baths: 1,
    sqm: 42,
    amenities: ["WiFi", "Aircon", "Gym"],
  },
  {
    id: 2,
    title: "Azure Terrace Condos",
    price: 35000,
    location: "Mactan Newtown, Lapu-Lapu",
    image: "https://picsum.photos/seed/azure-terrace/600/400",
    beds: 2,
    baths: 2,
    sqm: 68,
    amenities: ["WiFi", "Aircon", "Pool", "Gym"],
  },
  {
    id: 3,
    title: "The Solstice Studio",
    price: 18500,
    location: "Lahug, Cebu City",
    image: "https://picsum.photos/seed/solstice-studio/600/400",
    beds: 0,
    baths: 1,
    sqm: 28,
    amenities: ["WiFi", "Aircon"],
  },
  {
    id: 4,
    title: "Marina Bay Suites",
    price: 42000,
    location: "Mandani Bay, Mandaue",
    image: "https://picsum.photos/seed/marina-bay/600/400",
    beds: 2,
    baths: 2,
    sqm: 85,
    amenities: ["WiFi", "Aircon", "Pool", "Gym"],
  },
  {
    id: 5,
    title: "Baseline Residences 1BR",
    price: 22000,
    location: "Banilad, Cebu City",
    image: "https://picsum.photos/seed/baseline-res/600/400",
    beds: 1,
    baths: 1,
    sqm: 38,
    amenities: ["WiFi", "Aircon"],
  },
  {
    id: 6,
    title: "Aruga Resort Condo",
    price: 55000,
    location: "Cebu Business Park",
    image: "https://picsum.photos/seed/aruga-resort/600/400",
    beds: 2,
    baths: 2,
    sqm: 90,
    amenities: ["WiFi", "Aircon", "Pool", "Gym"],
  },
  {
    id: 7,
    title: "Mivesa Garden Residences",
    price: 16500,
    location: "Lahug, Cebu City",
    image: "https://picsum.photos/seed/mivesa-garden/600/400",
    beds: 1,
    baths: 1,
    sqm: 35,
    amenities: ["WiFi", "Aircon", "Pool"],
  },
  {
    id: 8,
    title: "One Oasis Studio",
    price: 14000,
    location: "Tipolo, Mandaue City",
    image: "https://picsum.photos/seed/one-oasis/600/400",
    beds: 0,
    baths: 1,
    sqm: 25,
    amenities: ["WiFi", "Aircon"],
  },
];

const ITEMS_PER_PAGE = 4;
/* Simulated total for pagination UI — matches the 12-page design */
const MOCK_TOTAL_PAGES = 12;

const DEFAULT_FILTERS: Filters = {
  location: "",
  minPrice: "",
  maxPrice: "",
  propertyType: "All Types",
  amenities: [],
};

/* ─── Pagination helper ──────────────────────────────────── */
/** Returns exactly 3 consecutive page numbers centered on `current`. */
function getPageNumbers(current: number, displayTotal: number): number[] {
  const start = Math.max(1, Math.min(current - 1, displayTotal - 2));
  const count = Math.min(3, displayTotal);
  return Array.from({ length: count }, (_, i) => start + i);
}

/* ─── Main component ─────────────────────────────────────── */
export function ListingsContent() {
  const [activeFilters, setActiveFilters] = useState<Filters>(DEFAULT_FILTERS);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [page, setPage] = useState(1);
  const [showFilters, setShowFilters] = useState(false);

  const filteredListings = useMemo(() => {
    return ALL_LISTINGS.filter((listing) => {
      if (
        activeFilters.location &&
        !listing.location
          .toLowerCase()
          .includes(activeFilters.location.toLowerCase())
      )
        return false;

      if (
        activeFilters.minPrice &&
        listing.price < Number(activeFilters.minPrice)
      )
        return false;

      if (
        activeFilters.maxPrice &&
        listing.price > Number(activeFilters.maxPrice)
      )
        return false;

      if (activeFilters.propertyType !== "All Types") {
        const t = activeFilters.propertyType;
        if (t === "Studio" && listing.beds !== 0) return false;
        if (t === "1BR" && listing.beds !== 1) return false;
        if (t === "2BR" && listing.beds !== 2) return false;
        if (t === "3BR+" && listing.beds < 3) return false;
        if (t === "Bedspace" || t === "Co-Living") return false;
      }

      if (activeFilters.amenities.length > 0) {
        if (
          !activeFilters.amenities.every((a) => listing.amenities.includes(a))
        )
          return false;
      }

      return true;
    });
  }, [activeFilters]);

  const paginatedListings = filteredListings.slice(
    (page - 1) * ITEMS_PER_PAGE,
    page * ITEMS_PER_PAGE
  );

  /** Pages supported by actual filtered data */
  const realTotalPages = Math.max(1, Math.ceil(filteredListings.length / ITEMS_PER_PAGE));

  const handleApply = (filters: Filters) => {
    setActiveFilters(filters);
    setPage(1);
  };

  const pageNumbers = getPageNumbers(page, MOCK_TOTAL_PAGES);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-col lg:flex-row gap-6 lg:gap-7 items-start">
      {/* Sidebar — always visible on desktop, collapsible on mobile */}
      <div className={`${showFilters ? "block" : "hidden"} lg:block w-full lg:w-auto`}>
        <FilterSidebar onApply={handleApply} />
      </div>

      {/* Main content */}
      <div className="flex-1 flex flex-col gap-6 min-w-0 w-full">
        {/* Header row */}
        <div className="flex items-start justify-between gap-3 flex-wrap sm:flex-nowrap">
          <div className="min-w-0">
            <h1 className="text-xl sm:text-2xl font-bold text-gray-900 tracking-tight">
              Verified Apartments in Cebu
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Showing{" "}
              <span className="font-semibold text-gray-700">
                {filteredListings.length}
              </span>{" "}
              professional rentals with guaranteed authenticity.
            </p>
          </div>

          {/* Controls — filter toggle (mobile only) + view mode */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={() => setShowFilters((v) => !v)}
              aria-label="Toggle filters"
              aria-pressed={showFilters}
              className="lg:hidden flex items-center gap-1.5 px-3 h-9 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-navy/60 hover:text-navy transition-colors shadow-sm cursor-pointer"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span>Filters</span>
            </button>

            <div className="flex items-center bg-white border border-gray-200 rounded-xl p-1 shadow-sm shrink-0">
            <button
              onClick={() => setViewMode("grid")}
              aria-label="Grid view"
              aria-pressed={viewMode === "grid"}
              className={[
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer",
                viewMode === "grid"
                  ? "bg-navy text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setViewMode("list")}
              aria-label="List view"
              aria-pressed={viewMode === "list"}
              className={[
                "w-9 h-9 rounded-lg flex items-center justify-center transition-all duration-150 cursor-pointer",
                viewMode === "list"
                  ? "bg-navy text-white shadow-sm"
                  : "text-gray-400 hover:text-gray-600",
              ].join(" ")}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
          </div>
        </div>

        {/* Listings */}
        {paginatedListings.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center mb-4">
              <LayoutGrid className="w-7 h-7 text-gray-400" />
            </div>
            <p className="text-base font-semibold text-gray-700">
              No listings match your filters
            </p>
            <p className="text-sm text-gray-400 mt-1">
              Try broadening your search criteria.
            </p>
          </div>
        ) : (
          <div
            className={
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 gap-5"
                : "flex flex-col gap-4"
            }
          >
            {paginatedListings.map((listing) => (
              <ListingCard
                key={listing.id}
                listing={listing}
                viewMode={viewMode}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="flex items-center justify-center gap-1.5 pt-4 pb-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            aria-label="Previous page"
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:border-navy/60 hover:text-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronLeft className="w-4 h-4" />
          </button>

          {pageNumbers.map((pageNum) => {
              const isActive = pageNum === page;
              const hasNoData = pageNum > realTotalPages;
              return (
                <button
                  key={pageNum}
                  onClick={() => !hasNoData && setPage(pageNum)}
                  disabled={hasNoData}
                  aria-label={`Page ${pageNum}`}
                  aria-current={isActive ? "page" : undefined}
                  className={[
                    "w-9 h-9 rounded-lg flex items-center justify-center text-sm font-semibold border transition-all duration-150",
                    isActive
                      ? "bg-navy text-white border-navy shadow-sm cursor-default"
                      : hasNoData
                      ? "bg-white text-gray-300 border-gray-100 cursor-not-allowed"
                      : "bg-white text-gray-600 border-gray-200 hover:border-navy/60 hover:text-navy cursor-pointer",
                  ].join(" ")}
                >
                  {pageNum}
                </button>
              );
            })}

          <button
            onClick={() =>
              setPage((p) => Math.min(realTotalPages, p + 1))
            }
            disabled={page >= realTotalPages}
            aria-label="Next page"
            className="w-9 h-9 rounded-lg flex items-center justify-center border border-gray-200 bg-white text-gray-600 hover:border-navy/60 hover:text-navy transition-colors disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer"
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
