# PuyoTa

PuyoTa is a verified rental marketplace for finding apartments, bedspaces, and co-living spaces in Cebu City — built on the promise of "No ghosting, no fake prices" through rigorous manual listing and landlord verification. It provides tenants a trusted, end-to-end rental discovery experience from browsing to booking, all within a clean and focused interface.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | Next.js 16 (App Router) |
| UI Library | React 19 |
| Language | TypeScript 5 (strict) |
| Styling | Tailwind CSS v4 |
| Icons | lucide-react v1.8 |
| Font | Geist (variable, via next/font) |
| Images | next/image (optimized) |

---

## Getting Started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the application.

| Script | Description |
|--------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
app/
├── page.tsx                        # Homepage (landing)
├── layout.tsx                      # Root layout with Geist font
├── globals.css                     # Global styles + Tailwind theme tokens
├── components/                     # Shared homepage components
│   ├── Navbar.tsx                  # Sticky top navigation
│   ├── HeroSection.tsx             # Full-width hero with search bar
│   ├── DistrictsSection.tsx        # Featured Cebu districts showcase
│   ├── ListingsSection.tsx         # Featured listings preview
│   ├── PhilosophySection.tsx       # Brand values section
│   ├── Footer.tsx                  # Site footer
│   └── SearchBar.tsx               # Location/budget/type search
├── listings/                       # Public listings browser
│   ├── page.tsx
│   ├── components/
│   │   ├── ListingsContent.tsx     # Filterable grid with pagination
│   │   ├── ListingCard.tsx         # Reusable listing card
│   │   └── FilterSidebar.tsx       # Location, price, type, amenity filters
│   └── [id]/
│       ├── page.tsx
│       └── components/
│           └── ListingDetailClient.tsx  # Detail view with gallery & landlord
├── districts/
│   └── page.tsx                    # District browser (6 Cebu districts)
├── sign-in/
│   └── components/
│       └── SignInForm.tsx          # Email + Google OAuth login
├── sign-up/
│   └── components/
│       └── SignUpFlow.tsx          # Multi-step tenant/landlord onboarding
└── dashboard/
    ├── page.tsx
    └── components/
        ├── TenantDashboardClient.tsx    # Root dashboard with sidebar nav
        ├── SavedListingsView.tsx        # Bookmarked apartments
        ├── MessagesView.tsx             # Tenant-landlord messaging
        ├── VerificationView.tsx         # Identity verification workflow
        └── DashboardListingDetail.tsx   # Expanded saved listing view
```

---

## Features

### Public Experience

**Verified Listings Marketplace**
- Every listing and landlord is manually verified before publishing
- Verified badges displayed on listing cards and detail pages
- "No ghosting, no fake prices" trust guarantee

**Smart Search & Filtering**
- Location search with 7 predefined Cebu City areas + custom input
- Budget range filtering (₱3,000 – ₱40,000+)
- Property type filtering: Studio, 1BR, 2BR, 3BR+, Bedspace, Co-living
- Amenity chip filters: WiFi, Aircon, Gym, Pool
- Search parameters preserved via URL (`?location=`) across page navigation

**District Discovery**
- Browse 6 key Cebu City districts: IT Park, Cebu Business Park, Mactan Island, Mabolo, Guadalupe, SM Seaside
- District cards with listing counts by property type
- Direct link from district to pre-filtered listings page

**Rich Listing Detail Pages**
- Photo gallery: hero + 2×2 grid on desktop; single hero with counter on mobile
- Full-screen lightbox with previous/next navigation and keyboard shortcuts (Esc, arrows)
- Specs: beds, baths, sqm, furnishing status
- Amenities grid with icons and labels
- Landlord profile: avatar, name, rating, response time, member since
- Action buttons: Save (bookmark), Like (heart), Share
- Separated back button + semantic breadcrumb trail (`Listings > Cebu City > IT Park > Listing`)

### Tenant Dashboard

**Saved Listings**
- Bookmark apartments from any listing card or detail page
- View saved listings in grid or list mode
- Price change indicators (up/down with amount difference)
- Days-saved tracking per listing
- Unsave / remove functionality

**Messaging**
- Two-panel chat interface: conversation list + active thread
- Unread message badges on conversation items
- Listing context card shown within conversation
- Landlord verified badge visible in chat
- Mobile-responsive: single-panel with back navigation

**Verification Workflow**
- 6-step progressive verification: Email → Mobile Number → Profile Photo → Government ID → Address → Employment
- Three statuses per step: Verified, Processing (under review), Required (action needed)
- Arc progress indicator (SVG ring) showing completion percentage
- Segmented progress bar showing all 6 steps at a glance
- Action Required steps displayed as full cards with prominent CTAs
- Completed steps collapsed by default with toggle to expand
- "Benefits Unlocked" sidebar tracks perks earned through verification

### Authentication

**Sign In**
- Email and password login
- Google OAuth sign-in button
- Remember Me option
- Password visibility toggle

**Sign Up (Multi-Step Onboarding)**
- Step 1: Role selection — Tenant or Landlord
- Step 2: Personal details with real-time password strength meter
- Step 3: ID verification and location preferences (landlord-specific)
- Progress bar across all steps

---

## Design System

**Color Palette**

| Token | Value | Usage |
|-------|-------|-------|
| `--color-navy` | `#1B2B6B` | Primary brand color, CTAs, active states |
| `--color-navy-dark` | `#111E4F` | Hover states, dark navy elements |
| `--color-listings-bg` | `#EEF0F8` | Page backgrounds, muted surfaces |
| Dashboard background | `#EAECF5` | Dashboard main area |

**Typography**: Geist variable font (latin subset), applied via CSS variable `--font-geist-sans`.

**Responsive Breakpoints**: Mobile-first with `sm` (640px), `md` (768px), `lg` (1024px) breakpoints used throughout.

---

## Best Practices

### Next.js App Router
- All pages are **React Server Components by default** — no unnecessary `"use client"` boundaries
- `"use client"` applied only to interactive components (forms, filters, dashboards, galleries)
- Static `metadata` exports on every page for SEO (`title`, `description`)
- `next/image` used for all images with `priority`, `sizes`, and `quality` props
- `next/font` for zero-layout-shift font loading with CSS variable injection
- `notFound()` from `next/navigation` for invalid dynamic routes
- `useSearchParams()` for URL state (location search persistence)

### Component Architecture
- **Single Responsibility**: Each component has one clear purpose
- **Server/Client boundary**: Layout and static content in server components; interactivity in client components
- **Prop-based customization**: Callbacks (`onViewDetail`, `onBack`, `onApply`) for parent-controlled navigation
- **Modular mock data**: Data co-located near the components that use it

### TypeScript
- Strict TypeScript throughout (`strict: true` in `tsconfig.json`)
- Interface definitions for all data shapes (`Listing`, `Conversation`, `Message`, `Step`, `Filters`)
- Discriminated unions for state: `Role = "tenant" | "landlord" | null`, `StepStatus = "verified" | "processing" | "required"`
- No `any` types; all props explicitly typed

### Accessibility
- Semantic HTML throughout: `<nav>`, `<article>`, `<aside>`, `<header>`, `<footer>`, `<ol>` for breadcrumbs
- ARIA attributes: `aria-label`, `aria-expanded`, `aria-haspopup`, `aria-hidden`, `aria-current="page"`, `aria-modal`, `role="dialog"`, `role="progressbar"`
- Keyboard navigation: Lightbox supports Esc and arrow keys; focus-visible rings on interactive elements
- Screen reader support: Decorative icons marked `aria-hidden="true"`; meaningful buttons have descriptive `aria-label`

### Performance
- `priority` prop on above-the-fold hero images for LCP optimization
- `sizes` attribute on all `next/image` components for correct `srcset` generation
- `useMemo` for filtered listings computation to avoid re-renders
- `useCallback` for event handlers in gallery navigation
- Route-based code splitting via Next.js App Router (automatic)

### State Management
- Local `useState` only — no external state library needed at this scale
- URL parameters for shareable/persistent state (search location)
- State-driven dashboard navigation (`activeNav` string controls visible section)

### Responsive Design
- Mobile-first utility classes throughout
- Hamburger menu replaces navbar links on mobile
- Dashboard sidebar collapses to icon-only on small screens
- Messaging UI switches to single-panel on mobile with back navigation
- Filter sidebar stacks vertically on mobile

---

## Roadmap

- [ ] Backend API integration (Supabase or similar)
- [ ] Google OAuth and email/password auth wiring
- [ ] Real-time messaging (WebSocket / Supabase Realtime)
- [ ] Landlord dashboard and listing management
- [ ] Payment integration for booking deposits
- [ ] Map view for listings (district-based)
- [ ] Push notifications for new messages and verification updates
