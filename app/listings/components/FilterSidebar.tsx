"use client";

import { useState } from "react";
import { MapPin, ChevronDown } from "lucide-react";

const AMENITY_OPTIONS = ["WiFi", "Aircon", "Gym", "Pool"];

const PROPERTY_TYPES = [
  "All Types",
  "Studio",
  "1BR",
  "2BR",
  "3BR+",
  "Bedspace",
  "Co-Living",
];

export interface Filters {
  location: string;
  minPrice: string;
  maxPrice: string;
  propertyType: string;
  amenities: string[];
}

interface FilterSidebarProps {
  onApply: (filters: Filters) => void;
  initialLocation?: string;
}

export function FilterSidebar({ onApply, initialLocation = "" }: FilterSidebarProps) {
  const [location, setLocation] = useState(initialLocation);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [propertyType, setPropertyType] = useState("All Types");
  const [amenities, setAmenities] = useState<string[]>([]);

  const toggleAmenity = (amenity: string) => {
    setAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity]
    );
  };

  const handleApply = () => {
    onApply({ location, minPrice, maxPrice, propertyType, amenities });
  };

  return (
    <aside className="w-full lg:w-64 lg:shrink-0 bg-white rounded-2xl border border-gray-100 shadow-sm p-6 flex flex-col gap-6 h-fit lg:sticky lg:top-24">
      <h2 className="text-base font-bold text-gray-900">Refine Search</h2>

=      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Location
        </label>
        <div className="relative">
          <input
            type="text"
            placeholder="e.g. Cebu IT Park"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm pr-9 focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-gray-400 text-gray-800"
          />
          <MapPin className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

=      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Price Range (Monthly)
        </label>
        <div className="flex items-center gap-2">
          <input
            type="number"
            placeholder="Min"
            value={minPrice}
            onChange={(e) => setMinPrice(e.target.value)}
            min={0}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-gray-400 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
          <span className="text-gray-300 shrink-0 font-light">|</span>
          <input
            type="number"
            placeholder="Max"
            value={maxPrice}
            onChange={(e) => setMaxPrice(e.target.value)}
            min={0}
            className="w-full border border-gray-200 rounded-xl px-3 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors placeholder:text-gray-400 text-gray-800 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
          />
        </div>
      </div>

=      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Property Type
        </label>
        <div className="relative">
          <select
            value={propertyType}
            onChange={(e) => setPropertyType(e.target.value)}
            className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-sm appearance-none focus:outline-none focus:ring-2 focus:ring-navy/20 focus:border-navy transition-colors text-gray-800 bg-white cursor-pointer"
          >
            {PROPERTY_TYPES.map((type) => (
              <option key={type} value={type}>
                {type}
              </option>
            ))}
          </select>
          <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
        </div>
      </div>

=      <div className="flex flex-col gap-2.5">
        <label className="text-xs font-semibold text-gray-500 uppercase tracking-wider">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {AMENITY_OPTIONS.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={[
                "px-3 py-1.5 rounded-full text-xs font-semibold border transition-all duration-150 cursor-pointer",
                amenities.includes(amenity)
                  ? "bg-navy text-white border-navy shadow-sm"
                  : "bg-white text-gray-600 border-gray-200 hover:border-navy/40 hover:text-navy",
              ].join(" ")}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>

=      <button
        onClick={handleApply}
        className="w-full bg-navy text-white rounded-xl py-3 text-sm font-semibold hover:bg-navy-dark transition-colors active:scale-[0.98] cursor-pointer"
      >
        Apply Filters
      </button>
    </aside>
  );
}
