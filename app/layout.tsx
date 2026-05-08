import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "A&S Mobile Detail | Elite Mobile Auto Detailing Tyler TX",
  description:
    "Premium mobile auto detailing in Tyler TX and East Texas. Ceramic coating, paint correction, interior restoration — delivered to your door. Book online today.",
  keywords: [
    "mobile auto detailing Tyler TX",
    "car detailing Tyler TX",
    "ceramic coating Tyler TX",
    "interior car detailing Tyler TX",
    "paint correction Tyler TX",
    "mobile detailing East Texas",
  ],
  openGraph: {
    title: "A&S Mobile Detail | Elite Mobile Auto Detailing Tyler TX",
    description:
      "Showroom finish delivered to your door. Ceramic coating, paint correction & full detailing across East Texas.",
    type: "website",
    locale: "en_US",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
