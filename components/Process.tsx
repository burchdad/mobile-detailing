"use client";

import { motion } from "framer-motion";

const steps = [
  {
    number: "01",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    ),
    title: "Schedule",
    desc: "Pick a package, date, and location in under two minutes.",
    color: "pink",
  },
  {
    number: "02",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
    title: "Arrival",
    desc: "Our mobile team arrives at your driveway, office, or garage.",
    color: "blue",
  },
  {
    number: "03",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
      </svg>
    ),
    title: "Inspection",
    desc: "We evaluate paint, trim, and interior condition before starting.",
    color: "green",
  },
  {
    number: "04",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
      </svg>
    ),
    title: "Restoration",
    desc: "Deep-cleaning, correction, and precision detailing bring everything back.",
    color: "pink",
  },
  {
    number: "05",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Protection",
    desc: "Sealants or ceramic layers lock in gloss and defend your finish.",
    color: "blue",
  },
  {
    number: "06",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
    title: "Final Walkthrough",
    desc: "We review the finish with you and confirm every detail is right.",
    color: "blue",
  },
];

const colorMap = {
  pink: { num: "text-neon-pink", icon: "bg-neon-pink/10 text-neon-pink border-neon-pink/20", line: "from-neon-pink" },
  blue: { num: "text-neon-blue", icon: "bg-neon-blue/10 text-neon-blue border-neon-blue/20", line: "from-neon-blue" },
  green: { num: "text-neon-green", icon: "bg-neon-green/10 text-neon-green border-neon-green/20", line: "from-neon-green" },
};

export default function Process() {
  return (
    <section className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-green/25 to-transparent" />
      <div className="absolute inset-0">
        <div className="absolute top-1/2 left-1/4 w-72 h-72 bg-neon-green/4 rounded-full blur-[100px]" />
        <div className="absolute top-1/3 right-1/4 w-72 h-72 bg-neon-pink/4 rounded-full blur-[100px]" />
      </div>

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
        >
          <p className="eyebrow text-neon-green mb-4">How It Works</p>
          <div className="section-line mx-auto mb-6 bg-gradient-to-r from-neon-green to-neon-blue" />
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
            From Booking to Brilliance
          </h2>
          <p className="text-white/45 max-w-md mx-auto text-base">
            Six steps. Zero hassle. Studio-level results delivered at your location.
          </p>
        </motion.div>

        {/* Steps — desktop: horizontal with connecting line */}
        <div className="relative">
          {/* Connecting track */}
          <div className="hidden xl:block absolute top-[52px] left-[7%] right-[7%] h-px bg-gradient-to-r from-neon-pink/30 via-neon-blue/55 to-neon-green/30" />

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-6 gap-6">
            {steps.map((step, i) => {
              const c = colorMap[step.color as keyof typeof colorMap];
              return (
                <motion.div
                  key={step.number}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.12, duration: 0.65, ease: "easeOut" }}
                  className="relative flex flex-col items-center text-center lg:items-center"
                >
                  {/* Icon circle */}
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className={`relative w-[68px] h-[68px] rounded-2xl border flex items-center justify-center mb-4 z-10 ${c.icon}`}
                  >
                    {step.icon}
                    <span className={`absolute -top-2 -right-2 text-[10px] font-black ${c.num} bg-deep-black px-1 rounded`}>
                      {step.number}
                    </span>
                  </motion.div>

                  <h3 className="text-sm font-bold text-white mb-2">{step.title}</h3>
                  <p className="text-white/45 text-xs leading-relaxed" dangerouslySetInnerHTML={{ __html: step.desc }} />
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-center mt-14"
        >
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
          >
            Start Your Experience
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </motion.a>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
