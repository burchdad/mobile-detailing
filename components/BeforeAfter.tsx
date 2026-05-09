"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useCallback, useRef, useState } from "react";

const categories = [
  {
    id: "paint-correction",
    label: "Paint Correction",
    icon: "PC",
    before: { bg: "from-zinc-700 via-zinc-800 to-black", label: "Swirls + Haze" },
    after: { bg: "from-slate-900 via-slate-800 to-black", label: "Mirror Clarity" },
    result: "95% surface clarity recovered",
  },
  {
    id: "interior-reset",
    label: "Interior Transformation",
    icon: "IN",
    before: { bg: "from-amber-900 via-stone-800 to-black", label: "Stains + Odors" },
    after: { bg: "from-slate-800 via-slate-900 to-black", label: "Factory Fresh" },
    result: "Deep extraction with odor elimination",
  },
  {
    id: "ceramic-shine",
    label: "Ceramic Coating",
    icon: "CC",
    before: { bg: "from-neutral-700 via-zinc-800 to-black", label: "Unprotected Paint" },
    after: { bg: "from-blue-950 via-slate-900 to-black", label: "Hydrophobic Shield" },
    result: "Long-term gloss and protection layer",
  },
  {
    id: "wheel-restore",
    label: "Wheel Restoration",
    icon: "WR",
    before: { bg: "from-stone-700 via-zinc-700 to-black", label: "Brake Dust Build-Up" },
    after: { bg: "from-slate-900 via-zinc-900 to-black", label: "Deep Satin Finish" },
    result: "Wheels and tires reset to premium finish",
  },
];

type Category = (typeof categories)[0];

function Slider({ category }: { category: Category }) {
  const [position, setPosition] = useState(52);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updatePosition = useCallback((clientX: number) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const pct = Math.min(100, Math.max(0, ((clientX - rect.left) / rect.width) * 100));
    setPosition(pct);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6 }}
      className="space-y-5"
    >
      <div
        ref={containerRef}
        className="relative w-full aspect-[17/10] md:aspect-[19/9] rounded-[1.8rem] md:rounded-[2rem] overflow-hidden select-none touch-none cursor-ew-resize group border border-white/15"
        onMouseDown={(e) => {
          dragging.current = true;
          updatePosition(e.clientX);
        }}
        onMouseMove={(e) => {
          if (dragging.current) updatePosition(e.clientX);
        }}
        onMouseUp={() => {
          dragging.current = false;
        }}
        onMouseLeave={() => {
          dragging.current = false;
        }}
        onTouchStart={(e) => {
          dragging.current = true;
          updatePosition(e.touches[0].clientX);
        }}
        onTouchMove={(e) => {
          if (dragging.current) updatePosition(e.touches[0].clientX);
        }}
        onTouchEnd={() => {
          dragging.current = false;
        }}
      >
        <div className="absolute inset-0 glass-strong" />

        <div className={`absolute inset-0 bg-gradient-to-br ${category.before.bg}`}>
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "radial-gradient(circle at 25% 42%, rgba(80,40,12,0.7) 0%, transparent 60%), linear-gradient(120deg, rgba(255,255,255,0.06), transparent 36%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[3rem] md:text-[5rem] font-black text-white/18 leading-none">BEFORE</div>
              <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-white/55 font-bold">{category.before.label}</div>
            </div>
          </div>
        </div>

        <div
          className={`absolute inset-0 bg-gradient-to-br ${category.after.bg}`}
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <motion.div
            className="absolute inset-0"
            animate={{ x: ["-90%", "220%"] }}
            transition={{ duration: 3.4, repeat: Infinity, repeatDelay: 1.4, ease: "easeInOut" }}
            style={{ background: "linear-gradient(104deg, transparent 36%, rgba(255,255,255,0.12) 50%, transparent 65%)" }}
          />
          <div
            className="absolute inset-0 opacity-45"
            style={{
              backgroundImage:
                "radial-gradient(circle at 70% 42%, rgba(80,180,255,0.45) 0%, transparent 62%), linear-gradient(120deg, rgba(255,255,255,0.09), transparent 34%)",
            }}
          />
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-[3rem] md:text-[5rem] font-black text-white/20 leading-none">AFTER</div>
              <div className="mt-2 text-[10px] md:text-xs uppercase tracking-[0.2em] text-neon-blue/80 font-bold">{category.after.label}</div>
            </div>
          </div>
        </div>

        <motion.div
          className="absolute top-0 bottom-0 w-[2px] bg-gradient-to-b from-neon-pink via-neon-blue to-neon-green pointer-events-none z-20"
          style={{ left: `${position}%`, transform: "translateX(-50%)" }}
          animate={{ boxShadow: ["0 0 14px rgba(255,0,127,0.55)", "0 0 24px rgba(0,207,255,0.7)", "0 0 14px rgba(255,0,127,0.55)"] }}
          transition={{ duration: 2.4, repeat: Infinity }}
        />

        <motion.div
          className="absolute top-1/2 -translate-y-1/2 w-14 h-14 rounded-full bg-deep-black/90 border-2 border-neon-pink/70 backdrop-blur flex items-center justify-center z-30 shadow-[0_0_24px_rgba(255,0,127,0.45)] pointer-events-none"
          style={{ left: `${position}%`, transform: "translate(-50%,-50%)" }}
          whileHover={{ scale: 1.08 }}
        >
          <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.4} d="M10 8l-4 4 4 4m4-8l4 4-4 4" />
          </svg>
        </motion.div>

        <motion.div
          className="absolute bottom-4 left-1/2 -translate-x-1/2 text-[10px] uppercase tracking-[0.2em] text-white/55 font-bold"
          animate={{ opacity: [0.55, 1, 0.55], y: [0, 3, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          Drag to Compare
        </motion.div>

        <div className="absolute top-4 left-4 glass rounded-xl px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-white/60 font-semibold border border-white/10">
          Before
        </div>
        <div className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-[10px] uppercase tracking-[0.14em] text-neon-blue/75 font-semibold border border-neon-blue/20">
          After
        </div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ delay: 0.12, duration: 0.5 }}
        className="glass rounded-2xl border border-neon-pink/30 px-4 py-3 text-center"
      >
        <p className="text-xs md:text-sm text-neon-pink uppercase tracking-[0.14em] font-black">{category.result}</p>
      </motion.div>
    </motion.div>
  );
}

export default function BeforeAfter() {
  const [active, setActive] = useState(categories[0].id);
  const category = categories.find((item) => item.id === active) ?? categories[0];

  return (
    <section id="before-after" className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[980px] h-px bg-gradient-to-r from-transparent via-neon-blue/35 to-transparent" />
      <div className="absolute top-[30%] left-[10%] w-[560px] h-[320px] bg-neon-pink/10 rounded-full blur-[150px]" />
      <div className="absolute bottom-[10%] right-[8%] w-[560px] h-[300px] bg-neon-blue/10 rounded-full blur-[140px]" />
      <div className="absolute inset-0 speed-lines opacity-[0.22]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-7xl mb-12 md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow text-neon-blue mb-4">Proof Over Promises</p>
            <div className="section-line mb-6" />
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 max-w-5xl">See the Transformation</h2>
            <p className="text-white/52 max-w-3xl text-lg md:text-xl leading-relaxed">
              Real restoration results from East Texas vehicles: paint correction, interior reset, ceramic protection, and wheel recovery.
            </p>
          </motion.div>
        </div>

        <div className="grid lg:grid-cols-[1.05fr_2fr] gap-6 lg:gap-8 items-start">
          <div className="glass-strong rounded-3xl p-5 md:p-6 border border-white/12">
            <p className="text-xs uppercase tracking-[0.2em] text-white/45 font-semibold mb-4">Transformation Types</p>
            <div className="flex flex-wrap lg:flex-col gap-2.5">
              {categories.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  className={`text-left px-4 py-3 rounded-xl text-xs md:text-sm font-bold transition-all duration-250 flex items-center gap-3 ${
                    active === item.id
                      ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink-sm"
                      : "glass border border-white/10 text-white/60 hover:text-white hover:border-neon-blue/30"
                  }`}
                >
                  <span className="inline-flex items-center justify-center w-7 h-7 rounded-lg bg-white/10 text-[10px] tracking-wider font-black">{item.icon}</span>
                  <span>{item.label}</span>
                </button>
              ))}
            </div>

            <div className="mt-5 rounded-2xl p-4 bg-white/[0.03] border border-white/8">
              <p className="text-[11px] text-white/40 uppercase tracking-wider">Conversion Signal</p>
              <p className="mt-2 text-sm text-white/65 leading-relaxed">
                Shoppers trust visible outcomes. This section helps prospects feel the difference before they request a quote.
              </p>
            </div>
          </div>

          <div className="glass-strong rounded-[2rem] p-3 md:p-5 border border-white/12">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.32 }}
              >
                <Slider category={category} />
              </motion.div>
            </AnimatePresence>
            <p className="text-center text-white/35 text-xs mt-4">Touch and mouse optimized comparison slider</p>
          </div>
        </div>
      </div>
    </section>
  );
}
