import Navbar from "@/app/components/Navbar";

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
