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

          <div className="relative rounded-2xl overflow-hidden h-72 lg:h-80">
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(145deg, #e8dfd0 0%, #d4c5a8 30%, #c0aa88 60%, #b09060 100%)",
              }}
            />

            <div
              className="absolute inset-0 opacity-40"
              style={{
                background:
                  "radial-gradient(ellipse at 55% 60%, rgba(180,140,80,0.4) 0%, rgba(100,80,40,0.6) 60%, rgba(40,30,15,0.8) 100%)",
              }}
            />
            <div className="absolute bottom-4 right-4 w-16 h-16 rounded-full border border-white/20 opacity-50" />
            <div className="absolute bottom-8 right-8 w-8 h-8 rounded-full border border-white/20 opacity-30" />
          </div>
        </div>
      </div>
    </section>
  );
}
