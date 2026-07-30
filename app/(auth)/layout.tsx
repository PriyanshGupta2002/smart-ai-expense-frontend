export default function AuthLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <main className="flex  items-center min-h-screen justify-center">
      {children}
    </main>
  );
}
