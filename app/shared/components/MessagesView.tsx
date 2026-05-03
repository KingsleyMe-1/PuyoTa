"use client";

import { useState, useRef, useEffect, useCallback } from "react";
import Image from "next/image";
import {
  Search,
  Send,
  ArrowLeft,
  MapPin,
  CheckCheck,
  Check,
  MoreVertical,
  Phone,
  Info,
  X,
  MessageSquare,
  BadgeCheck,
} from "lucide-react";

// ── Types ──────────────────────────────────────────────────────────────────────

interface ChatMessage {
  id: number;
  sender: "me" | "landlord";
  text: string;
  time: string;
  read: boolean;
}

interface Conversation {
  id: number;
  landlord: string;
  landlordTitle: string;
  initials: string;
  avatar: string;
  avatarColor: string;
  listing: string;
  listingImage: string;
  listingPrice: number;
  listingLocation: string;
  listingBeds: number;
  listingSqm: number;
  messages: ChatMessage[];
  unreadCount: number;
}

// ── Mock Data ──────────────────────────────────────────────────────────────────

const CONVERSATIONS: Conversation[] = [
  {
    id: 1,
    landlord: "Maria Santos",
    landlordTitle: "Verified Landlord",
    initials: "MS",
    avatar: "https://picsum.photos/seed/landlord-maria/200/200",
    avatarColor: "#e0e7ff",
    listing: "Skyrise 3 Studio Unit",
    listingImage: "https://picsum.photos/seed/sky3-main/600/400",
    listingPrice: 25000,
    listingLocation: "IT Park, Cebu City",
    listingBeds: 0,
    listingSqm: 28,
    unreadCount: 2,
    messages: [
      { id: 1, sender: "landlord", text: "Hello! I saw your inquiry about the studio unit. It's still available.", time: "10:00 AM", read: true },
      { id: 2, sender: "me", text: "Hi! Great. I'm interested in viewing it this week if possible.", time: "10:04 AM", read: true },
      { id: 3, sender: "landlord", text: "Sure! How about Thursday at 3 PM? I'll be at the property.", time: "10:08 AM", read: true },
      { id: 4, sender: "me", text: "Thursday works. Can I bring a family member?", time: "10:12 AM", read: true },
      { id: 5, sender: "landlord", text: "Absolutely, no problem at all! Just bring a valid ID for the visitor's log.", time: "10:15 AM", read: true },
      { id: 6, sender: "landlord", text: "Is tomorrow at 2 PM okay for you?", time: "2m ago", read: false },
    ],
  },
  {
    id: 2,
    landlord: "Robert Lim",
    landlordTitle: "Verified Landlord",
    initials: "RL",
    avatar: "https://picsum.photos/seed/landlord-robert/200/200",
    avatarColor: "#fce7f3",
    listing: "Mivesa Garden Residences",
    listingImage: "https://picsum.photos/seed/mivesa-main/600/400",
    listingPrice: 18500,
    listingLocation: "Lahug, Cebu City",
    listingBeds: 1,
    listingSqm: 42,
    unreadCount: 0,
    messages: [
      { id: 1, sender: "me", text: "Hi Mr. Lim! I'm interested in the 1BR unit at Mivesa. Is it pet-friendly?", time: "Yesterday", read: true },
      { id: 2, sender: "landlord", text: "Hi! Unfortunately we don't allow pets in this unit. Building policy.", time: "Yesterday", read: true },
      { id: 3, sender: "me", text: "I see. What about the lease terms? Is 6 months possible?", time: "Yesterday", read: true },
      { id: 4, sender: "landlord", text: "We prefer a 1-year lease, but we can discuss a 6-month term with a higher monthly rate.", time: "Yesterday", read: true },
      { id: 5, sender: "landlord", text: "Thank you for the documents!", time: "1h ago", read: true },
    ],
  },
  {
    id: 3,
    landlord: "Ana Reyes",
    landlordTitle: "Verified Landlord",
    initials: "AR",
    avatar: "https://picsum.photos/seed/landlord-ana/200/200",
    avatarColor: "#d1fae5",
    listing: "Avida Towers Riala",
    listingImage: "https://picsum.photos/seed/avida-main/600/400",
    listingPrice: 32000,
    listingLocation: "IT Park, Cebu City",
    listingBeds: 1,
    listingSqm: 48,
    unreadCount: 1,
    messages: [
      { id: 1, sender: "landlord", text: "Good morning! The Avida unit is available from May 1.", time: "Apr 20", read: true },
      { id: 2, sender: "me", text: "Perfect timing! Does the price include association dues?", time: "Apr 20", read: true },
      { id: 3, sender: "landlord", text: "Yes, it's all-inclusive. Water and parking are separate though.", time: "Apr 20", read: true },
      { id: 4, sender: "landlord", text: "The unit is still available.", time: "3h ago", read: false },
    ],
  },
  {
    id: 4,
    landlord: "Jun Villanueva",
    landlordTitle: "Verified Landlord",
    initials: "JV",
    avatar: "https://picsum.photos/seed/landlord-jun/200/200",
    avatarColor: "#fef3c7",
    listing: "Cebu Business Park Bedspace",
    listingImage: "https://picsum.photos/seed/cbpbed-main/600/400",
    listingPrice: 5500,
    listingLocation: "CBP, Cebu City",
    listingBeds: 0,
    listingSqm: 12,
    unreadCount: 0,
    messages: [
      { id: 1, sender: "me", text: "Hi! Is the bedspace near the main CBP entrance?", time: "Apr 19", read: true },
      { id: 2, sender: "landlord", text: "Yes! About 3 minutes walk from Ayala gate. Very convenient.", time: "Apr 19", read: true },
      { id: 3, sender: "me", text: "Great! What's included in the ₱5,500?", time: "Apr 19", read: true },
      { id: 4, sender: "landlord", text: "WiFi, aircon, and weekly housekeeping. Electric split based on usage.", time: "Apr 19", read: true },
    ],
  },
  {
    id: 5,
    landlord: "Grace Tan",
    landlordTitle: "Verified Landlord",
    initials: "GT",
    avatar: "https://picsum.photos/seed/landlord-grace/200/200",
    avatarColor: "#ede9fe",
    listing: "The Courtyard Residences",
    listingImage: "https://picsum.photos/seed/courtyard/600/400",
    listingPrice: 42000,
    listingLocation: "Banilad, Cebu City",
    listingBeds: 2,
    listingSqm: 72,
    unreadCount: 0,
    messages: [
      { id: 1, sender: "landlord", text: "Welcome! I noticed you viewed the 2BR at The Courtyard. Any questions?", time: "Apr 18", read: true },
      { id: 2, sender: "me", text: "Hi! Yes — does the unit have a helper's quarters?", time: "Apr 18", read: true },
      { id: 3, sender: "landlord", text: "It doesn't have a dedicated quarter, but there's a utility room that some tenants use.", time: "Apr 18", read: true },
    ],
  },
];

// ── Date Separator Logic ────────────────────────────────────────────────────────

function getDividerLabel(time: string): string | null {
  if (time === "2m ago" || time === "1h ago" || time === "3h ago") return "Today";
  if (time === "Yesterday") return "Yesterday";
  if (time.startsWith("Apr")) return time;
  return null;
}

function shouldShowDivider(messages: ChatMessage[], index: number): string | null {
  if (index === 0) return getDividerLabel(messages[0].time);
  const curr = getDividerLabel(messages[index].time);
  const prev = getDividerLabel(messages[index - 1].time);
  return curr !== prev ? curr : null;
}

// ── Sub-components ──────────────────────────────────────────────────────────────

function ConversationItem({
  conv,
  isActive,
  onClick,
}: {
  conv: Conversation;
  isActive: boolean;
  onClick: () => void;
}) {
  const lastMsg = conv.messages[conv.messages.length - 1];

  return (
    <button
      onClick={onClick}
      aria-current={isActive ? "true" : undefined}
      className={[
        "w-full flex items-center gap-3 px-3 py-3 rounded-xl text-left",
        "transition-all duration-150 cursor-pointer group",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/25",
        isActive
          ? "bg-[#1B2B6B] shadow-md"
          : "hover:bg-white/70",
      ].join(" ")}
    >
      {/* Avatar */}
      <div className="relative shrink-0">
        <div
          className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-offset-1"
        >
          <Image
            src={conv.avatar}
            alt={conv.landlord}
            width={40}
            height={40}
            className="object-cover w-full h-full"
          />
        </div>
        {/* Online dot */}
        <span
          className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2"
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex-1 min-w-0">
        <div className="flex items-center justify-between gap-1 mb-[2px]">
          <span
            className={[
              "text-[12.5px] font-semibold truncate leading-tight",
              isActive ? "text-white" : "text-gray-900",
            ].join(" ")}
          >
            {conv.landlord}
          </span>
          <span
            className={[
              "text-[9.5px] shrink-0 tabular-nums",
              isActive ? "text-white/50" : "text-gray-400",
            ].join(" ")}
          >
            {lastMsg.time}
          </span>
        </div>
        <p
          className={[
            "text-[11px] truncate leading-snug",
            isActive ? "text-white/60" : "text-gray-400",
          ].join(" ")}
        >
          {lastMsg.sender === "me" ? "You: " : ""}
          {lastMsg.text}
        </p>
        <p
          className={[
            "text-[10px] truncate mt-[2px]",
            isActive ? "text-white/35" : "text-gray-300",
          ].join(" ")}
        >
          {conv.listing}
        </p>
      </div>

      {/* Unread badge */}
      {conv.unreadCount > 0 && !isActive && (
        <span className="shrink-0 min-w-[18px] h-[18px] px-1 rounded-full bg-[#1B2B6B] text-white text-[9px] font-black flex items-center justify-center">
          {conv.unreadCount}
        </span>
      )}
    </button>
  );
}

function MessageBubble({
  msg,
  isLast,
  landlordAvatar,
}: {
  msg: ChatMessage;
  isLast: boolean;
  landlordAvatar: string;
}) {
  const isMe = msg.sender === "me";

  return (
    <div
      className={[
        "flex items-end gap-2",
        isMe ? "flex-row-reverse" : "flex-row",
      ].join(" ")}
    >
      {/* Landlord avatar — only show on last message in a group */}
      {!isMe && (
        <div className={["w-6 h-6 rounded-full overflow-hidden shrink-0 mb-0.5", isLast ? "opacity-100" : "opacity-0"].join(" ")}>
          <Image
            src={landlordAvatar}
            alt="Landlord"
            width={24}
            height={24}
            className="object-cover w-full h-full"
          />
        </div>
      )}

      <div
        className={[
          "max-w-[72%] sm:max-w-[60%] group relative",
          isMe ? "items-end" : "items-start",
          "flex flex-col",
        ].join(" ")}
      >
        <div
          className={[
            "px-3.5 py-2.5 rounded-2xl text-[13px] leading-relaxed",
            isMe
              ? "bg-[#1B2B6B] text-white rounded-br-md"
              : "bg-white border border-gray-100 text-gray-800 shadow-sm rounded-bl-md",
          ].join(" ")}
        >
          {msg.text}
        </div>
        <div
          className={[
            "flex items-center gap-1 mt-[3px] px-0.5",
            isMe ? "flex-row-reverse" : "flex-row",
          ].join(" ")}
        >
          <span className="text-[9px] text-gray-400 tabular-nums">{msg.time}</span>
          {isMe && (
            msg.read
              ? <CheckCheck className="w-3 h-3 text-[#1B2B6B]" aria-label="Read" />
              : <Check className="w-3 h-3 text-gray-300" aria-label="Sent" />
          )}
        </div>
      </div>
    </div>
  );
}

function ListingContextCard({ conv }: { conv: Conversation }) {
  const bedLabel = conv.listingBeds === 0 ? "Studio" : `${conv.listingBeds}BR`;
  return (
    <div className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 bg-white/80 backdrop-blur-sm shrink-0">
      <div className="relative w-12 h-10 rounded-lg overflow-hidden shrink-0">
        <Image
          src={conv.listingImage}
          alt={conv.listing}
          fill
          className="object-cover"
          sizes="48px"
        />
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-[11.5px] font-bold text-gray-900 truncate leading-tight">{conv.listing}</p>
        <div className="flex items-center gap-2 mt-[2px]">
          <span className="text-[10px] font-black text-[#1B2B6B]">₱{conv.listingPrice.toLocaleString()}</span>
          <span className="w-px h-2.5 bg-gray-200" />
          <span className="text-[9.5px] text-gray-400">{bedLabel}</span>
          <span className="w-px h-2.5 bg-gray-200" />
          <span className="text-[9.5px] text-gray-400">{conv.listingSqm} sqm</span>
          <span className="w-px h-2.5 bg-gray-200" />
          <span className="flex items-center gap-0.5 text-[9.5px] text-gray-400">
            <MapPin className="w-2.5 h-2.5" />
            {conv.listingLocation}
          </span>
        </div>
      </div>
      <div className="flex items-center gap-1.5 shrink-0">
        <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
        <span className="text-[9px] font-bold text-emerald-600 uppercase tracking-[0.1em] hidden sm:inline">Verified</span>
      </div>
    </div>
  );
}

// ── Root Component ─────────────────────────────────────────────────────────────

export default function MessagesView() {
  const [activeId, setActiveId] = useState<number | null>(null);
  const [showThread, setShowThread] = useState(false); // mobile: toggle between list and thread
  const [search, setSearch] = useState("");
  const [input, setInput] = useState("");
  const [conversations, setConversations] = useState<Conversation[]>(CONVERSATIONS);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const activeConv = conversations.find((c) => c.id === activeId) ?? null;

  const filtered = conversations.filter((c) =>
    search.trim()
      ? c.landlord.toLowerCase().includes(search.toLowerCase()) ||
        c.listing.toLowerCase().includes(search.toLowerCase())
      : true
  );

  const totalUnread = conversations.reduce((sum, c) => sum + c.unreadCount, 0);

  // Scroll to bottom when active conversation changes or messages update
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [activeId, conversations]);

  const openConversation = useCallback((id: number) => {
    setActiveId(id);
    setShowThread(true);
    // Mark messages as read
    setConversations((prev) =>
      prev.map((c) =>
        c.id === id
          ? {
              ...c,
              unreadCount: 0,
              messages: c.messages.map((m) => ({ ...m, read: true })),
            }
          : c
      )
    );
  }, []);

  const handleSend = useCallback(() => {
    if (!input.trim() || !activeId) return;
    const text = input.trim();
    setInput("");
    setConversations((prev) =>
      prev.map((c) =>
        c.id === activeId
          ? {
              ...c,
              messages: [
                ...c.messages,
                {
                  id: c.messages.length + 1,
                  sender: "me",
                  text,
                  time: "Just now",
                  read: false,
                },
              ],
            }
          : c
      )
    );
  }, [input, activeId]);

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="flex flex-col h-full -mx-4 sm:-mx-6 -mt-1 -mb-8 overflow-hidden" style={{ height: "calc(100vh - 64px)" }}>
      {/* ── Page Header (outside the two-panel split) ── */}
      <div className="px-4 sm:px-6 pt-2 pb-3 shrink-0">
        <div className="flex items-center gap-2.5">
          <h1 className="text-[22px] font-black text-gray-900 leading-tight tracking-tight">
            Messages
          </h1>
          {totalUnread > 0 && (
            <span
              className="text-white text-[9px] font-black tracking-[0.12em] uppercase rounded-md px-2 py-[3px]"
              style={{ background: "#1B2B6B" }}
            >
              {totalUnread} new
            </span>
          )}
        </div>
        <p className="text-[12.5px] text-gray-500 mt-0.5">Your conversations with landlords.</p>
      </div>

      {/* ── Two-panel layout ── */}
      <div className="flex flex-1 min-h-0 mx-4 sm:mx-6 mb-4 rounded-2xl overflow-hidden border border-gray-200/70 shadow-sm bg-white">

        {/* ── LEFT: Conversation List ────────────────────── */}
        <div
          className={[
            "flex flex-col shrink-0 border-r border-gray-100",
            "w-full md:w-[300px] lg:w-[320px]",
            showThread ? "hidden md:flex" : "flex",
          ].join(" ")}
        >
          {/* Search */}
          <div className="p-3 border-b border-gray-100 shrink-0">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-gray-400 pointer-events-none" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search conversations..."
                aria-label="Search conversations"
                className="w-full bg-[#EAECF5]/60 rounded-xl text-[12px] text-gray-700 placeholder:text-gray-400 border-0 outline-none focus:ring-2 focus:ring-[#1B2B6B]/15 transition-all duration-200 py-2 pr-8"
                style={{ paddingLeft: "2.25rem" }}
              />
              {search && (
                <button
                  onClick={() => setSearch("")}
                  aria-label="Clear search"
                  className="absolute right-2.5 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 cursor-pointer focus-visible:outline-none"
                >
                  <X className="w-3 h-3" />
                </button>
              )}
            </div>
          </div>

          {/* Conversation list */}
          <div className="flex-1 overflow-y-auto p-2 space-y-0.5">
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-12 text-center px-4">
                <MessageSquare className="w-8 h-8 text-gray-200 mb-2" />
                <p className="text-[12px] text-gray-400 font-medium">No conversations found</p>
              </div>
            ) : (
              filtered.map((conv) => (
                <ConversationItem
                  key={conv.id}
                  conv={conv}
                  isActive={activeId === conv.id}
                  onClick={() => openConversation(conv.id)}
                />
              ))
            )}
          </div>
        </div>

        {/* ── RIGHT: Chat Thread ────────────────────────── */}
        <div
          className={[
            "flex-1 flex flex-col min-w-0",
            showThread ? "flex" : "hidden md:flex",
          ].join(" ")}
        >
          {activeConv ? (
            <>
              {/* Thread header */}
              <div className="flex items-center gap-3 px-4 py-3 border-b border-gray-100 shrink-0 bg-white">
                {/* Back button — mobile */}
                <button
                  onClick={() => setShowThread(false)}
                  className="md:hidden w-8 h-8 flex items-center justify-center rounded-lg text-gray-500 hover:bg-gray-100 transition-colors cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20"
                  aria-label="Back to conversations"
                >
                  <ArrowLeft className="w-4 h-4" />
                </button>

                {/* Avatar */}
                <div className="relative shrink-0">
                  <div className="w-9 h-9 rounded-full overflow-hidden">
                    <Image
                      src={activeConv.avatar}
                      alt={activeConv.landlord}
                      width={36}
                      height={36}
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span
                    className="absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full bg-emerald-400 ring-2 ring-white"
                    aria-hidden="true"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center gap-1.5">
                    <span className="text-[13px] font-bold text-gray-900 truncate">
                      {activeConv.landlord}
                    </span>
                    <BadgeCheck className="w-3.5 h-3.5 text-emerald-500 shrink-0" />
                  </div>
                  <p className="text-[10.5px] text-emerald-500 font-medium">Active now</p>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    aria-label="Call"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20"
                  >
                    <Phone className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="Info"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20"
                  >
                    <Info className="w-3.5 h-3.5" />
                  </button>
                  <button
                    aria-label="More options"
                    className="w-8 h-8 flex items-center justify-center rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-all duration-150 cursor-pointer focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]/20"
                  >
                    <MoreVertical className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              {/* Listing context strip */}
              <ListingContextCard conv={activeConv} />

              {/* Messages area */}
              <div className="flex-1 overflow-y-auto px-4 py-4 space-y-3" style={{ background: "#F8F9FC" }}>
                {activeConv.messages.map((msg, i) => {
                  const divider = shouldShowDivider(activeConv.messages, i);
                  const isLastInGroup =
                    i === activeConv.messages.length - 1 ||
                    activeConv.messages[i + 1]?.sender !== msg.sender;

                  return (
                    <div key={msg.id}>
                      {divider && (
                        <div className="flex items-center gap-3 my-4">
                          <div className="flex-1 h-px bg-gray-200" />
                          <span className="text-[9.5px] font-semibold text-gray-400 uppercase tracking-[0.12em]">
                            {divider}
                          </span>
                          <div className="flex-1 h-px bg-gray-200" />
                        </div>
                      )}
                      <MessageBubble
                        msg={msg}
                        isLast={isLastInGroup}
                        landlordAvatar={activeConv.avatar}
                      />
                    </div>
                  );
                })}
                <div ref={messagesEndRef} />
              </div>

              {/* Message input */}
              <div
                className="px-4 py-3 border-t border-gray-100 bg-white shrink-0"
              >
                <div className="flex items-end gap-2">
                  <div className="flex-1 relative">
                    <textarea
                      ref={inputRef}
                      value={input}
                      onChange={(e) => {
                        setInput(e.target.value);
                        // auto-resize
                        e.target.style.height = "auto";
                        e.target.style.height = `${Math.min(e.target.scrollHeight, 120)}px`;
                      }}
                      onKeyDown={handleKeyDown}
                      placeholder="Type a message…"
                      aria-label="Message input"
                      rows={1}
                      className="w-full resize-none bg-[#EAECF5]/60 border border-gray-200 rounded-xl text-[13px] text-gray-800 placeholder:text-gray-400 outline-none focus:ring-2 focus:ring-[#1B2B6B]/20 focus:border-[#1B2B6B]/25 transition-all duration-200 py-2.5 px-3.5 leading-relaxed"
                      style={{ minHeight: "40px", maxHeight: "120px" }}
                    />
                  </div>
                  <button
                    onClick={handleSend}
                    disabled={!input.trim()}
                    aria-label="Send message"
                    className={[
                      "shrink-0 w-10 h-10 rounded-xl flex items-center justify-center",
                      "transition-all duration-200 cursor-pointer",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#1B2B6B]",
                      input.trim()
                        ? "bg-[#1B2B6B] text-white hover:bg-[#111e4f] active:scale-95 shadow-sm"
                        : "bg-gray-100 text-gray-300 cursor-not-allowed",
                    ].join(" ")}
                  >
                    <Send className="w-4 h-4" />
                  </button>
                </div>
                <p className="text-[9.5px] text-gray-400 mt-1.5 pl-0.5">
                  Press <kbd className="font-mono bg-gray-100 px-1 py-[1px] rounded text-[8.5px]">Enter</kbd> to send
                  &nbsp;·&nbsp;
                  <kbd className="font-mono bg-gray-100 px-1 py-[1px] rounded text-[8.5px]">Shift+Enter</kbd> for new line
                </p>
              </div>
            </>
          ) : (
            /* Empty state — no conversation selected */
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center px-8" style={{ background: "#F8F9FC" }}>
              <div
                className="w-16 h-16 rounded-2xl flex items-center justify-center"
                style={{ background: "#EEF0F8" }}
                aria-hidden="true"
              >
                <MessageSquare
                  className="w-7 h-7"
                  style={{ color: "rgba(27,43,107,0.35)" }}
                />
              </div>
              <div>
                <h3 className="text-[15px] font-bold text-gray-800 mb-1">Select a conversation</h3>
                <p className="text-[12.5px] text-gray-400 max-w-[240px] leading-relaxed">
                  Choose a landlord from the list to continue your conversation.
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
