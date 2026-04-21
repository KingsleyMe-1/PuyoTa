import Link from "next/link";
import { Bell, User } from "lucide-react";

export default function Navbar() {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 h-16 flex items-center justify-between">
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-navy shrink-0"
        >
          PuyoTa
        </Link>


        <div className="flex items-center gap-2">
          <button
            aria-label="Notifications"
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <Bell className="w-5 h-5 text-gray-600" />
          </button>
          <button
            aria-label="Account"
            className="w-9 h-9 rounded-full bg-navy flex items-center justify-center hover:bg-navy-dark transition-colors"
          >
            <User className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>
    </nav>
  );
}
