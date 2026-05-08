"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const categories = [
  {
    id: "exterior",
    label: "Exterior Wash",
    before: { bg: "from-stone-700 via-stone-600 to-stone-800", label: "Dirt & Grime" },
    after: { bg: "from-slate-900 via-slate-800 to-deep-black", label: "Showroom Shine" },
  },
  {
    id: "interior",
    label: "Interior Detail",
    before: { bg: "from-amber-900 via-stone-800 to-stone-900", label: "Stains & Odors" },
    after: { bg: "from-slate-800 via-slate-900 to-deep-black", label: "Factory Fresh" },
  },
  {
    id: "paint",
    label: "Paint Correction",
    before: { bg: "from-zinc-600 via-zinc-700 to-zinc-800", label: "Swirls & Scratches" },
    after: { bg: "from-slate-700 via-indigo-950 to-deep-black", label: "Mirror Clarity" },
  },
  {
    id: "ceramic",
    label: "Ceramic Coating",
    before: { bg: "from-neutral-700 via-neutral-800 to-zinc-900", label: "Oxidized Paint" },
    after: { bg: "from-blue-950 via-slate-900 to-deep-black", label: "Glass Shield" },
  },
];

function Slider({ category }: { category: typeof categories[0] }) {
  const [position, setPosition] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const update = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <div
      ref={containerRef}
      className="relative w-full aspect-[16/9] rounded-2xl overflow-hidden cursor-ew-resize select-none touch-none"
      onMouseDown={(e) => { dragging.current = true; update(e.clientX); }}
      onMouseMove={(e) => { if (dragging.current) update(e.clientX); }}
      onMouseUp={() => { dragging.current = false; }}
      onMouseLeave={() => { dragging.current = false; }}
      onTouchStart={(e) => { dragging.current = true; update(e.touches[0].clientX); }}
      onTouchMove={(e) => { if (dragging.current) update(e.touches[0].clientX); }}
      onTouchEnd={() => { dragging.current = false; }}
    >
      {/* Before */}
      <div className={`absolute inset-0 bg-gradient-to-br ${category.before.bg}`}>
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "radial-gradient(circle at 40% 40%, rgba(80,50,10,0.8) 0%, transparent 60%)" }} />
        <div className="absolute bottom-4 left-4 glass rounded-xl px-3 py-1.5 text-xs font-bold text-white/50 border border-white/10 uppercase tracking-wide">
          Before &bull; {category.before.label}
        </div>
      </div>

      {/* After — clipped */}
      <div
        className={`absolute inset-0 bg-gradient-to-br ${category.after.bg}`}
        style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
      >
        {/* Gloss sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.5, repeat: Infinity, repeatDelay: 2, ease: "easeInOut" }}
          style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.07) 50%, transparent 65%)" }}
        />
        <div className="absolute bottom-4 right-4 glass rounded-xl px-3 py-1.5 text-xs font-bold text-neon-blue/80 border border-neon-blue/20 uppercase tracking-wide">
          After &bull; {category.after.label}
        </div>
      </div>

      {/* Divider */}
      <div
        className="absolute top-0 bottom-0 w-0.5 bg-gradient-to-b from-neon-pink via-neon-blue to-neon-green shadow-neon-blue-sm pointer-events-none"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      {/* Handle */}
      <div
        className="absolute top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-black border-2 border-neon-pink/70 shadow-neon-pink-sm flex items-center justify-center pointer-events-none z-20"
        style={{ left: `${position}%`, transform: "translate(-50%, -50%)" }}
      >
        <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l-4 3 4 3M16 9l4 3-4 3" />
        </svg>
      </div>
    </div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState("exterior");
  const category = categories.find((c) => c.id === active) ?? categories[0];

  return (
    <section id="before-after" className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[400px] bg-neon-blue/4 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="eyebrow text-neon-blue mb-4">Proof Over Promises</p>
          <div className="section-line mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">
            See the Transformation
          </h2>
          <p className="text-white/45 max-w-md mx-auto text-base">
            Drag the slider to reveal what A&amp;S Mobile Detail does to every vehicle it touches.
          </p>
        </motion.div>

        {/* Category tabs */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActive(cat.id)}
              className={`px-4 py-2 rounded-xl text-xs font-bold transition-all duration-200 ${
                active === cat.id
                  ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink-sm"
                  : "glass border border-white/10 text-white/50 hover:text-white hover:border-white/20"
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Slider */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="glass-strong rounded-3xl p-4 md:p-6 border border-white/8"
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              initial={{ opacity: 0, scale: 0.97 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.35 }}
            >
              <Slider category={category} />
            </motion.div>
          </AnimatePresence>

          <p className="text-center text-white/25 text-xs mt-4">
            Drag left &harr; right &bull; Touch supported
          </p>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10"
        >
          <a href="#booking" className="inline-flex items-center gap-2 text-neon-blue text-sm font-bold hover:text-white transition-colors duration-200 group">
            Ready for your transformation?
            <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
