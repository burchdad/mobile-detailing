import type { Metadata } from "next";
import Image from "next/image";
import { BrandHero, FinalLuxuryCta } from "@/components/BrandPlatform";
import { facebookEmbedUrl, facebookReels } from "@/lib/media";
import { galleryImages } from "@/lib/projectMedia";

export const metadata: Metadata = {
  title: "Media | A&S Detailing",
  description: "Watch A&S Detailing reels and client media showing the detailing process, interior restoration, mobile work, and vehicle preservation results.",
  alternates: { canonical: "/media" },
};

export default function MediaPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Media"
        title="Watch The Work"
        intro="A dedicated media library for A&S reels, process clips, owner-facing videos, and transformation proof."
        cta="Request Assessment"
        ctaHref="/assessment"
      />

      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 grid gap-8 lg:grid-cols-[0.42fr_0.58fr] lg:items-end">
            <div>
              <p className="eyebrow mb-5 text-neon-pink">Reel Library</p>
              <h2 className="text-5xl font-black leading-[0.94] tracking-tight text-white md:text-7xl">
                Process, Proof, And Real Client Context
              </h2>
            </div>
            <p className="max-w-2xl text-xl leading-relaxed text-white/56">
              Reels show the work in motion. Project photos show the standard after the tools are put away.
            </p>
          </div>

          <div className="grid gap-x-8 gap-y-16 sm:grid-cols-2 xl:grid-cols-3">
            {facebookReels.map((href, index) => (
              <article key={href} className="mx-auto w-full max-w-[330px]">
                <div className="relative">
                  <div className="absolute inset-0 translate-y-8 rounded-[30px] bg-black/70 blur-2xl" />
                  <div className="relative overflow-hidden rounded-[24px] border-[10px] border-[#141414] bg-black shadow-[0_30px_90px_rgba(0,0,0,0.62)]">
                    <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/12" />
                    <div className="relative aspect-[9/16] overflow-hidden bg-black">
                      <iframe
                        title={`A&S Detailing media reel ${index + 1}`}
                        src={facebookEmbedUrl(href)}
                        className="absolute inset-0 h-full w-full"
                        allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                        allowFullScreen
                        loading="lazy"
                      />
                    </div>
                    <div className="border-t border-white/10 bg-[#080808] px-4 py-3">
                      <a
                        href={href}
                        target="_blank"
                        rel="noreferrer"
                        className="flex items-center justify-between rounded-[6px] bg-white/[0.04] px-3 py-2 text-[10px] font-black uppercase tracking-[0.16em] text-white/72 transition-colors hover:bg-neon-pink/18 hover:text-white"
                      >
                        <span>Watch On Facebook</span>
                        <span className="text-neon-pink">Play</span>
                      </a>
                    </div>
                  </div>
                </div>
                <div className="mt-5 text-center">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-pink">Reel {String(index + 1).padStart(2, "0")}</p>
                  <p className="mt-2 text-sm font-semibold text-white/58">A&S mobile detail process clip</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-[#11110f] px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 max-w-4xl">
            <p className="eyebrow mb-5 text-neon-blue">Project Photo Library</p>
            <h2 className="text-5xl font-black leading-tight tracking-tight text-white md:text-6xl">
              Actual Vehicles. Actual Surfaces. Actual Proof.
            </h2>
          </div>
          <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-4">
            {galleryImages.slice(0, 8).map((item) => (
              <article key={item.title} className="group">
                <div className="relative aspect-[4/5] overflow-hidden rounded-[8px] bg-black">
                  <Image src={item.image} alt={item.title} fill className="object-cover opacity-[0.84] transition-transform duration-700 group-hover:scale-[1.035]" sizes="(min-width: 1280px) 25vw, (min-width: 768px) 50vw, 100vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(0,0,0,0.76))]" />
                  <div className="absolute bottom-5 left-5 right-5">
                    <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-pink">{item.category}</p>
                    <h3 className="mt-2 text-2xl font-black leading-tight text-white">{item.title}</h3>
                  </div>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <FinalLuxuryCta title="Ready For Your Vehicle To Be Next?" />
    </main>
  );
}
