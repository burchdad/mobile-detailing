"use client";

import { motion } from "framer-motion";
const PARTICLES = Array.from({ length: 60 }, (_, i) => ({
  id: i,
  x: Math.random() * 100,
  y: Math.random() * 100,
  size: Math.random() * 2.5 + 0.5,
  dx: (Math.random() - 0.5) * 0.018,
  dy: (Math.random() - 0.5) * 0.013,
  opacity: Math.random() * 0.55 + 0.15,
  color: i % 3 === 0 ? "#ff007f" : i % 3 === 1 ? "#00cfff" : "#39ff14",
}));

const STREAKS = [
  { left: "15%", delay: 0, dur: 7 },
  { left: "55%", delay: 2.5, dur: 9 },
  { left: "80%", delay: 5, dur: 6 },
];

function Particles() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {PARTICLES.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{ left: `${p.x}%`, top: `${p.y}%`, width: p.size, height: p.size, background: p.color, opacity: p.opacity, filter: "blur(0.5px)" }}
          animate={{ x: [0, p.dx * 900, 0], y: [0, p.dy * 900, 0], opacity: [p.opacity, p.opacity * 1.6, p.opacity] }}
          transition={{ duration: 9 + Math.random() * 7, repeat: Infinity, ease: "easeInOut", delay: Math.random() * 5 }}
        />
      ))}
    </div>
  );
}

const stats = [
  { value: "500+", label: "Cars Detailed", color: "neon-pink" },
  { value: "5.0★", label: "Average Rating", color: "neon-blue" },
  { value: "100%", label: "Satisfaction", color: "neon-green" },
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-black">
      {/* Deep layered background */}
      <div className="absolute inset-0 bg-hero-gradient" />
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-[800px] h-[800px] bg-neon-pink/8 rounded-full blur-[200px] -translate-x-1/2 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[700px] h-[700px] bg-neon-blue/10 rounded-full blur-[180px] translate-x-1/3 translate-y-1/3" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[400px] bg-neon-pink/4 rounded-full blur-[120px]" />
      </div>

      {/* Grid */}
      <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: "linear-gradient(rgba(0,207,255,1) 1px,transparent 1px),linear-gradient(90deg,rgba(0,207,255,1) 1px,transparent 1px)", backgroundSize: "70px 70px" }} />

      {/* Particles */}
      <Particles />

      {/* Light streaks */}
      {STREAKS.map((s, i) => (
        <motion.div
          key={i}
          className="absolute top-0 w-px"
          style={{ left: s.left, background: "linear-gradient(180deg,transparent,rgba(0,207,255,0.5),rgba(255,0,127,0.3),transparent)", height: "60%" }}
          animate={{ opacity: [0, 0.8, 0], scaleY: [0.5, 1, 0.5] }}
          transition={{ duration: s.dur, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
        />
      ))}

      {/* Main content */}
      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-28 pb-20">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.7 }}
          className="inline-flex items-center gap-2.5 glass-strong px-5 py-2.5 rounded-full mb-10 border border-neon-blue/15"
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
          <span className="text-xs font-semibold text-white/70 tracking-[0.12em] uppercase">
            Fully Mobile &nbsp;&bull;&nbsp; Premium Products &nbsp;&bull;&nbsp; Locally Trusted
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.9, ease: "easeOut" }}
          className="text-[clamp(3rem,10vw,7rem)] font-black leading-[0.88] tracking-[-0.02em] mb-7"
        >
          <span className="text-white block">Turn Heads</span>
          <span className="gradient-text block">Before You</span>
          <span className="text-white block">Even Drive</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="text-lg md:text-xl text-white/55 max-w-xl mx-auto mb-12 leading-relaxed"
        >
          Showroom finish at your doorstep. Mobile convenience.
          <br className="hidden sm:block" />
          Studio-level results. Tyler, TX &amp; East Texas.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.65, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-20"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.06, boxShadow: "0 0 35px rgba(255,0,127,0.6), 0 0 80px rgba(255,0,127,0.2)" }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden group px-9 py-4.5 rounded-full font-black text-lg text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink"
            style={{ paddingTop: "1.125rem", paddingBottom: "1.125rem" }}
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Detail
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-700 bg-white/20 w-2/5 pointer-events-none" />
          </motion.a>

          <motion.a
            href="#before-after"
            whileHover={{ scale: 1.04, borderColor: "rgba(0,207,255,0.5)" }}
            whileTap={{ scale: 0.97 }}
            className="px-9 py-4 rounded-full font-bold text-lg text-white border border-white/15 glass hover:shadow-neon-blue-sm transition-all duration-300"
          >
            See The Transformation
          </motion.a>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.8 }}
          className="grid grid-cols-3 gap-4 max-w-sm mx-auto"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.0 + i * 0.12, duration: 0.6 }}
              className="glass-strong rounded-2xl px-3 py-4 border border-white/8 text-center"
            >
              <div className={`text-2xl font-black mb-0.5 ${s.color === "neon-pink" ? "neon-pink-text" : s.color === "neon-blue" ? "neon-blue-text" : "neon-green-text"}`}>
                {s.value}
              </div>
              <div className="text-[10px] text-white/35 font-medium tracking-wide uppercase">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
