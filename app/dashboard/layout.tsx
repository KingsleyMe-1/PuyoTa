/**
 * Dashboard layout — intentionally bare.
 * The sidebar inside TenantDashboardClient replaces the main Navbar,
 * so we do NOT include <Navbar /> here.
 */
export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
