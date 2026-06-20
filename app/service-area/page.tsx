import type { Metadata } from "next";
import Link from "next/link";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";
import { cityLandingData } from "@/lib/landingData";

export const metadata: Metadata = {
  title: "East Texas Service Area | A&S Detailing",
  description: "A&S Detailing service area for Tyler, Whitehouse, Lindale, Bullard, Flint, Longview, and surrounding East Texas communities.",
  alternates: { canonical: "/service-area" },
};

export default function ServiceAreaPage() {
  const featured = cityLandingData.filter((city) => ["tyler-tx", "whitehouse-tx", "lindale-tx", "bullard-tx", "flint-tx", "longview-tx"].includes(city.slug));
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="East Texas"
        title="Mobile Preservation Across The Region"
        intro="Coverage is planned around route quality, appointment expectations, travel fit, and the level of care each vehicle deserves."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.48fr_0.52fr]">
          <div className="aspect-square rounded-[8px] bg-[linear-gradient(135deg,rgba(255,255,255,0.05),rgba(0,0,0,0.2)),radial-gradient(circle_at_45%_45%,rgba(200,169,106,0.2),transparent_24%),radial-gradient(circle_at_70%_35%,rgba(138,164,173,0.16),transparent_20%)]" />
          <div className="divide-y divide-white/8">
            {featured.map((city) => (
              <Link key={city.slug} href={`/mobile-detailing/${city.slug}`} className="block py-6 first:pt-0">
                <h2 className="text-3xl font-black text-white">{city.city}, {city.region}</h2>
                <p className="mt-2 text-white/56">{city.localAngle}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <SplitFeature
        eyebrow="Travel Policy"
        title="Coverage with expectations"
        body="A&S prioritizes quality service windows over overextended route volume. Distance, service depth, and scheduling are confirmed before the appointment."
        points={["Tyler-centered routes", "Local testimonials and FAQs on city pages", "Travel fit confirmed during assessment"]}
      />
      <FinalLuxuryCta />
    </main>
  );
}
