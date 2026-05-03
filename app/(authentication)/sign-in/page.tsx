import type { Metadata } from "next";
import {  ShieldCheck } from "lucide-react";
import { SignInForm } from "./components/SignInForm";
import Image from "next/image";

export const metadata: Metadata = {
  title: "Sign In — PuyoTa",
  description:
    "Sign in to your PuyoTa account to access verified rental listings in Cebu City.",
};

export default function SignInPage() {
  return (      
      <main className="flex-1 flex flex-col items-center justify-center px-4 py-10">
        <div className="w-full max-w-[480px] flex flex-col gap-5">
          <div className="bg-white rounded-2xl shadow-sm border border-gray-100 px-7 sm:px-10 py-8 sm:py-10 flex flex-col gap-6">
            
            <div className="text-center flex flex-col gap-1">
              <div className="flex flex-row items-center text-center gap-1 justify-center">
              <Image
              src="/Puyota-Logo.png"
              alt="PuyoTa Logo"
              width={80}
              height={80}
              className="align-middle"
            />
            <span className="text-[30px] font-semibold">
              PuyoTa
            </span>
            </div>
              <h1 className="text-lg font-semibold text-gray-900 tracking-tight">
                Welcome back, let&apos;s get you signed in.
              </h1>
              <p className="text-[12px] text-gray-500">
                Access your dashboard. Explore or manage verified listings in Cebu City.
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
  );
}
