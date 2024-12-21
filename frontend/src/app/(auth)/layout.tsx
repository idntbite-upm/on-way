export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-[480px] w-full px-4">{children}</div>
    </div>
  );
}
