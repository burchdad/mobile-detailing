"use client";

import { motion } from "framer-motion";

const stats = [
  { value: "500+", label: "Vehicles Transformed", color: "pink" },
  { value: "5.0", label: "Star Google Rating", color: "blue" },
  { value: "3+", label: "Years in East Texas", color: "green" },
  { value: "100%", label: "Satisfaction Rate", color: "pink" },
];

const colorMap = {
  pink: "neon-pink-text",
  blue: "neon-blue-text",
  green: "neon-green-text",
};

export default function VisualImpact() {
  return (
    <section className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-pink/20 to-transparent" />
      <div className="absolute top-1/3 left-0 w-96 h-96 bg-neon-blue/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/3 right-0 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: copy */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="eyebrow text-neon-blue mb-4">Our Philosophy</p>
            <div className="section-line mb-6" />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight leading-[1.05] mb-6">
              We Don&apos;t Just Clean Cars.{" "}
              <span className="gradient-text">We Restore Them.</span>
            </h2>
            <p className="text-white/55 text-base leading-relaxed mb-8 max-w-lg">
              Built for drivers who care how their vehicle shows up. Every job is a commitment to precision &mdash; from the first pass to the final walkthrough. Mobile convenience. Studio-level results.
            </p>

            <div className="grid grid-cols-2 gap-4 mb-10">
              {stats.map((s, i) => (
                <motion.div
                  key={s.label}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + i * 0.1, duration: 0.6 }}
                  className="glass rounded-2xl p-5 border border-white/7"
                >
                  <div className={`text-3xl font-black mb-1 ${colorMap[s.color as keyof typeof colorMap]}`}>
                    {s.value}
                  </div>
                  <div className="text-white/40 text-xs font-medium">{s.label}</div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#services"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white border border-white/15 glass hover:border-neon-blue/40 hover:shadow-neon-blue-sm transition-all duration-300"
            >
              View All Services
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden">
              {/* Before side */}
              <div className="absolute inset-0 left-0 w-1/2">
                <div className="w-full h-full bg-gradient-to-br from-stone-800 via-stone-700 to-stone-900 flex items-end justify-start p-4">
                  <span className="text-[10px] font-bold text-white/30 tracking-widest uppercase">Before</span>
                </div>
                {/* Grime texture overlay */}
                <div className="absolute inset-0 opacity-40" style={{ backgroundImage: "radial-gradient(circle at 30% 40%, rgba(80,60,20,0.6) 0%, transparent 60%), radial-gradient(circle at 70% 70%, rgba(40,30,10,0.5) 0%, transparent 50%)" }} />
              </div>

              {/* After side */}
              <div className="absolute inset-0 left-1/2">
                <div className="w-full h-full bg-gradient-to-br from-slate-900 via-slate-800 to-deep-black flex items-end justify-end p-4">
                  <span className="text-[10px] font-bold text-neon-blue/60 tracking-widest uppercase">After</span>
                </div>
                {/* Gloss sweeps */}
                <motion.div
                  className="absolute inset-0"
                  animate={{ x: ["-100%", "200%"] }}
                  transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", repeatDelay: 2 }}
                  style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.08) 50%, transparent 60%)" }}
                />
              </div>

              {/* Center divider */}
              <div className="absolute top-0 bottom-0 left-1/2 -translate-x-px w-0.5 bg-gradient-to-b from-neon-pink via-neon-blue to-neon-green shadow-neon-blue-sm" />

              {/* Center badge */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-deep-black border-2 border-neon-pink/60 flex items-center justify-center shadow-neon-pink-sm z-10">
                <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
                </svg>
              </div>

              {/* Label overlay */}
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="absolute top-4 left-4 glass rounded-xl px-3 py-1.5 text-xs font-semibold text-white/60 border border-white/10">Neglected</div>
                <div className="absolute top-4 right-4 glass rounded-xl px-3 py-1.5 text-xs font-semibold text-neon-blue/80 border border-neon-blue/20">Showroom Ready</div>
              </div>
            </div>

            {/* Floating card */}
            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-6 -left-6 glass-strong rounded-2xl p-4 border border-white/10 shadow-card"
            >
              <div className="text-xs text-white/40 mb-1 font-medium">Typical Result</div>
              <div className="text-sm font-bold text-white">Paint restored to</div>
              <div className="text-lg font-black gradient-text">95% clarity</div>
            </motion.div>

            {/* Glow */}
            <div className="absolute inset-0 rounded-3xl bg-neon-blue/5 blur-2xl -z-10 scale-110" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
