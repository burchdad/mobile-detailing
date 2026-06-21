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
          className="mt-16 border-t border-white/8 pt-10"
        >
          <div className="grid gap-8 lg:grid-cols-[0.36fr_0.64fr] lg:items-start">
            <div>
              <p className="eyebrow text-neon-pink">Watch The Work</p>
              <p className="mt-4 max-w-sm text-lg leading-relaxed text-white/52">
                Facebook reels are linked as live social proof. Native hosted clips can replace these once the video files are available in Blob.
              </p>
            </div>
            <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
              {reels.map((href, index) => (
                <a
                  key={href}
                  href={href}
                  target="_blank"
                  rel="noreferrer"
                  className="group rounded-[6px] border border-white/10 bg-white/[0.025] px-4 py-5 transition-colors hover:border-neon-pink/35 hover:bg-white/[0.045]"
                >
                  <span className="text-[10px] font-black uppercase tracking-[0.18em] text-white/36">Reel {String(index + 1).padStart(2, "0")}</span>
                  <span className="mt-3 block text-sm font-black uppercase tracking-[0.12em] text-white group-hover:text-neon-pink">Open Facebook Reel</span>
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
