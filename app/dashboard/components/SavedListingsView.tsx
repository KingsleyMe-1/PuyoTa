"use client";

import { useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Search,
  LayoutGrid,
  LayoutList,
  Bookmark,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  BadgeCheck,
  ArrowUpRight,
  ChevronDown,
  Wifi,
  Wind,
  Dumbbell,
  Waves,
  Trash2,
  TrendingUp,
  TrendingDown,
  SlidersHorizontal,
  X,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SavedListing {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  image: string;
  type: "Studio" | "1BR" | "2BR" | "3BR" | "Bedspace" | "Co-Living";
  beds: number;
  baths: number;
  sqm: number;
  amenities: string[];
  savedDaysAgo: number;
  landlord: string;
  priceChange?: { direction: "up" | "down"; amount: number };
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const MOCK_SAVED: SavedListing[] = [
  {
    id: 1,
    title: "Skyrise 3 Studio Unit",
    price: 25000,
    location: "200m from IT Park, Cebu City",
    district: "IT Park",
    image: "https://picsum.photos/seed/sky3/600/400",
    type: "Studio",
    beds: 0,
    baths: 1,
    sqm: 28,
    amenities: ["WiFi", "Aircon", "Gym", "Pool"],
    savedDaysAgo: 2,
    landlord: "Maria Santos",
  },
  {
    id: 2,
    title: "Mivesa Garden Residences",
    price: 18500,
    location: "Lahug, Cebu City",
    district: "Lahug",
    image: "https://picsum.photos/seed/mivesa/600/400",
    type: "1BR",
    beds: 1,
    baths: 1,
    sqm: 42,
    amenities: ["WiFi", "Pool"],
    savedDaysAgo: 5,
    landlord: "Robert Lim",
    priceChange: { direction: "down", amount: 1500 },
  },
  {
    id: 3,
    title: "Avida Towers Riala",
    price: 32000,
    location: "IT Park, Lahug, Cebu City",
    district: "IT Park",
    image: "https://picsum.photos/seed/avida/600/400",
    type: "1BR",
    beds: 1,
    baths: 1,
    sqm: 48,
    amenities: ["WiFi", "Aircon", "Gym"],
    savedDaysAgo: 7,
    landlord: "Ana Reyes",
  },
  {
    id: 4,
    title: "Cebu Business Park Bedspace",
    price: 5500,
    location: "Cebu Business Park, Cebu City",
    district: "CBP",
    image: "https://picsum.photos/seed/cbpbed/600/400",
    type: "Bedspace",
    beds: 0,
    baths: 1,
    sqm: 12,
    amenities: ["WiFi", "Aircon"],
    savedDaysAgo: 10,
    landlord: "Jun Villanueva",
    priceChange: { direction: "up", amount: 500 },
  },
  {
    id: 5,
    title: "The Courtyard Residences",
    price: 42000,
    location: "Banilad, Cebu City",
    district: "Banilad",
    image: "https://picsum.photos/seed/courtyard/600/400",
    type: "2BR",
    beds: 2,
    baths: 2,
    sqm: 72,
    amenities: ["WiFi", "Aircon", "Gym", "Pool"],
    savedDaysAgo: 12,
    landlord: "Grace Tan",
  },
  {
    id: 6,
    title: "Marco Polo Residences Studio",
    price: 22000,
    location: "Banilad Road, Cebu City",
    district: "Banilad",
    image: "https://picsum.photos/seed/marcopolo/600/400",
    type: "Studio",
    beds: 0,
    baths: 1,
    sqm: 30,
    amenities: ["WiFi", "Aircon", "Pool"],
    savedDaysAgo: 14,
    landlord: "Carlo Reyes",
    priceChange: { direction: "down", amount: 2000 },
  },
  {
    id: 7,
    title: "Baseline Premiere Residences",
    price: 28000,
    location: "Escario Street, Lahug, Cebu City",
    district: "Lahug",
    image: "https://picsum.photos/seed/baseline/600/400",
    type: "1BR",
    beds: 1,
    baths: 1,
    sqm: 38,
    amenities: ["WiFi", "Aircon", "Gym"],
    savedDaysAgo: 18,
    landlord: "Pia Gomez",
  },
  {
    id: 8,
    title: "Mactan Newtown 2-Bedroom",
    price: 35000,
    location: "Mactan Island, Lapu-Lapu City",
    district: "Mactan",
    image: "https://picsum.photos/seed/mactan2br/600/400",
    type: "2BR",
    beds: 2,
    baths: 2,
    sqm: 65,
    amenities: ["WiFi", "Aircon", "Pool"],
    savedDaysAgo: 21,
    landlord: "Ben Cruz",
  },
];

// ── Config ─────────────────────────────────────────────────────────────────────

const TYPE_FILTERS = ["All", "Studio", "1BR", "2BR", "Bedspace", "Co-Living"] as const;
type TypeFilter = (typeof TYPE_FILTERS)[number];

const SORT_OPTIONS = [
  { value: "recent" as const, label: "Date Saved" },
  { value: "price-asc" as const, label: "Price: Low to High" },
  { value: "price-desc" as const, label: "Price: High to Low" },
];
type SortOption = "recent" | "price-asc" | "price-desc";

const AMENITY_META: Record<string, { icon: React.ReactNode; label: string }> = {
  WiFi: { icon: <Wifi className="w-3.5 h-3.5" />, label: "WiFi" },
  Aircon: { icon: <Wind className="w-3.5 h-3.5" />, label: "Air Conditioning" },
  Gym: { icon: <Dumbbell className="w-3.5 h-3.5" />, label: "Gym" },
  Pool: { icon: <Waves className="w-3.5 h-3.5" />, label: "Swimming Pool" },
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Studio: { bg: "#EEF0F8", text: "#1B2B6B" },
  "1BR": { bg: "#e0e7ff", text: "#3730a3" },
  "2BR": { bg: "#d1fae5", text: "#065f46" },
  "3BR": { bg: "#fef3c7", text: "#92400e" },
  Bedspace: { bg: "#fff7ed", text: "#c2410c" },
  "Co-Living": { bg: "#fce7f3", text: "#9d174d" },
};

function formatSavedDate(days: number): string {
  if (days === 0) return "Today";
  if (days === 1) return "Yesterday";
  if (days < 7) return `${days} days ago`;
  if (days < 14) return "1 week ago";
  if (days < 30) return `${Math.floor(days / 7)} weeks ago`;
  return `${Math.floor(days / 30)} months ago`;
}

// ── Root Component ─────────────────────────────────────────────────────────────

export default function SavedListingsView({
  onViewDetail,
}: {
  onViewDetail?: (id: number) => void;
}) {
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [sortBy, setSortBy] = useState<SortOption>("recent");
  const [filterType, setFilterType] = useState<TypeFilter>("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [removedIds, setRemovedIds] = useState<Set<number>>(new Set());
  const [sortOpen, setSortOpen] = useState(false);

  const handleRemove = useCallback((id: number) => {
    setRemovedIds((prev) => new Set([...prev, id]));
  }, []);

  const listings = useMemo(() => {
    let result = MOCK_SAVED.filter((l) => !removedIds.has(l.id));

    if (filterType !== "All") {
      result = result.filter((l) => l.type === filterType);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      result = result.filter(
        (l) =>
          l.title.toLowerCase().includes(q) ||
          l.location.toLowerCase().includes(q) ||
          l.district.toLowerCase().includes(q)
      );
    }

    if (sortBy === "price-asc")
      return [...result].sort((a, b) => a.price - b.price);
    if (sortBy === "price-desc")
      return [...result].sort((a, b) => b.price - a.price);
    return [...result].sort((a, b) => a.savedDaysAgo - b.savedDaysAgo);
  }, [removedIds, filterType, searchQuery, sortBy]);

  const totalSaved = MOCK_SAVED.length - removedIds.size;
  const currentSortLabel =
    SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";
  const hasActiveFilters = filterType !== "All" || !!searchQuery.trim();

  return (
    <div>
      {/* ── Page Header ───────────────────────────────────── */}
      <div className="flex items-start justify-between gap-4 mb-4">
        <div className="min-w-0">
          <div className="flex items-center gap-2.5 mb-0.5">
            <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">
              Saved Listings
            </h1>
            <span
              className="text-white text-[9px] font-black tracking-[0.12em] uppercase rounded-md px-2 py-[3px] shrink-0"
              style={{ background: "#1B2B6B" }}
              aria-label={`${totalSaved} saved listings`}
            >
              {totalSaved}
            </span>
          </div>
          <p className="text-[12.5px] text-gray-500">
            Your curated collection of Cebu apartments.
          </p>
        </div>

        {/* View toggle */}
        <div
          className="flex rounded-xl border border-gray-200 bg-white shadow-sm p-0.5 gap-0.5 shrink-0"
          role="group"
          aria-label="View mode"
        >
          <button
            onClick={() => setViewMode("grid")}
            aria-label="Grid view"
            aria-pressed={viewMode === "grid"}
            className={[
              "w-8 h-8 flex items-center justify-center rounded-[9px] transition-all duration-200 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30",
              viewMode === "grid"
                ? "bg-[#1B2B6B] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-700",
            ].join(" ")}
          >
            <LayoutGrid className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setViewMode("list")}
            aria-label="List view"
            aria-pressed={viewMode === "list"}
            className={[
              "w-8 h-8 flex items-center justify-center rounded-[9px] transition-all duration-200 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30",
              viewMode === "list"
                ? "bg-[#1B2B6B] text-white shadow-sm"
                : "text-gray-400 hover:text-gray-700",
            ].join(" ")}
          >
            <LayoutList className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* ── Search + Sort ─────────────────────────────────── */}
      <div className="flex items-center gap-2 mb-3">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search by name or location..."
            aria-label="Search saved listings"
            className="w-full bg-white rounded-xl text-[12.5px] text-gray-700 placeholder:text-gray-400 border border-gray-200 shadow-sm outline-none focus:ring-2 focus:border-[#1B2B6B]/25 transition-all duration-200 py-2.5 pr-8"
            style={{ paddingLeft: "2.25rem" }}
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery("")}
              aria-label="Clear search"
              className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer focus-visible:outline-none"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Sort dropdown */}
        <div className="relative shrink-0">
          <button
            onClick={() => setSortOpen((v) => !v)}
            aria-haspopup="listbox"
            aria-expanded={sortOpen}
            className="flex items-center gap-1.5 h-9 px-3 rounded-xl bg-white border border-gray-200 shadow-sm text-[11.5px] font-medium text-gray-700 hover:border-gray-300 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
          >
            <SlidersHorizontal className="w-3 h-3 text-gray-400" />
            <span className="hidden sm:inline">{currentSortLabel}</span>
            <span className="sm:hidden">Sort</span>
            <ChevronDown
              className={[
                "w-3 h-3 text-gray-400 transition-transform duration-200",
                sortOpen ? "rotate-180" : "",
              ].join(" ")}
            />
          </button>

          {sortOpen && (
            <>
              <div
                className="fixed inset-0 z-10"
                onClick={() => setSortOpen(false)}
                aria-hidden="true"
              />
              <div
                className="absolute right-0 top-full mt-1.5 w-52 bg-white rounded-xl border border-gray-200 shadow-lg overflow-hidden z-20"
                role="listbox"
                aria-label="Sort options"
              >
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => {
                      setSortBy(opt.value);
                      setSortOpen(false);
                    }}
                    role="option"
                    aria-selected={sortBy === opt.value}
                    className={[
                      "flex items-center justify-between w-full px-3.5 py-2.5 text-[12px] transition-colors duration-150 cursor-pointer",
                      sortBy === opt.value
                        ? "text-[#1B2B6B] font-semibold"
                        : "text-gray-700 hover:bg-gray-50 font-medium",
                    ].join(" ")}
                    style={
                      sortBy === opt.value
                        ? { background: "rgba(27,43,107,0.05)" }
                        : {}
                    }
                  >
                    {opt.label}
                    {sortBy === opt.value && (
                      <span
                        className="w-1.5 h-1.5 rounded-full"
                        style={{ background: "#1B2B6B" }}
                      />
                    )}
                  </button>
                ))}
              </div>
            </>
          )}
        </div>
      </div>

      {/* ── Type Filter Chips ─────────────────────────────── */}
      <div
        className="flex items-center gap-1.5 overflow-x-auto pb-1 mb-4 scrollbar-hide"
        role="group"
        aria-label="Filter by property type"
      >
        {TYPE_FILTERS.map((type) => (
          <button
            key={type}
            onClick={() => setFilterType(type)}
            aria-pressed={filterType === type}
            className={[
              "shrink-0 px-3 py-1.5 rounded-lg text-[10.5px] font-bold tracking-[0.06em] uppercase",
              "transition-all duration-200 cursor-pointer",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30",
              filterType === type
                ? "text-white shadow-sm"
                : "bg-white border border-gray-200 text-gray-500 hover:border-[#1B2B6B]/30 hover:text-[#1B2B6B] shadow-sm",
            ].join(" ")}
            style={filterType === type ? { background: "#1B2B6B" } : {}}
          >
            {type}
          </button>
        ))}
      </div>

      {/* Results count */}
      {hasActiveFilters && listings.length > 0 && (
        <p className="text-[11.5px] text-gray-400 mb-3">
          Showing{" "}
          <span className="font-semibold text-gray-600">{listings.length}</span>{" "}
          listing{listings.length !== 1 ? "s" : ""}
          {filterType !== "All" && (
            <>
              {" "}in{" "}
              <span className="font-semibold text-gray-600">{filterType}</span>
            </>
          )}
        </p>
      )}

      {/* ── Content ────────────────────────────────────────── */}
      {listings.length === 0 ? (
        <EmptyState
          hasFilters={hasActiveFilters}
          onClearFilters={() => {
            setFilterType("All");
            setSearchQuery("");
          }}
        />
      ) : (
        <div
          className={
            viewMode === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4"
              : "flex flex-col gap-3"
          }
        >
          {listings.map((listing) => (
            <SavedListingCard
              key={listing.id}
              listing={listing}
              viewMode={viewMode}
              onRemove={handleRemove}
              onViewDetail={onViewDetail}
            />
          ))}
        </div>
      )}
    </div>
  );
}

// ── Empty State ────────────────────────────────────────────────────────────────

function EmptyState({
  hasFilters,
  onClearFilters,
}: {
  hasFilters: boolean;
  onClearFilters: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4 text-center">
      {/* Icon container */}
      <div
        className="w-16 h-16 rounded-2xl flex items-center justify-center mb-4"
        style={{ background: "#EEF0F8" }}
        aria-hidden="true"
      >
        <Bookmark
          className="w-7 h-7"
          style={{ color: "rgba(27,43,107,0.35)" }}
        />
      </div>

      <h3 className="text-[15px] font-bold text-gray-800 mb-1.5">
        {hasFilters ? "No matching listings" : "No saved listings yet"}
      </h3>
      <p className="text-[12.5px] text-gray-400 max-w-xs leading-relaxed mb-5">
        {hasFilters
          ? "Try adjusting your filters or clearing your search query."
          : "Browse apartments in Cebu and bookmark the ones you love to see them here."}
      </p>

      {hasFilters ? (
        <button
          onClick={onClearFilters}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-[12px] font-semibold text-gray-700 hover:border-[#1B2B6B]/30 hover:text-[#1B2B6B] transition-all duration-200 cursor-pointer shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20"
        >
          <X className="w-3.5 h-3.5" />
          Clear filters
        </button>
      ) : (
        <Link
          href="/listings"
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white rounded-xl text-[12px] font-bold hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-2"
          style={{ background: "#1B2B6B" }}
        >
          Browse Apartments
          <ArrowUpRight className="w-3.5 h-3.5" />
        </Link>
      )}
    </div>
  );
}

// ── Saved Listing Card ─────────────────────────────────────────────────────────

function SavedListingCard({
  listing,
  viewMode,
  onRemove,
  onViewDetail,
}: {
  listing: SavedListing;
  viewMode: "grid" | "list";
  onRemove: (id: number) => void;
  onViewDetail?: (id: number) => void;
}) {
  const [removing, setRemoving] = useState(false);
  const typeColor = TYPE_COLORS[listing.type] ?? TYPE_COLORS["Studio"];

  const handleRemove = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setRemoving(true);
    setTimeout(() => onRemove(listing.id), 280);
  };

  const transitionStyle = {
    opacity: removing ? 0 : 1,
    transform: removing ? "scale(0.96)" : "scale(1)",
    transition: "opacity 280ms ease, transform 280ms ease, box-shadow 300ms",
  };

  // ── List View ────────────────────────────────────────

  if (viewMode === "list") {
    return (
      <article
        className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row hover:shadow-md"
        style={transitionStyle}
      >
        {/* Image */}
        <div className="relative h-44 sm:h-auto sm:w-52 lg:w-56 shrink-0 overflow-hidden">
          <Image
            src={listing.image}
            alt={listing.title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
            sizes="(max-width: 640px) 100vw, 224px"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-transparent to-transparent pointer-events-none" />
          {/* Saved date */}
          <div className="absolute top-2.5 left-2.5 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-[3px] flex items-center gap-1">
            <Bookmark className="w-2 h-2 text-white/70" aria-hidden="true" />
            <span className="text-[8px] text-white/90 font-medium">
              {formatSavedDate(listing.savedDaysAgo)}
            </span>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 p-4 flex flex-col min-w-0">
          {/* Title row */}
          <div className="flex items-start justify-between gap-3 mb-2">
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 mb-1">
                <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                <span className="text-[9px] font-bold tracking-[0.14em] text-emerald-600 uppercase">
                  PuyoTa Verified
                </span>
              </div>
              <h3 className="text-[14px] font-bold text-gray-900 leading-snug group-hover:text-[#1B2B6B] transition-colors duration-200">
                {listing.title}
              </h3>
            </div>
            <span
              className="shrink-0 text-[11px] font-black tracking-[0.08em] uppercase rounded-lg px-2.5 py-1 leading-none"
              style={{ background: typeColor.bg, color: typeColor.text }}
            >
              {listing.type}
            </span>
          </div>

          {/* Location */}
          <div className="flex items-center gap-1 mb-3">
            <MapPin className="w-3 h-3 text-gray-400 shrink-0" aria-hidden="true" />
            <span className="text-[11.5px] text-gray-400 truncate">
              {listing.location}
            </span>
          </div>

          {/* Price + price change */}
          <div className="flex items-center gap-3 mb-3">
            <div>
              <div
                className="text-[18px] font-black leading-none tracking-tight tabular-nums"
                style={{ color: "#1B2B6B" }}
              >
                ₱{listing.price.toLocaleString()}
              </div>
              <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
                per month
              </div>
            </div>
            {listing.priceChange && (
              <div
                className={[
                  "flex items-center gap-1 text-[10px] font-bold rounded-md px-1.5 py-1",
                  listing.priceChange.direction === "down"
                    ? "bg-emerald-50 text-emerald-600"
                    : "bg-red-50 text-red-500",
                ].join(" ")}
              >
                {listing.priceChange.direction === "down" ? (
                  <TrendingDown className="w-3 h-3" />
                ) : (
                  <TrendingUp className="w-3 h-3" />
                )}
                ₱{listing.priceChange.amount.toLocaleString()}{" "}
                {listing.priceChange.direction === "down"
                  ? "price drop"
                  : "price increase"}
              </div>
            )}
          </div>

          {/* Specs */}
          <div className="flex items-center gap-3 mb-3">
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <BedDouble className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {listing.beds === 0 ? "Studio" : `${listing.beds} Bed`}
            </span>
            <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <Bath className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {listing.baths} Bath
            </span>
            <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
            <span className="flex items-center gap-1 text-[11px] text-gray-500">
              <Maximize2 className="w-3.5 h-3.5 text-gray-400" aria-hidden="true" />
              {listing.sqm} sqm
            </span>
          </div>

          {/* Amenities */}
          {listing.amenities.length > 0 && (
            <div className="flex items-center gap-3 mb-3">
              {listing.amenities.slice(0, 5).map(
                (am) =>
                  AMENITY_META[am] && (
                    <span
                      key={am}
                      title={AMENITY_META[am].label}
                      className="text-gray-400 hover:text-[#1B2B6B] transition-colors duration-150 cursor-default"
                    >
                      {AMENITY_META[am].icon}
                    </span>
                  )
              )}
            </div>
          )}

          {/* Footer */}
          <div className="mt-auto flex items-center justify-between gap-3">
            <span className="text-[10.5px] text-gray-400 flex items-center gap-1">
              <Bookmark className="w-3 h-3 text-gray-300" aria-hidden="true" />
              Saved {formatSavedDate(listing.savedDaysAgo)}
            </span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => onViewDetail?.(listing.id)}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-white rounded-xl text-[11px] font-bold tracking-wide uppercase hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-1 active:scale-[0.98] cursor-pointer"
                style={{ background: "#1B2B6B" }}
              >
                View Details
                <ArrowUpRight className="w-3.5 h-3.5" />
              </button>
              <button
                onClick={handleRemove}
                aria-label={`Remove ${listing.title} from saved`}
                className="shrink-0 h-[34px] w-[34px] flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 active:scale-95"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </article>
    );
  }

  // ── Grid View ────────────────────────────────────────

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md hover:-translate-y-0.5"
      style={transitionStyle}
    >
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 360px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-black/5 pointer-events-none" />

        {/* Verified badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md px-1.5 py-[3px] shadow-sm">
          <BadgeCheck className="w-2.5 h-2.5 text-emerald-500 shrink-0" />
          <span className="text-[8px] font-bold tracking-[0.14em] text-gray-600 uppercase">
            Verified
          </span>
        </div>

        {/* Saved date — top right */}
        <div className="absolute top-2.5 right-2.5 bg-black/50 backdrop-blur-sm rounded-md px-1.5 py-[3px] flex items-center gap-1">
          <Bookmark className="w-2 h-2 text-white/70" aria-hidden="true" />
          <span className="text-[8px] text-white/90 font-medium">
            {formatSavedDate(listing.savedDaysAgo)}
          </span>
        </div>
      </div>

      {/* Card body */}
      <div className="p-4 flex flex-col flex-1 gap-0 min-w-0">
        {/* Title + Type */}
        <div className="flex items-start justify-between gap-2 mb-1.5">
          <h3 className="font-bold text-gray-900 text-[13.5px] leading-snug group-hover:text-[#1B2B6B] transition-colors duration-200">
            {listing.title}
          </h3>
          <span
            className="shrink-0 text-[11px] font-black tracking-[0.08em] uppercase rounded-lg px-2.5 py-1 leading-none"
            style={{ background: typeColor.bg, color: typeColor.text }}
          >
            {listing.type}
          </span>
        </div>

        {/* Location */}
        <div className="flex items-center gap-1 text-gray-400 mb-3">
          <MapPin className="w-3 h-3 shrink-0" aria-hidden="true" />
          <span className="text-[11px] truncate">{listing.location}</span>
        </div>

        <div className="h-px bg-gray-100 mb-3" />

        {/* Price + price change */}
        <div className="flex items-end justify-between mb-2.5">
          <div>
            <div
              className="text-[20px] font-black tracking-tight leading-none tabular-nums"
              style={{ color: "#1B2B6B" }}
            >
              ₱{listing.price.toLocaleString()}
            </div>
            <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
              per month
            </div>
          </div>
          {listing.priceChange && (
            <div
              className={[
                "flex items-center gap-1 text-[9.5px] font-bold rounded-md px-1.5 py-[5px]",
                listing.priceChange.direction === "down"
                  ? "bg-emerald-50 text-emerald-600"
                  : "bg-red-50 text-red-500",
              ].join(" ")}
            >
              {listing.priceChange.direction === "down" ? (
                <TrendingDown className="w-3 h-3" />
              ) : (
                <TrendingUp className="w-3 h-3" />
              )}
              ₱{listing.priceChange.amount.toLocaleString()}
            </div>
          )}
        </div>

        {/* Specs */}
        <div className="flex items-center gap-2.5 mb-3">
          <span
            title={listing.beds === 0 ? "Studio" : `${listing.beds} Bedroom`}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500"
          >
            <BedDouble className="w-3.5 h-3.5 text-gray-400" />
            {listing.beds === 0 ? "Studio" : `${listing.beds}BR`}
          </span>
          <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
          <span
            title={`${listing.baths} Bathroom`}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500"
          >
            <Bath className="w-3.5 h-3.5 text-gray-400" />
            {listing.baths}
          </span>
          <span className="w-px h-3 bg-gray-200" aria-hidden="true" />
          <span
            title={`${listing.sqm} sqm`}
            className="flex items-center gap-1 text-[10px] font-medium text-gray-500"
          >
            <Maximize2 className="w-3.5 h-3.5 text-gray-400" />
            {listing.sqm}
          </span>
        </div>

        {/* Amenities */}
        {listing.amenities.length > 0 && (
          <div className="flex items-center gap-3 mb-3.5">
            {listing.amenities.slice(0, 5).map(
              (am) =>
                AMENITY_META[am] && (
                  <span
                    key={am}
                    title={AMENITY_META[am].label}
                    className="text-gray-400 hover:text-[#1B2B6B] transition-colors duration-150 cursor-default"
                  >
                    {AMENITY_META[am].icon}
                  </span>
                )
            )}
          </div>
        )}

        {/* CTA + Remove */}
        <div className="mt-auto flex items-center gap-2">
          <button
            onClick={() => onViewDetail?.(listing.id)}
            className="flex-1 rounded-xl text-white py-2.5 text-[11.5px] font-bold tracking-wide uppercase flex items-center justify-center gap-1.5 hover:opacity-90 transition-opacity duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-1 active:scale-[0.98] cursor-pointer"
            style={{ background: "#1B2B6B" }}
          >
            View Details
            <ArrowUpRight className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={handleRemove}
            aria-label={`Remove ${listing.title} from saved`}
            className="shrink-0 h-9 w-9 flex items-center justify-center rounded-xl border border-gray-200 text-gray-400 hover:border-red-200 hover:text-red-500 hover:bg-red-50 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-red-200 active:scale-95"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </article>
  );
}
