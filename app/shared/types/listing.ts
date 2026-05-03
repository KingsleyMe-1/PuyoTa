export interface Listing {
  id: number;
  title: string;
  price: number;
  location: string;
  district?: string;
  image: string;
  unitType: string;
  beds: number;
  baths: number;
  sqm: number;
  amenities: string[];
  landlord?: {
    name: string;
    title: string;
    rating: number;
    reviewCount: number;
    responseTime: string;
    memberSince: string;
    avatar: string;
  } | null;
  furnishing?: string;
  description?: string;
  landmarks?: string[];
  tags?: string[];
  detailedImages?: string[];
}

export interface ListingDetail {
  id: number;
  title: string;
  unit: string;
  price: number;
  priceSuffix?: string | null;
  location: string;
  district: string;
  description: string;
  beds: number;
  baths: number;
  sqm: number;
  furnishing: string;
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
  } | null;
  priceChange?: { direction: "up" | "down"; amount: number };
}

export interface SavedListing {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  image: string;
  type: "Studio" | "1BR" | "2BR" | "3BR" | "Bedspace" | "Co-Living";
  beds: number;
  baths: number;
  sqm: number;
  amenities: string[];
  savedDaysAgo: number;
  landlord: string;
  priceChange?: { direction: "up" | "down"; amount: number };
  tags?: string[];
}

export interface ManagedListing {
  id: number;
  title: string;
  price: number;
  location: string;
  district: string;
  image: string;
  type: "Studio" | "1BR" | "2BR" | "3BR" | "Bedspace" | "Co-Living";
  beds: number;
  baths: number;
  sqm: number;
  amenities: string[];
  savedDaysAgo: number;
  landlord: string;
  priceChange?: { direction: "up" | "down"; amount: number };
  tags?: string[];
}