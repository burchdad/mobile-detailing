"use client";

import { motion } from "framer-motion";

const steps = [
  {
    num: "01",
    title: "Book Online",
    desc: "Select your service, preferred date, and location in minutes.",
    icon: "📱",
  },
  {
    num: "02",
    title: "We Come To You",
    desc: "Our fully equipped team arrives at your home, office, or anywhere.",
    icon: "🚚",
  },
  {
    num: "03",
    title: "Vehicle Inspection",
    desc: "We assess your vehicle and confirm all service details with you.",
    icon: "🔍",
  },
  {
    num: "04",
    title: "Premium Detail Service",
    desc: "Our technicians get to work with professional products and precision.",
    icon: "✨",
  },
  {
    num: "05",
    title: "Final Walkthrough",
    desc: "We inspect every inch together. You approve before we leave.",
    icon: "🎯",
  },
];

export default function Process() {
  return (
    <section className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 right-0 w-96 h-96 bg-neon-blue/6 rounded-full blur-[120px]" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-blue text-sm font-semibold tracking-widest uppercase mb-3">
            How It Works
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white">
            Simple. Seamless. Superior.
          </h2>
        </motion.div>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line */}
          <div className="hidden lg:block absolute top-12 left-[calc(10%+2rem)] right-[calc(10%+2rem)] h-px bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green" />

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
            {steps.map((step, i) => (
              <motion.div
                key={step.num}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.12, duration: 0.6 }}
                whileHover={{ scale: 1.05, y: -4 }}
                className="relative flex flex-col items-center text-center"
              >
                {/* Number circle */}
                <div className="relative z-10 w-16 h-16 mb-5 rounded-full bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center shadow-neon-pink">
                  <span className="text-xl font-black text-white">{step.icon}</span>
                </div>

                {/* Card */}
                <div className="glass rounded-2xl p-5 border border-white/8 hover:border-neon-blue/30 transition-all duration-300 w-full">
                  <div className="text-neon-pink text-xs font-bold mb-1">
                    Step {step.num}
                  </div>
                  <h3 className="text-white font-bold text-base mb-2">
                    {step.title}
                  </h3>
                  <p className="text-white/50 text-xs leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
