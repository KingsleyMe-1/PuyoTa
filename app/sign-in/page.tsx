import type { Metadata } from "next";
import Link from "next/link";
import { Home, ShieldCheck } from "lucide-react";
import { SignInForm } from "./components/SignInForm";

export const metadata: Metadata = {
  title: "Sign In — PuyoTa",
  description:
    "Sign in to your PuyoTa account to access verified rental listings in Cebu City.",
};

export default function SignInPage() {
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

      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10 sm:py-14">
        <div className="w-full max-w-[480px] flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 sm:px-10 py-8 sm:py-10 flex flex-col gap-6">
            <div className="text-center flex flex-col gap-1">
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                Welcome back
              </h1>
              <p className="text-sm text-gray-500">
                Sophisticated Trust in Real Estate.
              </p>
            </div>

            <SignInForm />
          </div>

          <div className="flex items-start gap-3 bg-white/70 border border-navy/10 rounded-xl px-4 py-4 shadow-sm">
            <ShieldCheck
              className="w-5 h-5 text-navy shrink-0 mt-0.5"
              aria-hidden="true"
            />
            <p className="text-[13px] text-gray-600 leading-relaxed">
              <span className="font-semibold text-gray-800">
                PuyoTa Verified:
              </span>{" "}
              Every listing and user on our platform undergoes a rigorous manual
              verification process to ensure professional security.
            </p>
          </div>
        </div>
      </main>
    </div>
  );
}
