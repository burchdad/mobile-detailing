"use client";

import { motion } from "framer-motion";

const features = [
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 20l-5.447-2.724A1 1 0 013 16.382V5.618a1 1 0 011.447-.894L9 7m0 13l6-3m-6 3V7m6 10l4.553 2.276A1 1 0 0021 18.382V7.618a1 1 0 00-.553-.894L15 4m0 13V4m0 0L9 7" />
      </svg>
    ),
    title: "Elite Mobile Concierge",
    desc: "White-glove mobile detailing at your home, office, or private garage.",
    color: "pink",
    featured: true,
    stats: ["500+ Vehicles Detailed", "Fully Insured Team", "5-Star Local Reputation"],
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Bodyshop-Safe Product Systems",
    desc: "Professional compounds, coatings, and tools selected for premium finishes.",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
    title: "Final Walk-Through Guarantee",
    desc: "Every service ends with a quality sign-off before we close the job.",
    color: "green",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Complete Cabin + Exterior Reset",
    desc: "From cockpit touchpoints to paintwork, every surface is restored with intent.",
    color: "pink",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M7 21a4 4 0 01-4-4V5a2 2 0 012-2h4a2 2 0 012 2v12a4 4 0 01-4 4zm0 0h12a2 2 0 002-2v-4a2 2 0 00-2-2h-2.343M11 7.343l1.657-1.657a2 2 0 012.828 0l2.829 2.829a2 2 0 010 2.828l-8.486 8.485M7 17h.01" />
      </svg>
    ),
    title: "Precision Paint Correction",
    desc: "Swirl and defect reduction engineered for true gloss, depth, and clarity.",
    color: "blue",
  },
  {
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
      </svg>
    ),
    title: "Long-Term Ceramic Protection",
    desc: "Liquid-glass defense for hydrophobic behavior, gloss retention, and easier upkeep.",
    color: "green",
  },
];

const colorMap = {
  pink: {
    icon: "bg-neon-pink/10 text-neon-pink border-neon-pink/25",
    edge: "from-neon-pink/45 via-neon-pink/10 to-transparent",
    chip: "border-neon-pink/30 text-neon-pink",
    hover: "hover:border-neon-pink/35 hover:shadow-neon-pink-sm",
  },
  blue: {
    icon: "bg-neon-blue/10 text-neon-blue border-neon-blue/25",
    edge: "from-neon-blue/45 via-neon-blue/10 to-transparent",
    chip: "border-neon-blue/30 text-neon-blue",
    hover: "hover:border-neon-blue/35 hover:shadow-neon-blue-sm",
  },
  green: {
    icon: "bg-neon-green/10 text-neon-green border-neon-green/25",
    edge: "from-neon-green/45 via-neon-green/10 to-transparent",
    chip: "border-neon-green/30 text-neon-green",
    hover: "hover:border-neon-green/35 hover:shadow-neon-green-sm",
  },
};

const trustChips = ["Fully Insured", "5-Star Rated", "Paint-Safe Systems", "Mobile Concierge"];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 32 }, show: { opacity: 1, y: 0 } };

export default function TrustStrip() {
  return (
    <section className="section-pad bg-surface relative overflow-hidden">
      {/* Top accent line */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-0 left-0 right-0 h-80 bg-gradient-to-b from-deep-black to-transparent pointer-events-none" />
      {/* Orbs */}
      <div className="absolute top-1/2 left-0 w-64 h-64 bg-neon-pink/5 rounded-full blur-[80px]" />
      <div className="absolute top-1/2 right-0 w-64 h-64 bg-neon-blue/5 rounded-full blur-[80px]" />
      <div className="absolute inset-0 speed-lines opacity-[0.18]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-7xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <p className="eyebrow text-neon-blue mb-4 tracking-[0.2em]">Why Choose Us</p>
            <div className="section-line mb-6" />
            <h2 className="text-[clamp(2.75rem,6.2vw,5.25rem)] font-black text-white leading-[0.95] tracking-[-0.02em] mb-6 max-w-5xl">
              The A&amp;S Standard
            </h2>
            <p className="text-white/62 max-w-3xl text-[1.05rem] md:text-[1.25rem] leading-[1.55]">
              Protection, gloss, and precision on every vehicle we touch.
            </p>
            <div className="mt-8 flex flex-wrap gap-2.5">
              {trustChips.map((chip) => (
                <span
                  key={chip}
                  className="inline-flex items-center rounded-full border border-white/12 bg-black/25 px-3.5 py-1.5 text-[10px] font-semibold uppercase tracking-[0.16em] text-white/78"
                >
                  {chip}
                </span>
              ))}
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-5 md:gap-6 w-full"
        >
          {features.map((f, index) => {
            const c = colorMap[f.color as keyof typeof colorMap];
            const spanClass =
              index === 0
                ? "md:col-span-2 lg:col-span-4"
                : index === 1
                  ? "md:col-span-2 lg:col-span-2"
                  : "lg:col-span-3";
            return (
              <motion.div
                key={f.title}
                variants={item}
                whileHover={{ scale: 1.012, y: -5 }}
                transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                className={`shine-card lux-panel group relative overflow-hidden rounded-3xl p-6 md:p-7 border border-white/10 transition-all duration-300 cursor-default bg-[linear-gradient(145deg,rgba(255,255,255,0.07),rgba(255,255,255,0.01))] ${spanClass} ${c.hover}`}
              >
                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.edge}`} />
                <div className="absolute inset-0 opacity-[0.06] pointer-events-none" style={{ backgroundImage: "radial-gradient(rgba(255,255,255,0.65) 0.5px, transparent 0.5px)", backgroundSize: "3px 3px" }} />
                <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(160deg,rgba(255,255,255,0.06)_0%,transparent_35%,transparent_70%,rgba(0,0,0,0.22)_100%)]" />
                <div className={`inline-flex w-12 h-12 rounded-xl border items-center justify-center mb-6 ${c.icon}`}>
                  {f.icon}
                </div>
                <h3 className="text-[1.18rem] md:text-[1.42rem] font-black leading-[1.12] tracking-[-0.01em] mb-2.5 text-white">{f.title}</h3>
                <p className="text-white/68 text-[0.95rem] md:text-[1rem] leading-[1.58]">{f.desc}</p>

                {f.featured && f.stats ? (
                  <div className="mt-6 flex flex-wrap gap-2">
                    {f.stats.map((stat) => (
                      <span
                        key={stat}
                        className={`rounded-full border bg-black/35 px-3 py-1 text-[10px] uppercase tracking-[0.14em] font-semibold ${c.chip}`}
                      >
                        {stat}
                      </span>
                    ))}
                  </div>
                ) : null}
              </motion.div>
            );
          })}
        </motion.div>
      </div>
    </section>
  );
}
