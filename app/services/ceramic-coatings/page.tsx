import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";
import { siteUrl } from "@/lib/site";

const service = servicePages["ceramic-coatings"];

export const metadata: Metadata = {
  title: "Ceramic Coatings | A&S Detailing",
  description: service.intro,
  alternates: { canonical: "/services/ceramic-coatings" },
};

export default function CeramicCoatingsPage() {
  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How long does ceramic coating last?",
        acceptedAnswer: { "@type": "Answer", text: "Longevity depends on coating tier, preparation, storage, driving habits, and maintenance cadence." },
      },
      {
        "@type": "Question",
        name: "Should paint correction happen before ceramic coating?",
        acceptedAnswer: { "@type": "Answer", text: "Most vehicles benefit from correction first so the coating protects a refined finish instead of locking in haze or swirl marks." },
      },
    ],
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: "Ceramic Coatings",
    provider: { "@type": "AutoDetailing", name: "A&S Detailing", url: siteUrl },
    url: `${siteUrl}/services/ceramic-coatings`,
    areaServed: "East Texas",
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <BrandPage
        hero={{ eyebrow: service.eyebrow, title: service.title, intro: service.intro }}
        blocks={service.blocks}
        feature={{ eyebrow: "Consultation CTA", title: "Protect the vehicle before Texas does damage", body: "Ceramic coating is best planned after condition, correction needs, and maintenance expectations are clear.", points: [...service.points] }}
      />
    </>
  );
}
