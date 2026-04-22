import type { Metadata } from "next";
import TenantDashboardClient from "./components/TenantDashboardClient";

export const metadata: Metadata = {
  title: "Dashboard — PuyoTa",
  description:
    "Your tenant dashboard on PuyoTa. Manage saved listings, messages, and your verification status.",
};

export default function DashboardPage() {
  return <TenantDashboardClient />;
}
