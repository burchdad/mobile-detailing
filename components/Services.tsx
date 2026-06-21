"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projectImages } from "@/lib/projectMedia";

const services = [
  {
    name: "Concierge Maintenance",
    eyebrow: "Ownership Care",
    description:
      "A mobile preservation cadence for owners who want their vehicle to stay presentable, protected, and easy to maintain without surrendering a day to a shop.",
    image: projectImages.hondaExterior,
    href: "/services/mobile-detailing",
  },
  {
    name: "Paint Enhancement",
    eyebrow: "Finish Clarity",
    description:
      "Correction-minded polishing and surface refinement for paint that deserves depth, reflection, and a cleaner foundation before protection.",
    image: projectImages.mazdaSide,
    href: "/services/paint-correction",
  },
  {
    name: "Ceramic Protection",
    eyebrow: "Long-Term Defense",
    description:
      "Hydrophobic protection, easier washing, gloss retention, and climate defense for owners who want their investment to age with intention.",
    image: projectImages.genesisFront,
    href: "/services/ceramic-coatings",
  },
];

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-deep-black px-5 py-28 md:px-8 md:py-40">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-neon-pink/22 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-24 max-w-5xl"
        >
          <p className="eyebrow mb-5 text-neon-pink">Specialist Services</p>
          <h2 className="text-[clamp(3.6rem,7vw,7.6rem)] font-black leading-[0.9] tracking-tight text-white">
            Protection-Led Care, Not A Menu Of Details
          </h2>
          <p className="mt-8 max-w-3xl text-xl leading-relaxed text-white/56">
            The homepage only needs the core ownership paths. Everything else belongs deeper in the site, after the visitor understands that A&S preserves vehicles instead of simply cleaning them.
          </p>
        </motion.div>

        <div className="space-y-28 md:space-y-36">
          {services.map((service, index) => (
            <motion.article
              key={service.name}
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.75, ease: "easeOut" }}
              className="grid gap-10 lg:grid-cols-2 lg:items-center"
            >
              <div className={`relative min-h-[520px] overflow-hidden rounded-[8px] bg-black ${index % 2 === 1 ? "lg:order-2" : ""}`}>
                <Image
                  src={service.image}
                  alt={service.name}
                  fill
                  className="object-cover opacity-[0.82] transition-transform duration-700 hover:scale-[1.025]"
                  sizes="(min-width: 1024px) 50vw, 100vw"
                />
                <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.62))]" />
              </div>

              <div className="lg:px-10">
                <p className="eyebrow mb-5 text-neon-blue">{service.eyebrow}</p>
                <h3 className="max-w-xl text-5xl font-black leading-[0.95] tracking-tight text-white md:text-7xl">
                  {service.name}
                </h3>
                <p className="mt-7 max-w-xl text-xl leading-relaxed text-white/58">{service.description}</p>
                <Link
                  href={service.href}
                  className="mt-9 inline-flex rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white"
                >
                  Explore Service
                </Link>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
