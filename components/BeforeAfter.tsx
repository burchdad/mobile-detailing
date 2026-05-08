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

function Slider({ category }: { category: (typeof categories)[0] }) {
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
      className="relative w-full aspect-[17/10] md:aspect-[16/8] rounded-[1.6rem] md:rounded-[2rem] overflow-hidden cursor-ew-resize select-none touch-none lux-panel light-pass"
      onMouseDown={(e) => {
        dragging.current = true;
        update(e.clientX);
      }}
      onMouseMove={(e) => {
        if (dragging.current) update(e.clientX);
      }}
      onMouseUp={() => {
        dragging.current = false;
      }}
      onMouseLeave={() => {
        dragging.current = false;
      }}
      onTouchStart={(e) => {
        dragging.current = true;
        update(e.touches[0].clientX);
      }}
      onTouchMove={(e) => {
        if (dragging.current) update(e.touches[0].clientX);
      }}
      onTouchEnd={() => {
        dragging.current = false;
      }}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_35%_20%,rgba(255,255,255,0.1),transparent_45%)] pointer-events-none z-10" />

      <div className={`absolute inset-0 bg-gradient-to-br ${category.before.bg}`}>
        <div
          className="absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 35% 40%, rgba(80,50,10,0.8) 0%, transparent 62%), linear-gradient(115deg, rgba(255,255,255,0.05), transparent 35%)",
          }}
        />
        <div className="absolute bottom-5 left-5 glass rounded-xl px-3 py-1.5 text-xs font-bold text-white/55 border border-white/10 uppercase tracking-wide">
          Before &bull; {category.before.label}
        </div>
      </div>

      <div className={`absolute inset-0 bg-gradient-to-br ${category.after.bg}`} style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}>
        <motion.div
          className="absolute inset-0"
          animate={{ x: ["-100%", "200%"] }}
          transition={{ duration: 3.2, repeat: Infinity, repeatDelay: 1.8, ease: "easeInOut" }}
          style={{ background: "linear-gradient(105deg, transparent 35%, rgba(255,255,255,0.1) 50%, transparent 65%)" }}
        />
        <div className="absolute inset-x-0 bottom-0 h-[20%] bg-[linear-gradient(180deg,transparent_0%,rgba(255,255,255,0.12)_90%)] opacity-35" />
        <div className="absolute bottom-5 right-5 glass rounded-xl px-3 py-1.5 text-xs font-bold text-neon-blue/80 border border-neon-blue/20 uppercase tracking-wide">
          After &bull; {category.after.label}
        </div>
      </div>

      <div
        className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-pink via-neon-blue to-neon-green shadow-[0_0_16px_rgba(0,207,255,0.85)] pointer-events-none z-20"
        style={{ left: `${position}%`, transform: "translateX(-50%)" }}
      />

      <motion.div
        className="absolute top-0 bottom-0 w-8 pointer-events-none z-20"
        style={{
          left: `${position}%`,
          transform: "translateX(-50%)",
          background: "linear-gradient(180deg, transparent 0%, rgba(255,255,255,0.24) 48%, transparent 100%)",
          filter: "blur(6px)",
        }}
        animate={{ opacity: [0.5, 0.95, 0.5] }}
        transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
      />

      <div
        className="absolute top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-deep-black border-2 border-neon-pink/70 shadow-[0_0_20px_rgba(255,0,127,0.75)] flex items-center justify-center pointer-events-none z-30"
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
      <div className="absolute top-[30%] left-[8%] w-[620px] h-[320px] bg-neon-pink/8 rounded-full blur-[140px]" />
      <div className="absolute bottom-[10%] right-[5%] w-[620px] h-[360px] bg-neon-blue/8 rounded-full blur-[150px]" />
      <div className="absolute inset-0 speed-lines opacity-[0.25]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-12 md:mb-14"
        >
          <p className="eyebrow text-neon-blue mb-4">Proof Over Promises</p>
          <div className="section-line mx-auto mb-6" />
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tight mb-4">See the Transformation</h2>
          <p className="text-white/52 max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Drag the slider to reveal what A&amp;S Mobile Detail does to every vehicle it touches.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-[1.1fr_2fr] gap-6 lg:gap-8 items-start">
          <div className="glass-strong rounded-3xl p-5 md:p-6 border border-white/12">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold mb-4">Transformations</p>
            <div className="flex flex-wrap lg:flex-col gap-2.5">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setActive(cat.id)}
                  className={`text-left px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-250 ${
                    active === cat.id
                      ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink-sm"
                      : "glass border border-white/10 text-white/55 hover:text-white hover:border-neon-blue/30"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl p-4 bg-white/[0.03] border border-white/8">
              <p className="text-[11px] text-white/40 uppercase tracking-wider">Why this matters</p>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                We restore depth, remove haze, and pull clarity back into your paint and interior surfaces so your vehicle looks high-value again.
              </p>
            </div>
          </div>

          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="glass-strong rounded-[2rem] p-3 md:p-5 border border-white/12"
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

              <p className="text-center text-white/32 text-xs mt-4">Drag left &harr; right &bull; Touch optimized</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="mt-4 flex items-center justify-between gap-4 glass rounded-2xl border border-white/10 px-4 py-3"
            >
              <div>
                <p className="text-[11px] uppercase tracking-wider text-white/40">Average visual upgrade</p>
                <p className="text-lg font-black text-white">Instant gloss + restored depth</p>
              </div>
              <span className="text-2xl font-black gradient-text">95%</span>
            </motion.div>
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-10 md:mt-12"
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
