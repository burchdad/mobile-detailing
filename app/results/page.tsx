import type { Metadata } from "next";
import Image from "next/image";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Results Gallery | A&S Detailing",
  description: "Luxury project gallery for A&S Detailing transformations, including paint corrections, ceramic coatings, trucks, daily drivers, and interiors.",
  alternates: { canonical: "/results" },
};

const projects = [
  {
    vehicle: "Premium SUV Cabin",
    services: "Interior restoration",
    time: "Leather, console, carpet, trim",
    outcome: "Cabin presentation restored with a cleaner, warmer ownership feel.",
    image: "/media/as-suv-interior.png",
  },
  {
    vehicle: "Genesis + GMC Detail Set",
    services: "Interior and exterior media set",
    time: "Client-documented proof",
    outcome: "Real photos across wheels, trim, cup holders, leather, exterior panels, and cabin surfaces.",
    image: "/media/as-client-collage.png",
  },
  {
    vehicle: "A&S Package Reference",
    services: "Service collateral",
    time: "Express and executive tiers",
    outcome: "Existing package sheet preserved for reference while the website carries the premium brand system.",
    image: "/media/as-service-guide.jpg",
  },
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
          {projects.map((project) => (
            <article key={project.vehicle} className="grid gap-8 py-12 first:pt-0 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-black">
                <Image src={project.image} alt={project.vehicle} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" />
              </div>
              <div>
                <p className="eyebrow mb-4 text-neon-pink">{project.services}</p>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">{project.vehicle}</h2>
                <div className="mt-6 grid gap-4 text-lg text-white/62 md:grid-cols-2">
                  <p>{project.time}</p>
                  <p>{project.outcome}</p>
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
