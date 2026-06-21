"use client";

import { motion } from "framer-motion";

const standards = [
  {
    label: "Inspection Before Action",
    copy: "Paint, trim, wheels, glass, and cabin materials are reviewed before a service path is recommended.",
  },
  {
    label: "Paint-Safe Systems",
    copy: "Wash chemistry, towels, compounds, and coatings are selected for finish preservation, not speed.",
  },
  {
    label: "Final Walkthrough",
    copy: "Every vehicle is reviewed before delivery so the owner understands what was restored, protected, and maintained.",
  },
];

const proof = ["Fully insured", "5-star local reputation", "Mobile concierge", "Ceramic-safe maintenance"];

export default function TrustStrip() {
  return (
    <section className="relative overflow-hidden bg-[#151512] px-5 py-28 md:px-8 md:py-36">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/12 to-transparent" />
      <div className="absolute right-[-18%] top-[18%] h-[620px] w-[620px] rounded-full bg-neon-blue/6 blur-[170px]" />
      <div className="absolute left-[-18%] bottom-[-20%] h-[620px] w-[620px] rounded-full bg-neon-pink/6 blur-[170px]" />

      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="grid gap-16 lg:grid-cols-[0.95fr_1.05fr] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5 text-neon-pink">The A&S Standard</p>
            <h2 className="max-w-4xl text-[clamp(3.5rem,7vw,7.5rem)] font-black leading-[0.9] tracking-tight text-white">
              Standards Before Shine
            </h2>
          </div>
          <div>
            <p className="max-w-2xl text-xl leading-relaxed text-white/58 md:text-2xl">
              Premium care is quiet discipline: inspect the vehicle, choose the safest path, protect the finish, and deliver it with the owner fully informed.
            </p>
            <div className="mt-8 flex flex-wrap gap-x-6 gap-y-3">
              {proof.map((item) => (
                <span key={item} className="text-[11px] font-black uppercase tracking-[0.18em] text-white/46">
                  {item}
                </span>
              ))}
            </div>
          </div>
        </motion.div>

        <div className="mt-20 grid gap-12 lg:grid-cols-[0.42fr_0.58fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="relative min-h-[420px] overflow-hidden rounded-[8px] bg-[linear-gradient(145deg,rgba(255,255,255,0.08),rgba(255,255,255,0.015)),radial-gradient(circle_at_38%_18%,rgba(200,169,106,0.18),transparent_34%),radial-gradient(circle_at_70%_68%,rgba(138,164,173,0.16),transparent_36%)]"
          >
            <div className="absolute inset-0 opacity-[0.18]" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.055) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "42px 42px" }} />
            <motion.div
              className="absolute left-1/2 top-1/2 h-[260px] w-[260px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-neon-pink/22"
              animate={{ rotate: 360 }}
              transition={{ duration: 28, repeat: Infinity, ease: "linear" }}
            />
            <motion.div
              className="absolute left-[18%] right-[12%] top-[47%] h-px bg-gradient-to-r from-transparent via-neon-pink/70 to-transparent"
              animate={{ opacity: [0.25, 0.9, 0.25], scaleX: [0.72, 1, 0.72] }}
              transition={{ duration: 4.8, repeat: Infinity, ease: "easeInOut" }}
            />
            <div className="absolute bottom-8 left-8 right-8">
              <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-pink">Owner Confidence</p>
              <p className="mt-3 max-w-sm text-3xl font-black leading-tight tracking-tight text-white">
                Every surface is treated as part of the vehicle&apos;s long-term value.
              </p>
            </div>
          </motion.div>

          <div className="divide-y divide-white/8">
            {standards.map((standard, index) => (
              <motion.article
                key={standard.label}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08, duration: 0.62 }}
                className="grid gap-6 py-9 first:pt-0 last:pb-0 md:grid-cols-[96px_1fr]"
              >
                <p className="text-5xl font-black leading-none text-white/10">{String(index + 1).padStart(2, "0")}</p>
                <div>
                  <h3 className="text-3xl font-black tracking-tight text-white md:text-4xl">{standard.label}</h3>
                  <p className="mt-4 max-w-2xl text-lg leading-relaxed text-white/56">{standard.copy}</p>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
