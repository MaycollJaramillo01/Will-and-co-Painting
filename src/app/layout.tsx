import type { Metadata } from "next";
import { Barlow_Condensed, Manrope } from "next/font/google";
import type { ReactNode } from "react";
import { CallBubble } from "@/components/call-bubble";
import { GoogleAdsTag } from "@/components/google-ads-tag";
import { LocalBusinessSchema } from "@/components/local-business-schema";
import { SiteFooter } from "@/components/site-footer";
import { SiteHeader } from "@/components/site-header";
import { WhatsAppBubble } from "@/components/whatsapp-bubble";
import { business, siteUrl } from "@/config/business";
import "./globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin"],
  display: "swap",
});

const barlowCondensed = Barlow_Condensed({
  variable: "--font-barlow-condensed",
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Painting Services in Madison, WI | Wil & Co. Painting",
    template: "%s | Wil & Co. Painting",
  },
  description:
    "Residential and commercial painting, drywall, pressure washing, deck staining, cabinet staining, and wallpaper installation in Madison, WI.",
  applicationName: business.businessName,
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteUrl,
    siteName: business.businessName,
    title: "Painting Services in Madison, WI | Wil & Co. Painting",
    description:
      "Local residential and commercial painting services for Madison, Wisconsin and surrounding areas.",
    images: [
      {
        url: "/images/projects/residential-exterior.jpg",
        width: 1600,
        height: 2000,
        alt: "Residential exterior painting by Wil & Co. Painting",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Wil & Co. Painting | Madison, WI",
    description:
      "Residential and commercial painting services in Madison, Wisconsin.",
    images: ["/images/projects/residential-exterior.jpg"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html
      lang="en-US"
      className={`${manrope.variable} ${barlowCondensed.variable}`}
    >
      <head>
        <GoogleAdsTag />
      </head>
      <body>
        <a className="skip-link" href="#main-content">
          Skip to main content
        </a>
        <LocalBusinessSchema />
        <SiteHeader />
        {children}
        <SiteFooter />
        <CallBubble />
        <WhatsAppBubble />
      </body>
    </html>
  );
}
