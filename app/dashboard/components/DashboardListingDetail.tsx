"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  MapPin,
  BadgeCheck,
  Star,
  Wifi,
  Wind,
  Waves,
  Dumbbell,
  Shield,
  MessageCircle,
  Eye,
  BedDouble,
  Bath,
  Maximize2,
  Package,
  Clock,
  Calendar,
  ChevronLeft,
  ChevronRight,
  LayoutGrid,
  Bookmark,
  Share2,
  X,
  TrendingDown,
  Heart,
} from "lucide-react";

interface ListingDetail {
  id: number;
  title: string;
  unit: string;
  price: number;
  priceSuffix: string;
  location: string;
  district: string;
  beds: number;
  baths: number;
  sqm: number;
  furnishing: string;
  description: string;
  images: string[];
  amenities: Array<{ name: string; icon: string }>;
  landlord: {
    name: string;
    title: string;
    rating: number;
    reviewCount: number;
    responseTime: string;
    memberSince: string;
    avatar: string;
  };
  priceChange?: { direction: "up" | "down"; amount: number };
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const LISTINGS: Record<number, ListingDetail> = {
  1: {
    id: 1,
    title: "Skyrise 3 Studio Unit",
    unit: "Unit 12A",
    price: 25000,
    priceSuffix: "Inclusive of Condo Dues",
    location: "200m from IT Park, Lahug, Cebu City",
    district: "IT Park",
    beds: 0,
    baths: 1,
    sqm: 28,
    furnishing: "Full Furnished",
    description:
      "A sleek, fully furnished studio in the heart of IT Park — Cebu's premier business and lifestyle hub. Floor-to-ceiling windows flood the space with natural light. Features a built-in Murphy bed, compact modern kitchen, and smart storage throughout. Walking distance to restaurants, cafes, and major BPO offices.",
    images: [
      "https://picsum.photos/seed/sky3-main/1200/800",
      "https://picsum.photos/seed/sky3-kitchen/600/400",
      "https://picsum.photos/seed/sky3-living/600/400",
      "https://picsum.photos/seed/sky3-bath/600/400",
      "https://picsum.photos/seed/sky3-view/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Gym Access", icon: "dumbbell" },
      { name: "Swimming Pool", icon: "waves" },
    ],
    landlord: {
      name: "Maria Santos",
      title: "Verified Landlord",
      rating: 4.9,
      reviewCount: 47,
      responseTime: "Under 1 hour",
      memberSince: "May 2021",
      avatar: "https://picsum.photos/seed/landlord-maria/200/200",
    },
  },
  2: {
    id: 2,
    title: "Mivesa Garden Residences",
    unit: "Unit 8B",
    price: 18500,
    priceSuffix: "Bills Negotiable",
    location: "Lahug, Cebu City",
    district: "Lahug",
    beds: 1,
    baths: 1,
    sqm: 42,
    furnishing: "Semi-Furnished",
    description:
      "Garden-side 1-bedroom unit at Mivesa, one of Lahug's most sought-after addresses. Enjoy lush greenery views from your private balcony. Features a spacious bedroom with built-in wardrobe, well-appointed kitchen, and generous living and dining areas.",
    images: [
      "https://picsum.photos/seed/mivesa-main/1200/800",
      "https://picsum.photos/seed/mivesa-living/600/400",
      "https://picsum.photos/seed/mivesa-bed/600/400",
      "https://picsum.photos/seed/mivesa-bath/600/400",
      "https://picsum.photos/seed/mivesa-balcony/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Swimming Pool", icon: "waves" },
    ],
    landlord: {
      name: "Robert Lim",
      title: "Verified Landlord",
      rating: 4.7,
      reviewCount: 31,
      responseTime: "Under 2 hours",
      memberSince: "March 2020",
      avatar: "https://picsum.photos/seed/landlord-robert/200/200",
    },
    priceChange: { direction: "down", amount: 1500 },
  },
  3: {
    id: 3,
    title: "Avida Towers Riala",
    unit: "Unit 22C",
    price: 32000,
    priceSuffix: "Inclusive of Association Dues",
    location: "IT Park, Lahug, Cebu City",
    district: "IT Park",
    beds: 1,
    baths: 1,
    sqm: 48,
    furnishing: "Full Furnished",
    description:
      "Premium 1-bedroom unit in Avida Towers Riala, sitting directly within IT Park. Fully furnished with high-quality fixtures and fittings. Enjoy city and mountain views from the upper floors. The property features resort-level amenities and 24/7 security.",
    images: [
      "https://picsum.photos/seed/avida-main/1200/800",
      "https://picsum.photos/seed/avida-kitchen/600/400",
      "https://picsum.photos/seed/avida-bed/600/400",
      "https://picsum.photos/seed/avida-bath/600/400",
      "https://picsum.photos/seed/avida-gym/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Gym Access", icon: "dumbbell" },
    ],
    landlord: {
      name: "Ana Reyes",
      title: "Verified Landlord",
      rating: 4.8,
      reviewCount: 62,
      responseTime: "Same day",
      memberSince: "January 2019",
      avatar: "https://picsum.photos/seed/landlord-ana/200/200",
    },
  },
  4: {
    id: 4,
    title: "Cebu Business Park Bedspace",
    unit: "Bed 4 — Room 2B",
    price: 5500,
    priceSuffix: "All-In Monthly Rate",
    location: "Cebu Business Park, Cebu City",
    district: "CBP",
    beds: 0,
    baths: 1,
    sqm: 12,
    furnishing: "Full Furnished",
    description:
      "Cozy, air-conditioned bedspace in a clean, well-maintained house just steps from Cebu Business Park. Includes access to a shared kitchen, living area, and private lockers. Perfect for young professionals or students who want a safe, budget-friendly option near CBP and Ayala.",
    images: [
      "https://picsum.photos/seed/cbpbed-main/1200/800",
      "https://picsum.photos/seed/cbpbed-room/600/400",
      "https://picsum.photos/seed/cbpbed-common/600/400",
      "https://picsum.photos/seed/cbpbed-bath/600/400",
      "https://picsum.photos/seed/cbpbed-kitchen/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
    ],
    landlord: {
      name: "Jun Villanueva",
      title: "Verified Landlord",
      rating: 4.6,
      reviewCount: 88,
      responseTime: "Under 3 hours",
      memberSince: "February 2018",
      avatar: "https://picsum.photos/seed/landlord-jun/200/200",
    },
    priceChange: { direction: "up", amount: 500 },
  },
  5: {
    id: 5,
    title: "The Courtyard Residences",
    unit: "Unit 3F",
    price: 42000,
    priceSuffix: "2 Months Deposit",
    location: "Banilad, Cebu City",
    district: "Banilad",
    beds: 2,
    baths: 2,
    sqm: 72,
    furnishing: "Full Furnished",
    description:
      "Expansive 2-bedroom unit in the prestigious Courtyard Residences. Features imported marble flooring, a gourmet kitchen with top-of-the-line appliances, and two lavish bedrooms with en-suite bathrooms. One of Banilad's most prestigious addresses, minutes from major schools and hospitals.",
    images: [
      "https://picsum.photos/seed/courtyard-main/1200/800",
      "https://picsum.photos/seed/courtyard-living/600/400",
      "https://picsum.photos/seed/courtyard-bed/600/400",
      "https://picsum.photos/seed/courtyard-bath/600/400",
      "https://picsum.photos/seed/courtyard-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Gym Access", icon: "dumbbell" },
      { name: "Swimming Pool", icon: "waves" },
    ],
    landlord: {
      name: "Grace Tan",
      title: "Verified Landlord",
      rating: 5.0,
      reviewCount: 18,
      responseTime: "Under 1 hour",
      memberSince: "August 2022",
      avatar: "https://picsum.photos/seed/landlord-grace/200/200",
    },
  },
  6: {
    id: 6,
    title: "Marco Polo Residences Studio",
    unit: "Unit 9D",
    price: 22000,
    priceSuffix: "Inclusive of Condo Dues",
    location: "Banilad Road, Cebu City",
    district: "Banilad",
    beds: 0,
    baths: 1,
    sqm: 30,
    furnishing: "Full Furnished",
    description:
      "Well-appointed studio in Marco Polo Residences — a trusted name in Cebu real estate. Features a smart open-plan layout with a queen-size bed, sofa area, and efficient kitchen. Direct access to the pool and gym. Ideal for business travelers and expats.",
    images: [
      "https://picsum.photos/seed/marcopolo-main/1200/800",
      "https://picsum.photos/seed/marcopolo-living/600/400",
      "https://picsum.photos/seed/marcopolo-kitchen/600/400",
      "https://picsum.photos/seed/marcopolo-bath/600/400",
      "https://picsum.photos/seed/marcopolo-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
    ],
    landlord: {
      name: "Carlo Reyes",
      title: "Verified Landlord",
      rating: 4.8,
      reviewCount: 53,
      responseTime: "Under 2 hours",
      memberSince: "June 2020",
      avatar: "https://picsum.photos/seed/landlord-carlo/200/200",
    },
    priceChange: { direction: "down", amount: 2000 },
  },
  7: {
    id: 7,
    title: "Baseline Premiere Residences",
    unit: "Unit 5A",
    price: 28000,
    priceSuffix: "1 Month Deposit",
    location: "Escario Street, Lahug, Cebu City",
    district: "Lahug",
    beds: 1,
    baths: 1,
    sqm: 38,
    furnishing: "Semi-Furnished",
    description:
      "Charming 1-bedroom unit in Baseline Premiere, a boutique residence along Escario Street. Features hardwood flooring, high ceilings, and a cozy private balcony. Minutes from IT Park and the Cebu Business District. Semi-furnished with a bed frame, wardrobe, and kitchen appliances.",
    images: [
      "https://picsum.photos/seed/baseline-main/1200/800",
      "https://picsum.photos/seed/baseline-bed/600/400",
      "https://picsum.photos/seed/baseline-living/600/400",
      "https://picsum.photos/seed/baseline-bath/600/400",
      "https://picsum.photos/seed/baseline-balcony/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Gym Access", icon: "dumbbell" },
    ],
    landlord: {
      name: "Pia Gomez",
      title: "Verified Landlord",
      rating: 4.7,
      reviewCount: 24,
      responseTime: "Same day",
      memberSince: "October 2021",
      avatar: "https://picsum.photos/seed/landlord-pia/200/200",
    },
  },
  8: {
    id: 8,
    title: "Mactan Newtown 2-Bedroom",
    unit: "Unit 15C",
    price: 35000,
    priceSuffix: "2 Months Deposit",
    location: "Mactan Newtown, Lapu-Lapu City",
    district: "Mactan",
    beds: 2,
    baths: 2,
    sqm: 65,
    furnishing: "Full Furnished",
    description:
      "Bright, resort-inspired 2-bedroom unit overlooking the Mactan Channel. Features an open-concept living and dining area, a fully equipped kitchen, and two spacious bedrooms. Enjoy direct access to a stunning infinity pool and white sand beach. Perfect for families or couples who love island living.",
    images: [
      "https://picsum.photos/seed/mactan2br-main/1200/800",
      "https://picsum.photos/seed/mactan2br-living/600/400",
      "https://picsum.photos/seed/mactan2br-bed/600/400",
      "https://picsum.photos/seed/mactan2br-bath/600/400",
      "https://picsum.photos/seed/mactan2br-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
    ],
    landlord: {
      name: "Ben Cruz",
      title: "Verified Landlord",
      rating: 4.9,
      reviewCount: 36,
      responseTime: "Under 1 hour",
      memberSince: "April 2022",
      avatar: "https://picsum.photos/seed/landlord-ben/200/200",
    },
  },
};

// ── Amenity Icon Map ───────────────────────────────────────────────────────────

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  wind: <Wind className="w-4 h-4" />,
  waves: <Waves className="w-4 h-4" />,
  dumbbell: <Dumbbell className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
};

// ── Props ──────────────────────────────────────────────────────────────────────

interface Props {
  id: number;
  onBack: () => void;
}

// ── Root Component ─────────────────────────────────────────────────────────────

export default function DashboardListingDetail({ id, onBack }: Props) {
  const listing = LISTINGS[id];
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [isSaved, setIsSaved] = useState(true); // pre-saved since coming from saved view
  const [savePop, setSavePop] = useState(false);
  const [liked, setLiked] = useState(false);
  const [likePop, setLikePop] = useState(false);

  const handleLike = () => {
    setLiked((v) => !v);
    setLikePop(true);
    setTimeout(() => setLikePop(false), 300);
  };

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleSaveToggle = () => {
    setIsSaved((v) => !v);
    setSavePop(true);
    setTimeout(() => setSavePop(false), 300);
  };

  // Not found fallback
  if (!listing) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-center">
        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-4"
          style={{ background: "#EEF0F8" }}
        >
          <MapPin className="w-6 h-6" style={{ color: "rgba(27,43,107,0.35)" }} />
        </div>
        <h3 className="text-[15px] font-bold text-gray-800 mb-1.5">
          Listing not found
        </h3>
        <p className="text-[12.5px] text-gray-400 mb-5">
          This listing may have been removed or is no longer available.
        </p>
        <button
          onClick={onBack}
          className="inline-flex items-center gap-1.5 px-5 py-2.5 text-white rounded-xl text-[12px] font-bold transition-opacity hover:opacity-90 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-2"
          style={{ background: "#1B2B6B" }}
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Saved Listings
        </button>
      </div>
    );
  }

  const bedLabel = listing.beds === 0 ? "Studio" : String(listing.beds);
  const bedUnit = listing.beds === 0 ? "" : listing.beds === 1 ? "Bedroom" : "Bedrooms";

  return (
    <>
      {/* Lightbox */}
      {lightboxOpen && (
        <Lightbox
          images={listing.images}
          title={listing.title}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}

      <div>
        <div className="flex items-center justify-between gap-3 mb-5 flex-wrap sm:flex-nowrap">
          {/* Back button */}
          <button
            onClick={onBack}
            className="flex items-center gap-2 text-[12.5px] font-semibold text-gray-500 hover:text-[#1B2B6B] transition-colors duration-200 cursor-pointer group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30 rounded-lg px-1 py-0.5"
          >
            <span
              className="flex items-center justify-center w-7 h-7 rounded-lg bg-white border border-gray-200 shadow-sm group-hover:border-[#1B2B6B]/30 group-hover:shadow-md transition-all duration-200"
              aria-hidden="true"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
            </span>
            <span className="hidden sm:inline">Back to Saved Listings</span>
            <span className="sm:hidden">Back</span>
          </button>

          {/* Actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              aria-label="Share listing"
              className="flex items-center gap-1.5 px-3 h-8 rounded-xl border border-gray-200 bg-white text-[11.5px] font-semibold text-gray-700 hover:border-[#1B2B6B]/30 hover:text-[#1B2B6B] transition-all shadow-sm cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
            >
              <Share2 className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Share</span>
            </button>
            <button
              onClick={handleSaveToggle}
              aria-label={isSaved ? "Remove from saved" : "Save listing"}
              aria-pressed={isSaved}
              className={[
                "flex items-center gap-1.5 px-3 h-8 rounded-xl border text-[11.5px] font-semibold transition-all shadow-sm cursor-pointer",
                "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30",
                savePop ? "scale-110" : "scale-100",
                isSaved
                  ? "bg-[#EEF0F8] border-[#1B2B6B]/20 text-[#1B2B6B]"
                  : "bg-white border-gray-200 text-gray-600 hover:border-[#1B2B6B]/30",
              ].join(" ")}
            >
              <Bookmark
                className={[
                  "w-3.5 h-3.5 transition-all duration-200",
                  isSaved ? "fill-[#1B2B6B]" : "",
                ].join(" ")}
              />
              <span className="hidden sm:inline">
                {isSaved ? "Saved" : "Save"}
              </span>
            </button>
            <button
                onClick={handleLike}
                className={[
                  "flex items-center gap-1.5 px-3 h-9 rounded-xl border text-sm font-semibold transition-all shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-red-300 focus-visible:outline-none",
                  likePop ? "scale-110" : "scale-100",
                  liked
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-400",
                ].join(" ")}
              >
                <Heart
                  className={[
                    "w-3.5 h-3.5 transition-all duration-200",
                    liked ? "fill-red-500 text-red-500" : "",
                  ].join(" ")}
                />
                <span className="hidden sm:inline">{liked ? "Liked" : "Like"}</span>
              </button>
          </div>
        </div>

        {/* ── Photo Gallery ──────────────────────────────────── */}
        <div className="mb-5">
          <PhotoGallery
            images={listing.images}
            title={listing.title}
            onOpenLightbox={openLightbox}
          />
        </div>

        {/* ── Two-column layout ──────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-5 items-start">

          {/* LEFT ─────────────────────────────────────────────── */}
          <div className="flex flex-col gap-4 min-w-0">

            {/* Title + price card */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="min-w-0 flex-1">
                  <div className="flex items-center gap-1.5 mb-1.5">
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                    <span className="text-[9px] font-black tracking-[0.2em] text-emerald-600 uppercase">
                      PuyoTa Verified
                    </span>
                  </div>
                  <h1 className="text-[18px] sm:text-[20px] font-black text-gray-900 leading-tight tracking-tight mb-1">
                    {listing.title}
                  </h1>
                  <p className="text-[11.5px] text-gray-400 font-medium mb-1.5">
                    {listing.unit}
                  </p>
                  <div className="flex items-center gap-1 text-gray-500">
                    <MapPin className="w-3.5 h-3.5 shrink-0 text-[#1B2B6B]/40" />
                    <span className="text-[12.5px]">{listing.location}</span>
                  </div>
                </div>

                {/* Price */}
                <div className="sm:text-right shrink-0">
                  <div
                    className="text-[26px] sm:text-[28px] font-black leading-none tracking-tight tabular-nums"
                    style={{ color: "#1B2B6B" }}
                  >
                    ₱{listing.price.toLocaleString()}
                  </div>
                  <div className="text-[9px] font-black uppercase tracking-[0.2em] text-gray-400 mt-1">
                    per month
                  </div>
                  <div className="text-[11px] text-gray-400 mt-0.5">
                    {listing.priceSuffix}
                  </div>
                  {listing.priceChange && (
                    <div
                      className={[
                        "inline-flex items-center gap-1 text-[10px] font-bold rounded-md px-1.5 py-1 mt-1.5",
                        listing.priceChange.direction === "down"
                          ? "bg-emerald-50 text-emerald-600"
                          : "bg-red-50 text-red-500",
                      ].join(" ")}
                    >
                      <TrendingDown className="w-3 h-3" />
                      ₱{listing.priceChange.amount.toLocaleString()} price drop
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Specs bar */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
              <div className="grid grid-cols-2 sm:grid-cols-4 divide-x divide-y sm:divide-y-0 divide-gray-100">
                <SpecItem
                  icon={<BedDouble className="w-4 h-4" />}
                  value={bedLabel}
                  label={bedUnit || "Bedrooms"}
                />
                <SpecItem
                  icon={<Bath className="w-4 h-4" />}
                  value={String(listing.baths)}
                  label={listing.baths === 1 ? "Bathroom" : "Bathrooms"}
                />
                <SpecItem
                  icon={<Maximize2 className="w-4 h-4" />}
                  value={`${listing.sqm}`}
                  label="Sq. Meters"
                />
                <SpecItem
                  icon={<Package className="w-4 h-4" />}
                  value={listing.furnishing.split(" ")[0]}
                  label="Furnished"
                />
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-[13px] font-bold text-gray-800 mb-3">
                About this unit
              </h2>
              <p className="text-[13px] text-gray-600 leading-[1.75] whitespace-pre-line">
                {listing.description}
              </p>
            </div>

            {/* Amenities */}
            {listing.amenities.length > 0 && (
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
                <h2 className="text-[13px] font-bold text-gray-800 mb-3.5">
                  Amenities
                </h2>
                <div className="grid grid-cols-2 gap-2.5">
                  {listing.amenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-2.5 rounded-xl border border-gray-100 bg-gray-50/60 px-3.5 py-2.5"
                    >
                      <span
                        className="text-[#1B2B6B]/50"
                        aria-hidden="true"
                      >
                        {AMENITY_ICONS[amenity.icon]}
                      </span>
                      <span className="text-[12px] font-medium text-gray-700">
                        {amenity.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Map placeholder */}
            <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <h2 className="text-[13px] font-bold text-gray-800 mb-3">
                Location
              </h2>
              <MapPlaceholder location={listing.location} />
            </div>
          </div>

          {/* RIGHT: Landlord card (sticky on desktop) ─────── */}
          <div className="lg:sticky lg:top-4">
            <LandlordCard landlord={listing.landlord} />
          </div>
        </div>
      </div>
    </>
  );
}

// ── Spec Item ──────────────────────────────────────────────────────────────────

function SpecItem({
  icon,
  value,
  label,
}: {
  icon: React.ReactNode;
  value: string;
  label: string;
}) {
  return (
    <div className="flex flex-col items-center gap-1.5 px-2 py-4 flex-1 min-w-0">
      <div className="text-gray-400" aria-hidden="true">
        {icon}
      </div>
      <span className="text-[15px] font-black text-gray-900 leading-none text-center tabular-nums">
        {value}
      </span>
      <span className="text-[9.5px] font-semibold text-gray-400 uppercase tracking-wider text-center">
        {label}
      </span>
    </div>
  );
}

// ── Photo Gallery ──────────────────────────────────────────────────────────────

function PhotoGallery({
  images,
  title,
  onOpenLightbox,
}: {
  images: string[];
  title: string;
  onOpenLightbox: (index: number) => void;
}) {
  const gridImages = images.slice(1, 5);

  return (
    <div>
      {/* Desktop: hero + 2×2 grid */}
      <div className="hidden md:grid md:grid-cols-[1.15fr_0.85fr] gap-1.5 rounded-2xl overflow-hidden h-[340px] lg:h-[400px]">
        <button
          onClick={() => onOpenLightbox(0)}
          className="relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-inset focus-visible:outline-none"
          aria-label="View main photo"
        >
          <Image
            src={images[0]}
            alt={`${title} — main photo`}
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(max-width: 1280px) 55vw, 680px"
          />
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
          {/* Verified badge */}
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
            <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="text-[9.5px] font-black tracking-[0.18em] text-gray-700 uppercase">
              Verified Apartment
            </span>
          </div>
        </button>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
          {gridImages.map((src, i) => (
            <button
              key={i}
              onClick={() => onOpenLightbox(i + 1)}
              className="relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-inset focus-visible:outline-none"
              aria-label={`View photo ${i + 2}`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${i + 2}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1280px) 20vw, 240px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
              {i === gridImages.length - 1 && (
                <div className="absolute bottom-2.5 right-2.5 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-lg px-2 py-1 shadow-md pointer-events-none">
                  <LayoutGrid className="w-3 h-3 text-gray-700" />
                  <span className="text-[9.5px] font-bold text-gray-700 whitespace-nowrap">
                    Show all
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: single hero + counter */}
      <div className="md:hidden relative h-[220px] sm:h-[280px] rounded-xl overflow-hidden">
        <button
          onClick={() => onOpenLightbox(0)}
          className="absolute inset-0 group cursor-pointer"
          aria-label="View all photos"
        >
          <Image
            src={images[0]}
            alt={`${title} — main photo`}
            fill
            priority
            quality={85}
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
            <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="text-[8.5px] font-black tracking-[0.14em] text-gray-700 uppercase">
              Verified
            </span>
          </div>
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-md px-2.5 py-1.5">
            <LayoutGrid className="w-3 h-3 text-white/80 shrink-0" />
            <span className="text-[9.5px] font-bold text-white">
              1 / {images.length} photos
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

// ── Lightbox ───────────────────────────────────────────────────────────────────

function Lightbox({
  images,
  title,
  initialIndex,
  onClose,
}: {
  images: string[];
  title: string;
  initialIndex: number;
  onClose: () => void;
}) {
  const [current, setCurrent] = useState(initialIndex);

  const prev = useCallback(
    () => setCurrent((i) => (i - 1 + images.length) % images.length),
    [images.length]
  );
  const next = useCallback(
    () => setCurrent((i) => (i + 1) % images.length),
    [images.length]
  );

  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") prev();
      if (e.key === "ArrowRight") next();
    };
    window.addEventListener("keydown", handleKey);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKey);
    };
  }, [onClose, prev, next]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/96 flex flex-col items-center justify-center"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label="Photo gallery"
    >
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between px-4 sm:px-6 py-4 z-10">
        <span className="text-white/60 text-sm font-medium tabular-nums">
          {current + 1} / {images.length}
        </span>
        <button
          onClick={onClose}
          aria-label="Close gallery"
          className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
        >
          <X className="w-4 h-4 text-white" />
        </button>
      </div>

      {/* Image */}
      <div
        className="relative w-full max-w-5xl px-12 sm:px-16"
        style={{ maxHeight: "78vh", aspectRatio: "3/2" }}
        onClick={(e) => e.stopPropagation()}
      >
        <Image
          src={images[current]}
          alt={`${title} — photo ${current + 1}`}
          fill
          quality={90}
          className="object-contain"
          sizes="(max-width: 1024px) 90vw, 900px"
        />
      </div>

      {/* Prev / Next */}
      {images.length > 1 && (
        <>
          <button
            onClick={(e) => { e.stopPropagation(); prev(); }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); next(); }}
            aria-label="Next photo"
            className="absolute right-3 sm:right-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <ChevronRight className="w-5 h-5 text-white" />
          </button>
        </>
      )}

      {/* Thumbnail strip */}
      <div
        className="absolute bottom-4 left-0 right-0 flex justify-center gap-2 px-4 overflow-x-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {images.map((src, i) => (
          <button
            key={i}
            onClick={() => setCurrent(i)}
            aria-label={`Go to photo ${i + 1}`}
            className={[
              "relative shrink-0 w-14 h-9 rounded-md overflow-hidden border-2 transition-all duration-150 cursor-pointer",
              i === current
                ? "border-white opacity-100 shadow-lg"
                : "border-transparent opacity-40 hover:opacity-70",
            ].join(" ")}
          >
            <Image src={src} alt={`Thumbnail ${i + 1}`} fill className="object-cover" sizes="56px" />
          </button>
        ))}
      </div>
    </div>
  );
}

// ── Map Placeholder ────────────────────────────────────────────────────────────

function MapPlaceholder({ location }: { location: string }) {
  const label = location.split(",")[0];
  const sublabel = location.split(",").slice(1).join(",").trim();

  return (
    <div className="relative h-52 sm:h-60 rounded-xl overflow-hidden border border-gray-100">
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #cde8c8 0%, #bcd8b4 40%, #aecba0 100%)" }}
      />
      <svg className="absolute inset-0 w-full h-full" preserveAspectRatio="none" aria-hidden="true">
        <rect x="0" y="43%" width="100%" height="3.5%" fill="#ede8cc" />
        <rect x="43%" y="0" width="4%" height="100%" fill="#ede8cc" />
        <rect x="0" y="67%" width="100%" height="1.8%" fill="#ede8cc" opacity="0.7" />
        <rect x="0" y="22%" width="65%" height="1.8%" fill="#ede8cc" opacity="0.5" />
        <rect x="22%" y="0" width="2%" height="43%" fill="#ede8cc" opacity="0.5" />
        <rect x="70%" y="0" width="2%" height="100%" fill="#ede8cc" opacity="0.5" />
        <rect x="5%" y="28%" width="15%" height="12%" rx="3" fill="#b0cc9c" opacity="0.65" />
        <rect x="26%" y="5%" width="15%" height="16%" rx="3" fill="#b0cc9c" opacity="0.55" />
        <rect x="50%" y="50%" width="18%" height="14%" rx="3" fill="#b0cc9c" opacity="0.65" />
        <rect x="50%" y="5%" width="18%" height="13%" rx="3" fill="#b0cc9c" opacity="0.45" />
      </svg>
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center drop-shadow-lg">
        <div
          className="w-9 h-9 rounded-full border-2 border-white shadow-xl flex items-center justify-center"
          style={{ background: "#1B2B6B" }}
        >
          <MapPin className="w-4 h-4 text-white" />
        </div>
        <div className="w-2 h-2 rounded-full -mt-0.5 shadow-sm" style={{ background: "#1B2B6B" }} />
      </div>
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl px-3.5 py-2 shadow-md text-center whitespace-nowrap max-w-[80%]">
        <p className="text-xs font-bold text-gray-900 truncate">{label}</p>
        {sublabel && (
          <p className="text-[10px] text-gray-500 mt-0.5 truncate">{sublabel}</p>
        )}
      </div>
      <a
        href={`https://www.google.com/maps/search/${encodeURIComponent(location)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-2.5 right-2.5 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-sm text-[11px] font-semibold text-gray-700 hover:text-[#1B2B6B] hover:shadow-md transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        Open in Maps
      </a>
    </div>
  );
}

// ── Landlord Card ──────────────────────────────────────────────────────────────

function LandlordCard({ landlord }: { landlord: ListingDetail["landlord"] }) {
  return (
    <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
      <div className="p-5 flex flex-col gap-4">
        {/* Avatar + name + rating */}
        <div className="flex items-start gap-3">
          <div className="relative w-12 h-12 rounded-full overflow-hidden shrink-0 ring-2 ring-emerald-400/40">
            <Image
              src={landlord.avatar}
              alt={landlord.name}
              fill
              className="object-cover"
              sizes="48px"
            />
            <div className="absolute bottom-0 right-0 w-3 h-3 bg-emerald-500 rounded-full border-2 border-white" />
          </div>
          <div className="flex-1 min-w-0">
            <p className="font-bold text-gray-900 text-sm leading-snug truncate">
              {landlord.name}
            </p>
            <div className="flex items-center gap-1 mt-0.5">
              <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
              <span className="text-[11px] text-emerald-600 font-semibold">
                {landlord.title}
              </span>
            </div>
          </div>
          <div className="flex flex-col items-end shrink-0">
            <div className="flex items-center gap-0.5">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span className="text-sm font-black text-gray-900">
                {landlord.rating.toFixed(1)}
              </span>
            </div>
            <span className="text-[10px] text-gray-400 tabular-nums">
              {landlord.reviewCount} reviews
            </span>
          </div>
        </div>

        <div className="h-px bg-gray-100" />

        {/* Stats */}
        <div className="flex flex-col gap-2.5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Clock className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs">Response Time</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">
              {landlord.responseTime}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-gray-500">
              <Calendar className="w-3.5 h-3.5 shrink-0" />
              <span className="text-xs">Member Since</span>
            </div>
            <span className="text-xs font-semibold text-gray-900">
              {landlord.memberSince}
            </span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col gap-2 pt-1">
          <button
            className="w-full text-white rounded-xl py-3 text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:opacity-90 transition-opacity active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-2 focus-visible:outline-none"
            style={{ background: "#1B2B6B" }}
          >
            <MessageCircle className="w-4 h-4" />
            Message Verified Landlord
          </button>
          <button className="w-full bg-white text-gray-700 border border-gray-200 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:border-[#1B2B6B]/40 hover:text-[#1B2B6B] transition-colors active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-[#1B2B6B] focus-visible:ring-offset-2 focus-visible:outline-none">
            <Eye className="w-4 h-4" />
            Request Virtual Viewing
          </button>
        </div>
      </div>

      {/* Safety tip */}
      <div className="border-t border-gray-100 p-4" style={{ background: "rgba(27,43,107,0.03)" }}>
        <div className="flex items-start gap-2.5">
          <div
            className="w-7 h-7 rounded-full flex items-center justify-center shrink-0 mt-0.5"
            style={{ background: "rgba(27,43,107,0.1)" }}
          >
            <Shield className="w-3.5 h-3.5" style={{ color: "#1B2B6B" }} />
          </div>
          <div>
            <p className="text-xs font-bold mb-0.5" style={{ color: "#1B2B6B" }}>
              PuyoTa Safety Tip
            </p>
            <p className="text-[11px] text-gray-600 leading-relaxed">
              Never pay before viewing. All PuyoTa Verified listings have been
              physically visited by our team.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
