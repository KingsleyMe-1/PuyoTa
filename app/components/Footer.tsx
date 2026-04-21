import Link from "next/link";
import { Globe, Mail } from "lucide-react";

const footerLinks = {
  company: [
    { label: "About Us", href: "/about" },
    { label: "Terms of Service", href: "/terms" },
    { label: "Privacy Policy", href: "/privacy" },
  ],
  resources: [
    { label: "Cebu Living Guide", href: "/guides" },
    { label: "Landlord Center", href: "/landlords" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-white border-t border-gray-100 py-12 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-xl font-bold tracking-tight text-navy"
            >
              PuyoTa
            </Link>
            <p className="text-xs text-gray-400 leading-relaxed max-w-xs">
              © 2024 PuyoTa Cebu. All rights reserved.
            </p>
            <div className="flex items-center gap-3 mt-1">
              <a
                href="https://puyota.com"
                aria-label="Website"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:text-navy text-gray-400 transition-colors"
              >
                <Globe className="w-4 h-4" />
              </a>
              <a
                href="mailto:hello@puyota.com"
                aria-label="Email"
                className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center hover:border-navy hover:text-navy text-gray-400 transition-colors"
              >
                <Mail className="w-4 h-4" />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-3">
            {footerLinks.company.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>

          <div className="flex flex-col gap-3">
            {footerLinks.resources.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
