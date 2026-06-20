import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";
import { servicePages } from "@/lib/brandPages";

export const metadata: Metadata = {
  title: "Services | A&S Detailing",
  description: "Explore A&S Detailing vehicle preservation services including mobile detailing, interior restoration, paint correction, ceramic coatings, and fleet care.",
  alternates: { canonical: "/services" },
};

export default function ServicesPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Services"
        title="Preservation, Protection, Pride"
        intro="A&S services are designed as ownership support, not one-off cleaning. Choose the path that matches your vehicle, condition, and long-term goals."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl divide-y divide-white/8">
          {Object.entries(servicePages).map(([slug, service]) => (
            <Link key={slug} href={`/services/${slug}`} className="group grid gap-8 py-12 first:pt-0 lg:grid-cols-[0.38fr_0.62fr]">
              <div>
                <p className="eyebrow text-neon-pink">{service.eyebrow}</p>
              </div>
              <div>
                <h2 className="text-4xl font-black tracking-tight text-white transition-colors group-hover:text-neon-pink md:text-6xl">{service.title}</h2>
                <p className="mt-5 max-w-3xl text-lg leading-relaxed text-white/58">{service.intro}</p>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <SplitFeature
        eyebrow="Internal Care Path"
        title="Every service leads to a smarter ownership plan"
        body="A&S connects detailing, restoration, protection, and maintenance so clients understand what their vehicle needs now and what protects it next."
        points={["Assessment before recommendation", "Dedicated service pages for education", "Preservation plans for recurring care"]}
      />
      <FinalLuxuryCta />
    </main>
  );
}
