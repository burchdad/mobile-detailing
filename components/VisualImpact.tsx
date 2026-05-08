"use client";

import { motion } from "framer-motion";

export default function VisualImpact() {
  return (
    <section className="section-pad bg-deep-black relative overflow-hidden">
      {/* Background glows */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-radial from-neon-pink/8 via-transparent to-transparent" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-neon-pink text-sm font-semibold tracking-widest uppercase mb-4">
              Our Philosophy
            </p>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white leading-tight mb-6">
              We Don&apos;t Just{" "}
              <span className="gradient-text">Clean Cars.</span>
              <br />
              We Restore Them.
            </h2>
            <p className="text-white/60 text-lg leading-relaxed mb-8">
              Every vehicle has a story. Years of UV exposure, road grime, and
              neglect dull what was once a source of pride. We reverse that
              damage &mdash; meticulously, professionally, and completely.
            </p>
            <p className="text-white/50 leading-relaxed mb-10">
              Using only professional-grade products and proven techniques, our
              team treats every job with the same dedication &mdash; whether it&apos;s a
              daily driver or a weekend showcar.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { label: "Paint Perfection", value: "100%" },
                { label: "Client Return Rate", value: "94%" },
                { label: "5-Star Reviews", value: "200+" },
                { label: "Years Experience", value: "7+" },
              ].map((s) => (
                <motion.div
                  key={s.label}
                  whileHover={{ scale: 1.04 }}
                  className="glass rounded-xl p-4 border border-white/8"
                >
                  <div className="text-2xl font-black gradient-text">{s.value}</div>
                  <div className="text-xs text-white/40 mt-1">{s.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Right — Visual split */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="relative rounded-2xl overflow-hidden h-[480px] border border-white/10">
              {/* Before half */}
              <div className="absolute inset-0 left-0 w-1/2 bg-gradient-to-br from-stone-800 via-stone-700 to-stone-600">
                <div className="absolute inset-0 bg-black/40" />
                <div className="absolute bottom-6 left-4 text-xs font-bold text-white/60 bg-black/50 px-3 py-1 rounded-full">
                  BEFORE
                </div>
                {/* Grime texture simulation */}
                <div className="absolute inset-0 opacity-30"
                  style={{
                    backgroundImage:
                      "radial-gradient(circle at 30% 40%, rgba(255,200,100,0.3) 0%, transparent 50%), radial-gradient(circle at 70% 70%, rgba(100,80,50,0.4) 0%, transparent 40%)",
                  }}
                />
              </div>

              {/* After half */}
              <div className="absolute inset-0 left-1/2 right-0 bg-gradient-to-br from-slate-900 via-slate-800 to-zinc-900">
                {/* Gloss shine simulation */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/15" />
                <div className="absolute top-1/4 left-4 w-20 h-1 bg-neon-blue/50 blur-sm rounded-full rotate-12" />
                <div className="absolute top-1/3 right-4 w-16 h-0.5 bg-neon-pink/40 blur-sm rounded-full -rotate-6" />
                <div className="absolute top-1/2 left-8 w-24 h-1 bg-white/20 blur-sm rounded-full rotate-3" />
                <div className="absolute bottom-6 right-4 text-xs font-bold text-neon-blue bg-black/50 px-3 py-1 rounded-full">
                  AFTER
                </div>
              </div>

              {/* Divider */}
              <div className="absolute top-0 bottom-0 left-1/2 w-0.5 bg-gradient-to-b from-neon-pink via-white to-neon-blue z-10 shadow-glow-sm" />

              {/* Center icon */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 w-10 h-10 rounded-full bg-white flex items-center justify-center shadow-neon-blue">
                <span className="text-lg">✨</span>
              </div>
            </div>

            {/* Glow effect under image */}
            <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 w-3/4 h-8 bg-neon-pink/20 blur-2xl rounded-full" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
