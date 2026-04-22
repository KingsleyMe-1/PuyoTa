"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  LayoutDashboard,
  Bookmark,
  MessageSquare,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
  Search,
  Bell,
  MapPin,
  ChevronRight,
  BadgeCheck,
  Menu,
  X,
  Home,
  ArrowUpRight,
  Sparkles,
} from "lucide-react";

// ── Types ─────────────────────────────────────────────────────────────────────

interface SavedListing {
  id: number;
  title: string;
  price: number;
  location: string;
  image: string;
  tags: string[];
}

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

// ── Mock data ──────────────────────────────────────────────────────────────────

const SAVED_LISTINGS: SavedListing[] = [
  {
    id: 1,
    title: "Skyrise 3 Studio Unit",
    price: 25000,
    location: "200m from IT Park, Cebu City",
    image: "https://picsum.photos/seed/sky3/600/400",
    tags: ["STUDIO", "FURNISHED"],
  },
  {
    id: 2,
    title: "Mivesa Garden Residences",
    price: 18500,
    location: "Lahug, Cebu City",
    image: "https://picsum.photos/seed/mivesa/600/400",
    tags: ["1BR", "POOL VIEW"],
  },
];

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

const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: undefined as number | undefined },
  { id: "saved", label: "Saved Listings", icon: Bookmark, badge: undefined as number | undefined },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
  { id: "verification", label: "Verification", icon: ShieldCheck, badge: undefined as number | undefined },
] as const;

// ── Root Component ─────────────────────────────────────────────────────────────

export default function TenantDashboardClient() {
  const [activeNav, setActiveNav] = useState<string>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const handleNavClick = (id: string) => {
    setActiveNav(id);
    setSidebarOpen(false);
  };

  return (
    <div className="flex h-dvh overflow-hidden" style={{ background: "#EAECF5" }}>
      {/* ── Mobile backdrop ──────────────────────────────── */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-30 lg:hidden backdrop-blur-[3px]"
          onClick={() => setSidebarOpen(false)}
          aria-hidden="true"
        />
      )}

      {/* ── SIDEBAR ─────────────────────────────────────── */}
      <aside
        id="dashboard-sidebar"
        className={[
          "fixed top-0 left-0 h-full z-40 flex flex-col shrink-0",
          "w-[300px]",
          "transition-transform duration-300 ease-out",
          "lg:static lg:translate-x-0 lg:z-auto",
          sidebarOpen ? "translate-x-0" : "-translate-x-full",
        ].join(" ")}
        style={{ background: "#1B2B6B" }}
        aria-label="Dashboard sidebar"
      >
        {/* Subtle geometric accent — top right corner */}
        <div
          className="absolute top-0 right-0 w-24 h-24 opacity-[0.06] pointer-events-none"
          aria-hidden="true"
          style={{
            background: "radial-gradient(circle at top right, white, transparent 70%)",
          }}
        />

        {/* Close button — mobile only */}
        <button
          onClick={() => setSidebarOpen(false)}
          className="lg:hidden absolute top-3.5 right-3.5 w-7 h-7 flex items-center justify-center rounded-lg text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30"
          aria-label="Close sidebar"
        >
          <X className="w-4 h-4" />
        </button>

        {/* Logo */}
        <div className="px-5 pt-6 pb-6">
          <div className="flex items-center gap-2">
            <Image
              src="/PuyoTa-Logo-Icon.png"
              alt="PuyoTa Logo"
              width={32}
              height={32}
              className="rounded object-cover"
            />

            <span className="text-white text-[18px] font-black -ml-1 tracking-tight">
              uyoTa
            </span>
          </div>
          <p
            className="mt-1 text-[8.5px] font-bold tracking-[0.28em] uppercase"
            style={{ color: "rgba(255,255,255,0.3)" }}
          >
            Tenant Dashboard
          </p>
        </div>

        {/* Nav links */}
        <nav
          className="flex-1 px-3 flex flex-col gap-[2px]"
          aria-label="Main navigation"
        >
          {NAV_ITEMS.map(({ id, label, icon: Icon, badge }) => {
            const isActive = activeNav === id;
            return (
              <button
                key={id}
                onClick={() => handleNavClick(id)}
                aria-current={isActive ? "page" : undefined}
                className={[
                  "relative flex items-center gap-3 w-full rounded-[10px] px-3 py-[9px]",
                  "text-[12.5px] font-medium transition-all duration-200 cursor-pointer",
                  "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/30",
                  isActive
                    ? "text-white"
                    : "hover:text-white hover:bg-white/[0.06]",
                ].join(" ")}
                style={
                  isActive
                    ? { background: "rgba(255,255,255,0.12)" }
                    : {}
                }
              >
                {/* Active pill indicator */}
                {isActive && (
                  <span
                    className="absolute left-0 top-[7px] bottom-[7px] w-[3px] rounded-r-full bg-white"
                    aria-hidden="true"
                  />
                )}
                <Icon
                  className="w-[15px] h-[15px] shrink-0"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.45)" }}
                />
                <span
                  className="flex-1 text-left"
                  style={{ color: isActive ? "white" : "rgba(255,255,255,0.5)" }}
                >
                  {label}
                </span>
                {badge !== undefined && (
                  <span
                    className="bg-red-500 text-white text-[9px] font-bold rounded-full min-w-[16px] h-[16px] px-1 flex items-center justify-center"
                    aria-label={`${badge} unread`}
                  >
                    {badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>

        {/* Browse CTA */}
        <div className="px-3 pb-3 pt-4">
          <Link
            href="/listings"
            className="flex items-center justify-center gap-2 w-full bg-white text-[#1B2B6B] text-[12px] font-bold rounded-[10px] py-2.5 transition-all duration-200 hover:bg-white/92 active:scale-[0.98]"
          >
            <Home className="w-3.5 h-3.5" />
            Browse Apartments
          </Link>
        </div>

        {/* Settings & Help */}
        <div
          className="mx-3 pt-3 pb-2 flex flex-col gap-[2px]"
          style={{ borderTop: "1px solid rgba(255,255,255,0.07)" }}
        >
          {[
            { label: "Settings", icon: Settings },
            { label: "Help Center", icon: HelpCircle },
          ].map(({ label, icon: Icon }) => (
            <button
              key={label}
              className="flex items-center gap-3 w-full px-3 py-[9px] rounded-[10px] text-[12.5px] transition-all duration-200 cursor-pointer hover:bg-white/[0.06] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              style={{ color: "rgba(255,255,255,0.38)" }}
            >
              <Icon className="w-[15px] h-[15px] shrink-0" />
              <span>{label}</span>
            </button>
          ))}
        </div>

        {/* User profile card */}
        <div className="px-3 pb-5 pt-1">
          <div
            className="rounded-xl p-2.5 flex items-center gap-2.5"
            style={{ background: "rgba(0,0,0,0.18)" }}
          >
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-[1.5px] ring-white/20">
              <Image
                src="https://picsum.photos/seed/juandc/80/80"
                alt="Juan Dela Cruz"
                fill
                className="object-cover"
                sizes="32px"
              />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11.5px] font-semibold truncate leading-tight">
                Juan Dela Cruz
              </p>
              <div className="flex items-center gap-1 mt-[2px]">
                <BadgeCheck className="w-2.5 h-2.5 text-emerald-400 shrink-0" />
                <span
                  className="text-[8.5px] font-bold tracking-[0.14em] uppercase"
                  style={{ color: "#34d399" }}
                >
                  Verified
                </span>
              </div>
            </div>
            <button
              aria-label="Sign out"
              className="p-1.5 rounded-lg hover:bg-white/10 transition-colors duration-200 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/20"
              style={{ color: "rgba(255,255,255,0.3)" }}
            >
              <LogOut className="w-3 h-3" />
            </button>
          </div>
        </div>
      </aside>

      {/* ── MAIN CONTENT ────────────────────────────────── */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top bar */}
        <header
          className="px-4 sm:px-6 pt-4 pb-3 flex items-center gap-3 shrink-0"
          style={{ background: "#EAECF5" }}
        >
          {/* Mobile hamburger */}
          <button
            onClick={() => setSidebarOpen(true)}
            className="lg:hidden w-9 h-9 flex items-center justify-center rounded-xl bg-white border border-gray-200/70 text-gray-500 hover:text-gray-800 transition-all duration-200 cursor-pointer shrink-0 shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
            aria-label="Open navigation menu"
            aria-expanded={sidebarOpen}
            aria-controls="dashboard-sidebar"
          >
            <Menu className="w-4 h-4" />
          </button>

          {/* Search */}
          <div className="flex-1 max-w-lg relative">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
            <input
              type="search"
              placeholder="Search for apartments in Cebu City..."
              aria-label="Search apartments"
              className="w-full pl-9.5 pr-4 py-2 bg-white rounded-xl text-[12.5px] text-gray-700 placeholder:text-gray-400 border border-gray-200/70 outline-none focus:ring-2 focus:ring-[#1B2B6B]/20 focus:border-[#1B2B6B]/25 transition-all duration-200 shadow-sm"
              style={{ paddingLeft: "2.25rem" }}
            />
          </div>

        </header>

        {/* Scrollable page content */}
        <main
          id="main-content"
          className="flex-1 overflow-y-auto px-4 sm:px-6 pb-8 pt-1"
        >
          {/* ── Welcome + Profile Completion ─────────────── */}
          <div className="mb-5">
            {/* Name row */}
            <div className="flex items-start justify-between gap-4">
              <div>
                <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">
                  Welcome back, Juan.
                </h1>
                <p className="text-[12.5px] text-gray-500 mt-0.5">
                  Here&rsquo;s what&rsquo;s happening with your search today.
                </p>
              </div>
              {/* Inline profile completion pill */}
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
                  <button className="text-[10.5px] font-bold text-[#1B2B6B] hover:underline underline-offset-1 cursor-pointer transition-colors duration-150">
                    Finish setup →
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* ── Stat cards ───────────────────────────────── */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-5">
            {/* STATUS — navy hero card */}
            <div
              className="relative rounded-2xl p-5 overflow-hidden"
              style={{ background: "#1B2B6B" }}
            >
              {/* Decorative ring */}
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
                <p className="text-[34px] font-black text-white leading-none tracking-tight">
                  Verified
                </p>
                <div className="flex items-center gap-1.5 mt-2">
                  <BadgeCheck className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <p className="text-[11px] leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>
                    Priority ranking is on
                  </p>
                </div>
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

          {/* ── Bottom grid: Saved Listings + Messages ───── */}
          <div className="grid grid-cols-1 lg:grid-cols-[1fr_284px] gap-3">
            {/* Recently Saved Listings */}
            <section aria-labelledby="saved-listings-heading">
              <div className="flex items-center justify-between mb-2.5">
                <h2
                  id="saved-listings-heading"
                  className="text-[13px] font-bold text-gray-800"
                >
                  Recently Saved
                </h2>
                <Link
                  href="/listings"
                  className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-[#1B2B6B] hover:underline underline-offset-2 transition-all duration-150"
                >
                  See all
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {SAVED_LISTINGS.map((listing) => (
                  <DashboardListingCard key={listing.id} listing={listing} />
                ))}
              </div>
            </section>

            {/* Recent Messages */}
            <section aria-labelledby="messages-heading">
              <div className="flex items-center justify-between mb-2.5">
                <h2
                  id="messages-heading"
                  className="text-[13px] font-bold text-gray-800"
                >
                  Messages
                </h2>
                <Link
                  href="/dashboard/messages"
                  className="inline-flex items-center gap-0.5 text-[11.5px] font-semibold text-[#1B2B6B] hover:underline underline-offset-2 transition-all duration-150"
                >
                  View all
                  <ArrowUpRight className="w-3 h-3" aria-hidden="true" />
                </Link>
              </div>
              <div className="bg-white rounded-2xl shadow-sm border border-gray-100/70 overflow-hidden">
                <ul role="list">
                  {MESSAGES.map((msg, i) => (
                    <li key={msg.id}>
                      <button
                        className={[
                          "flex items-center gap-3 w-full px-4 py-3 text-left cursor-pointer",
                          "hover:bg-gray-50/70 transition-colors duration-150",
                          "focus-visible:outline-none focus-visible:bg-gray-50",
                          i < MESSAGES.length - 1 ? "border-b border-gray-100/80" : "",
                        ].join(" ")}
                        aria-label={`Message from ${msg.name}: ${msg.fullPreview}${msg.unread ? " (unread)" : ""}`}
                      >
                        {/* Colored initial avatar */}
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center shrink-0 text-[11px] font-bold"
                          style={{
                            background: msg.color,
                            color: "#374151",
                          }}
                          aria-hidden="true"
                        >
                          {msg.initials}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[12px] font-semibold text-gray-800 truncate">
                              {msg.name}
                            </span>
                            <span className="text-[9.5px] text-gray-400 shrink-0 tabular-nums">
                              {msg.time}
                            </span>
                          </div>
                          <p className="text-[11px] text-gray-400 truncate mt-[1px] leading-snug">
                            {msg.preview}
                          </p>
                        </div>
                        {msg.unread && (
                          <span
                            className="w-[7px] h-[7px] bg-[#1B2B6B] rounded-full shrink-0"
                            aria-hidden="true"
                          />
                        )}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            </section>
          </div>
        </main>
      </div>
    </div>
  );
}

// ── Dashboard Listing Card ────────────────────────────────────────────────────

function DashboardListingCard({ listing }: { listing: SavedListing }) {
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
    <Link
      href={`/listings/${listing.id}`}
      className="group block bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100/70 hover:shadow-md hover:-translate-y-0.5 transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/30"
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
          {listing.tags.map((tag) => (
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
    </Link>
  );
}
