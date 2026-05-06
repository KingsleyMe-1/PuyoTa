/**
 * Shown instantly while the server renders the landlord page.
 * Next.js wraps page.tsx in a Suspense boundary using this file,
 * so users see this skeleton instead of a blank screen on every tab switch.
 */
export default function LandlordDashboardLoading() {
  return (
    <div className="h-full overflow-y-auto px-4 sm:px-6 pb-8 pt-8">
      <div className="animate-pulse">
        {/* ── Welcome header ───────────────────────────── */}
        <div className="mb-5 flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <div className="h-7 w-56 max-w-full rounded-xl bg-gray-200 mb-2" />
            <div className="h-4 w-72 max-w-full rounded-lg bg-gray-100" />
          </div>
          {/* Profile completion pill */}
          <div className="hidden sm:block h-12 w-40 shrink-0 rounded-xl bg-white shadow-sm border border-gray-100" />
        </div>

        {/* ── Verification / alert banner ───────────────── */}
        <div className="h-11 w-full rounded-xl bg-white shadow-sm border border-gray-100 mb-5" />

        {/* ── Stats grid (4 cards) ─────────────────────── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-7">
          {[0, 1, 2, 3].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl p-4 shadow-sm border border-gray-100"
            >
              <div className="h-3 w-14 rounded bg-gray-100 mb-3" />
              <div className="h-7 w-10 rounded-lg bg-gray-200 mb-1.5" />
              <div className="h-3 w-20 rounded bg-gray-100" />
            </div>
          ))}
        </div>

        {/* ── Section heading ──────────────────────────── */}
        <div className="flex items-center justify-between mb-4">
          <div className="h-5 w-36 rounded-lg bg-gray-200" />
          <div className="h-4 w-16 rounded bg-gray-100" />
        </div>

        {/* ── Listing cards ────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="bg-white rounded-2xl overflow-hidden shadow-sm border border-gray-100"
            >
              {/* Image placeholder */}
              <div className="h-44 bg-gray-100" />
              {/* Card body */}
              <div className="p-4 space-y-2.5">
                <div className="h-5 w-3/4 rounded-lg bg-gray-200" />
                <div className="h-4 w-1/2 rounded bg-gray-100" />
                <div className="flex items-center gap-3 pt-0.5">
                  <div className="h-4 w-12 rounded bg-gray-100" />
                  <div className="h-4 w-12 rounded bg-gray-100" />
                  <div className="h-4 w-12 rounded bg-gray-100" />
                </div>
                <div className="flex gap-1.5 pt-1">
                  <div className="h-6 w-16 rounded-full bg-gray-100" />
                  <div className="h-6 w-20 rounded-full bg-gray-100" />
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
