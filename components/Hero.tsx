"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import carImage from "../car.png";
import logoImage from "../logo.png";
const PARTICLES = Array.from({ length: 55 }, (_, i) => ({
  id: i,
  x: (i * 19) % 100,
  y: (i * 31) % 100,
  size: (i % 6) * 0.4 + 0.6,
  driftX: i % 2 === 0 ? 32 : -28,
  driftY: i % 3 === 0 ? -20 : 16,
  opacity: (i % 5) * 0.06 + 0.16,
  color: i % 3 === 0 ? "#ff007f" : i % 3 === 1 ? "#00cfff" : "#39ff14",
  duration: 8 + (i % 4),
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

function HeroCarShowpiece() {
  return (
    <div className="pointer-events-none absolute right-[-10vw] top-[18%] hidden lg:flex w-[min(76vw,1000px)] items-start justify-end z-[1]">
      <motion.div
        initial={{ opacity: 0, x: 140, scale: 0.90 }}
        animate={{ opacity: 1, x: [80, 0, 12, 0], y: [12, 0, -6, 0], scale: [0.94, 1, 1.008, 1] }}
        transition={{ duration: 2.2, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-[950px]"
      >
        <motion.div
          className="absolute bottom-[10%] left-[18%] right-[10%] h-20 rounded-full bg-neon-blue/20 blur-[62px]"
          animate={{ opacity: [0.16, 0.34, 0.2], scaleX: [0.92, 1.08, 1] }}
          transition={{ duration: 3.4, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[22%] top-[2%] z-10 w-[200px] xl:w-[240px]"
          animate={{ y: [0, -10, 0], rotate: [0, 1.5, 0], opacity: [0.88, 1, 0.9] }}
          transition={{ duration: 5.6, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute inset-0 rounded-full bg-[radial-gradient(circle_at_center,rgba(255,0,127,0.18),transparent_58%)] blur-[48px]" />
          <div className="relative overflow-hidden rounded-[2rem] border border-white/10 bg-black/25 p-3 shadow-[0_18px_80px_rgba(0,0,0,0.45)] backdrop-blur-sm">
            <Image
              src={logoImage}
              alt="A&S Mobile Detail logo"
              className="h-auto w-full drop-shadow-[0_0_30px_rgba(255,0,127,0.28)]"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          className="relative z-20"
          animate={{ x: [0, -8, 0], y: [0, -5, 0] }}
          transition={{ duration: 5.2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="absolute left-[20%] right-[14%] top-[16%] h-[44%] rounded-full bg-[radial-gradient(circle_at_center,rgba(0,207,255,0.16),transparent_68%)] blur-[52px]" />
          <Image
            src={carImage}
            alt="Black BMW detailed vehicle"
            className="relative z-10 h-auto w-full drop-shadow-[0_42px_140px_rgba(0,0,0,0.82)]"
            priority
          />
        </motion.div>

        <motion.div
          className="absolute left-[34%] right-[13%] top-[43%] z-0 h-24 rounded-full bg-neon-pink/14 blur-[90px]"
          animate={{ opacity: [0.16, 0.26, 0.18], scaleX: [0.94, 1.05, 1] }}
          transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
        />

        <motion.div
          className="absolute right-[8%] top-[33%] z-30 h-3 w-3 rounded-full bg-white shadow-[0_0_28px_rgba(255,255,255,0.95)]"
          animate={{ opacity: [0.35, 1, 0.35], scale: [0.8, 1.3, 0.8] }}
          transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute right-[25%] top-[15%] z-30 h-2.5 w-2.5 rounded-full bg-neon-pink shadow-[0_0_24px_rgba(255,0,127,0.8)]"
          animate={{ opacity: [0.4, 1, 0.4], scale: [0.7, 1.2, 0.7] }}
          transition={{ duration: 2.9, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </motion.div>
    </div>
  );
}

export default function Hero() {
  const reveal = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-deep-black pt-24 md:pt-28">
      <div className="absolute inset-0 mesh-bg opacity-50" />
      <div className="absolute inset-0 speed-lines opacity-30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_50%_50%,rgba(0,207,255,0.08)_0%,transparent_70%)]" />
      
      {/* Cinematic light atmosphere */}
      <div className="absolute top-[-12%] left-[-10%] w-[760px] h-[760px] rounded-full bg-neon-pink/12 blur-[200px] opacity-70" />
      <div className="absolute top-[5%] right-[-8%] w-[700px] h-[700px] rounded-full bg-neon-blue/10 blur-[180px] opacity-60" />
      <div className="absolute bottom-[-22%] left-[35%] w-[720px] h-[420px] rounded-full bg-neon-green/8 blur-[200px] opacity-50" />
      <div className="absolute top-[25%] right-[15%] w-[500px] h-[500px] rounded-full bg-neon-pink/8 blur-[180px] opacity-40" />
      
      {/* Cinematic fog and depth */}
      <motion.div
        className="absolute inset-0 bg-gradient-to-b from-black/40 via-transparent to-black/60"
        animate={{ opacity: [0.3, 0.5, 0.3] }}
        transition={{ duration: 8, repeat: Infinity }}
      />

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
            animate={{ x: [0, p.driftX, 0], y: [0, p.driftY, 0], opacity: [p.opacity, p.opacity + 0.14, p.opacity] }}
            transition={{ duration: p.duration, repeat: Infinity, ease: "easeInOut" }}
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
          animate={{ opacity: [0.12, 0.22, 0.12], y: [18, 0, 18] }}
          transition={{ duration: 9, repeat: Infinity, ease: "easeInOut" }}
          className="mx-auto w-[min(1120px,94vw)] h-[280px] md:h-[340px] rounded-[48%] border border-white/10 bg-[linear-gradient(180deg,rgba(0,207,255,0.08),rgba(255,0,127,0.03)_35%,rgba(0,0,0,0.85)_100%)] shadow-[0_80px_140px_rgba(0,0,0,0.85),0_0_0_1px_rgba(0,207,255,0.1)]"
        >
          <div className="w-full h-full rounded-[48%] carbon-overlay light-pass" />
        </motion.div>
      </div>

      <HeroCarShowpiece />

      <div className="relative z-10 w-full px-5 md:px-8 pb-16">
        <div className="mx-auto max-w-7xl lg:pr-[18rem] xl:pr-[20rem]">
          <div className="mt-7 md:mt-8">
            <motion.h1
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.9, ease: "easeOut" }}
            className="relative z-20 text-[clamp(2.8rem,13vw,9rem)] font-black leading-[0.9] tracking-tight max-w-full"
          >
            <span className="block text-white">LUXURY MOBILE</span>
            <motion.span
              className="block bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green bg-clip-text text-transparent drop-shadow-[0_0_40px_rgba(0,207,255,0.4)]"
              initial={{ opacity: 0, filter: "blur(8px)" }}
              animate={{ opacity: 1, filter: "blur(0px)" }}
              transition={{ delay: 0.3, duration: 0.7 }}
            >
              DETAILING
            </motion.span>
            <span className="block text-white">FOR PREMIUM DRIVERS</span>
          </motion.h1>
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
              className="bg-black/30 backdrop-blur-md rounded-xl px-4 py-2.5 border border-white/12 hover:border-neon-pink/30 transition-all duration-300 flex items-center gap-2.5 hover:bg-black/40"
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
            whileHover={{ y: -4, scale: 1.03 }}
            whileTap={{ scale: 0.94 }}
            className="group relative isolate overflow-hidden rounded-2xl px-8 md:px-10 py-4 md:py-5 font-black text-base md:text-lg text-white bg-[linear-gradient(135deg,#ff007f_0%,#00cfff_100%)] shadow-[0_25px_80px_rgba(255,0,127,0.35)] hover:shadow-[0_32px_120px_rgba(255,0,127,0.48)] transition-shadow duration-300"
          >
            <span className="relative z-10 flex items-center justify-center gap-2.5 uppercase tracking-wider">
              <svg className="w-5 h-5 group-hover:animate-pulse" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </span>
            <motion.span
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-25"
              animate={{ x: ["-120%", "120%"] }}
              transition={{ duration: 0.8, repeat: Infinity, repeatDelay: 2 }}
            />
          </motion.a>

          <motion.a
            href="sms:+19035550000"
            whileHover={{ y: -3, scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden rounded-2xl px-6 py-5 font-bold text-white/85 bg-black/30 backdrop-blur-md border border-white/12 hover:border-neon-green/40 transition-all duration-300 hidden sm:flex items-center justify-center gap-2 hover:bg-black/40 hover:text-white/95"
          >
            <svg className="w-4 h-4 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            Text For Quote
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
              className="group bg-black/40 backdrop-blur-md rounded-2xl p-5 md:p-6 border border-white/12 hover:border-white/25 transition-all duration-300 cursor-default hover:bg-black/50 hover:shadow-[0_0_40px_rgba(0,207,255,0.15)]"
            >
              <div className={`text-3xl md:text-4xl font-black mb-2 ${s.color === "neon-pink" ? "neon-pink-text" : s.color === "neon-blue" ? "neon-blue-text" : "neon-green-text"}`}>
                {s.value}
              </div>
              <div className="text-xs uppercase tracking-widest text-white/50 font-semibold">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
