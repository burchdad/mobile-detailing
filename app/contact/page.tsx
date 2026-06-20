import type { Metadata } from "next";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Contact | A&S Detailing",
  description: "Contact A&S Detailing for premium mobile detailing, paint correction, ceramic coatings, and vehicle preservation services in East Texas.",
  alternates: { canonical: "/contact" },
};

export default function ContactPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Contact"
        title="Start The Conversation"
        intro="Reach out when you want the right service path, not a rushed package. A&S will confirm fit, expectations, and timing before the appointment."
      />
      <SplitFeature
        eyebrow="Contact Paths"
        title="Refined, direct, low-pressure"
        body="The best next step is an assessment request, but direct contact remains available for existing clients, fleet inquiries, and partnership conversations."
        points={["Request a vehicle assessment", "Ask about preservation programs", "Discuss fleet care or specialty vehicles"]}
      />
      <FinalLuxuryCta />
    </main>
  );
}
