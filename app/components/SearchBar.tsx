"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import { MapPin, ChevronDown, Search, Building2, Banknote } from "lucide-react";

type ActiveField = "location" | "budget" | "type" | null;

const LOCATIONS = [
  "IT Park, Ayala",
  "Cebu Business Park",
  "Mactan Island",
  "Banawa District",
  "USC AS Fortuna",
  "SM City Cebu",
  "Mabolo, Cebu City",
];

const BUDGET_RANGES = [
  "₱3k – ₱6k",
  "₱5k – ₱15k",
  "₱10k – ₱25k",
  "₱20k – ₱40k",
  "₱40k+",
];

const LIVING_TYPES = [
  "Studio Apartment",
  "1BR Unit",
  "2BR Unit",
  "Bedspace",
  "Co-Living",
];

/* ─── shared dropdown shadow ─────────────────────────────── */
const SHADOW =
  "0 20px 60px rgba(0,0,0,0.22), 0 4px 16px rgba(0,0,0,0.10)";

interface FieldButtonProps {
  icon: React.ReactNode;
  label: string;
  value: string;
  active: boolean;
  onClick: () => void;
  roundedClass?: string;
}
function FieldButton({
  icon,
  label,
  value,
  active,
  onClick,
  roundedClass = "",
}: FieldButtonProps) {
  return (
    <button
      type="button"
      aria-haspopup="listbox"
      aria-expanded={active}
      onClick={onClick}
      className={[
        "group flex items-center gap-3 w-full text-left",
        "px-4 py-4 md:px-3 md:py-4 transition-colors duration-150 cursor-pointer",
        active ? "bg-blue-50/80" : "hover:bg-gray-50/70 active:bg-gray-100/80",
        roundedClass,
      ].join(" ")}
    >
      <span
        className={[
          "w-9 h-9 rounded-lg flex items-center justify-center shrink-0",
          "transition-all duration-150",
          active
            ? "bg-navy text-white shadow-md"
            : "bg-gray-100 text-gray-500 group-hover:bg-navy/10 group-hover:text-navy",
        ].join(" ")}
      >
        {icon}
      </span>

      <span className="min-w-0 flex-1 overflow-hidden">
        <span className="block text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 leading-none mb-1">
          {label}
        </span>
        <span className="block text-[13px] font-semibold text-gray-900 truncate">
          {value}
        </span>
      </span>

      <ChevronDown
        className={[
          "w-3.5 h-3.5 text-gray-400 shrink-0 transition-transform duration-200",
          active ? "rotate-180 text-navy" : "",
        ].join(" ")}
      />
    </button>
  );
}

/* ─── dropdown panel ─────────────────────────────────────── */
interface DropdownProps {
  heading: string;
  items: string[];
  selected: string;
  icon?: React.ReactNode;
  onSelect: (v: string) => void;
  className?: string;
}
function Dropdown({
  heading,
  items,
  selected,
  icon,
  onSelect,
  className = "",
}: DropdownProps) {
  return (
    <div
      role="listbox"
      aria-label={heading}
      className={[
        "absolute top-full mt-2 bg-white/95 backdrop-blur-xl",
        "rounded-2xl border border-gray-100/80 p-1.5 z-50",
        className,
      ].join(" ")}
      style={{ boxShadow: SHADOW }}
    >
      <p className="text-[9px] font-black uppercase tracking-[0.18em] text-gray-400 px-3 pt-2.5 pb-1.5">
        {heading}
      </p>
      {items.map((item) => {
        const active = selected === item;
        return (
          <button
            key={item}
            type="button"
            role="option"
            aria-selected={active}
            onClick={() => onSelect(item)}
            className={[
              "w-full flex items-center gap-2.5 px-3 py-2.5 rounded-xl text-left",
              "text-[13px] font-medium transition-all duration-100",
              "active:scale-[0.98]",
              active
                ? "bg-navy text-white shadow-sm"
                : "text-gray-800 hover:bg-gray-50 hover:text-gray-900",
            ].join(" ")}
          >
            {icon && (
              <span className="shrink-0 opacity-60">{icon}</span>
            )}
            {item}
          </button>
        );
      })}
    </div>
  );
}

/* ─── SearchBar ──────────────────────────────────────────── */
export default function SearchBar() {
  const [location, setLocation] = useState("IT Park, Ayala");
  const [budget, setBudget] = useState("₱5k – ₱15k");
  const [livingType, setLivingType] = useState("Studio Apartment");
  const [activeField, setActiveField] = useState<ActiveField>(null);
  const [isSearching, setIsSearching] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!containerRef.current?.contains(e.target as Node))
        setActiveField(null);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveField(null);
    };
    document.addEventListener("keydown", handler);
    return () => document.removeEventListener("keydown", handler);
  }, []);

  const toggle = useCallback(
    (field: ActiveField) =>
      setActiveField((prev) => (prev === field ? null : field)),
    []
  );

  const handleSearch = () => {
    setActiveField(null);
    setIsSearching(true);
    /* simulate async search – replace with real navigation/fetch */
    setTimeout(() => setIsSearching(false), 1200);
    window.location.href = "/listings?" + new URLSearchParams({
      location,
      budget,
      livingType,
    }).toString();
  };

  /* icons */
  const locIcon = <MapPin className="w-4 h-4" />;
  const budgetIcon = <Banknote className="w-[17px] h-[17px]" />;
  const typeIcon = <Building2 className="w-4 h-4" />;

  return (
    <div ref={containerRef} className="relative w-full max-w-5xl px-4 md:px-0">

      {/* ════════════════════════════════════
           MOBILE  – vertical stacked card
          ════════════════════════════════════ */}
      <div
        className="flex flex-col md:hidden rounded-2xl overflow-visible"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.32), 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)",
          border: "1px solid rgba(255,255,255,0.75)",
        }}
      >
        {/* Location */}
        <div className="relative">
          <FieldButton
            icon={locIcon}
            label="Location / Landmark"
            value={location}
            active={activeField === "location"}
            onClick={() => toggle("location")}
            roundedClass="rounded-t-2xl"
          />
          {activeField === "location" && (
            <Dropdown
              heading="Popular Landmarks"
              items={LOCATIONS}
              selected={location}
              icon={<MapPin className="w-3.5 h-3.5" />}
              onSelect={(v) => { setLocation(v); setActiveField(null); }}
              className="left-0 right-0 w-auto"
            />
          )}
        </div>

        <div className="h-px bg-gray-200/80 mx-4" />

        {/* Budget */}
        <div className="relative">
          <FieldButton
            icon={budgetIcon}
            label="Budget Range"
            value={budget}
            active={activeField === "budget"}
            onClick={() => toggle("budget")}
          />
          {activeField === "budget" && (
            <Dropdown
              heading="Monthly Budget"
              items={BUDGET_RANGES}
              selected={budget}
              onSelect={(v) => { setBudget(v); setActiveField(null); }}
              className="left-0 right-0 w-auto"
            />
          )}
        </div>

        <div className="h-px bg-gray-200/80 mx-4" />

        {/* Living Type */}
        <div className="relative">
          <FieldButton
            icon={typeIcon}
            label="Living Type"
            value={livingType}
            active={activeField === "type"}
            onClick={() => toggle("type")}
          />
          {activeField === "type" && (
            <Dropdown
              heading="Unit Type"
              items={LIVING_TYPES}
              selected={livingType}
              onSelect={(v) => { setLivingType(v); setActiveField(null); }}
              className="left-0 right-0 w-auto"
            />
          )}
        </div>

        {/* Search CTA */}
        <div className="p-3 pt-2">
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            className={[
              "w-full h-13 rounded-xl font-bold text-sm text-white",
              "flex items-center justify-center gap-2.5",
              "transition-all duration-200 active:scale-[0.98] select-none",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2",
              isSearching ? "opacity-80 cursor-not-allowed" : "hover:brightness-110",
            ].join(" ")}
            style={{
              background: "linear-gradient(135deg, #1B2B6B 0%, #2a407f 55%, #1B2B6B 100%)",
              boxShadow: "0 4px 20px rgba(27,43,107,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
              minHeight: 52,
            }}
          >
            {isSearching ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
            ) : (
              <Search className="w-4 h-4 shrink-0" />
            )}
            <span className="leading-none">
              {isSearching ? "Searching…" : "Find Apartments"}
            </span>
          </button>
        </div>
      </div>

      {/* ════════════════════════════════════
           DESKTOP  – unified horizontal bar
          ════════════════════════════════════ */}
      <div
        className="hidden md:flex items-stretch rounded-2xl"
        style={{
          background: "rgba(255,255,255,0.92)",
          backdropFilter: "blur(20px) saturate(180%)",
          WebkitBackdropFilter: "blur(20px) saturate(180%)",
          boxShadow:
            "0 32px 80px rgba(0,0,0,0.32), 0 4px 16px rgba(0,0,0,0.12), inset 0 1px 0 rgba(255,255,255,1)",
          border: "1px solid rgba(255,255,255,0.75)",
        }}
      >
        {/* Location — 2× width */}
        <div className="relative flex-[2] min-w-0">
          <FieldButton
            icon={locIcon}
            label="Location / Landmark"
            value={location}
            active={activeField === "location"}
            onClick={() => toggle("location")}
            roundedClass="rounded-l-2xl h-full"
          />
          {activeField === "location" && (
            <Dropdown
              heading="Popular Landmarks"
              items={LOCATIONS}
              selected={location}
              icon={<MapPin className="w-3.5 h-3.5" />}
              onSelect={(v) => { setLocation(v); setActiveField(null); }}
              className="left-0 w-72"
            />
          )}
        </div>

        <div className="w-px bg-gray-200/80 self-stretch my-4 shrink-0" />

        {/* Budget */}
        <div className="relative flex-[1.5] min-w-0">
          <FieldButton
            icon={budgetIcon}
            label="Budget Range"
            value={budget}
            active={activeField === "budget"}
            onClick={() => toggle("budget")}
            roundedClass="h-full"
          />
          {activeField === "budget" && (
            <Dropdown
              heading="Monthly Budget"
              items={BUDGET_RANGES}
              selected={budget}
              onSelect={(v) => { setBudget(v); setActiveField(null); }}
              className="left-0 w-56"
            />
          )}
        </div>

        <div className="w-px bg-gray-200/80 self-stretch my-4 shrink-0" />

        {/* Living Type */}
        <div className="relative flex-[1.5] min-w-0">
          <FieldButton
            icon={typeIcon}
            label="Living Type"
            value={livingType}
            active={activeField === "type"}
            onClick={() => toggle("type")}
            roundedClass="h-full"
          />
          {activeField === "type" && (
            <Dropdown
              heading="Unit Type"
              items={LIVING_TYPES}
              selected={livingType}
              onSelect={(v) => { setLivingType(v); setActiveField(null); }}
              className="right-0 w-56"
            />
          )}
        </div>

        {/* CTA */}
        <div className="flex items-center p-2.5 shrink-0">
          <button
            type="button"
            onClick={handleSearch}
            disabled={isSearching}
            aria-label="Find Apartments"
            className={[
              "h-full px-7 rounded-xl font-bold text-[13px] text-white",
              "flex items-center gap-2.5 whitespace-nowrap select-none",
              "transition-all duration-200 active:scale-[0.97]",
              "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2 cursor-pointer",
              isSearching ? "opacity-80 cursor-not-allowed" : "hover:brightness-110",
            ].join(" ")}
            style={{
              background: "linear-gradient(135deg, #1B2B6B 0%, #2a407f 55%, #1B2B6B 100%)",
              boxShadow: "0 4px 20px rgba(27,43,107,0.5), inset 0 1px 0 rgba(255,255,255,0.14)",
            }}
          >
            {isSearching ? (
              <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
              </svg>
            ) : (
              <Search className="w-4 h-4 shrink-0" />
            )}
            <span>{isSearching ? "Searching…" : "Find Apartments"}</span>
          </button>
        </div>
      </div>
    </div>
  );
}

