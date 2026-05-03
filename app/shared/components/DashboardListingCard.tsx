import React, { useState } from 'react'
import { SavedListing } from '../types';
import { BadgeCheck, Bookmark, MapPin } from 'lucide-react';
import Image from 'next/image';

function DashboardListingCard({
  listing,
  onViewDetail,
}: {
  listing: SavedListing;
  onViewDetail?: (id: number) => void;
}) {
  const [saved, setSaved] = useState(true);
  const [popped, setPopped] = useState(false);

  const handleSaveToggle = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setSaved((v) => !v);
    setPopped(true);
    setTimeout(() => setPopped(false), 300);
  };

  return (
    <article
      className="group bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/70 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 cursor-pointer"
      onClick={() => onViewDetail?.(listing.id)}
      role="button"
      tabIndex={0}
      aria-label={`View details for ${listing.title}`}
      onKeyDown={(e) => e.key === "Enter" && onViewDetail?.(listing.id)}
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={listing.image}
          alt={listing.title}
          fill
          className="object-cover transition-transform duration-500 ease-out group-hover:scale-[1.05]"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 280px"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

        {/* Verified badge */}
        <div className="absolute top-2.5 left-2.5 flex items-center gap-1 rounded-md px-1.5 py-[4px]" style={{ background: "#1B2B6B" }}>
          <BadgeCheck className="w-2.5 h-2.5 text-white shrink-0" />
          <span className="text-[8.5px] font-bold tracking-[0.14em] text-white uppercase">
            PuyoTa Verified
          </span>
        </div>

        {/* Bookmark */}
        <button
          onClick={handleSaveToggle}
          aria-label={saved ? "Remove from saved" : "Save listing"}
          className={[
            "absolute top-2.5 right-2.5 w-6 h-6 rounded-lg",
            "flex items-center justify-center cursor-pointer",
            "bg-white/90 backdrop-blur-sm shadow-sm",
            "transition-all duration-200",
            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]",
            popped ? "scale-125" : "scale-100",
          ].join(" ")}
        >
          <Bookmark
            className={[
              "w-3 h-3 transition-all duration-200",
              saved ? "fill-[#1B2B6B] text-[#1B2B6B]" : "text-gray-400",
            ].join(" ")}
          />
        </button>
      </div>

      {/* Body */}
      <div className="p-3">
        {/* Tags + price */}
        <div className="flex items-center gap-1.5 flex-wrap mb-1.5">
          {listing.tags?.map((tag) => (
            <span
              key={tag}
              className="text-[8.5px] font-bold tracking-[0.12em] uppercase text-gray-500 bg-gray-100 rounded px-1.5 py-[2px]"
            >
              {tag}
            </span>
          ))}
          <span className="ml-auto text-[13px] font-black text-gray-900 tabular-nums leading-none">
            ₱{listing.price.toLocaleString()}
            <span className="text-[9.5px] font-normal text-gray-400">/mo</span>
          </span>
        </div>

        <h3 className="text-[12.5px] font-semibold text-gray-800 leading-snug group-hover:text-[#1B2B6B] transition-colors duration-200">
          {listing.title}
        </h3>

        <div className="flex items-center gap-1 mt-1.5">
          <MapPin className="w-3 h-3 text-gray-400 shrink-0" aria-hidden="true" />
          <span className="text-[10.5px] text-gray-400 truncate">{listing.location}</span>
        </div>
      </div>
    </article>
  );
}

export default DashboardListingCard