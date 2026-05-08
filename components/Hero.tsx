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
  { value: "500+", label: "Cars Detailed", color: "neon-pink" },
  { value: "5.0★", label: "Average Rating", color: "neon-blue" },
  { value: "100%", label: "Satisfaction", color: "neon-green" },
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

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 md:px-8 pb-16">
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

        <div className="mt-7 md:mt-8 max-w-5xl">
          <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="lux-headline text-[clamp(2.6rem,11vw,8.2rem)] font-black"
          >
            <span className="block text-white">TURN HEADS</span>
            <motion.span
              className="block gradient-text"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.35, duration: 0.7 }}
            >
              BEFORE YOU
            </motion.span>
            <span className="block text-white">EVEN DRIVE</span>
          </motion.h1>

          <motion.p
            variants={reveal}
            initial="hidden"
            animate="show"
            transition={{ delay: 0.45, duration: 0.7 }}
            className="mt-5 max-w-2xl text-white/70 text-base md:text-lg leading-relaxed"
          >
            Cinematic gloss. Surgical interior restoration. Paint depth that hits different under every light.
            We bring the full premium detailing studio to your driveway.
          </motion.p>
        </div>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.6, duration: 0.7 }}
          className="mt-9 flex flex-col sm:flex-row sm:items-center gap-4"
        >
          <motion.a
            href="#booking"
            whileHover={{ y: -4, scale: 1.03, rotateX: 4, rotateY: -4 }}
            whileTap={{ scale: 0.97 }}
            className="group relative isolate overflow-hidden rounded-2xl px-8 py-4 font-black text-base md:text-lg text-white bg-[linear-gradient(140deg,#ff007f,#00cfff)] shadow-[0_18px_60px_rgba(255,0,127,0.35)]"
          >
            <span className="relative z-10 flex items-center gap-2">
              Book Your Premium Detail
              <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </span>
            <span className="absolute inset-0 bg-[linear-gradient(100deg,transparent_30%,rgba(255,255,255,0.45)_50%,transparent_70%)] -translate-x-[140%] group-hover:translate-x-[180%] transition-transform duration-700" />
          </motion.a>

          <motion.a
            href="#before-after"
            whileHover={{ y: -4, scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="group relative overflow-hidden rounded-2xl px-8 py-4 font-bold text-base text-white/90 glass border border-white/20 hover:border-neon-blue/60"
          >
            <span className="relative z-10">See The Transformation</span>
            <span className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(0,207,255,0.28),transparent_60%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </motion.a>
        </motion.div>

        <motion.div
          variants={reveal}
          initial="hidden"
          animate="show"
          transition={{ delay: 0.75, duration: 0.75 }}
          className="mt-11 md:mt-14 grid grid-cols-3 gap-3 sm:max-w-md"
        >
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 + i * 0.1, duration: 0.5 }}
              className="lux-panel glass-strong rounded-2xl p-3 md:p-4 text-center"
            >
              <div className={`text-xl md:text-2xl font-black ${s.color === "neon-pink" ? "neon-pink-text" : s.color === "neon-blue" ? "neon-blue-text" : "neon-green-text"}`}>
                {s.value}
              </div>
              <div className="mt-1 text-[10px] uppercase tracking-wide text-white/45">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
