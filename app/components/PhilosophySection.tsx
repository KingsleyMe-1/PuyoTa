import Image from "next/image";
import { Shield, CreditCard } from "lucide-react";

export default function PhilosophySection() {
  return (
    <section className="bg-navy py-16 px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div className="flex flex-col gap-6">

            <h2 className="text-3xl md:text-4xl font-bold text-white leading-tight max-w-md">
              Finding a home in Cebu shouldn&apos;t feel like a gamble.
            </h2>

            <p className="text-white/60 text-base leading-relaxed max-w-sm">
              We verify every landlord and every unit to ensure you get exactly
              what&apos;s in the photos. No ghosting, no fake prices.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 pt-2">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <Shield className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-sm font-semibold text-white/80">
                  Verified Listings
                </span>
              </div>
              <div className="flex items-center gap-3 sm:ml-4">
                <div className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center shrink-0">
                  <CreditCard className="w-5 h-5 text-white/80" />
                </div>
                <span className="text-sm font-semibold text-white/80">
                  Secure Payments
                </span>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative rounded-2xl overflow-hidden h-72 lg:h-80">
            <Image
              src="/Philosophy-Image.jpg"
              alt="Aerial view of Cebu City"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 50vw, 600px"
            />
            <div className="absolute inset-0 bg-black/5" />
          </div>
        </div>
      </div>
    </section>
  );
}
