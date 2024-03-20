import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Testing",
  description: "7 solutions frontend assignment",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body suppressHydrationWarning={true}>{children}</body>
    </html>
  );
}
