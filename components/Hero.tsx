"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import carImage from "../car.png";
import logoImage from "../logo.png";

const particles = Array.from({ length: 34 }, (_, i) => ({
  id: i,
  x: (i * 23) % 100,
  y: (i * 37) % 100,
  size: (i % 4) + 1,
  delay: i * 0.08,
}));

const stats = [
  { value: "500+", label: "Vehicles Preserved" },
  { value: "5.0", label: "Google Reputation" },
  { value: "100%", label: "Final Walkthrough" },
];

const trustBadges = [
  { id: "01", text: "Fully Insured", sub: "Professional protection" },
  { id: "02", text: "Premium Systems", sub: "Paint-safe products" },
  { id: "03", text: "Mobile Concierge", sub: "Home, office, or garage" },
];

const orbitLabels = ["Paint Correction", "Ceramic Coating", "Interior Reset", "Preservation Plans"];

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
          className="absolute right-[22%] top-[2%] z-20 w-[210px] xl:w-[250px]"
          animate={{ y: [0, -9, 0], rotate: [0, 1.2, 0] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-neon-pink/15 blur-[48px]" />
          <div className="panel-edge relative overflow-hidden rounded-[1.5rem] border border-white/12 bg-black/40 p-3 backdrop-blur-md">
            <Image src={logoImage} alt="A&S Mobile Detail logo" className="h-auto w-full" priority />
          </div>
        </motion.div>

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
    <section className="relative flex min-h-screen items-center overflow-hidden bg-deep-black pt-32 md:pt-36">
      <div className="absolute inset-0 mesh-bg opacity-55" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88)_0%,rgba(0,0,0,0.66)_42%,rgba(0,0,0,0.18)_100%)]" />
      <div className="absolute inset-x-0 bottom-0 h-56 bg-gradient-to-t from-deep-black to-transparent" />
      <div className="absolute left-[-12%] top-[-10%] h-[760px] w-[760px] rounded-full bg-neon-pink/12 blur-[190px]" />
      <div className="absolute right-[-8%] top-[4%] h-[700px] w-[700px] rounded-full bg-neon-blue/10 blur-[180px]" />

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

      <div className="relative z-10 w-full px-4 pb-16 md:px-6 lg:px-8">
        <div className="max-w-[920px] lg:max-w-[760px] xl:max-w-[860px]">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="eyebrow mb-5 text-neon-pink"
          >
            East Texas Vehicle Preservation Concierge
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 36 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.08, duration: 0.9, ease: "easeOut" }}
            className="text-[clamp(3.1rem,10vw,8.8rem)] font-black leading-[0.88] tracking-tight text-white"
          >
            Automotive Care <span className="gradient-text block">Without</span> Compromise
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.28, duration: 0.75 }}
            className="mt-7 max-w-2xl text-base leading-relaxed text-white/66 md:text-xl"
          >
            Professional mobile detailing, paint correction, ceramic coatings, and long-term appearance management for owners who expect their vehicle to be treated like an investment.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.44, duration: 0.65 }}
            className="mt-9 grid max-w-2xl grid-cols-1 gap-3 sm:grid-cols-3"
          >
            {trustBadges.map((badge) => (
              <div key={badge.text} className="panel-edge rounded-xl border border-white/12 bg-black/35 px-4 py-3 backdrop-blur-md">
                <span className="mb-2 flex h-8 w-8 items-center justify-center rounded-lg border border-neon-pink/25 bg-white/5 text-[10px] font-black tracking-wider text-neon-pink">
                  {badge.id}
                </span>
                <div className="text-xs font-bold uppercase tracking-wide text-white">{badge.text}</div>
                <div className="mt-1 text-[11px] text-white/42">{badge.sub}</div>
              </div>
            ))}
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.58, duration: 0.65 }}
            className="mt-10 flex max-w-2xl flex-col gap-3 sm:flex-row sm:items-center"
          >
            <motion.a
              href="#booking"
              whileHover={{ y: -4, scale: 1.02 }}
              whileTap={{ scale: 0.96 }}
              className="group relative isolate overflow-hidden rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-7 py-4 text-center text-sm font-black uppercase tracking-[0.14em] text-white shadow-neon-pink-sm"
            >
              Get Your Vehicle Assessment
              <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] bg-white/18 transition-transform duration-700 group-hover:translate-x-[250%]" />
            </motion.a>
            <motion.a
              href="#before-after"
              whileHover={{ y: -3, scale: 1.015 }}
              whileTap={{ scale: 0.97 }}
              className="rounded-xl border border-white/14 bg-black/32 px-7 py-4 text-center text-sm font-bold uppercase tracking-[0.14em] text-white/78 backdrop-blur-md transition-colors hover:border-neon-pink/38 hover:text-white"
            >
              Explore Our Work
            </motion.a>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.72, duration: 0.65 }}
            className="mt-12 grid max-w-2xl grid-cols-3 gap-3 md:gap-4"
          >
            {stats.map((s) => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-black/38 p-4 backdrop-blur-md md:p-5">
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
