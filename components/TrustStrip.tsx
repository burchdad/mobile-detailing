"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: "🚗",
    title: "Fully Mobile Service",
    desc: "We come to your home, office, or anywhere you need us.",
    color: "neon-pink",
  },
  {
    icon: "✨",
    title: "Premium Products Only",
    desc: "Professional-grade chemicals and tools on every job.",
    color: "neon-blue",
  },
  {
    icon: "🛡️",
    title: "Satisfaction Guarantee",
    desc: "We're not done until you're completely satisfied.",
    color: "neon-green",
  },
  {
    icon: "🎯",
    title: "Interior + Exterior",
    desc: "Complete packages for a total vehicle transformation.",
    color: "neon-pink",
  },
  {
    icon: "💎",
    title: "Paint Correction",
    desc: "Remove swirls, scratches & restore your paint's clarity.",
    color: "neon-blue",
  },
  {
    icon: "🔬",
    title: "Ceramic Coating",
    desc: "Permanent-grade protection with a liquid-glass finish.",
    color: "neon-green",
  },
];

const glowMap: Record<string, string> = {
  "neon-pink": "hover:shadow-neon-pink hover:border-neon-pink/50",
  "neon-blue": "hover:shadow-neon-blue hover:border-neon-blue/50",
  "neon-green": "hover:shadow-neon-green hover:border-neon-green/50",
};

const textMap: Record<string, string> = {
  "neon-pink": "text-neon-pink",
  "neon-blue": "text-neon-blue",
  "neon-green": "text-neon-green",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const item = {
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function TrustStrip() {
  return (
    <section className="section-pad bg-charcoal relative overflow-hidden">
      {/* background accent */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-px bg-gradient-to-r from-transparent via-neon-blue/40 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue text-sm font-semibold tracking-widest uppercase mb-3">
            Why Choose Us
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            The A&S Standard
          </h2>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {features.map((f) => (
            <motion.div
              key={f.title}
              variants={item}
              whileHover={{ scale: 1.04, y: -4 }}
              className={`glass rounded-2xl p-6 border border-white/8 transition-all duration-300 cursor-default ${glowMap[f.color]}`}
            >
              <div className="text-3xl mb-4">{f.icon}</div>
              <h3 className={`text-lg font-bold mb-2 ${textMap[f.color]}`}>
                {f.title}
              </h3>
              <p className="text-white/60 text-sm leading-relaxed">{f.desc}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
