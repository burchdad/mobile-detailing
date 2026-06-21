import type { Metadata } from "next";
import Image from "next/image";
import { BrandHero, FinalLuxuryCta } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Gallery | A&S Detailing",
  description: "A&S Detailing gallery featuring East Texas vehicle preservation, interior restoration, paint enhancement, and client media.",
  alternates: { canonical: "/gallery" },
};

const gallery = [
  { title: "Interior Restoration", image: "/media/as-suv-interior.png", copy: "Leather, console, touchpoints, and cabin presentation returned to a cared-for standard." },
  { title: "Client Transformation Set", image: "/media/as-client-collage.png", copy: "Real vehicle documentation across paint, wheels, trim, carpets, and cabin surfaces." },
  { title: "A&S Service Standard", image: "/media/as-service-guide.jpg", copy: "Current client collateral preserved as proof of offer depth while the brand moves into preservation." },
];

export default function GalleryPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Gallery"
        title="Craftsmanship You Can Inspect"
        intro="A premium gallery should help owners see the quality of the work, the care in the surfaces, and the consistency behind the A&S standard."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-3">
          {gallery.map((item, index) => (
            <article key={item.title} className={index === 0 ? "lg:col-span-2" : ""}>
              <div className={`relative overflow-hidden rounded-[8px] bg-black ${index === 0 ? "min-h-[620px]" : "min-h-[360px]"}`}>
                <Image src={item.image} alt={item.title} fill className="object-cover opacity-[0.82]" sizes={index === 0 ? "(min-width: 1024px) 66vw, 100vw" : "(min-width: 1024px) 33vw, 100vw"} />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.72))]" />
                <div className="absolute bottom-7 left-7 right-7">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-neon-pink">{String(index + 1).padStart(2, "0")}</p>
                  <h2 className="mt-3 text-4xl font-black tracking-tight md:text-5xl">{item.title}</h2>
                  <p className="mt-4 max-w-xl text-lg leading-relaxed text-white/64">{item.copy}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>
      <FinalLuxuryCta />
    </main>
  );
}
