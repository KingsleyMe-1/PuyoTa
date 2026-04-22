"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/districts", label: "Districts" },
  { href: "/listings", label: "Apartments" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  function isActive(href: string) {
    return href === "/" ? pathname === "/" : pathname.startsWith(href);
  }

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link
          href="/"
          className="text-xl font-bold tracking-tight text-navy shrink-0"
        >
          PuyoTa
        </Link>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={[
                "text-sm font-medium pb-1 border-b-2 transition-colors",
                isActive(link.href)
                  ? "text-gray-900 border-navy"
                  : "text-gray-500 hover:text-gray-900 border-transparent",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
        </div>

        {/* Right — Desktop Sign In + Mobile Hamburger */}
        <div className="flex items-center gap-3 shrink-0">
          <Link
            href="/sign-in"
            className="hidden md:inline-flex text-sm font-medium text-gray-700 hover:text-navy transition-colors"
          >
            Sign In
          </Link>

          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((prev) => !prev)}
            className="md:hidden p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer"
          >
            {menuOpen ? (
              <X className="w-5 h-5 text-gray-700" />
            ) : (
              <Menu className="w-5 h-5 text-gray-700" />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Dropdown */}
      {menuOpen && (
        <div className="md:hidden border-t border-gray-100 bg-white px-4 py-3 flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className={[
                "px-3 py-2.5 rounded-lg text-sm font-medium transition-colors",
                isActive(link.href)
                  ? "bg-blue-50 text-navy"
                  : "text-gray-600 hover:bg-gray-50 hover:text-gray-900",
              ].join(" ")}
            >
              {link.label}
            </Link>
          ))}
          <Link
            href="/sign-in"
            onClick={() => setMenuOpen(false)}
            className="px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50 rounded-lg transition-colors"
          >
            Sign In
          </Link>
        </div>
      )}
    </nav>
  );
}
