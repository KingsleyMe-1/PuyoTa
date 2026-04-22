export default function SignUpLayout({
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
