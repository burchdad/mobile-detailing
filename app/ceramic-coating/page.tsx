import type { Metadata } from "next";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Ceramic Coating | A&S Mobile Detail",
  description:
    "Professional ceramic coating in East Texas with full prep, correction options, and long-term hydrophobic paint protection.",
  keywords: [
    "ceramic coating Tyler TX",
    "mobile ceramic coating East Texas",
    "paint protection coating",
    "hydrophobic ceramic coat",
  ],
  alternates: {
    canonical: "/ceramic-coating",
  },
};

export default function CeramicCoatingPage() {
  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ceramic Coating",
    provider: {
      "@type": "AutoDetailing",
      name: "A&S Mobile Detail",
      url: siteUrl,
    },
    areaServed: "East Texas",
    serviceType: "Ceramic coating and paint protection",
    url: `${siteUrl}/ceramic-coating`,
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does ceramic coating last?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Our coating packages are typically built around 2 to 5 year durability depending on prep level and coating tier.",
        },
      },
      {
        "@type": "Question",
        name: "Do I need paint correction before ceramic coating?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Most vehicles benefit from at least light correction first so the coating locks in clarity rather than locking in defects.",
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
        <div className="absolute top-[14%] left-[10%] w-[500px] h-[260px] bg-neon-blue/10 rounded-full blur-[130px]" />

        <div className="relative z-10 w-full px-5 md:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow text-neon-blue mb-4">Service Page</p>
            <div className="section-line mb-6" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Ceramic Coating That Keeps Your Finish Elite</h1>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              Our coating process combines paint-safe decontamination, correction-ready prep, and pro-grade ceramic installation so your vehicle stays glossier and easier to maintain.
            </p>

            <div className="mt-10 grid md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-neon-blue font-black text-lg">Step 1</p>
                <p className="text-white/70 text-sm mt-2">Decon wash and surface prep</p>
              </div>
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-neon-blue font-black text-lg">Step 2</p>
                <p className="text-white/70 text-sm mt-2">Paint correction as needed</p>
              </div>
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-neon-blue font-black text-lg">Step 3</p>
                <p className="text-white/70 text-sm mt-2">Ceramic install and cure guidance</p>
              </div>
            </div>

            <a
              href="/#booking"
              className="inline-flex mt-10 px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
            >
              Get Ceramic Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
