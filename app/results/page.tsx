import type { Metadata } from "next";
import Image from "next/image";
import { BrandHero, FinalLuxuryCta, SplitFeature } from "@/components/BrandPlatform";
import { featuredProjects } from "@/lib/projectMedia";

export const metadata: Metadata = {
  title: "Results Gallery | A&S Detailing",
  description: "Luxury project gallery for A&S Detailing transformations, including paint corrections, ceramic coatings, trucks, daily drivers, and interiors.",
  alternates: { canonical: "/results" },
};

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
          {featuredProjects.map((project) => (
            <article key={project.title} className="grid gap-8 py-12 first:pt-0 lg:grid-cols-[0.42fr_0.58fr]">
              <div className="relative aspect-[16/10] overflow-hidden rounded-[8px] bg-black">
                <Image src={project.image} alt={project.vehicle} fill className="object-cover" sizes="(min-width: 1024px) 42vw, 100vw" />
              </div>
              <div>
                <p className="eyebrow mb-4 text-neon-pink">{project.category}</p>
                <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">{project.title}</h2>
                <div className="mt-6 grid gap-4 text-lg text-white/62 md:grid-cols-2">
                  <p>{project.vehicle}</p>
                  <p>{project.description}</p>
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
