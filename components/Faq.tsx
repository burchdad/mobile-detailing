"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const faqs = [
  {
    q: "Do you come to my home or office?",
    a: "Yes. We are fully mobile across Tyler and surrounding East Texas areas. You only need a safe parking space and access to water and power when required.",
  },
  {
    q: "How long does a full detail take?",
    a: "Most full details take 2 to 4 hours depending on vehicle size and condition. Paint correction and ceramic coating jobs may require additional time for proper finish quality.",
  },
  {
    q: "What is included in paint correction?",
    a: "Paint correction removes swirl marks, light scratches, and haze through machine polishing. It restores depth and gloss before protection is applied.",
  },
  {
    q: "Is ceramic coating worth it?",
    a: "If you want long-term gloss, easier maintenance, and better resistance against contaminants, ceramic coating is one of the highest-value upgrades for your vehicle finish.",
  },
  {
    q: "What makes A&S different from a car wash?",
    a: "A car wash is built for speed. A&S is built around inspection, paint-safe methods, interior preservation, finish protection, and a final walkthrough. The goal is to preserve the vehicle, not simply clean it.",
  },
  {
    q: "Do you work on luxury, classic, lifted, or performance vehicles?",
    a: "Yes. The service path is adjusted to the vehicle, finish condition, owner goals, and how the vehicle is stored and driven. Premium vehicles often benefit from correction, coating, and ongoing preservation planning.",
  },
  {
    q: "Do I have to pay when I submit a booking request?",
    a: "No. Booking requests are confirmation-first. We verify service details and availability with you before finalizing payment.",
  },
  {
    q: "Can I set up recurring maintenance?",
    a: "Absolutely. Vehicle Preservation Plans keep your vehicle consistently clean and protected with priority scheduling, ceramic-safe maintenance, and seasonal protection guidance.",
  },
];

export default function Faq() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-blue/30 to-transparent" />
      <div className="absolute top-[25%] left-[10%] w-[520px] h-[260px] bg-neon-blue/8 rounded-full blur-[130px]" />
      <div className="absolute bottom-[15%] right-[10%] w-[520px] h-[260px] bg-neon-pink/8 rounded-full blur-[130px]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-4xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="eyebrow text-neon-blue mb-4">Common Questions</p>
            <div className="section-line mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Everything Before Your Assessment</h2>
            <p className="text-white/50 max-w-2xl mx-auto text-base md:text-lg">
              Quick answers about service timing, mobile setup, ceramic coating, and what to expect from your appointment.
            </p>
          </motion.div>

          <div className="space-y-3">
            {faqs.map((item, index) => {
              const isOpen = openIndex === index;
              return (
                <motion.div
                  key={item.q}
                  initial={{ opacity: 0, y: 14 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.05, duration: 0.45 }}
                  className="glass rounded-2xl border border-white/10 overflow-hidden"
                >
                  <button
                    onClick={() => setOpenIndex(isOpen ? null : index)}
                    className="w-full flex items-center justify-between gap-4 px-5 md:px-6 py-4 text-left"
                  >
                    <span className="text-white font-bold text-sm md:text-base">{item.q}</span>
                    <span className={`w-8 h-8 rounded-lg border border-white/15 flex items-center justify-center text-neon-blue transition-transform duration-200 ${isOpen ? "rotate-45" : ""}`}>
                      +
                    </span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeOut" }}
                      >
                        <p className="px-5 md:px-6 pb-5 text-white/60 text-sm leading-relaxed">{item.a}</p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
