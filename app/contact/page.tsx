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
        cta="View Contact Options"
        ctaHref="#contact-options"
      />
      <section id="contact-options" className="section-pad px-5 md:px-8" aria-labelledby="contact-options-title">
        <div className="mx-auto max-w-5xl">
          <h2 id="contact-options-title" className="text-3xl font-black text-white">Contact A&amp;S</h2>
          <p className="mt-4 text-white/70">Online assessment requests are temporarily unavailable. You can use the phone and email listed below.</p>
          <div className="mt-7 grid gap-4 sm:grid-cols-2">
            <a href="tel:+19033308955" className="rounded-xl border border-white/20 p-6 transition-colors hover:border-neon-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <span className="block text-sm text-white/60">Phone</span>
              <span className="mt-2 block text-xl font-bold">(903) 330-8955</span>
            </a>
            <a href="mailto:hello@asmobiledetail.com" className="rounded-xl border border-white/20 p-6 transition-colors hover:border-neon-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
              <span className="block text-sm text-white/60">Email</span>
              <span className="mt-2 block break-all text-xl font-bold">hello@asmobiledetail.com</span>
            </a>
          </div>
        </div>
      </section>
      <SplitFeature
        eyebrow="Contact Paths"
        title="Refined, direct, low-pressure"
        body="Contact A&S to discuss a vehicle assessment, existing client care, fleet inquiries, or partnership conversations."
        points={["Request a vehicle assessment", "Ask about preservation programs", "Discuss fleet care or specialty vehicles"]}
      />
      <FinalLuxuryCta />
    </main>
  );
}
