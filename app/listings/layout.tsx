import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

const NAV_LINKS = [
  { label: "Apartments", href: "/listings" },
  { label: "Bedspaces", href: "/listings/bedspaces" },
  { label: "List Your Property", href: "/landlords" },
];

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <Navbar navLinks={NAV_LINKS} />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
