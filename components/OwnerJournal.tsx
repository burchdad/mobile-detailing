"use client";

import { motion } from "framer-motion";

const journal = [
  "How to protect paint in East Texas heat",
  "Wax vs ceramic coating: what serious owners should know",
  "Maintaining a show-quality finish between details",
];

export default function OwnerJournal() {
  return (
    <section id="journal" className="section-pad relative overflow-hidden bg-surface">
      <div className="absolute left-1/2 top-0 h-px w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-blue/28 to-transparent" />
      <div className="absolute right-[-10%] top-[12%] h-[520px] w-[520px] rounded-full bg-neon-pink/6 blur-[145px]" />
      <div className="relative z-10 w-full px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.85fr_1fr]">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="panel-edge rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018))] p-7 md:p-9"
          >
            <p className="eyebrow mb-4 text-neon-pink">Meet The Owner</p>
            <div className="section-line mb-6" />
            <h2 className="text-4xl font-black tracking-tight text-white md:text-6xl">Built For People Who Actually Care About Their Vehicle</h2>
            <p className="mt-6 text-base leading-relaxed text-white/60">
              A&S exists for the owner who notices swirl marks, protects a new purchase, keeps a truck dialed in, or wants a classic treated with patience. The philosophy is quality over volume: inspect first, choose the right process, and finish only when the vehicle meets the standard.
            </p>
            <div className="mt-8 grid grid-cols-3 gap-3">
              {["Trust", "Craft", "Protection"].map((item) => (
                <div key={item} className="rounded-xl border border-white/10 bg-black/28 p-4 text-center">
                  <div className="text-xs font-black uppercase tracking-[0.16em] text-neon-pink">{item}</div>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.08 }}
            className="grid gap-5"
          >
            <div className="panel-edge rounded-2xl border border-white/10 bg-black/28 p-7 md:p-9">
              <p className="eyebrow mb-4 text-neon-blue">Vehicle Care Journal</p>
              <h3 className="text-3xl font-black tracking-tight text-white md:text-5xl">Education That Keeps Clients Coming Back</h3>
              <p className="mt-4 text-base leading-relaxed text-white/56">
                Monthly protection tips, customer spotlights, product notes, and seasonal maintenance advice turn the site into an authority hub, not just a brochure.
              </p>
            </div>
            <div className="grid gap-3">
              {journal.map((title, index) => (
                <motion.a
                  key={title}
                  href="/journal"
                  whileHover={{ x: 6 }}
                  className="flex items-center justify-between rounded-xl border border-white/10 bg-black/30 p-5 text-white/78 backdrop-blur transition-colors hover:border-neon-pink/35 hover:text-white"
                >
                  <span className="text-sm font-bold md:text-base">{title}</span>
                  <span className="text-[10px] font-black uppercase tracking-[0.16em] text-neon-pink">0{index + 1}</span>
                </motion.a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
