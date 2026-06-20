import type { Metadata } from "next";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Results Gallery | A&S Detailing",
  description: "Luxury project gallery for A&S Detailing transformations, including paint corrections, ceramic coatings, trucks, daily drivers, and interiors.",
  alternates: { canonical: "/results" },
};

const projects = [
  ["Black Performance Sedan", "Paint correction + ceramic coating", "9 hours invested", "Mirror depth restored and protected"],
  ["Lifted Truck", "Decontamination + coating maintenance", "1 day invested", "Hydrophobic finish recovered"],
  ["Family SUV", "Interior restoration", "5 hours invested", "Cabin reset with odor reduction"],
  ["Luxury Daily Driver", "Signature detail", "4 hours invested", "Owner-ready presentation restored"],
];

export default function ResultsPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Results"
        title="Transformations With Context"
        intro="A premium result is more than before and after. It is the vehicle, the process, the time invested, and the outcome the owner can feel."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl divide-y divide-white/8">
          {projects.map(([vehicle, services, time, outcome]) => (
            <article key={vehicle} className="grid gap-8 py-12 first:pt-0 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="aspect-[16/10] overflow-hidden rounded-[8px] bg-[linear-gradient(135deg,rgba(255,255,255,0.08),rgba(0,0,0,0.2)),radial-gradient(circle_at_30%_30%,rgba(200,169,106,0.16),transparent_42%)]" />
              <div>
                <p className="eyebrow mb-4 text-neon-pink">{services}</p>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">{vehicle}</h2>
                <div className="mt-6 grid gap-4 text-lg text-white/62 md:grid-cols-2">
                  <p>{time}</p>
                  <p>{outcome}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <SplitFeature
        eyebrow="Gallery Categories"
        title="Built for proof, not decoration"
        body="The results page is structured to grow with real client photos, project writeups, and category filters as A&S builds the library."
        points={["Luxury vehicles", "Trucks and daily drivers", "Paint, coating, and interior transformations"]}
      />
      <FinalLuxuryCta />
    </main>
  );
}
