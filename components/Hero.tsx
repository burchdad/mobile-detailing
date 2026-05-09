"use client";

import { motion } from "framer-motion";
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 19) % 100,
  y: (i * 31) % 100,
  size: (i % 6) * 0.4 + 0.8,
  driftX: i % 2 === 0 ? 28 : -22,
  driftY: i % 3 === 0 ? -16 : 12,
  opacity: (i % 5) * 0.08 + 0.22,
  color: i % 3 === 0 ? "#ff007f" : i % 3 === 1 ? "#00cfff" : "#39ff14",
}));

const STREAKS = [
  { top: "16%", delay: 0, duration: 4.8, width: "44%" },
  { top: "34%", delay: 1.1, duration: 5.3, width: "52%" },
  { top: "63%", delay: 0.4, duration: 5.8, width: "48%" },
];

const stats = [
  { value: "500+", label: "Vehicles Transformed", color: "neon-pink" },
  { value: "5.0★", label: "Elite Rated", color: "neon-blue" },
  { value: "100%", label: "Satisfaction Rate", color: "neon-green" },
];

const trustBadges = [
  { icon: "🛡️", text: "Fully Insured", sub: "Professional Protection" },
  { icon: "✓", text: "Premium Products", sub: "Only The Best" },
  { icon: "⚡", text: "Mobile Service", sub: "We Come To You" },
];

export default function Hero() {
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-black pt-24 md:pt-28">
      <div className="absolute inset-0 mesh-bg" />
      <div className="absolute inset-0 speed-lines opacity-40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_60%,rgba(255,255,255,0.08),transparent_45%)]" />
      <div className="absolute top-[-12%] left-[-10%] w-[760px] h-[760px] rounded-full bg-neon-pink/15 blur-[180px]" />
      <div className="absolute top-[5%] right-[-8%] w-[700px] h-[700px] rounded-full bg-neon-blue/12 blur-[170px]" />
      <div className="absolute bottom-[-22%] left-[35%] w-[720px] h-[420px] rounded-full bg-neon-green/10 blur-[180px]" />

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {PARTICLES.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full"
            style={{
              left: `${p.x}%`,
              top: `${p.y}%`,
              width: p.size,
              height: p.size,
              opacity: p.opacity,
              backgroundColor: p.color,
            }}
            animate={{ x: [0, p.driftX, 0], y: [0, p.driftY, 0], opacity: [p.opacity, p.opacity + 0.18, p.opacity] }}
            transition={{ duration: 7.5 + (p.id % 6), repeat: Infinity, ease: "easeInOut" }}
          />
        ))}
      </div>

      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {STREAKS.map((s) => (
          <motion.div
            key={`${s.top}-${s.delay}`}
            className="absolute h-[1px]"
            style={{
              top: s.top,
              width: s.width,
              left: "-45%",
              background:
                "linear-gradient(90deg, transparent 0%, rgba(0,207,255,0.9) 35%, rgba(255,0,127,0.95) 52%, transparent 100%)",
            }}
            animate={{ x: ["0%", "220%"], opacity: [0, 1, 0] }}
            transition={{ duration: s.duration, repeat: Infinity, ease: "easeInOut", delay: s.delay }}
          />
        ))}
      </div>

      <div className="absolute inset-x-0 bottom-[10%] pointer-events-none">
        <div className="mx-auto w-[min(1040px,92vw)] h-[220px] rounded-[50%] bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.22)_0%,rgba(255,255,255,0)_65%)] blur-xl" />
      </div>

      <div className="absolute inset-x-0 bottom-[18%] pointer-events-none px-4">
        <motion.div
          initial={{ opacity: 0.1, y: 30 }}
          animate={{ opacity: [0.18, 0.28, 0.18], y: [14, 0, 14] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-[min(1120px,94vw)] h-[280px] md:h-[340px] rounded-[48%] border border-white/12 bg-[linear-gradient(180deg,rgba(255,255,255,0.12),rgba(255,255,255,0.03)_30%,rgba(0,0,0,0.75)_100%)] shadow-[0_60px_120px_rgba(0,0,0,0.8)]"
        >
          <div className="w-full h-full rounded-[48%] carbon-overlay light-pass" />
        </motion.div>
      </div>

      <div className="relative z-10 w-full px-5 md:px-8 pb-16">
        <div className="mx-auto max-w-6xl">
          <motion.div
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ duration: 0.8 }}
            className="inline-flex items-center gap-2.5 glass-strong border border-white/20 rounded-full px-4 py-2 md:px-5 md:py-2.5"
          >
            <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
            <span className="text-[11px] md:text-xs uppercase tracking-[0.16em] text-white/75 font-semibold">
              Mobile Studio Detail Service Across East Texas
            </span>
          </motion.div>
        </div>

        <div className="mt-7 md:mt-8">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="text-[clamp(2.8rem,13vw,9rem)] font-black leading-[0.9] tracking-tight max-w-full"
          >
            <span className="block text-white">LUXURY MOBILE</span>
            <motion.span
              className="block bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              DETAILING
            </motion.span>
            <span className="block text-white">FOR PREMIUM DRIVERS</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.5, duration: 0.7 }}
            className="mt-7 md:mt-10 max-w-3xl text-white/65 text-base md:text-lg leading-relaxed font-light"
          >
            Showroom-level detailing. Ceramic protection. Paint restoration. Professional interior recovery.
            <br className="hidden md:block" />
            <span className="text-white/80 font-medium">Your vehicle deserves elite treatment.</span>
          </motion.p>
        </div>

        {/* Trust Badges */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.65, duration: 0.7 }}
          className="mt-10 md:mt-12 grid grid-cols-1 sm:grid-cols-3 gap-3 max-w-2xl"
        >
          {trustBadges.map((badge, i) => (
            <motion.div
              key={badge.text}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 + i * 0.08, duration: 0.5 }}
              className="glass rounded-xl px-4 py-2.5 border border-white/10 flex items-center gap-2.5"
            >
              <span className="text-xl">{badge.icon}</span>
              <div>
                <div className="text-xs font-bold uppercase tracking-wide text-white">{badge.text}</div>
                <div className="text-[10px] text-white/40">{badge.sub}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Primary CTA Row */}
        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.8, duration: 0.7 }}
          className="mt-12 md:mt-16 flex flex-col sm:flex-row sm:items-center gap-3 max-w-2xl"
        >
          <motion.a
            href="#booking"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group relative isolate overflow-hidden rounded-2xl px-9 py-5 font-black text-base md:text-lg text-white bg-[linear-gradient(135deg,#ff007f_0%,#00cfff_100%)] shadow-[0_25px_80px_rgba(255,0,127,0.35)] hover:shadow-[0_30px_100px_rgba(255,0,127,0.45)] transition-shadow duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2 uppercase tracking-wider">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </span>
            <span className="absolute inset-0 bg-white/20 -translate-x-[110%] group-hover:translate-x-[120%] transition-transform duration-700" />
          </motion.a>

          <motion.a
            href="#before-after"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="group relative overflow-hidden rounded-2xl px-9 py-5 font-bold text-base md:text-lg text-white glass border border-white/20 hover:border-neon-blue/50 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2">
              View Transformations
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 7l5 5m0 0l-5 5m5-5H6" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,207,255,0.2),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>

          <motion.a
            href="tel:+19035550000"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden rounded-2xl px-6 py-5 font-bold text-white/80 glass border border-white/10 hover:border-neon-green/40 transition-all duration-300 hidden sm:flex items-center justify-center gap-2"
          >
            <svg className="w-4 h-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Call
          </motion.a>
        </motion.div>

        {/* Premium Stats Row */}
        <motion.div
          initial="hidden"
          animate="show"
          transition={{ delay: 0.95, duration: 0.6, staggerChildren: 0.08 }}
          className="mt-16 md:mt-20 grid grid-cols-3 gap-4 max-w-2xl"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={{
                hidden: { opacity: 0, y: 20 },
                show: { opacity: 1, y: 0 },
              }}
              className="group glass-strong rounded-2xl p-5 md:p-6 border border-white/15 hover:border-white/30 transition-all duration-300 cursor-default"
            >
              <div className={`text-3xl md:text-4xl font-black mb-2 ${s.color === "neon-pink" ? "neon-pink-text" : s.color === "neon-blue" ? "neon-blue-text" : "neon-green-text"}`}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
