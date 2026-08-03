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
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Poppins:wght..300;400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins antialiased bg-beige text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}
