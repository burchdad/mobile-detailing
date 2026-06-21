"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectImages } from "@/lib/projectMedia";

export default function VisualImpact() {
  return (
    <section className="relative min-h-[74vh] overflow-hidden bg-black md:min-h-screen">
      <Image
        src={projectImages.genesisSide}
        alt="A&S detailing transformation work"
        fill
        priority={false}
        className="object-cover opacity-[0.58]"
        sizes="100vw"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.92),rgba(0,0,0,0.48),rgba(0,0,0,0.18))]" />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.5),transparent_35%,rgba(0,0,0,0.72))]" />

      <div className="relative z-10 flex min-h-[74vh] items-center px-5 py-20 md:min-h-screen md:px-8 md:py-28">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-7xl"
        >
          <p className="eyebrow mb-6 text-neon-blue">Preservation Philosophy</p>
          <h2 className="max-w-5xl text-[clamp(2.8rem,12vw,10rem)] font-black leading-[0.95] tracking-tight text-white md:leading-[0.86]">
            Protection Begins Long Before The Final Shine.
          </h2>
          <p className="mt-7 max-w-2xl text-base leading-relaxed text-white/62 md:mt-10 md:text-2xl">
            Every decision starts with the surface, the owner, and the way the vehicle lives. The shine is the visible part. The discipline underneath is what keeps it there.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
