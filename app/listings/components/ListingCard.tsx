"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  Heart,
  MapPin,
  BedDouble,
  Bath,
  Maximize2,
  Wifi,
  Wind,
  Dumbbell,
  Waves,
  BadgeCheck,
  ArrowUpRight,
} from "lucide-react";

export interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  /** 0 = Studio */
  beds: number;
  baths: number;
  sqm: number;
  amenities: string[];
}

const AMENITY_ICONS: Record<string, React.ReactNode> = {
  WiFi: <Wifi className="w-3.5 h-3.5" />,
  Aircon: <Wind className="w-3.5 h-3.5" />,
  Gym: <Dumbbell className="w-3.5 h-3.5" />,
  Pool: <Waves className="w-3.5 h-3.5" />,
};

const TYPE_COLORS: Record<string, { bg: string; text: string }> = {
  Studio: { bg: "#EEF0F8", text: "#1B2B6B" },
  "1BR": { bg: "#e0e7ff", text: "#3730a3" },
  "2BR": { bg: "#d1fae5", text: "#065f46" },
  "3BR": { bg: "#fef3c7", text: "#92400e" },
};

function getBedType(beds: number): string {
  if (beds === 0) return "Studio";
  return `${beds}BR`;
}

export function ListingCard({
  listing,
  viewMode = "grid",
}: {
  listing: Listing;
  viewMode?: "grid" | "list";
}) {
  const [liked, setLiked] = useState(false);
  const [likePopped, setLikePopped] = useState(false);
  const typeLabel = getBedType(listing.beds);
  const typeColor = TYPE_COLORS[typeLabel] ?? { bg: "#f3f4f6", text: "#6b7280" };

  const handleLike = (e: React.MouseEvent) => {
    e.stopPropagation();
    setLiked((v) => !v);
    setLikePopped(true);
    setTimeout(() => setLikePopped(false), 300);
  };

  const imageArea = (
    <div
      className={[
        "relative overflow-hidden shrink-0",
        viewMode === "list" ? "h-48 w-full sm:h-full sm:w-64" : "h-52 w-full",
      ].join(" ")}
    >
      <Image
        src={listing.image}
        alt={listing.title}
        fill
        className="object-cover transition-transform duration-500 ease-out group-hover:scale-105"
        sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 400px"
      />

      {/* Subtle gradient — just enough to anchor the badges */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-black/10 pointer-events-none" />

      {/* Verified badge — clean, editorial */}
      <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
        <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
        <span className="text-[9px] font-bold tracking-[0.14em] text-gray-600 uppercase">
          Verified
        </span>
      </div>

      {/* Heart */}
      <button
        onClick={handleLike}
        aria-label={liked ? "Remove from saved" : "Save listing"}
        className={[
          "absolute top-3 right-3 w-8 h-8 rounded-full",
          "flex items-center justify-center transition-all duration-200 cursor-pointer",
          "bg-white/95 backdrop-blur-sm shadow-sm hover:shadow-md",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy",
          likePopped ? "scale-125" : "scale-100",
        ].join(" ")}
      >
        <Heart
          className={[
            "w-3.5 h-3.5 transition-all duration-200",
            liked ? "fill-red-500 text-red-500" : "text-gray-400 hover:text-red-400",
          ].join(" ")}
        />
      </button>
    </div>
  );

  const detailsArea = (
    <div className="p-4 flex flex-col flex-1 gap-0 min-w-0">
      {/* Title + Type */}
      <div className="flex items-start justify-between gap-2 mb-1.5">
        <h3 className="font-semibold text-gray-900 text-[13px] leading-snug group-hover:text-navy transition-colors duration-200">
          {listing.title}
        </h3>
        <span
          className="shrink-0 text-[11px] font-black tracking-[0.08em] uppercase rounded-lg px-2.5 py-1 leading-none"
          style={{ background: typeColor.bg, color: typeColor.text }}
        >
          {typeLabel}
        </span>
      </div>

      {/* Location */}
      <div className="flex items-center gap-1 text-gray-400 mb-3">
        <MapPin className="w-3 h-3 shrink-0" />
        <span className="text-[11px] truncate">{listing.location}</span>
      </div>

      {/* Divider */}
      <div className="h-px bg-gray-100 mb-3" />

      {/* Price + specs row */}
      <div className="flex items-end justify-between mb-3">
        <div>
          <div className="text-xl font-black text-navy tracking-tight leading-none">
            ₱{listing.price.toLocaleString()}
          </div>
          <div className="text-[9px] font-semibold uppercase tracking-widest text-gray-400 mt-0.5">
            per month
          </div>
        </div>

        {/* Spec icons — minimal, icon-only with title tooltip */}
        <div className="flex items-center gap-2.5 text-gray-400 pb-0.5">
          <span title={listing.beds === 0 ? "Studio" : `${listing.beds} Bedroom`} className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
            <BedDouble className="w-3.5 h-3.5" />
            {listing.beds === 0 ? "Studio" : `${listing.beds}BR`}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span title={`${listing.baths} Bathroom`} className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
            <Bath className="w-3.5 h-3.5" />
            {listing.baths}
          </span>
          <span className="w-px h-3 bg-gray-200" />
          <span title={`${listing.sqm} sqm`} className="flex items-center gap-1 text-[10px] font-medium text-gray-500">
            <Maximize2 className="w-3.5 h-3.5" />
            {listing.sqm}
          </span>
        </div>
      </div>

      {/* Amenity icons — bare, no pill soup */}
      {listing.amenities.length > 0 && (
        <div className="flex items-center gap-3 mb-4">
          {listing.amenities.slice(0, 4).map((amenity) => (
            <span
              key={amenity}
              title={amenity}
              className="text-gray-400 hover:text-navy transition-colors duration-150 cursor-default"
            >
              {AMENITY_ICONS[amenity]}
            </span>
          ))}
        </div>
      )}

      {/* CTA — solid, decisive */}
      <Link
        href={`/listings/${listing.id}`}
        className={[
          "mt-auto w-full rounded-xl bg-navy text-white py-2.5",
          "text-[12px] font-bold tracking-wide uppercase",
          "flex items-center justify-center gap-1.5 cursor-pointer",
          "hover:bg-navy-dark transition-colors duration-200",
          "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-1",
          "active:scale-[0.98]",
        ].join(" ")}
      >
        View Details
        <ArrowUpRight className="w-3.5 h-3.5" />
      </Link>
    </div>
  );

  if (viewMode === "list") {
    return (
      <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col sm:flex-row hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-navy/20">
        {imageArea}
        {detailsArea}
      </article>
    );
  }

  return (
    <article className="group bg-white rounded-2xl overflow-hidden border border-gray-100 shadow-sm flex flex-col hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-pointer focus-within:ring-2 focus-within:ring-navy/20">
      {imageArea}
      {detailsArea}
    </article>
  );
}

