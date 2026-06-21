"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import carImage from "../car.png";

const particles = Array.from({ length: 18 }, (_, i) => ({
  id: i,
  x: (i * 23) % 100,
  y: (i * 37) % 100,
  size: (i % 4) + 1,
  delay: i * 0.08,
}));

const stats = [
  { value: "5.0", label: "Local Rating" },
  { value: "500+", label: "Vehicles Serviced" },
  { value: "East TX", label: "Mobile Concierge" },
];

const trustBadges = [
  { text: "Owner-approved work" },
  { text: "Fully insured" },
  { text: "Finish-safe systems" },
  { text: "Priority assessments" },
];

const orbitLabels = ["Paint Enhancement", "Ceramic Protection", "Interior Restoration", "Preservation Programs"];

function HeroShowpiece() {
  return (
    <div className="pointer-events-none absolute right-[-13vw] top-[16%] hidden w-[min(78vw,1060px)] justify-end lg:flex">
      <motion.div
        initial={{ opacity: 0, x: 120, scale: 0.94 }}
        animate={{ opacity: 1, x: 0, scale: 1 }}
        transition={{ duration: 1.3, ease: [0.16, 1, 0.3, 1] }}
        className="preserve-3d relative w-full max-w-[980px]"
      >
        <motion.div
          className="absolute inset-[8%] rounded-[50%] border border-neon-pink/20"
          animate={{ rotateZ: 360, rotateX: [58, 62, 58] }}
          transition={{ rotateZ: { duration: 24, repeat: Infinity, ease: "linear" }, rotateX: { duration: 8, repeat: Infinity } }}
        />
        <motion.div
          className="absolute inset-[15%] rounded-[50%] border border-neon-blue/18"
          animate={{ rotateZ: -360, rotateY: [16, -16, 16] }}
          transition={{ rotateZ: { duration: 30, repeat: Infinity, ease: "linear" }, rotateY: { duration: 10, repeat: Infinity } }}
        />

        {orbitLabels.map((label, i) => (
          <motion.div
            key={label}
            className="absolute z-30 rounded-full border border-white/12 bg-black/55 px-3.5 py-2 text-[10px] font-semibold uppercase tracking-[0.17em] text-white/72 backdrop-blur-md"
            style={{
              left: ["10%", "60%", "18%", "70%"][i],
              top: ["22%", "13%", "65%", "57%"][i],
            }}
            animate={{ y: [0, -10, 0], opacity: [0.58, 1, 0.58] }}
            transition={{ duration: 4.5 + i * 0.45, repeat: Infinity, ease: "easeInOut", delay: i * 0.3 }}
          >
            {label}
          </motion.div>
        ))}

        <motion.div
          className="relative z-10"
          animate={{ x: [0, -7, 0], y: [0, -5, 0] }}
          transition={{ duration: 5.4, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-[15%] right-[8%] top-[18%] h-[48%] rounded-full bg-neon-blue/14 blur-[54px]" />
          <Image
            src={carImage}
            alt="Black detailed vehicle with a protected gloss finish"
            className="relative z-10 h-auto w-full drop-shadow-[0_44px_140px_rgba(0,0,0,0.88)]"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute bottom-[9%] left-[19%] right-[8%] h-20 rounded-full bg-neon-pink/18 blur-[70px]"
          animate={{ opacity: [0.18, 0.36, 0.18], scaleX: [0.9, 1.06, 0.9] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative flex min-h-[96vh] items-center overflow-hidden bg-[#050504] pt-36 md:min-h-[108vh] md:pt-48">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_8%_14%,rgba(200,169,106,0.16),transparent_34%),radial-gradient(circle_at_72%_20%,rgba(138,164,173,0.12),transparent_32%),linear-gradient(135deg,#050504_0%,#11100d_48%,#050605_100%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.78)_0%,rgba(0,0,0,0.55)_42%,rgba(0,0,0,0.12)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-deep-black to-transparent" />

      <div className="absolute inset-0 overflow-hidden">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white"
            style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size }}
            animate={{ opacity: [0.05, 0.35, 0.05], y: [0, -18, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: p.delay }}
          />
        ))}
      </div>

      <HeroShowpiece />

      <div className="relative z-10 w-full px-5 pb-20 md:px-8">
        <div className="max-w-[920px] lg:max-w-[780px] xl:max-w-[860px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5 text-neon-pink"
          >
            East Texas Vehicle Preservation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.9, ease: "easeOut" }}
            className="max-w-5xl text-[clamp(2.55rem,13vw,7.4rem)] font-black leading-[0.98] tracking-tight text-white md:leading-[0.94]"
          >
            Vehicle Preservation For Owners Who Notice Everything.
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75 }}
            className="mt-6 max-w-2xl text-base leading-relaxed text-white/68 md:mt-8 md:text-xl"
          >
            A&S is owner-led concierge vehicle care for East Texas drivers who value craftsmanship, accountability, and a finish that keeps its presence.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65 }}
            className="mt-7 flex max-w-2xl flex-wrap gap-x-4 gap-y-2 border-y border-white/10 py-4 md:mt-8 md:gap-x-5 md:gap-y-3 md:py-5"
          >
            {trustBadges.map((badge) => (
              <span key={badge.text} className="text-[11px] font-black uppercase tracking-[0.18em] text-white/54">
                {badge.text}
              </span>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.65 }}
            className="mt-8 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center md:mt-12"
          >
            <motion.a
              href="/assessment"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative isolate overflow-hidden rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-7 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white shadow-neon-pink-sm"
            >
              Get Your Vehicle Assessment
              <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] bg-white/18 transition-transform duration-700 group-hover:translate-x-[250%]" />
            </motion.a>
            <motion.a
              href="#before-after"
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-[6px] border border-white/12 bg-black/24 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white/72 backdrop-blur-md transition-colors hover:border-neon-pink/30 hover:text-white"
            >
              Explore Our Work
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.65 }}
            className="mt-8 grid max-w-2xl grid-cols-3 gap-4 border-t border-white/10 pt-6 md:mt-12 md:gap-8 md:pt-7"
          >
            {stats.map((s) => (
              <div key={s.label}>
                <div className="text-2xl font-black text-neon-pink md:text-4xl">{s.value}</div>
                <div className="mt-2 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/45">{s.label}</div>
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
