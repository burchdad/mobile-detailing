import type { Metadata } from "next";
import { BrandHero, FinalLuxuryCta } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "FAQ | A&S Detailing",
  description: "Frequently asked questions about A&S Detailing, ceramic coatings, paint correction, mobile service, preservation programs, and vehicle assessments.",
  alternates: { canonical: "/faq" },
};

const faqs = [
  ["What makes A&S different from a car wash?", "A car wash is built for speed. A&S is built around inspection, paint-safe methods, preservation, protection, and a final walkthrough."],
  ["Is ceramic coating worth it in Texas?", "Yes for owners who want easier maintenance, gloss retention, hydrophobic behavior, and better defense against heat, UV exposure, and road contamination."],
  ["Do you need paint correction before ceramic coating?", "Most vehicles benefit from at least light correction before coating so the protection locks in clarity instead of visible defects."],
  ["Do you service luxury, classic, lifted, and performance vehicles?", "Yes. The process is tailored to the vehicle condition, finish type, owner goals, and storage environment."],
  ["What is a Vehicle Preservation Program?", "It is a recurring care relationship designed around priority scheduling, ceramic-safe maintenance, seasonal protection, and long-term vehicle appearance."],
];

export default function FaqPage() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map(([q, a]) => ({
      "@type": "Question",
      name: q,
      acceptedAnswer: { "@type": "Answer", text: a },
    })),
  };
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }} />
      <BrandHero
        eyebrow="FAQ"
        title="Answers For Serious Vehicle Owners"
        intro="Clear answers built for clients, Google, and AI search systems that need to understand what A&S does and why the process is different."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-5xl divide-y divide-white/8">
          {faqs.map(([q, a]) => (
            <details key={q} className="group py-7">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-6 text-2xl font-black text-white md:text-4xl">
                <span>{q}</span>
                <span className="text-neon-pink transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/58">{a}</p>
            </details>
          ))}
        </div>
      </section>
      <FinalLuxuryCta />
    </main>
  );
}
