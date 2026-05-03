"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";

import {
  LayoutDashboard,
  Bookmark,
  MessageSquare,
  ShieldCheck,
  Settings,
  HelpCircle,
  LogOut,
  BadgeCheck,
  X,
  Home,
} from "lucide-react";


// ── Types ─────────────────────────────────────────────────────────────────────

interface Profile {
  fullName: string | null;
  role: "tenant" | "landlord";
  idVerified: boolean;
  avatarUrl: string | null;
  email: string;
}



const NAV_ITEMS = [
  { id: "overview", label: "Overview", icon: LayoutDashboard, badge: undefined as number | undefined },
  { id: "saved", label: "Saved Listings", icon: Bookmark, badge: undefined as number | undefined },
  { id: "messages", label: "Messages", icon: MessageSquare, badge: 3 },
  { id: "verification", label: "Verification", icon: ShieldCheck, badge: undefined as number | undefined },
] as const;

// ── Root Component ─────────────────────────────────────────────────────────────

export default function SidebarNavigation() {
  const router = useRouter();
  const [activeNav, setActiveNav] = useState<string>("overview");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const displayName = "User";
  const initials = "U";

  async function handleSignOut() {
    const supabase = createClient();
    // scope: 'global' invalidates the token server-side so it cannot be reused
    await supabase.auth.signOut({ scope: "global" });
    router.push("/home");
    router.refresh();
  }

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
          <div className="flex items-center gap-3">
            <div className="bg-white rounded-full p-1">
              <Image
                src="/PuyoTa-Logo.png"
                alt="PuyoTa Logo"
                width={40}
                height={40}
                className="rounded object-cover"
              />
            </div>

            <span className="text-white text-[28px] font-black -ml-1 tracking-tight">
              PuyoTa
              <p
                className="text-[8.5px] font-bold tracking-[0.28em] uppercase"
                style={{ color: "rgba(255,255,255,0.3)" }}
              >
                Tenant Dashboard
              </p>
            </span>
          </div>

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
            href="/apartments"
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
            {/* Avatar — Google photo or initials fallback */}
            <div className="relative w-8 h-8 rounded-full overflow-hidden shrink-0 ring-[1.5px] ring-white/20">
  
                <div
                  className="w-full h-full flex items-center justify-center text-[10px] font-bold text-white"
                  style={{ background: "rgba(255,255,255,0.18)" }}
                  aria-hidden="true"
                >
                  {initials}
                </div>
        
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-white text-[11.5px] font-semibold truncate leading-tight">
                {displayName}
              </p>
              <div className="flex items-center gap-1 mt-[2px]">
                
                  <span
                    className="text-[8.5px] font-medium tracking-[0.12em] uppercase"
                    style={{ color: "rgba(255,255,255,0.35)" }}
                  >
                    {/* {profile.role === "landlord" ? "Landlord" : "Tenant"} */}
                    Tenant (Unverified)
                  </span>
              </div>
            </div>
            <button
              onClick={handleSignOut}
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
    
    </div>
  );
}


