import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";

const service = servicePages["mobile-detailing"];

export const metadata: Metadata = {
  title: "Concierge Maintenance | A&S Detailing",
  description: service.intro,
  alternates: { canonical: "/services/mobile-detailing" },
};

export default function MobileDetailingServicePage() {
  return (
    <BrandPage
      hero={{ eyebrow: service.eyebrow, title: service.title, intro: service.intro }}
      blocks={service.blocks}
      feature={{ eyebrow: "Service Includes", title: "A mobile process built around protection", body: "The service is tailored after the vehicle is assessed.", points: [...service.points] }}
    />
  );
}
