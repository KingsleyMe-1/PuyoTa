"use client";

import { useState, useEffect, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Share2,
  Heart,
  MapPin,
  X,
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
} from "lucide-react";
import type { ListingDetail } from "../page";

/* ─── Amenity icon mapping ───────────────────────────────── */
const AMENITY_ICONS: Record<string, React.ReactNode> = {
  wifi: <Wifi className="w-4 h-4" />,
  wind: <Wind className="w-4 h-4" />,
  waves: <Waves className="w-4 h-4" />,
  dumbbell: <Dumbbell className="w-4 h-4" />,
  shield: <Shield className="w-4 h-4" />,
};

/* ─── Spec Item ──────────────────────────────────────────── */
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
    <div className="flex flex-col items-center gap-2 px-2 py-5 flex-1 min-w-0">
      <div className="text-gray-400">{icon}</div>
      <span className="text-sm sm:text-base font-bold text-gray-900 leading-none text-center">
        {value}
      </span>
      <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-wider text-center">
        {label}
      </span>
    </div>
  );
}

/* ─── Photo Gallery ──────────────────────────────────────── */
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
      {/* Desktop: large hero + 2×2 grid */}
      <div className="hidden md:grid md:grid-cols-[1.15fr_0.85fr] gap-1.5 rounded-2xl overflow-hidden h-[400px] lg:h-[460px]">
        {/* Large hero */}
        <button
          onClick={() => onOpenLightbox(0)}
          className="relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset focus-visible:outline-none"
          aria-label="View photo 1"
        >
          <Image
            src={images[0]}
            alt={`${title} — main photo`}
            fill
            priority
            quality={90}
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.025]"
            sizes="(max-width: 1280px) 58vw, 720px"
          />
          {/* Verified badge */}
          <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md">
            <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
            <span className="text-[10px] font-black tracking-[0.2em] text-gray-700 uppercase">
              PuyoTa Verified
            </span>
          </div>
          {/* Hover zoom hint */}
          <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300 pointer-events-none" />
        </button>

        {/* 2×2 grid */}
        <div className="grid grid-cols-2 grid-rows-2 gap-1.5">
          {gridImages.map((src, i) => (
            <button
              key={i}
              onClick={() => onOpenLightbox(i + 1)}
              className="relative overflow-hidden group cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-inset focus-visible:outline-none"
              aria-label={`View photo ${i + 2}`}
            >
              <Image
                src={src}
                alt={`${title} — photo ${i + 2}`}
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
                sizes="(max-width: 1280px) 21vw, 260px"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 pointer-events-none" />
              {/* Show all photos — last thumbnail */}
              {i === gridImages.length - 1 && (
                <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-2.5 py-1.5 shadow-md pointer-events-none">
                  <LayoutGrid className="w-3 h-3 text-gray-700" />
                  <span className="text-[10px] font-bold text-gray-700 whitespace-nowrap">
                    Show all
                  </span>
                </div>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Mobile: single hero + counter */}
      <div className="md:hidden relative h-[240px] sm:h-[300px] rounded-xl overflow-hidden">
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
          {/* Verified badge */}
          <div className="absolute top-3 left-3 flex items-center gap-1 bg-white/95 backdrop-blur-sm rounded-md px-2 py-1 shadow-sm">
            <BadgeCheck className="w-3 h-3 text-emerald-500 shrink-0" />
            <span className="text-[9px] font-black tracking-[0.16em] text-gray-700 uppercase">
              PuyoTa Verified
            </span>
          </div>
          {/* Photo counter */}
          <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/50 backdrop-blur-sm rounded-md px-2.5 py-1.5">
            <LayoutGrid className="w-3 h-3 text-white/80 shrink-0" />
            <span className="text-[10px] font-bold text-white">
              1 / {images.length} photos
            </span>
          </div>
        </button>
      </div>
    </div>
  );
}

/* ─── Lightbox Modal ─────────────────────────────────────── */
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
      {/* Header bar */}
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

      {/* Image container */}
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
            onClick={(e) => {
              e.stopPropagation();
              prev();
            }}
            aria-label="Previous photo"
            className="absolute left-3 sm:left-5 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/10 hover:bg-white/25 flex items-center justify-center transition-colors cursor-pointer focus-visible:ring-2 focus-visible:ring-white focus-visible:outline-none"
          >
            <ChevronLeft className="w-5 h-5 text-white" />
          </button>
          <button
            onClick={(e) => {
              e.stopPropagation();
              next();
            }}
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
            <Image
              src={src}
              alt={`Thumbnail ${i + 1}`}
              fill
              className="object-cover"
              sizes="56px"
            />
          </button>
        ))}
      </div>
    </div>
  );
}

/* ─── Map Placeholder ────────────────────────────────────── */
function MapPlaceholder({ location }: { location: string }) {
  const label = location.split(",")[0];
  const sublabel = location.split(",").slice(1).join(",").trim();

  return (
    <div className="relative h-60 sm:h-72 rounded-2xl overflow-hidden border border-gray-100">
      {/* Map-style background */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(160deg, #cde8c8 0%, #bcd8b4 40%, #aecba0 100%)" }}
      />
      {/* Road grid (SVG) */}
      <svg
        className="absolute inset-0 w-full h-full"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        {/* Major horizontal */}
        <rect x="0" y="43%" width="100%" height="3.5%" fill="#ede8cc" />
        {/* Major vertical */}
        <rect x="43%" y="0" width="4%" height="100%" fill="#ede8cc" />
        {/* Minor roads */}
        <rect x="0" y="67%" width="100%" height="1.8%" fill="#ede8cc" opacity="0.7" />
        <rect x="0" y="22%" width="65%" height="1.8%" fill="#ede8cc" opacity="0.5" />
        <rect x="22%" y="0" width="2%" height="43%" fill="#ede8cc" opacity="0.5" />
        <rect x="70%" y="0" width="2%" height="100%" fill="#ede8cc" opacity="0.5" />
        <rect x="83%" y="43%" width="2%" height="100%" fill="#ede8cc" opacity="0.4" />
        {/* Building blocks */}
        <rect x="5%" y="28%" width="15%" height="12%" rx="3" fill="#b0cc9c" opacity="0.65" />
        <rect x="26%" y="5%" width="15%" height="16%" rx="3" fill="#b0cc9c" opacity="0.55" />
        <rect x="50%" y="50%" width="18%" height="14%" rx="3" fill="#b0cc9c" opacity="0.65" />
        <rect x="50%" y="5%" width="18%" height="13%" rx="3" fill="#b0cc9c" opacity="0.45" />
        <rect x="74%" y="50%" width="13%" height="13%" rx="3" fill="#b0cc9c" opacity="0.55" />
        <rect x="5%" y="72%" width="35%" height="10%" rx="3" fill="#b0cc9c" opacity="0.45" />
      </svg>

      {/* Pin */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-full flex flex-col items-center drop-shadow-lg">
        <div className="w-10 h-10 rounded-full bg-navy border-2 border-white shadow-xl flex items-center justify-center">
          <MapPin className="w-5 h-5 text-white" />
        </div>
        <div className="w-2 h-2 bg-navy rounded-full -mt-0.5 shadow-sm" />
      </div>

      {/* Location label chip */}
      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-sm rounded-xl px-4 py-2 shadow-md text-center whitespace-nowrap max-w-[80%]">
        <p className="text-xs font-bold text-gray-900 truncate">{label}</p>
        {sublabel && (
          <p className="text-[10px] text-gray-500 mt-0.5 truncate">{sublabel}</p>
        )}
      </div>

      {/* Open in Maps */}
      <a
        href={`https://www.google.com/maps/search/${encodeURIComponent(location)}`}
        target="_blank"
        rel="noopener noreferrer"
        className="absolute top-3 right-3 flex items-center gap-1.5 bg-white/95 backdrop-blur-sm rounded-lg px-3 py-1.5 shadow-sm text-xs font-semibold text-gray-700 hover:text-navy hover:shadow-md transition-all"
        onClick={(e) => e.stopPropagation()}
      >
        Open in Maps
      </a>
    </div>
  );
}

/* ─── Landlord Card ──────────────────────────────────────── */
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

        {/* Divider */}
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
          <button className="w-full bg-navy text-white rounded-xl py-3 text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-navy-dark transition-colors active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none">
            <MessageCircle className="w-4 h-4" />
            Message Verified Landlord
          </button>
          <button className="w-full bg-white text-gray-700 border border-gray-200 rounded-xl py-3 text-sm font-semibold flex items-center justify-center gap-2 hover:border-navy/50 hover:text-navy transition-colors active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none">
            <Eye className="w-4 h-4" />
            Request Virtual Viewing
          </button>
        </div>
      </div>

      {/* Safety tip */}
      <div className="border-t border-gray-100 bg-blue-50/70 p-4">
        <div className="flex items-start gap-2.5">
          <div className="w-7 h-7 rounded-full bg-navy/10 flex items-center justify-center shrink-0 mt-0.5">
            <Shield className="w-3.5 h-3.5 text-navy" />
          </div>
          <div>
            <p className="text-xs font-bold text-navy mb-0.5">
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

/* ─── Main Component ─────────────────────────────────────── */
export function ListingDetailClient({
  listing,
}: {
  listing: ListingDetail;
}) {
  const [lightboxOpen, setLightboxOpen] = useState(false);
  const [lightboxIndex, setLightboxIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const [savePop, setSavePop] = useState(false);

  const openLightbox = useCallback((index: number) => {
    setLightboxIndex(index);
    setLightboxOpen(true);
  }, []);

  const handleSave = () => {
    setSaved((v) => !v);
    setSavePop(true);
    setTimeout(() => setSavePop(false), 300);
  };

  const bedLabel =
    listing.beds === 0 ? "Studio" : String(listing.beds);
  const bedUnit =
    listing.beds === 0 ? "" : listing.beds === 1 ? "Bedroom" : "Bedrooms";

  return (
    <>
      {/* Main page */}
      <div className="min-h-screen bg-gray-50 pb-24 lg:pb-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-5 sm:py-6">

          {/* ── Breadcrumb + Actions ── */}
          <div className="flex items-center justify-between gap-4 mb-5 flex-wrap sm:flex-nowrap">
            {/* Breadcrumb */}
            <div className="flex items-center gap-0 text-sm min-w-0 flex-wrap">
              <Link
                href="/listings"
                className="flex items-center gap-1 text-gray-500 hover:text-navy transition-colors mr-2 shrink-0 font-medium"
              >
                <ArrowLeft className="w-3.5 h-3.5" />
                <span>Back</span>
              </Link>
              {listing.breadcrumb.map((crumb) => (
                <span key={crumb.href} className="flex items-center gap-1 shrink-0">
                  <span className="text-gray-300 text-xs mx-1">›</span>
                  <Link
                    href={crumb.href}
                    className="text-gray-500 hover:text-navy transition-colors font-medium"
                  >
                    {crumb.label}
                  </Link>
                </span>
              ))}
              <span className="flex items-center gap-1 min-w-0">
                <span className="text-gray-300 text-xs mx-1">›</span>
                <span className="font-semibold text-gray-900 truncate max-w-[160px] sm:max-w-[280px]">
                  {listing.title}
                </span>
              </span>
            </div>

            {/* Share + Save */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                aria-label="Share listing"
                className="flex items-center gap-1.5 px-3 h-9 rounded-xl border border-gray-200 bg-white text-sm font-semibold text-gray-700 hover:border-navy/60 hover:text-navy transition-colors shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none"
              >
                <Share2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Share</span>
              </button>
              <button
                onClick={handleSave}
                aria-label={saved ? "Remove from saved" : "Save listing"}
                aria-pressed={saved}
                className={[
                  "flex items-center gap-1.5 px-3 h-9 rounded-xl border text-sm font-semibold transition-all shadow-sm cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:outline-none",
                  savePop ? "scale-110" : "scale-100",
                  saved
                    ? "bg-red-50 border-red-200 text-red-500"
                    : "bg-white border-gray-200 text-gray-700 hover:border-red-200 hover:text-red-400",
                ].join(" ")}
              >
                <Heart
                  className={[
                    "w-3.5 h-3.5 transition-all duration-200",
                    saved ? "fill-red-500 text-red-500" : "",
                  ].join(" ")}
                />
                <span className="hidden sm:inline">{saved ? "Saved" : "Save"}</span>
              </button>
            </div>
          </div>

          {/* ── Gallery ── */}
          <div className="mb-6">
            <PhotoGallery
              images={listing.images}
              title={listing.title}
              onOpenLightbox={openLightbox}
            />
          </div>

          {/* ── Two-column layout ── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_360px] gap-6 lg:gap-8 items-start">

            {/* LEFT: Main content */}
            <div className="flex flex-col gap-4 min-w-0">

              {/* Title + Price card */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="min-w-0">
                    <p className="text-[10px] font-black uppercase tracking-[0.22em] text-gray-400 mb-2">
                      {listing.title} &nbsp;·&nbsp; {listing.unit}
                    </p>
                    <div className="flex items-center gap-1.5 text-gray-500">
                      <MapPin className="w-3.5 h-3.5 shrink-0 text-navy/50" />
                      <span className="text-sm">{listing.location}</span>
                    </div>
                  </div>
                  <div className="sm:text-right shrink-0">
                    <div className="text-2xl sm:text-3xl font-black text-navy tracking-tight leading-none tabular-nums">
                      ₱{listing.price.toLocaleString()}
                    </div>
                    <div className="text-xs text-gray-400 font-medium mt-0.5">
                      / month
                    </div>
                    {listing.priceSuffix && (
                      <div className="inline-flex mt-1.5 items-center bg-emerald-50 text-emerald-700 rounded-md px-2 py-0.5">
                        <span className="text-[10px] font-semibold">
                          {listing.priceSuffix}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              </div>

              {/* Specs bar */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm overflow-hidden">
                <div className="grid grid-cols-4 divide-x divide-gray-100">
                  <SpecItem
                    icon={<Maximize2 className="w-4 h-4" />}
                    value={String(listing.sqm)}
                    label="SQM"
                  />
                  <SpecItem
                    icon={<BedDouble className="w-4 h-4" />}
                    value={bedLabel}
                    label={bedUnit || "Studio"}
                  />
                  <SpecItem
                    icon={<Bath className="w-4 h-4" />}
                    value={String(listing.baths)}
                    label={listing.baths === 1 ? "Bathroom" : "Bathrooms"}
                  />
                  <SpecItem
                    icon={<Package className="w-4 h-4" />}
                    value={listing.furnishing.split(" ")[0]}
                    label="Furnished"
                  />
                </div>
              </div>

              {/* About */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-bold text-gray-900 mb-3">
                  About this property
                </h2>
                <p className="text-sm text-gray-600 leading-relaxed">
                  {listing.description}
                </p>
              </div>

              {/* Amenities */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Amenities
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.amenities.map((amenity) => (
                    <div
                      key={amenity.name}
                      className="flex items-center gap-2 px-3.5 py-2 rounded-xl bg-gray-50 border border-gray-100 text-sm font-medium text-gray-700"
                    >
                      <span className="text-navy shrink-0">
                        {AMENITY_ICONS[amenity.icon]}
                      </span>
                      {amenity.name}
                    </div>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5 sm:p-6">
                <h2 className="text-base font-bold text-gray-900 mb-4">
                  Location
                </h2>
                <MapPlaceholder location={listing.location} />
              </div>

              {/* Landlord card — mobile only (in flow) */}
              <div className="lg:hidden">
                <LandlordCard landlord={listing.landlord} />
              </div>
            </div>

            {/* RIGHT: Landlord card sticky — desktop only */}
            <div className="hidden lg:block sticky top-24 self-start">
              <LandlordCard landlord={listing.landlord} />
            </div>
          </div>
        </div>

      </div>

      {/* ── Mobile sticky CTA ── */}
      <div className="lg:hidden fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-gray-100 shadow-[0_-4px_20px_rgba(0,0,0,0.08)] px-4 py-3">
        <div className="flex items-center gap-3 max-w-xl mx-auto">
          <div className="min-w-0 shrink-0">
            <div className="text-lg font-black text-navy leading-none tabular-nums">
              ₱{listing.price.toLocaleString()}
            </div>
            <div className="text-[10px] text-gray-400 font-medium mt-0.5">
              per month
            </div>
          </div>
          <button className="flex-1 bg-navy text-white rounded-xl py-3 text-sm font-bold tracking-wide flex items-center justify-center gap-2 hover:bg-navy-dark transition-colors active:scale-[0.98] cursor-pointer focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 focus-visible:outline-none">
            <MessageCircle className="w-4 h-4" />
            Message Landlord
          </button>
        </div>
      </div>

      {/* ── Lightbox ── */}
      {lightboxOpen && (
        <Lightbox
          images={listing.images}
          title={listing.title}
          initialIndex={lightboxIndex}
          onClose={() => setLightboxOpen(false)}
        />
      )}
    </>
  );
}
