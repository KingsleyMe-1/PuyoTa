import type { Metadata } from "next";
import Link from "next/link";
import { Home } from "lucide-react";
import { SignUpFlow } from "./components/SignUpFlow";

export const metadata: Metadata = {
  title: "Create an Account — PuyoTa",
  description:
    "Join PuyoTa to access verified rental listings in Cebu City. Find your next home with no ghosting and no fake prices.",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col min-h-dvh">
      <header className="shrink-0 flex items-center justify-between px-5 sm:px-8 h-14">
        <Link
          href="/"
          className="text-lg font-bold tracking-tight text-navy hover:opacity-80 transition-opacity"
        >
          PuyoTa
        </Link>
        <Link
          href="/"
          className="flex items-center gap-1.5 text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors focus-visible:outline-none focus-visible:underline"
        >
          <Home className="w-4 h-4" aria-hidden="true" />
          <span>Back to Homepage</span>
        </Link>
      </header>

      <main className="flex-1 flex flex-col items-center justify-center py-10 sm:py-14">
        <SignUpFlow />
      </main>

    </div>
  );
}
