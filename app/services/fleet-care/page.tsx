import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";

const service = servicePages["fleet-care"];

export const metadata: Metadata = {
  title: "Fleet Care | A&S Detailing",
  description: service.intro,
  alternates: { canonical: "/services/fleet-care" },
};

export default function FleetCarePage() {
  return (
    <BrandPage
      hero={{ eyebrow: service.eyebrow, title: service.title, intro: service.intro }}
      blocks={service.blocks}
      feature={{ eyebrow: "Business Fit", title: "Appearance standards at operational scale", body: "Fleet care is designed around practical timing, consistent presentation, and professional trust.", points: [...service.points] }}
    />
  );
}
