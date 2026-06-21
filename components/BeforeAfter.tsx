"use client";

import { motion } from "framer-motion";
import Image from "next/image";

const projects = [
  {
    label: "Interior Restoration",
    vehicle: "Premium SUV Cabin",
    time: "Leather, console, carpets, touchpoints",
    outcome: "Warm leather cabin restored with a cleaner, more cared-for ownership feel.",
    image: "/media/as-suv-interior.png",
    featured: true,
  },
  {
    label: "Client Media",
    vehicle: "Genesis + GMC Detail Set",
    time: "Interior and exterior documentation",
    outcome: "Real client-photo proof from multiple surfaces, wheels, trim, seats, and cabin areas.",
    image: "/media/as-client-collage.png",
  },
  {
    label: "Service Guide",
    vehicle: "Current A&S Package Reference",
    time: "Express and executive tiers",
    outcome: "Client-provided package collateral preserved as a reference, not the visual brand direction.",
    image: "/media/as-service-guide.jpg",
  },
];

const reels = [
  "https://www.facebook.com/reel/1622783268783745",
  "https://www.facebook.com/reel/1529964088921173",
  "https://www.facebook.com/reel/1076405425364255",
  "https://www.facebook.com/reel/1308712487680033",
  "https://www.facebook.com/reel/27040195182280478",
  "https://www.facebook.com/reel/1945697012821238",
];

function facebookEmbedUrl(url: string) {
  return `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(url)}&show_text=false&width=360&t=0`;
}

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
      </div>
      <a
        href={href}
        target="_blank"
        rel="noreferrer"
        className="mt-4 block text-center text-[10px] font-black uppercase tracking-[0.18em] text-white/42 transition-colors hover:text-neon-pink"
      >
        Open reel on Facebook
      </a>
    </motion.div>
  );
}

export default function BeforeAfter() {
  return (
    <section id="before-after" className="relative overflow-hidden bg-surface px-5 py-28 md:px-8 md:py-36">
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
            <p className="eyebrow mb-5 text-neon-blue">Real Client Media</p>
            <h2 className="max-w-5xl text-[clamp(3.4rem,7vw,7.25rem)] font-black leading-[0.9] tracking-tight text-white">
              Proof That Feels Human
            </h2>
          </div>
          <p className="max-w-2xl text-xl leading-relaxed text-white/58 md:text-2xl">
            Real photos and reels do more for trust than synthetic graphics ever will. This section now shows actual A&S work and social proof from the client&apos;s media library.
          </p>
        </motion.div>

        <div className="mt-18 grid gap-5 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.article
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="group relative min-h-[640px] overflow-hidden rounded-[8px] bg-black"
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
              <h3 className="text-4xl font-black tracking-tight text-white md:text-6xl">{projects[0].vehicle}</h3>
              <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/68">{projects[0].outcome}</p>
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
                className="group relative min-h-[310px] overflow-hidden rounded-[8px] bg-black"
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
              <h3 className="mt-5 max-w-xl text-4xl font-black leading-[0.96] tracking-tight text-white md:text-6xl">
                See The Process In Motion
              </h3>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-white/52">
                The reels can play directly on the page using Facebook&apos;s embedded player. Once the source files are uploaded to Vercel Blob, these same frames can switch to native HTML video for faster playback and cleaner controls.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <a href={reels[0]} target="_blank" rel="noreferrer" className="rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white">
                  Watch Owner Reel
                </a>
                <a href="/results" className="rounded-[6px] border border-white/12 bg-white/[0.03] px-5 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-white/72">
                  View Media Library
                </a>
              </div>
            </div>
            <div className="grid gap-7 sm:grid-cols-2">
              {reels.slice(0, 2).map((href, index) => (
                <ReelFrame key={href} href={href} index={index} />
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-3 md:grid-cols-4">
            {reels.slice(2).map((href, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[6px] border border-white/10 bg-white/[0.025] px-4 py-5 transition-colors hover:border-neon-pink/35 hover:bg-white/[0.045]"
                >
                <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/36">More Reel {String(index + 3).padStart(2, "0")}</span>
                <span className="mt-3 block text-sm font-black uppercase tracking-[0.12em] text-white group-hover:text-neon-pink">Open Clip</span>
                </a>
              ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
