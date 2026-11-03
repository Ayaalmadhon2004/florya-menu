import type { Metadata, Viewport } from "next";
import "./globals.css";
import { restaurant } from "../config/restaurant";

export const metadata: Metadata = {
  title: `${restaurant.name.ar} | ${restaurant.name.en} | القائمة الرقمية`,
  description: `${restaurant.tagline.ar}. اطلب من جوالك وابعت طلبك على واتساب.`,
  openGraph: {
    title: `${restaurant.name.ar} | القائمة الرقمية`,
    description: restaurant.tagline.ar,
    type: "website",
    locale: "ar_SA",
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: restaurant.themeColor,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={restaurant.defaultLang} dir={restaurant.defaultLang === "ar" ? "rtl" : "ltr"} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Amiri:wght@400;700&family=Cairo:wght@400;500;600;700&family=Playfair+Display:wght@500;700&family=Poppins:wght@400;500;600;700&display=swap" rel="stylesheet" />
      </head>
      <body className="font-poppins antialiased bg-beige text-text-primary min-h-screen">
        {children}
      </body>
    </html>
  );
}