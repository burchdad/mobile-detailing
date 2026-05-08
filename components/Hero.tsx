"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
  speedX: number;
  speedY: number;
  opacity: number;
}

function FloatingParticles() {
  const [particles] = useState<Particle[]>(() =>
    Array.from({ length: 40 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 3 + 1,
      speedX: (Math.random() - 0.5) * 0.02,
      speedY: (Math.random() - 0.5) * 0.015,
      opacity: Math.random() * 0.5 + 0.2,
    }))
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <motion.div
          key={p.id}
          className="absolute rounded-full"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            background:
              p.id % 3 === 0
                ? "#ff007f"
                : p.id % 3 === 1
                ? "#00cfff"
                : "#39ff14",
            opacity: p.opacity,
            filter: "blur(0.5px)",
          }}
          animate={{
            x: [0, p.speedX * 800, 0],
            y: [0, p.speedY * 800, 0],
            opacity: [p.opacity, p.opacity * 1.5, p.opacity],
          }}
          transition={{
            duration: 8 + Math.random() * 6,
            repeat: Infinity,
            ease: "easeInOut",
            delay: Math.random() * 4,
          }}
        />
      ))}
    </div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-deep-black">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-hero-gradient" />

      {/* Radial glow overlays */}
      <div className="absolute inset-0">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-neon-pink/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-neon-blue/10 rounded-full blur-[120px]" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-neon-pink/5 rounded-full blur-[160px]" />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(rgba(0,207,255,1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,207,255,1) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Floating particles */}
      <FloatingParticles />

      {/* Light streak */}
      <motion.div
        className="absolute top-0 left-0 w-[2px] h-[70%] bg-gradient-to-b from-transparent via-neon-blue/60 to-transparent"
        animate={{ left: ["10%", "90%", "10%"], opacity: [0, 1, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
      />

      {/* Content */}
      <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
        {/* Badge */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 0.7 }}
          className="inline-flex items-center gap-2 glass px-5 py-2.5 rounded-full mb-8 text-sm font-medium text-white/80"
        >
          <span className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
          Fully Mobile &nbsp;•&nbsp; Premium Products &nbsp;•&nbsp; Locally Trusted
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-black leading-[0.9] tracking-tight mb-6"
        >
          <span className="text-white">Turn Heads</span>
          <br />
          <span className="gradient-text">Before You</span>
          <br />
          <span className="text-white">Even Drive</span>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-10 leading-relaxed"
        >
          Elite Mobile Auto Detailing. Showroom Finish.
          <br className="hidden sm:block" /> Delivered To Your Door.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          {/* Primary CTA */}
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden group px-8 py-4 rounded-full font-bold text-lg text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink"
          >
            <span className="relative z-10">Book Your Detail</span>
            {/* Shimmer */}
            <span className="absolute inset-0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 bg-white/20 w-1/3" />
          </motion.a>

          {/* Secondary CTA */}
          <motion.a
            href="#before-after"
            whileHover={{ scale: 1.05, borderColor: "#00cfff" }}
            whileTap={{ scale: 0.97 }}
            className="px-8 py-4 rounded-full font-bold text-lg text-white border border-white/20 glass hover:shadow-neon-blue transition-all duration-300"
          >
            See The Transformation
          </motion.a>
        </motion.div>

        {/* Stats row */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 grid grid-cols-3 gap-6 max-w-lg mx-auto"
        >
          {[
            { value: "500+", label: "Cars Detailed" },
            { value: "5★", label: "Avg Rating" },
            { value: "100%", label: "Satisfaction" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-2xl font-black gradient-text">{stat.value}</div>
              <div className="text-xs text-white/40 mt-1">{stat.label}</div>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Bottom fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-deep-black to-transparent pointer-events-none" />
    </section>
  );
}
