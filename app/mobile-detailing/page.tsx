import type { Metadata } from "next";
import { cityLandingData } from "@/lib/landingData";
import { siteUrl } from "@/lib/site";

export const metadata: Metadata = {
  title: "Mobile Detailing Service Areas | A&S Mobile Detail",
  description:
    "Explore all East Texas service areas for A&S Mobile Detail. Find your city page for local detailing, ceramic coating, and paint correction options.",
  keywords: [
    "mobile detailing service areas East Texas",
    "Tyler mobile detailing",
    "Longview mobile detailing",
    "ceramic coating East Texas cities",
  ],
  alternates: {
    canonical: "/mobile-detailing",
  },
};

export default function MobileDetailingIndexPage() {
  const cityIndexSchema = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    itemListElement: cityLandingData.map((city, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: `${city.city}, ${city.region}`,
      url: `${siteUrl}/mobile-detailing/${city.slug}`,
    })),
  };

  return (
    <main className="min-h-screen bg-deep-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(cityIndexSchema) }} />
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-70" />
        <div className="absolute top-[16%] left-[8%] w-[520px] h-[260px] bg-neon-pink/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[16%] right-[8%] w-[520px] h-[260px] bg-neon-blue/10 rounded-full blur-[130px]" />

        <div className="relative z-10 w-full px-5 md:px-8">
          <div className="mx-auto max-w-7xl">
            <p className="eyebrow text-neon-blue mb-4">Service Area Directory</p>
            <div className="section-line mb-6" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">Mobile Detailing Cities We Cover</h1>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed mb-10">
              Choose your city to view local booking context, service focus, and detailed frequently asked questions.
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-4">
              {cityLandingData.map((city) => (
                <a
                  key={city.slug}
                  href={`/mobile-detailing/${city.slug}`}
                  className="glass rounded-2xl border border-white/10 p-5 hover:border-neon-blue/40 transition-colors"
                >
                  <p className="text-white font-semibold text-xl">
                    {city.city}, {city.region}
                  </p>
                  <p className="text-white/45 text-sm mt-2">{city.localAngle}</p>
                </a>
              ))}
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/assessment"
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
              >
                Request Assessment
              </a>
              <a
                href="/#services"
                className="px-6 py-3.5 rounded-xl font-bold text-white/80 glass border border-white/15 hover:border-neon-blue/40 transition-colors"
              >
                View Services
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
