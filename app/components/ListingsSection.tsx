"use client";

import { useState } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight, Heart, MapPin } from "lucide-react";

interface Listing {
  id: number;
  title: string;
  price: string;
  location: string;
  tags: string[];
  image: string;
}

const allListings: Listing[] = [
  {
    id: 1,
    title: "Skyline Residences Studio",
    price: "₱18,500",
    location: "Lahug, Cebu City (Near IT Park)",
    tags: ["Studio Unit", "1 Bath", "Fiber WiFi"],
    image: "https://picsum.photos/seed/studio-cebu/600/400",
  },
  {
    id: 2,
    title: "The Solinea Tower 3",
    price: "₱35,000",
    location: "Cebu Business Park",
    tags: ["2BR Unit", "2 Bath", "Pool Access"],
    image: "https://picsum.photos/seed/solinea-tower/600/400",
  },
  {
    id: 3,
    title: "Co-Living Banilad",
    price: "₱7,500",
    location: "Banilad (Near USC/AS Fortuna)",
    tags: ["Bedspace", "Shared Kitchen", "Aircon"],
    image: "https://picsum.photos/seed/coliving-banilad/600/400",
  }
];

const PAGE_SIZE = 3;

function FavoriteButton() {
  const [liked, setLiked] = useState(false);
  return (
    <button
      onClick={() => setLiked((v) => !v)}
      aria-label="Save listing"
      className="w-8 h-8 rounded-full bg-black shadow-md flex items-center justify-center hover:scale-110 transition-transform cursor-pointer"
    >
      <Heart
        className={`w-4 h-4 transition-colors ${liked ? "fill-red-500 text-red-500" : "text-gray-400"}`}
      />
    </button>
  );
}

function ListingCard({ listing }: { listing: Listing }) {
  return (
    <article className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100 flex flex-col">
      <div className="relative h-52 w-full">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute top-3 left-3 flex items-center gap-1.5 bg-black/75 backdrop-blur-sm text-white rounded-full px-3 py-1">
          <div className="w-1.5 h-1.5 rounded-full bg-green-500" />
          <span className="text-xs font-semibold tracking-wide text-green-500">
            Verified
          </span>
        </div>
        
        <div className="absolute top-3 right-3">
          <FavoriteButton />
        </div>
      </div>

      {/* Details */}
      <div className="p-4 flex flex-col flex-1 gap-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-gray-900 text-sm leading-snug">
            {listing.title}
          </h3>
          <span className="text-sm font-bold text-gray-900 shrink-0">
            {listing.price}
          </span>
        </div>

        <div className="flex items-center gap-1.5 text-gray-500">
          <MapPin className="w-3.5 h-3.5 shrink-0" />
          <span className="text-xs leading-tight">{listing.location}</span>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1.5">
          {listing.tags.map((tag) => (
            <span
              key={tag}
              className="text-xs font-medium text-gray-600 bg-gray-100 rounded-full px-3 py-1"
            >
              {tag}
            </span>
          ))}
        </div>

        <button className="mt-auto w-full rounded-xl border border-gray-300 py-2.5 text-sm font-semibold text-gray-900 hover:bg-gray-200 hover:border-gray-400 transition-colors cursor-pointer">
          View Details
        </button>
      </div>
    </article>
  );
}

export default function ListingsSection() {
  const [page, setPage] = useState(0);
  const totalPages = Math.ceil(allListings.length / PAGE_SIZE);
  const visible = allListings.slice(page * PAGE_SIZE, page * PAGE_SIZE + PAGE_SIZE);

  return (
    <section className="bg-listings-bg py-16 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Newest Apartments
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              aria-label="Previous listings"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              aria-label="Next listings"
              className="w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center hover:bg-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-4 h-4 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {visible.map((listing) => (
            <ListingCard key={listing.id} listing={listing} />
          ))}
        </div>
      </div>
    </section>
  );
}
