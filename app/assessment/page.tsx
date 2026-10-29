import type { Metadata } from "next";
import { readIntakeConfig } from "@/lib/assessment-intake";
import Booking from "@/components/Booking";
import { BrandHero } from "@/components/BrandPlatform";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Request Your Vehicle Assessment | A&S Detailing",
  description: "Request a luxury vehicle assessment for A&S Detailing mobile detailing, paint correction, ceramic coating, interior restoration, and preservation programs.",
  alternates: { canonical: "/assessment" },
};

export default function AssessmentPage() {
  const available = readIntakeConfig(process.env) !== null;
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Assessment"
        title="Request Your Vehicle Assessment"
        intro={available ? "Tell us about your vehicle and service needs. A&S will confirm details and availability directly with you." : "Online assessment requests are temporarily unavailable. Use the contact options below to discuss your vehicle."}
        cta={available ? "Begin Below" : "View Contact Options"}
        ctaHref="#booking"
      />
      <Booking available={available} />
    </main>
  );
}
