import Navbar from "@/app/components/Navbar";

export default function ListingsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col flex-1">
      <Navbar />
      <main className="flex-1 bg-gray-50">{children}</main>
    </div>
  );
}
