"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectImages } from "@/lib/projectMedia";

export default function VisualImpact() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
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

      <div className="relative z-10 flex min-h-screen items-center px-5 py-28 md:px-8">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="mx-auto w-full max-w-7xl"
        >
          <p className="eyebrow mb-6 text-neon-blue">Preservation Philosophy</p>
          <h2 className="max-w-5xl text-[clamp(4rem,9vw,10rem)] font-black leading-[0.86] tracking-tight text-white">
            Protection Begins Long Before The Final Shine.
          </h2>
          <p className="mt-10 max-w-2xl text-xl leading-relaxed text-white/62 md:text-2xl">
            Every decision starts with the surface, the owner, and the way the vehicle lives. The shine is the visible part. The discipline underneath is what keeps it there.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
