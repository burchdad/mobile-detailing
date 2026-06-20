import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";

const service = servicePages["paint-correction"];

export const metadata: Metadata = {
  title: "Paint Correction | A&S Detailing",
  description: service.intro,
  alternates: { canonical: "/services/paint-correction" },
};

export default function PaintCorrectionPage() {
  return (
    <BrandPage
      hero={{ eyebrow: service.eyebrow, title: service.title, intro: service.intro }}
      blocks={service.blocks}
      feature={{ eyebrow: "Correction Path", title: "Clarity before protection", body: "Paint correction is often the bridge between a clean car and a finish that looks truly preserved.", points: [...service.points] }}
    />
  );
}
