"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { projectImages } from "@/lib/projectMedia";

const stories = [
  {
    vehicle: "Premium SUV",
    owner: "Whitehouse, TX",
    quote:
      "The paint correction on my white SUV is unreal. Deep scratches are gone, the gloss is insane. I have gotten compliments from complete strangers.",
  },
  {
    vehicle: "Work Truck",
    owner: "Tyler, TX",
    quote:
      "They came to my office and I picked up a vehicle that looked straight off the showroom floor. I will not go back to a traditional car wash.",
  },
  {
    vehicle: "Family Vehicle",
    owner: "Flint, TX",
    quote:
      "Monthly preservation has been a game changer. The vehicle is consistently clean, protected, and handled by someone who cares.",
  },
];

export default function Testimonials() {
  return (
    <section className="relative overflow-hidden bg-deep-black px-5 py-28 md:px-8 md:py-40">
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-16 grid gap-10 lg:grid-cols-[0.64fr_0.36fr] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5 text-neon-blue">Client Stories</p>
            <h2 className="text-[clamp(4rem,8vw,9rem)] font-black leading-[0.88] tracking-tight text-white">
              East Texas Owners Notice The Difference
            </h2>
          </div>
          <div className="border-l border-white/10 pl-7">
            <p className="text-5xl font-black text-white">5.0</p>
            <p className="mt-3 text-sm font-black uppercase tracking-[0.22em] text-neon-pink">Local rating</p>
            <p className="mt-5 text-lg leading-relaxed text-white/54">
              The proof belongs higher than a small carousel. For A&S, trust is part of the experience.
            </p>
          </div>
        </motion.div>

        <div className="grid gap-10 lg:grid-cols-[0.48fr_0.52fr] lg:items-stretch">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.75 }}
            className="relative min-h-[640px] overflow-hidden rounded-[8px] bg-black"
          >
            <Image src={projectImages.reviewJesus} alt="A&S client review proof" fill className="object-cover opacity-[0.8]" sizes="(min-width: 1024px) 48vw, 100vw" />
            <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.04),rgba(0,0,0,0.74))]" />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-sm font-black uppercase tracking-[0.22em] text-neon-pink">Real Vehicles</p>
              <p className="mt-3 max-w-md text-3xl font-black leading-tight text-white">
                Interior restoration, paint clarity, and protection that can be seen after the appointment.
              </p>
            </div>
          </motion.div>

          <div className="flex flex-col justify-between gap-8">
            {stories.map((story, index) => (
              <motion.article
                key={story.vehicle}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.65, delay: index * 0.08 }}
                className="border-t border-white/10 pt-8"
              >
                <div className="mb-6 flex items-center justify-between gap-5">
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-white/30">{story.vehicle}</p>
                  <p className="text-sm font-semibold text-neon-blue/80">{story.owner}</p>
                </div>
                <p className="text-3xl font-black leading-tight tracking-tight text-white md:text-5xl">
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
