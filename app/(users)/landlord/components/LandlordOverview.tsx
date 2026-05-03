"use client";

import { useRouter } from "next/navigation";
import { ArrowUpRight, BadgeCheck, Bookmark, MessageSquare } from "lucide-react";
import DashboardListingCard from "@/app/shared/components/DashboardListingCard";
import type { SavedListing } from "@/app/shared/types";

// ── Mock Data ──────────────────────────────────────────────────────────────────

const SAVED_LISTINGS: SavedListing[] = [
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
    amenities: ["WiFi", "Aircon", "Gym"],
    savedDaysAgo: 2,
    landlord: "Maria Santos",
    tags: ["STUDIO", "FURNISHED"],
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
    tags: ["1BR", "POOL VIEW"],
  },
];

interface Message {
  id: number;
  name: string;
  initials: string;
  color: string;
  preview: string;
  fullPreview: string;
  time: string;
  unread: boolean;
}

const MESSAGES: Message[] = [
  {
    id: 1,
    name: "Maria Santos",
    initials: "MS",
    color: "#e0e7ff",
    preview: "Is tomorrow at 2 PM okay for you?",
    fullPreview: "Is tomorrow at 2 PM okay for you?",
    time: "2m ago",
    unread: true,
  },
  {
    id: 2,
    name: "Robert Lim",
    initials: "RL",
    color: "#fce7f3",
    preview: "Thank you for the documents!",
    fullPreview: "Thank you for the documents!",
    time: "1h ago",
    unread: false,
  },
  {
    id: 3,
    name: "Ana Reyes",
    initials: "AR",
    color: "#d1fae5",
    preview: "The unit is still available.",
    fullPreview: "The unit is still available.",
    time: "3h ago",
    unread: false,
  },
];

// ── Component ──────────────────────────────────────────────────────────────────

export default function LandlordOverview({ firstName, verificationStatus }: { firstName: string; verificationStatus: string }) {
  const router = useRouter();

  return (
    <>
      {/* ── Welcome header ───────────────────────────── */}
      <div className="mb-5">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">
              Welcome back, {firstName}.
            </h1>
            <p className="text-[12.5px] text-gray-500 mt-0.5">
              Here&rsquo;s what&rsquo;s happening with your listings today.
            </p>
          </div>
          {/* Profile completion pill */}
          <div className="hidden sm:flex items-center gap-2.5 bg-white rounded-xl px-3.5 py-2 shadow-sm border border-gray-100/80 shrink-0">
            <div
              className="relative w-8 h-8 rounded-full shrink-0"
              role="progressbar"
              aria-valuenow={85}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Profile 85% complete"
            >
              <svg className="w-8 h-8 -rotate-90" viewBox="0 0 32 32" aria-hidden="true">
                <circle cx="16" cy="16" r="13" fill="none" stroke="#e5e7eb" strokeWidth="3" />
                <circle
                  cx="16"
                  cy="16"
                  r="13"
                  fill="none"
                  stroke="#1B2B6B"
                  strokeWidth="3"
                  strokeLinecap="round"
                  strokeDasharray={`${2 * Math.PI * 13}`}
                  strokeDashoffset={`${2 * Math.PI * 13 * (1 - 0.85)}`}
                />
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-[8px] font-black text-gray-800">
                85%
              </span>
            </div>
            <div>
              <p className="text-[11px] font-semibold text-gray-700 leading-tight">Profile setup</p>
              <button
                onClick={() => router.push("?view=verification")}
                className="text-[10.5px] font-bold text-[#1B2B6B] hover:underline underline-offset-1 cursor-pointer transition-colors duration-150 focus-visible:outline-none"
              >
                Finish setup →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* ── Stat cards ───────────────────────────────── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
        {/* STATUS */}
        <div
          className="relative rounded-2xl p-5 overflow-hidden"
          style={{ background: "#1B2B6B" }}
        >
          <div
            className="absolute -top-8 -right-8 w-32 h-32 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{ border: "28px solid rgba(255,255,255,0.055)" }}
          />
          <div
            className="absolute -bottom-10 -left-6 w-28 h-28 rounded-full pointer-events-none"
            aria-hidden="true"
            style={{ border: "20px solid rgba(255,255,255,0.04)" }}
          />
          <div className="relative">
            <div className="flex items-center justify-between mb-5">
              <span
                className="text-[9px] font-bold tracking-[0.22em] uppercase"
                style={{ color: "rgba(255,255,255,0.4)" }}
              >
                Account Status
              </span>
              <div className="flex items-center gap-1 bg-emerald-500/20 rounded-md px-1.5 py-[3px]">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" aria-hidden="true" />
                <span className="text-[9px] font-bold text-emerald-300 tracking-[0.12em]">ACTIVE</span>
              </div>
            </div>
            <p className="text-[34px] font-black text-white leading-none tracking-tight">{verificationStatus === "verified" ? "Verified" : "Not Verified"}</p>
            {
              verificationStatus === "verified" && 
              <div className="flex items-center gap-1.5 mt-2">
              <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
              <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                Priority ranking is on
              </p>
            </div>
            }
          </div>
        </div>

        {/* SAVED */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/70">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-[0.22em] text-gray-400 uppercase">
              Saved Listings
            </span>
            <div className="w-7 h-7 rounded-lg bg-[#EEF0F8] flex items-center justify-center">
              <Bookmark className="w-3.5 h-3.5 text-[#1B2B6B]" />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[52px] font-black text-gray-900 leading-none tracking-tight tabular-nums">
                12
              </span>
              <p className="text-[11px] text-gray-400 mt-1.5">apartments saved</p>
            </div>
            <div className="pb-1">
              <div className="flex items-center gap-1 bg-blue-50 rounded-lg px-2 py-1">
                <span className="text-[10px] font-semibold text-blue-600">+3 new</span>
              </div>
            </div>
          </div>
        </div>

        {/* INBOX */}
        <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100/70">
          <div className="flex items-center justify-between mb-4">
            <span className="text-[9px] font-bold tracking-[0.22em] text-gray-400 uppercase">
              Inbox
            </span>
            <div className="relative">
              <div className="w-7 h-7 rounded-lg bg-[#EEF0F8] flex items-center justify-center">
                <MessageSquare className="w-3.5 h-3.5 text-[#1B2B6B]" />
              </div>
              <span
                className="absolute -top-0.5 -right-0.5 w-2 h-2 bg-red-500 rounded-full ring-2 ring-white"
                aria-hidden="true"
              />
            </div>
          </div>
          <div className="flex items-end justify-between">
            <div>
              <span className="text-[52px] font-black text-gray-900 leading-none tracking-tight tabular-nums">
                03
              </span>
              <p className="text-[11px] text-gray-400 mt-1.5">pending replies</p>
            </div>
            <div className="pb-1 max-w-[100px]">
              <p className="text-[10px] text-gray-400 text-right leading-snug">
                Latest: <span className="font-semibold text-gray-600">&ldquo;Viewing for Skyrise&rdquo;</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Bottom grid: Recently Saved + Messages ────── */}
      <div className="grid grid-cols-1 lg:grid-cols-[1fr_284px] gap-3">
        {/* Recently Saved */}
        <section aria-labelledby="saved-listings-heading">
          <div className="flex items-center justify-between mb-2.5">
            <h2 id="saved-listings-heading" className="text-[13px] font-bold text-gray-800">
              Recently Saved
            </h2>
            <button
              onClick={() => router.push("?view=saved")}
              className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-[#1B2B6B] hover:underline underline-offset-2 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20 rounded-sm"
            >
              See all
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {SAVED_LISTINGS.map((listing) => (
              <DashboardListingCard
                key={listing.id}
                listing={listing}
                onViewDetail={() => router.push("?view=saved")}
              />
            ))}
          </div>
        </section>

        {/* Recent Messages */}
        <section aria-labelledby="messages-heading">
          <div className="flex items-center justify-between mb-2.5">
            <h2 id="messages-heading" className="text-[13px] font-bold text-gray-800">
              Messages
            </h2>
            <button
              onClick={() => router.push("?view=messages")}
              className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-[#1B2B6B] hover:underline underline-offset-2 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20 rounded-sm"
            >
              View all
              <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
            </button>
          </div>
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100/70 overflow-hidden">
            <ul role="list">
              {MESSAGES.map((msg, i) => (
                <li key={msg.id}>
                  <button
                    onClick={() => router.push("?view=messages")}
                    className={[
                      "flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer",
                      "hover:bg-gray-50/70 transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:bg-gray-50",
                      i < MESSAGES.length - 1 ? "border-b border-gray-100/80" : "",
                    ].join(" ")}
                    aria-label={`Message from ${msg.name}: ${msg.fullPreview}${msg.unread ? " (unread)" : ""}`}
                  >
                    <div
                      className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                      style={{ background: msg.color, color: "#374151" }}
                      aria-hidden="true"
                    >
                      {msg.initials}
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-[12px] font-semibold text-gray-800 truncate">{msg.name}</span>
                        <span className="text-[9.5px] text-gray-400 shrink-0 tabular-nums">{msg.time}</span>
                      </div>
                      <p className="text-[11px] text-gray-400 truncate mt-[1px] leading-snug">{msg.preview}</p>
                    </div>
                    {msg.unread && (
                      <span className="w-[7px] h-[7px] bg-[#1B2B6B] rounded-full shrink-0" aria-hidden="true" />
                    )}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </section>
      </div>
    </>
  );
}
