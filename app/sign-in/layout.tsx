export default function SignInLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="min-h-dvh flex flex-col"
      style={{ background: "var(--color-listings-bg)" }}
    >
      {children}
    </div>
  );
}
