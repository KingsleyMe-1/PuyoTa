import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ListingDetailClient } from "./components/ListingDetailClient";

/* ─── Types ──────────────────────────────────────────────── */
export interface ListingDetail {
  id: string;
  title: string;
  unit: string;
  price: number;
  priceSuffix: string;
  location: string;
  district: string;
  city: string;
  beds: number;
  baths: number;
  sqm: number;
  furnishing: string;
  description: string;
  images: string[];
  amenities: Array<{ name: string; icon: string }>;
  landlord: {
    name: string;
    title: string;
    rating: number;
    reviewCount: number;
    responseTime: string;
    memberSince: string;
    avatar: string;
  };
  breadcrumb: Array<{ label: string; href: string }>;
}

/* ─── Mock Data ──────────────────────────────────────────── */
const LISTINGS: Record<string, ListingDetail> = {
  "1": {
    id: "1",
    title: "Skyline Loft Residences",
    unit: "Unit 14B",
    price: 28000,
    priceSuffix: "Inclusive of Condo Dues",
    location: "Cebu IT Park, Lahug, Cebu City",
    district: "IT Park",
    city: "Cebu City",
    beds: 1,
    baths: 1,
    sqm: 42,
    furnishing: "Full Furnished",
    description:
      "Experience elevated urban living in the heart of Cebu IT Park. This sun-drenched loft features double-height ceilings, bespoke cabinetry, and premium finishes. Perfect for young professionals seeking a verified, high-quality home within walking distance of Cebu's premier business hub.",
    images: [
      "https://picsum.photos/seed/skyline-loft-main/1200/800",
      "https://picsum.photos/seed/skyline-loft-kitchen/600/400",
      "https://picsum.photos/seed/skyline-loft-bed/600/400",
      "https://picsum.photos/seed/skyline-loft-bath/600/400",
      "https://picsum.photos/seed/skyline-loft-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Gym Access", icon: "dumbbell" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "Engr. Rafael Santos",
      title: "Verified Landlord",
      rating: 4.9,
      reviewCount: 47,
      responseTime: "Under 1 hour",
      memberSince: "May 2021",
      avatar: "https://picsum.photos/seed/landlord-rafael/200/200",
    },
    breadcrumb: [
      { label: "Cebu City", href: "/districts/cebu-city" },
      { label: "IT Park", href: "/districts/it-park" },
    ],
  },
  "2": {
    id: "2",
    title: "Azure Terrace Condos",
    unit: "Unit 8A",
    price: 35000,
    priceSuffix: "2 Months Deposit",
    location: "Mactan Newtown, Lapu-Lapu City",
    district: "Mactan Island",
    city: "Lapu-Lapu City",
    beds: 2,
    baths: 2,
    sqm: 68,
    furnishing: "Full Furnished",
    description:
      "Wake up to breathtaking ocean views in this resort-style condominium at Mactan Newtown. Features two spacious bedrooms, a fully equipped kitchen, and direct access to world-class amenities including an infinity pool overlooking the Mactan Channel.",
    images: [
      "https://picsum.photos/seed/azure-terrace-main/1200/800",
      "https://picsum.photos/seed/azure-terrace-living/600/400",
      "https://picsum.photos/seed/azure-terrace-bed/600/400",
      "https://picsum.photos/seed/azure-terrace-bath/600/400",
      "https://picsum.photos/seed/azure-terrace-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
      { name: "Gym Access", icon: "dumbbell" },
    ],
    landlord: {
      name: "Ma. Cristina Reyes",
      title: "Verified Landlord",
      rating: 4.7,
      reviewCount: 31,
      responseTime: "Under 2 hours",
      memberSince: "March 2020",
      avatar: "https://picsum.photos/seed/landlord-cristina/200/200",
    },
    breadcrumb: [
      { label: "Lapu-Lapu City", href: "/districts/lapu-lapu" },
      { label: "Mactan Island", href: "/districts/mactan-island" },
    ],
  },
  "3": {
    id: "3",
    title: "The Solstice Studio",
    unit: "Unit 3C",
    price: 18500,
    priceSuffix: "Bills Negotiable",
    location: "Lahug, Cebu City",
    district: "Lahug",
    city: "Cebu City",
    beds: 0,
    baths: 1,
    sqm: 28,
    furnishing: "Full Furnished",
    description:
      "A thoughtfully designed studio unit in the heart of Lahug, minutes from IT Park and Ayala Center Cebu. Features a Murphy bed, built-in wardrobe, and a compact but well-equipped kitchen. Ideal for professionals or students who value smart urban living.",
    images: [
      "https://picsum.photos/seed/solstice-studio-main/1200/800",
      "https://picsum.photos/seed/solstice-studio-kitchen/600/400",
      "https://picsum.photos/seed/solstice-studio-living/600/400",
      "https://picsum.photos/seed/solstice-studio-bath/600/400",
      "https://picsum.photos/seed/solstice-studio-view/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "John Michael Dy",
      title: "Verified Landlord",
      rating: 4.8,
      reviewCount: 62,
      responseTime: "Same day",
      memberSince: "January 2019",
      avatar: "https://picsum.photos/seed/landlord-jmdy/200/200",
    },
    breadcrumb: [
      { label: "Cebu City", href: "/districts/cebu-city" },
      { label: "Lahug", href: "/districts/lahug" },
    ],
  },
  "4": {
    id: "4",
    title: "Marina Bay Suites",
    unit: "Unit 21F",
    price: 42000,
    priceSuffix: "Inclusive of Association Dues",
    location: "Mandani Bay, Mandaue City",
    district: "Mandaue",
    city: "Mandaue City",
    beds: 2,
    baths: 2,
    sqm: 85,
    furnishing: "Full Furnished",
    description:
      "Premium waterfront living at Mandani Bay. This expansive 2-bedroom suite offers stunning Mactan Channel views, high-end imported finishes, and a fully fitted kitchen. The development features resort-level amenities with direct access to the waterfront promenade.",
    images: [
      "https://picsum.photos/seed/marina-bay-main/1200/800",
      "https://picsum.photos/seed/marina-bay-living/600/400",
      "https://picsum.photos/seed/marina-bay-bed/600/400",
      "https://picsum.photos/seed/marina-bay-bath/600/400",
      "https://picsum.photos/seed/marina-bay-view/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
      { name: "Gym Access", icon: "dumbbell" },
    ],
    landlord: {
      name: "Atty. Patricia Lim",
      title: "Verified Landlord",
      rating: 5.0,
      reviewCount: 18,
      responseTime: "Under 1 hour",
      memberSince: "August 2022",
      avatar: "https://picsum.photos/seed/landlord-patricia/200/200",
    },
    breadcrumb: [
      { label: "Mandaue City", href: "/districts/mandaue" },
      { label: "Mandani Bay", href: "/districts/mandani-bay" },
    ],
  },
  "5": {
    id: "5",
    title: "Baseline Residences 1BR",
    unit: "Unit 12B",
    price: 22000,
    priceSuffix: "Monthly, No Hidden Fees",
    location: "Banilad, Cebu City",
    district: "Banilad",
    city: "Cebu City",
    beds: 1,
    baths: 1,
    sqm: 38,
    furnishing: "Semi Furnished",
    description:
      "A well-maintained 1-bedroom unit in a quiet, residential part of Banilad. Close to USC and AS Fortuna strip. Features a good-sized bedroom with built-in closet, a modern bathroom, and a covered balcony. Semi-furnished with major appliances included.",
    images: [
      "https://picsum.photos/seed/baseline-res-main/1200/800",
      "https://picsum.photos/seed/baseline-res-bed/600/400",
      "https://picsum.photos/seed/baseline-res-living/600/400",
      "https://picsum.photos/seed/baseline-res-bath/600/400",
      "https://picsum.photos/seed/baseline-res-balcony/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "Roberto Chiong",
      title: "Verified Landlord",
      rating: 4.6,
      reviewCount: 24,
      responseTime: "Within 24 hours",
      memberSince: "July 2020",
      avatar: "https://picsum.photos/seed/landlord-roberto/200/200",
    },
    breadcrumb: [
      { label: "Cebu City", href: "/districts/cebu-city" },
      { label: "Banilad", href: "/districts/banilad" },
    ],
  },
  "6": {
    id: "6",
    title: "Aruga Resort Condo",
    unit: "Unit 5G",
    price: 55000,
    priceSuffix: "All-in Inclusive",
    location: "Cebu Business Park, Cebu City",
    district: "Cebu Business Park",
    city: "Cebu City",
    beds: 2,
    baths: 2,
    sqm: 90,
    furnishing: "Full Furnished",
    description:
      "Luxury resort-style living in the prestigious Aruga by Rockwell at Cebu Business Park. This premier 2-bedroom unit features custom hardwood flooring, floor-to-ceiling windows, a designer kitchen, and direct access to 5-star hotel amenities including three pools and a full-service spa.",
    images: [
      "https://picsum.photos/seed/aruga-resort-main/1200/800",
      "https://picsum.photos/seed/aruga-resort-living/600/400",
      "https://picsum.photos/seed/aruga-resort-bed/600/400",
      "https://picsum.photos/seed/aruga-resort-bath/600/400",
      "https://picsum.photos/seed/aruga-resort-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
      { name: "Gym Access", icon: "dumbbell" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "Dr. Louisse Tanaka",
      title: "Verified Landlord",
      rating: 4.9,
      reviewCount: 89,
      responseTime: "Under 1 hour",
      memberSince: "February 2018",
      avatar: "https://picsum.photos/seed/landlord-louisse/200/200",
    },
    breadcrumb: [
      { label: "Cebu City", href: "/districts/cebu-city" },
      { label: "Cebu Business Park", href: "/districts/cebu-business-park" },
    ],
  },
  "7": {
    id: "7",
    title: "Mivesa Garden Residences",
    unit: "Unit 4D",
    price: 16500,
    priceSuffix: "1 Month Deposit",
    location: "Lahug, Cebu City",
    district: "Lahug",
    city: "Cebu City",
    beds: 1,
    baths: 1,
    sqm: 35,
    furnishing: "Semi Furnished",
    description:
      "A charming 1-bedroom unit in the lush, garden-themed Mivesa Garden Residences. Features garden or pool views, a modern kitchenette, and access to beautifully landscaped grounds. A serene escape in the city, minutes from Lahug's vibrant food and lifestyle scene.",
    images: [
      "https://picsum.photos/seed/mivesa-garden-main/1200/800",
      "https://picsum.photos/seed/mivesa-garden-living/600/400",
      "https://picsum.photos/seed/mivesa-garden-bed/600/400",
      "https://picsum.photos/seed/mivesa-garden-bath/600/400",
      "https://picsum.photos/seed/mivesa-garden-pool/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "Swimming Pool", icon: "waves" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "Ana Marie Uy",
      title: "Verified Landlord",
      rating: 4.7,
      reviewCount: 35,
      responseTime: "Under 3 hours",
      memberSince: "October 2021",
      avatar: "https://picsum.photos/seed/landlord-anamarie/200/200",
    },
    breadcrumb: [
      { label: "Cebu City", href: "/districts/cebu-city" },
      { label: "Lahug", href: "/districts/lahug" },
    ],
  },
  "8": {
    id: "8",
    title: "One Oasis Studio",
    unit: "Unit 2B",
    price: 14000,
    priceSuffix: "Utilities Excluded",
    location: "Tipolo, Mandaue City",
    district: "Mandaue",
    city: "Mandaue City",
    beds: 0,
    baths: 1,
    sqm: 25,
    furnishing: "Full Furnished",
    description:
      "A compact and fully furnished studio unit at One Oasis by Cebu Landmasters. Features a modern pantry-style kitchen, queen-sized Murphy bed, and access to resort-style amenities. Ideal for single professionals working in the Cebu north corridor.",
    images: [
      "https://picsum.photos/seed/one-oasis-main/1200/800",
      "https://picsum.photos/seed/one-oasis-kitchen/600/400",
      "https://picsum.photos/seed/one-oasis-living/600/400",
      "https://picsum.photos/seed/one-oasis-bath/600/400",
      "https://picsum.photos/seed/one-oasis-amenity/600/400",
    ],
    amenities: [
      { name: "High-speed WiFi", icon: "wifi" },
      { name: "Air Conditioning", icon: "wind" },
      { name: "24/7 Security", icon: "shield" },
    ],
    landlord: {
      name: "Bernard Chua",
      title: "Verified Landlord",
      rating: 4.5,
      reviewCount: 12,
      responseTime: "Same day",
      memberSince: "December 2023",
      avatar: "https://picsum.photos/seed/landlord-bernard/200/200",
    },
    breadcrumb: [
      { label: "Mandaue City", href: "/districts/mandaue" },
      { label: "Tipolo", href: "/districts/tipolo" },
    ],
  },
};

/* ─── Metadata ───────────────────────────────────────────── */
export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const listing = LISTINGS[id];
  if (!listing) return { title: "Listing Not Found — PuyoTa" };
  return {
    title: `${listing.title} ${listing.unit} — PuyoTa`,
    description: listing.description,
  };
}

/* ─── Page ───────────────────────────────────────────────── */
export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const listing = LISTINGS[id];
  if (!listing) notFound();
  return <ListingDetailClient listing={listing} />;
}
