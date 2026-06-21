"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { projectImages } from "@/lib/projectMedia";

const journal = [
  "Protecting paint in East Texas heat",
  "Wax vs ceramic coating for serious owners",
  "Keeping a show-quality finish between details",
];

export default function OwnerJournal() {
  return (
    <section id="journal" className="relative overflow-hidden bg-[#050506] px-5 py-20 md:px-8 md:py-40">
      <div className="relative z-10 mx-auto grid max-w-7xl gap-10 md:gap-14 lg:grid-cols-[0.58fr_0.42fr] lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75 }}
        >
          <p className="eyebrow mb-6 text-neon-pink">Meet Steve</p>
          <h2 className="max-w-4xl text-[clamp(2.55rem,11vw,8.8rem)] font-black leading-[0.98] tracking-tight text-white md:leading-[0.86]">
            Built By Someone Who Still Signs Off On The Work
          </h2>
          <blockquote className="mt-7 max-w-3xl text-2xl font-black leading-tight tracking-tight text-white md:mt-10 md:text-5xl">
            &ldquo;I didn&apos;t start A&amp;S to clean cars. I started it because vehicles deserve to be protected.&rdquo;
          </blockquote>
          <p className="mt-6 max-w-2xl text-base leading-relaxed text-white/56 md:mt-8 md:text-xl">
            Steve&apos;s advantage is not volume. It is judgment: inspecting the vehicle, choosing the right process, and finishing only when the result meets the standard.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.75, delay: 0.08 }}
          className="space-y-8"
        >
          <div className="relative min-h-[300px] overflow-hidden rounded-[8px] bg-black md:min-h-[520px]">
            <Image src={projectImages.fordLeatherFront} alt="A&S leather cabin preservation proof" fill className="object-cover opacity-[0.72]" sizes="(min-width: 1024px) 42vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.08),rgba(0,0,0,0.68))]" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-blue">Owner-Led Standard</p>
              <p className="mt-3 text-2xl font-black leading-tight text-white">Quality you can see. Commitment you can hold accountable.</p>
            </div>
          </div>

          <div className="border-t border-white/10 pt-7">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.22em] text-white/32">Vehicle Care Journal</p>
            <div className="space-y-4">
              {journal.map((title) => (
                <Link key={title} href="/journal" className="block text-xl font-bold text-white/64 transition-colors hover:text-white">
                  {title}
                </Link>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
