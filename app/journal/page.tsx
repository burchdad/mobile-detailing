import type { Metadata } from "next";
import { BrandHero, FinalLuxuryCta } from "@/components/BrandPlatform";
import { journalArticles } from "@/lib/brandPages";

export const metadata: Metadata = {
  title: "Vehicle Care Journal | A&S Detailing",
  description: "A&S Detailing journal covering vehicle preservation, ceramic coating education, paint care, Texas climate protection, and customer spotlights.",
  alternates: { canonical: "/journal" },
};

export default function JournalPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Journal"
        title="A Magazine For Owners Who Care"
        intro="Education, protection guidance, customer spotlights, seasonal maintenance, and product insight built to keep clients returning monthly."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.36fr_0.64fr]">
          <div>
            <p className="eyebrow text-neon-pink">Categories</p>
            <div className="mt-8 space-y-4 text-xl font-semibold text-white/72">
              {["Vehicle Preservation", "Ceramic Education", "Paint Care", "Texas Climate", "Customer Spotlights", "Product Reviews"].map((category) => (
                <p key={category}>{category}</p>
              ))}
            </div>
          </div>
          <div className="divide-y divide-white/8">
            {journalArticles.map((article, index) => (
              <article key={article} className="py-8 first:pt-0">
                <p className="text-sm font-black uppercase tracking-[0.18em] text-neon-blue">Issue {String(index + 1).padStart(2, "0")}</p>
                <h2 className="mt-3 text-3xl font-black tracking-tight text-white md:text-5xl">{article}</h2>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalLuxuryCta title="Protect What You Are Learning To Maintain" />
    </main>
  );
}
