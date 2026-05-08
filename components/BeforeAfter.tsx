"use client";

import { motion } from "framer-motion";
import { useState, useRef } from "react";

const categories = ["Exterior", "Interior", "Paint Correction", "Ceramic"];

const pairs = [
  {
    category: "Exterior",
    beforeBg: "from-stone-800 to-stone-600",
    afterBg: "from-slate-900 to-slate-700",
    beforeLabel: "Oxidized & Dirty",
    afterLabel: "Mirror Shine",
  },
  {
    category: "Interior",
    beforeBg: "from-yellow-900 to-stone-700",
    afterBg: "from-slate-800 to-slate-600",
    beforeLabel: "Stained & Worn",
    afterLabel: "Restored & Fresh",
  },
  {
    category: "Paint Correction",
    beforeBg: "from-zinc-700 to-zinc-500",
    afterBg: "from-zinc-900 to-zinc-800",
    beforeLabel: "Swirls & Scratches",
    afterLabel: "Flawless Clarity",
  },
  {
    category: "Ceramic",
    beforeBg: "from-neutral-700 to-neutral-500",
    afterBg: "from-sky-900 to-sky-800",
    beforeLabel: "Unprotected",
    afterLabel: "Ceramic Sealed",
  },
];

function SliderComparison({
  pair,
}: {
  pair: (typeof pairs)[0];
}) {
  const [sliderX, setSliderX] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDragging = useRef(false);

  const handleMove = (clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setSliderX(Math.max(5, Math.min(95, pct)));
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-72 md:h-96 rounded-2xl overflow-hidden cursor-col-resize select-none border border-white/10"
      onMouseDown={() => (isDragging.current = true)}
      onMouseUp={() => (isDragging.current = false)}
      onMouseLeave={() => (isDragging.current = false)}
      onMouseMove={(e) => isDragging.current && handleMove(e.clientX)}
      onTouchMove={(e) => handleMove(e.touches[0].clientX)}
    >
      {/* After (right side — full width) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${pair.afterBg} flex items-end p-5`}
      >
        {/* Simulated clean car gloss */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/10" />
        <div className="absolute top-1/3 left-1/4 w-32 h-1 bg-white/30 blur-sm rounded-full rotate-12" />
        <div className="absolute top-1/2 right-1/3 w-20 h-0.5 bg-neon-blue/40 blur-sm rounded-full -rotate-6" />
        <span className="relative z-10 text-xs font-bold text-neon-blue/90 bg-black/40 px-3 py-1 rounded-full">
          AFTER — {pair.afterLabel}
        </span>
      </div>

      {/* Before (left side — clipped) */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${pair.beforeBg} flex items-end p-5`}
        style={{ clipPath: `inset(0 ${100 - sliderX}% 0 0)` }}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/40 to-transparent" />
        <span className="relative z-10 text-xs font-bold text-white/80 bg-black/40 px-3 py-1 rounded-full">
          BEFORE — {pair.beforeLabel}
        </span>
      </div>

      {/* Slider handle */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-white/80 shadow-glow-sm z-20"
        style={{ left: `${sliderX}%` }}
      >
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white shadow-neon-blue flex items-center justify-center">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M5 8H1M11 8h4M5 5L2 8l3 3M11 5l3 3-3 3" stroke="#050508" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(0);

  return (
    <section
      id="before-after"
      className="section-pad bg-deep-black relative overflow-hidden"
    >
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-neon-pink/8 rounded-full blur-[100px] -translate-y-1/2" />
      <div className="absolute top-1/2 right-0 w-72 h-72 bg-neon-blue/8 rounded-full blur-[100px] -translate-y-1/2" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-neon-pink text-sm font-semibold tracking-widest uppercase mb-3">
            The Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            See The Difference
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Drag the slider to reveal the transformation. Every vehicle deserves
            this level of care.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-10">
          {categories.map((cat, i) => (
            <motion.button
              key={cat}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setActive(i)}
              className={`px-5 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
                active === i
                  ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink"
                  : "glass border border-white/10 text-white/60 hover:text-white"
              }`}
            >
              {cat}
            </motion.button>
          ))}
        </div>

        {/* Slider */}
        <motion.div
          key={active}
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <SliderComparison pair={pairs[active]} />
        </motion.div>

        <p className="text-center text-white/30 text-xs mt-4">
          ← Drag slider to compare →
        </p>
      </div>
    </section>
  );
}
