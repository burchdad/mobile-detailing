"use client";

import { motion } from "framer-motion";

export default function MobileCtaBar() {
  return (
    <>
      {/* Mobile CTA Bar - Hidden on desktop */}
      <motion.div
        initial={{ y: 100 }}
        animate={{ y: 0 }}
        transition={{ delay: 0.5, duration: 0.6, ease: "easeOut" }}
        className="fixed bottom-0 left-0 right-0 z-40 lg:hidden"
      >
        {/* Backdrop blur */}
        <div className="absolute inset-0 bg-black/50 backdrop-blur-md border-t border-white/8" />

        {/* Content */}
        <div className="relative px-4 py-3 flex items-center justify-between gap-2">
          {/* Call */}
          <motion.a
            href="tel:+19035550000"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-neon-blue/40 hover:bg-black/40 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-neon-blue" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/75">Call</span>
          </motion.a>

          {/* Text */}
          <motion.a
            href="sms:+19035550000"
            whileHover={{ scale: 1.03, y: -1 }}
            whileTap={{ scale: 0.94 }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl bg-black/30 backdrop-blur-sm border border-white/10 hover:border-neon-green/40 hover:bg-black/40 transition-all duration-300"
          >
            <svg className="w-5 h-5 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v10m-6 0h6m0 0l1.5 1.5" />
            </svg>
            <span className="text-[10px] font-bold uppercase tracking-wide text-white/75">Text</span>
          </motion.a>

          {/* Book - Primary CTA */}
          <motion.a
            href="#booking"
            whileHover={{ scale: 1.04, y: -2 }}
            whileTap={{ scale: 0.92 }}
            className="flex-1 flex items-center justify-center gap-1.5 px-3 py-3 rounded-xl font-bold text-[10px] text-white bg-gradient-to-r from-neon-pink via-neon-blue to-neon-pink shadow-[0_0_20px_rgba(255,0,127,0.3)] hover:shadow-[0_0_32px_rgba(255,0,127,0.5)] uppercase tracking-wide transition-shadow duration-300"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            Assess
          </motion.a>
        </div>

        {/* Safe area spacer for iPhone notch */}
        <div className="h-2" />
      </motion.div>

      {/* Spacer on mobile to push content above CTA bar */}
      <div className="h-24 lg:hidden" />
    </>
  );
}
