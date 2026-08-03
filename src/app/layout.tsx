import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Florya - Digital Menu",
  description: "An unforgettable dining experience",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="font-poppins antialiased bg-beige text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
