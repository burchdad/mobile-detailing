import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Fleet Detailing | A&S Mobile Detail",
  description:
    "Recurring fleet detailing in East Texas with consistent quality standards, scheduling windows, and business-focused service plans.",
  keywords: [
    "fleet detailing Tyler TX",
    "commercial vehicle detailing East Texas",
    "mobile fleet wash and detail",
    "business vehicle detailing service",
  ],
  alternates: {
    canonical: "/fleet-detailing",
  },
};

export default function FleetDetailingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Fleet Detailing",
    provider: {
      "@type": "AutoDetailing",
      name: "A&S Mobile Detail",
      url: siteUrl,
    },
    areaServed: "East Texas",
    serviceType: "Recurring commercial vehicle detailing",
    url: `${siteUrl}/fleet-detailing`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "Can you service multiple vehicles on a recurring schedule?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We set up recurring plans for multi-vehicle fleets with predefined quality standards and scheduling windows.",
        },
      },
      {
        "@type": "Question",
        name: "Do you offer custom fleet pricing?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. Pricing is customized based on vehicle count, service frequency, and detail depth required.",
        },
      },
    ],
  };

  return (
    <main className="min-h-screen bg-deep-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-70" />
        <div className="absolute top-[12%] right-[8%] w-[520px] h-[280px] bg-neon-green/10 rounded-full blur-[140px]" />

        <div className="relative z-10 w-full px-5 md:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow text-neon-green mb-4">Service Page</p>
            <div className="section-line mb-6 bg-gradient-to-r from-neon-green to-neon-blue" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Fleet Detailing Built for Business Operations</h1>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              Keep your company vehicles consistently clean, protected, and client-ready with recurring mobile fleet detailing built around your business hours.
            </p>

            <div className="mt-10 grid md:grid-cols-2 gap-4">
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-neon-green font-black text-lg">Operational Fit</p>
                <p className="text-white/70 text-sm mt-2">Flexible windows for offices, lots, and job sites with predictable cycle scheduling.</p>
              </div>
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-neon-green font-black text-lg">Quality Standard</p>
                <p className="text-white/70 text-sm mt-2">Documented detail checklist across every vehicle to maintain consistency and brand appearance.</p>
              </div>
            </div>

            <a
              href="/#booking"
              className="inline-flex mt-10 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-green to-neon-blue shadow-neon-green-sm"
            >
              Request Fleet Plan
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
