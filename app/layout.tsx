import type { Metadata } from "next";
import localFont from "next/font/local";
import { siteUrl } from "@/lib/site";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "A&S Detailing | East Texas Vehicle Preservation",
  description:
    "East Texas vehicle preservation, ceramic protection, paint enhancement, interior restoration, and concierge maintenance for owners who expect specialist care.",
  keywords: [
    "mobile auto detailing Tyler TX",
    "car detailing Tyler TX",
    "ceramic coating Tyler TX",
    "paint correction Tyler TX",
    "East Texas vehicle preservation",
    "mobile detailing East Texas",
  ],
  openGraph: {
    title: "A&S Detailing | East Texas Vehicle Preservation",
    description:
      "Protection-led vehicle preservation, ceramic protection, paint enhancement, and long-term vehicle care across East Texas.",
    url: siteUrl,
    siteName: "A&S Mobile Detail",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "A&S Detailing | East Texas Vehicle Preservation",
    description:
      "Specialist vehicle preservation, ceramic protection, paint enhancement, and concierge maintenance in East Texas.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "A&S Detailing",
    url: siteUrl,
    description: "Premium East Texas vehicle preservation, mobile detailing, paint correction, ceramic coatings, and ongoing appearance care.",
  };

  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }} />
        {children}
      </body>
    </html>
  );
}
