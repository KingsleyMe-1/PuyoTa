import type { Metadata } from "next";
import { SignUpFlow } from "./components/SignUpFlow";

export const metadata: Metadata = {
  title: "Create an Account — PuyoTa",
  description:
    "Join PuyoTa to access verified rental listings in Cebu City. Find your next home with no ghosting and no fake prices.",
};

export default function SignUpPage() {
  return (

      <main className="flex-1 flex flex-col items-center justify-center py-10">
        <SignUpFlow />
      </main>

  );
}
