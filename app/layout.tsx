import "./globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black h-screen">
        <main className="max-w-2xl bg-white m-auto h-full">{children}</main>
      </body>
    </html>
  );
}
