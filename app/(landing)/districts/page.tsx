import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { MapPin } from "lucide-react";
import { Districts } from "@/app/shared/mockData/DISTRICTS";

export const metadata: Metadata = {
  title: "Explore Cebu Districts — PuyoTa",
  description:
    "Discover the perfect neighborhood for your lifestyle. From bustling business hubs to serene seaside living, find verified listings in Cebu's most sought-after locations.",
};



type District = (typeof Districts)[0];

function DistrictCard({ district }: { district: District }) {
  return (
    <article className="group bg-white rounded-2xl shadow-sm border border-gray-100 flex flex-col hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <div className="relative h-48 w-full overflow-hidden rounded-t-2xl">
        <Image
          src={district.image}
          alt={`${district.name} neighborhood in Cebu`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-black/5 to-transparent" />
      </div>

      <div className="flex flex-col gap-3 p-4 flex-1">
        <h2 className="font-bold text-gray-900 text-[15px] leading-snug">
          {district.name}
        </h2>

        <div className="flex flex-wrap gap-1.5">
          {district.tags.map((tag) => (
            <span
              key={tag}
              className="inline-flex items-center gap-1 text-[11px] font-medium text-gray-500 bg-gray-100 px-2.5 py-1 rounded-full"
            >
              <MapPin className="w-2.5 h-2.5 shrink-0" aria-hidden="true" />
              {tag}
            </span>
          ))}
        </div>

        <hr className="border-gray-100" />

        <ul className="flex flex-col gap-1.5 flex-1" aria-label={`Listing counts for ${district.name}`}>
          {district.stats.map((stat) => (
            <li key={stat.label} className="flex items-center justify-between">
              <span className="text-xs text-gray-500">{stat.label}</span>
              <span className="text-xs font-semibold text-gray-800">{stat.count}</span>
            </li>
          ))}
        </ul>

        <Link
          href={`/apartments?location=${encodeURIComponent(district.locationParam)}`}
          className="mt-1 block w-full text-center text-sm font-semibold text-white bg-navy hover:bg-navy-dark transition-colors py-2.5 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-navy focus-visible:ring-offset-2"
        >
          Explore Listings
        </Link>
      </div>
    </article>
  );
}

export default function DistrictsPage() {
  return (
    <>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10 pb-8">
        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 tracking-tight">
          Explore Cebu Districts
        </h1>
        <p className="mt-3 text-gray-500 text-sm sm:text-base leading-relaxed max-w-xl">
          Discover the perfect neighborhood for your lifestyle. From the
          bustling business hubs to serene seaside living, find verified
          listings in Cebu&apos;s most sought-after locations.
        </p>
      </section>

      <section
        className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16"
        aria-label="Cebu districts"
      >
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {Districts.map((district) => (
            <DistrictCard key={district.id} district={district} />
          ))}
        </div>
      </section>
    </>
  );
}
