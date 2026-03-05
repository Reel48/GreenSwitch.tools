import type { Metadata } from "next";
import { Inter, Geist_Mono } from "next/font/google";
import { TooltipProvider } from "@/components/ui/tooltip";
import { TRPCProvider } from "@/lib/trpc/react";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { OrganizationSchema } from "@/components/seo/organization-schema";
import { GoogleAnalytics } from "@/components/analytics/google-analytics";
import { AdSense } from "@/components/ads/adsense";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "GoGreenCalc — Free Clean Energy Calculators",
    template: "%s | GoGreenCalc",
  },
  description:
    "Free calculators for EV costs, solar payback, heat pump savings, and clean energy tax credits. Make smarter green energy decisions with real data.",
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://gogreencalc.com"
  ),
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "GoGreenCalc",
  },
  twitter: {
    card: "summary_large_image",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <OrganizationSchema />
      </head>
      <body
        className={`${inter.variable} ${geistMono.variable} font-sans antialiased`}
      >
        <GoogleAnalytics />
        <AdSense />
        <TRPCProvider>
          <TooltipProvider>
            <div className="flex min-h-screen flex-col">
              <Header />
              <main className="flex-1">{children}</main>
              <Footer />
            </div>
          </TooltipProvider>
        </TRPCProvider>
      </body>
    </html>
  );
}
