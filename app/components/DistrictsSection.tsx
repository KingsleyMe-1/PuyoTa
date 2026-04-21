import Link from "next/link";
import { ArrowRight } from "lucide-react";

const districts = [
  {
    id: "it-park",
    name: "IT Park",
    count: "240+ Verified Listings",
    
    accent: "rgba(30,80,200,0.15)",
    large: true,
    image: "It-park.jpg",
  },
  {
    id: "cebu-business-park",
    name: "Cebu Business Park",
    count: "115+ Luxury Suites",
    accent: "rgba(60,120,220,0.15)",
    large: false,
    image: "Cebu-Business-Park.jpg",
  },
  {
    id: "mactan-island",
    name: "Mactan Island",
    count: "",
    accent: "rgba(20,160,160,0.15)",
    large: false,
    image: "Mactan-Island.jpg",
  },
  {
    id: "banawa",
    name: "Banawa District",
    count: "",
    accent: "rgba(40,160,60,0.15)",
    large: false,
    image: "Banawa.jpg",
  },
];

interface DistrictCardProps {
  district: (typeof districts)[0];
  className?: string;
}

function DistrictCard({ district, className = "" }: DistrictCardProps) {
  return (
    <Link
      href={`/districts/${district.id}`}
      className={`group relative rounded-2xl overflow-hidden block ${className}`}
      style={{ backgroundImage: `url(/${district.image})`, backgroundSize: "cover", backgroundPosition: "center" }}
    >
      <div
        className="absolute inset-0 opacity-60"
        style={{
          background: `radial-gradient(ellipse at 60% 40%, ${district.accent}, transparent 70%)`,
        }}
      />

      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/5 transition-colors duration-300" />

      <div className="absolute bottom-0 left-0 p-5">
        <p className="text-white font-semibold text-lg leading-tight drop-shadow-md">
          {district.name}
        </p>
        {district.count && (
          <p className="text-white/80 text-sm mt-0.5 drop-shadow-md">
            {district.count}
          </p>
        )}
      </div>
    </Link>
  );
}

export default function DistrictsSection() {
  const [featured, ...rest] = districts;

  return (
    <section className="bg-white py-16 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-start justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">
              Live Near Cebu&apos;s Best Places
            </h2>
            <p className="text-gray-500 text-sm mt-1">
              Discover properties near Cebu&apos;s key landmarks.
            </p>
          </div>
          <Link
            href="/districts"
            className="flex items-center gap-1.5 text-sm font-semibold text-gray-900 hover:text-navy transition-colors shrink-0 mt-1"
          >
            View All Districts
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 h-auto md:h-[420px]">
          <DistrictCard district={featured} className="h-64 md:h-full" />

          <div className="grid grid-rows-2 gap-3 h-64 md:h-full">
            <DistrictCard district={rest[0]} className="h-full" />

            <div className="grid grid-cols-2 gap-3 h-full">
              <DistrictCard district={rest[1]} className="h-full" />
              <DistrictCard district={rest[2]} className="h-full" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
