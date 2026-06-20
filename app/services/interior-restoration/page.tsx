import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";

const service = servicePages["interior-restoration"];

export const metadata: Metadata = {
  title: "Interior Restoration | A&S Detailing",
  description: service.intro,
  alternates: { canonical: "/services/interior-restoration" },
};

export default function InteriorRestorationPage() {
  return (
    <BrandPage
      hero={{ eyebrow: service.eyebrow, title: service.title, intro: service.intro }}
      blocks={service.blocks}
      feature={{ eyebrow: "Cabin Process", title: "Materials handled with intention", body: "Interior restoration is selected around use, material, odor, and condition.", points: [...service.points] }}
    />
  );
}
