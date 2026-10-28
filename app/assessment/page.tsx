import type { Metadata } from "next";
import Booking from "@/components/Booking";
import { BrandHero } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Request Your Vehicle Assessment | A&S Detailing",
  description: "Request a luxury vehicle assessment for A&S Detailing mobile detailing, paint correction, ceramic coating, interior restoration, and preservation programs.",
  alternates: { canonical: "/assessment" },
};

export default function AssessmentPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Assessment"
        title="Request Your Vehicle Assessment"
        intro="Call or email A&S to discuss your vehicle, its condition, and the services you need. Online assessment requests are temporarily unavailable."
        cta="Call or Email A&S"
        ctaHref="#booking"
      />
      <Booking />
    </main>
  );
}
