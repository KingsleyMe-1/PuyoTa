import Navbar from "@/app/components/Navbar";
import Footer from "@/app/components/Footer";

export default function DistrictsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 bg-white">{children}</main>
    </div>
  );
}
