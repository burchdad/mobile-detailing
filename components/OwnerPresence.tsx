"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projectImages } from "@/lib/projectMedia";

export default function OwnerPresence() {
  return (
    <section className="relative overflow-hidden bg-[#f1eee6] px-5 py-20 text-[#12110f] md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[linear-gradient(120deg,rgba(255,255,255,0.72),rgba(200,169,106,0.16),rgba(138,164,173,0.12))]" />
      <div className="relative z-10 mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
        >
          <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#8b6e32]">The Craftsman Behind The Work</p>
          <h2 className="max-w-3xl text-[2rem] font-black leading-[1.08] tracking-tight md:text-6xl md:leading-[1.02]">
            Clients trust Steve with something they care about.
          </h2>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-black/62 md:mt-8 md:text-xl">
            &ldquo;I&apos;m Steve, and every vehicle leaves with my approval before it leaves my care. If the standard is not there, the job is not finished.&rdquo;
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link href="/about" className="rounded-[6px] bg-[#111] px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white">
              About Steve
            </Link>
            <Link href="/reviews" className="rounded-[6px] border border-black/18 px-6 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-black/72">
              Read Client Stories
            </Link>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.08 }}
          className="relative min-h-[300px] overflow-hidden rounded-[8px] bg-black shadow-[0_40px_120px_rgba(0,0,0,0.22)] md:min-h-[520px]"
        >
          <Image src={projectImages.fordTruckFront} alt="A&S Mobile Detail owner-led project proof" fill className="object-cover opacity-[0.88]" sizes="(min-width: 1024px) 52vw, 100vw" />
          <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.02),rgba(0,0,0,0.6))]" />
          <div className="absolute bottom-7 left-7 right-7 text-white">
            <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-pink">Steve Sarmiento</p>
            <p className="mt-2 text-2xl font-black tracking-tight md:text-3xl">Owner / Operator</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
