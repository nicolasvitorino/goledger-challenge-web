import type { Metadata } from "next";
import "../styles/globals.css";

export const metadata: Metadata = {
  title: "GoLedger Challenge Web",
  description: "IMDB-like app for TV Shows, Seasons, Episodes and Watchlists",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
