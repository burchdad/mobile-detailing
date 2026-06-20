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
        intro="This is the beginning of the preservation relationship: vehicle information, condition, desired services, photo context, and a consultation request."
        cta="Begin Below"
        ctaHref="#booking"
      />
      <Booking />
    </main>
  );
}
