import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import ClientLayout from "./ClientLayout";

const cormorant = Cormorant_Garamond({
  variable: "--font-serif",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  style: ["normal", "italic"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-sans",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#222222",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export const metadata: Metadata = {
  title: "Nancy's Boutique | Pitch Culture Meets Elevated Elegance",
  description:
    "Discover authentic football jerseys styled with chic women's fashion. Club kits, national teams, athleisure, and luxury casualwear — curated for the modern woman.",
  manifest: "/manifest.webmanifest",
  appleWebApp: {
    capable: true,
    statusBarStyle: "black-translucent",
    title: "Nancy's Boutique",
  },
  icons: {
    icon: [
      { url: "/logo.jpg", type: "image/jpeg" },
      { url: "/icons/icon-192.jpg", sizes: "192x192", type: "image/jpeg" },
    ],
    shortcut: "/logo.jpg",
    apple: "/apple-icon.jpg",
  },
  keywords: [
    "football jerseys",
    "women's fashion",
    "soccer jerseys",
    "athleisure",
    "streetwear",
    "luxury casualwear",
    "Nancy's Boutique",
  ],
  openGraph: {
    title: "Nancy's Boutique | Pitch Culture Meets Elevated Elegance",
    description:
      "Authentic football jerseys styled for the modern woman. Shop club kits, national teams, and luxury apparel.",
    type: "website",
    siteName: "Nancy's Boutique",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning className={`${cormorant.variable} ${jakarta.variable} h-full antialiased`}>
      <body suppressHydrationWarning className="min-h-full flex flex-col bg-cream text-charcoal">
        <ClientLayout>{children}</ClientLayout>
      </body>
    </html>
  );
}
