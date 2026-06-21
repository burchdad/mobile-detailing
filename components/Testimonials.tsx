"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { reviewProof } from "@/lib/projectMedia";

const stories = [
  {
    vehicle: "Premium SUV",
    owner: "Whitehouse, TX",
    quote: "The paint correction on my white SUV is unreal. Deep scratches are gone, the gloss is insane.",
  },
  {
    vehicle: "Work Truck",
    owner: "Tyler, TX",
    quote: "They came to my office and I picked up a vehicle that looked straight off the showroom floor.",
  },
  {
    vehicle: "Family Vehicle",
    owner: "Flint, TX",
    quote: "Monthly preservation has been a game changer. The vehicle is consistently clean, protected, and handled by someone who cares.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-deep-black px-5 py-20 md:px-8 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-12 grid gap-8 md:mb-16 lg:grid-cols-[0.64fr_0.36fr] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5 text-neon-blue">Client Stories</p>
            <h2 className="text-[clamp(2.55rem,11vw,9rem)] font-black leading-[1] tracking-tight text-white md:leading-[0.88]">
              East Texas Owners Notice The Difference
            </h2>
          </div>
          <div className="border-t border-white/10 pt-6 md:border-l md:border-t-0 md:pl-7 md:pt-0">
            <p className="text-4xl font-black text-white md:text-5xl">5.0</p>
            <p className="mt-2 text-xs font-black uppercase tracking-[0.2em] text-neon-pink md:mt-3">Local rating</p>
            <p className="mt-4 text-base leading-relaxed text-white/54 md:mt-5 md:text-lg">
              Trust is earned through finished vehicles, repeat clients, and public proof.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid gap-4 sm:grid-cols-2 lg:grid-cols-1"
          >
            {reviewProof.map((proof) => (
              <article key={proof.name} className="rounded-[8px] border border-white/10 bg-white/[0.03] p-4">
                <div className="relative aspect-[16/9] overflow-hidden rounded-[6px] bg-black">
                  <Image src={proof.image} alt={`${proof.name} review proof`} fill className="object-contain p-2" sizes="(min-width: 1024px) 44vw, 100vw" />
                </div>
                <p className="mt-4 text-sm font-black text-white">{proof.name}</p>
                <p className="mt-1 text-[10px] font-black uppercase tracking-[0.18em] text-neon-blue">{proof.detail}</p>
              </article>
            ))}
          </motion.div>

          <div className="divide-y divide-white/10">
            {stories.map((story, index) => (
              <motion.article
                key={story.vehicle}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="py-7 first:pt-0 last:pb-0 md:py-9"
              >
                <div className="mb-4 flex items-center justify-between gap-5 md:mb-6">
                  <p className="text-xs font-black uppercase tracking-[0.2em] text-white/30 md:text-sm">{story.vehicle}</p>
                  <p className="text-sm font-semibold text-neon-blue/80">{story.owner}</p>
                </div>
                <p className="text-2xl font-black leading-tight tracking-tight text-white md:text-5xl">
                  &ldquo;{story.quote}&rdquo;
                </p>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
