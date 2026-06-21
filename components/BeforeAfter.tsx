"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { facebookEmbedUrl, homepageReels } from "@/lib/media";
import { featuredProjects, projectImages } from "@/lib/projectMedia";

const projects = [
  {
    label: "Interior Restoration",
    vehicle: "King Ranch Leather Cabin",
    time: "Leather, console, carpets, touchpoints",
    outcome: "Warm leather and high-touch cabin areas restored with a cleaner, more cared-for ownership feel.",
    image: projectImages.fordCabinWide,
    featured: true,
  },
  {
    label: featuredProjects[0].category,
    vehicle: featuredProjects[0].vehicle,
    time: featuredProjects[0].title,
    outcome: featuredProjects[0].description,
    image: featuredProjects[0].image,
  },
  {
    label: featuredProjects[1].category,
    vehicle: featuredProjects[1].vehicle,
    time: featuredProjects[1].title,
    outcome: featuredProjects[1].description,
    image: featuredProjects[1].image,
  },
];

function ReelFrame({ href, index }: { href: string; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 34, rotate: index === 0 ? -4 : 4 }}
      whileInView={{ opacity: 1, y: 0, rotate: index === 0 ? -3 : 3 }}
      viewport={{ once: true }}
      transition={{ delay: index * 0.12, duration: 0.7, ease: "easeOut" }}
      className="relative mx-auto w-full max-w-[310px]"
    >
      <div className="absolute inset-0 translate-y-8 rounded-[30px] bg-black/70 blur-2xl" />
      <div className="relative overflow-hidden rounded-[24px] border-[10px] border-[#141414] bg-black shadow-[0_30px_90px_rgba(0,0,0,0.62)]">
        <div className="absolute left-1/2 top-2 z-20 h-1.5 w-16 -translate-x-1/2 rounded-full bg-white/12" />
        <div className="relative aspect-[9/16] overflow-hidden bg-black">
          <iframe
            title={`A&S Detailing Facebook reel ${index + 1}`}
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
    </motion.div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="relative overflow-hidden bg-surface px-5 py-20 md:px-8 md:py-36">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute left-[-14%] top-[22%] h-[620px] w-[620px] rounded-full bg-neon-blue/7 blur-[170px]" />
      <div className="absolute right-[-14%] bottom-[4%] h-[580px] w-[580px] rounded-full bg-neon-pink/7 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-8 lg:grid-cols-[0.52fr_0.48fr] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5 text-neon-blue">Craftsmanship Proof</p>
            <h2 className="max-w-5xl text-[clamp(2.35rem,11vw,6.4rem)] font-black leading-[1] tracking-tight text-white md:leading-[0.96]">
              Results That Make The Vehicle Feel Cared For Again
            </h2>
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-white/58 md:text-2xl">
            Real client media matters because premium owners want evidence. Surfaces, trim, leather, paint, wheels, and touchpoints all tell the story of the standard.
          </p>
        </motion.div>

        <div className="mt-12 grid gap-5 md:mt-18 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative min-h-[430px] overflow-hidden rounded-[8px] bg-black md:min-h-[640px]"
          >
            <Image
              src={projects[0].image}
              alt={`${projects[0].vehicle} ${projects[0].label}`}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-[1.025]"
              sizes="(min-width: 1024px) 58vw, 100vw"
              priority
            />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.05),rgba(0,0,0,0.72))]" />
            <div className="absolute bottom-0 left-0 right-0 p-7 md:p-9">
              <p className="eyebrow mb-3 text-neon-pink">{projects[0].label}</p>
              <h3 className="text-3xl font-black tracking-tight text-white md:text-6xl">{projects[0].vehicle}</h3>
              <p className="mt-3 max-w-2xl text-sm leading-relaxed text-white/68 md:mt-4 md:text-lg">{projects[0].outcome}</p>
            </div>
          </motion.article>

          <div className="grid gap-5">
            {projects.slice(1).map((project, index) => (
              <motion.article
                key={project.label}
                initial={{ opacity: 0, y: 28 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.7 }}
                className="group relative min-h-[240px] overflow-hidden rounded-[8px] bg-black md:min-h-[310px]"
              >
                <Image
                  src={project.image}
                  alt={`${project.vehicle} ${project.label}`}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 42vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.74))]" />
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-black uppercase tracking-[0.18em] text-neon-blue">{project.label}</p>
                  <h3 className="mt-2 text-2xl font-black text-white">{project.vehicle}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-white/62">{project.outcome}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-16 border-t border-white/8 pt-16"
        >
          <div className="grid gap-10 lg:grid-cols-[0.38fr_0.62fr] lg:items-center">
            <div>
              <p className="eyebrow text-neon-pink">Watch The Work</p>
              <h3 className="mt-5 max-w-xl text-3xl font-black leading-[1] tracking-tight text-white md:text-6xl md:leading-[0.96]">
                See The Process In Motion
              </h3>
              <p className="mt-5 max-w-md text-base leading-relaxed text-white/52 md:mt-6 md:text-lg">
                Watch the work in motion: interiors being recovered, finishes being refined, and the owner-led process that turns a service into trust.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={homepageReels[0]} target="_blank" rel="noreferrer" className="rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white">
                  Watch Owner Reel
                </a>
                <a href="/media" className="rounded-[6px] border border-white/12 bg-white/[0.03] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white/72">
                  View Media Library
                </a>
              </div>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {homepageReels.map((href, index) => (
                <ReelFrame key={href} href={href} index={index} />
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
