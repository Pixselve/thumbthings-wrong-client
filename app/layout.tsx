import { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Thumbthing's wrong",
  description: "Thumbthing's wrong",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body className="bg-black">
        <main
          style={{ height: "100dvh" }}
          className="max-w-2xl bg-white m-auto overflow-hidden"
        >
          {children}
        </main>
      </body>
    </html>
  );
}
