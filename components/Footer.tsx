"use client";

import { motion } from "framer-motion";

const serviceLinks = [
  "Maintenance Detail",
  "Full Interior Restoration",
  "Paint Enhancement",
  "Ceramic Coating",
  "Monthly Membership",
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-[#020205] border-t border-white/10">
      <div className="absolute inset-0 mesh-bg opacity-80" />
      <div className="absolute inset-0 speed-lines opacity-20" />
      <div className="h-[2px] w-full bg-gradient-to-r from-transparent via-neon-pink to-neon-blue to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[740px] h-28 bg-neon-pink/10 blur-[60px]" />
      <div className="absolute -bottom-12 right-[12%] w-[440px] h-[200px] bg-neon-blue/10 blur-[90px]" />

      <div className="w-full px-5 md:px-8 py-20 relative z-10">
        <div className="mx-auto max-w-7xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-14">
          {/* Brand */}
          <div className="glass-strong rounded-3xl border border-white/12 p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center text-white font-black text-base shadow-neon-pink-sm">
                A
              </div>
              <div>
                <div className="font-black text-white text-base leading-none">
                  A&amp;S <span className="gradient-text">Mobile</span>
                </div>
                <div className="text-[10px] text-white/30 tracking-[0.12em] uppercase mt-0.5">Detail &middot; Tyler TX</div>
              </div>
            </div>
            <p className="text-white/40 text-sm leading-relaxed max-w-xs mb-5">
              Elite mobile auto detailing serving Tyler, TX and surrounding East Texas communities. Protection, gloss, and precision on every vehicle.
            </p>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-neon-green animate-glow-pulse" />
              <span className="text-white/30 text-xs">Accepting new clients in East Texas</span>
            </div>
          </div>

          {/* Services */}
          <div className="glass rounded-3xl border border-white/10 p-6">
            <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-5">Services</h3>
            <ul className="space-y-2.5">
              {serviceLinks.map((s) => (
                <li key={s}>
                  <a href="#services" className="text-white/45 text-sm hover:text-white hover:text-neon-blue transition-colors duration-200">
                    {s}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div className="glass rounded-3xl border border-white/10 p-6">
            <h3 className="text-xs font-bold text-white/50 tracking-widest uppercase mb-5">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-neon-pink mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
                <span className="text-white/45 text-sm">Tyler, TX &amp; East Texas</span>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-neon-blue mt-0.5 shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <a href="tel:+19035550000" className="text-white/45 text-sm hover:text-white transition-colors duration-200">(903) 555-0000</a>
              </div>
              <div className="flex items-start gap-3">
                <svg className="w-4 h-4 text-neon-green mt-0.5 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                <a href="mailto:hello@asmobiledetail.com" className="text-white/45 text-sm hover:text-white transition-colors duration-200">hello@asmobiledetail.com</a>
              </div>
            </div>

            {/* Ghost AI badge */}
            <div className="mt-8 pt-6 border-t border-white/5">
              <p className="text-white/25 text-xs mb-2 uppercase tracking-wider">Website powered by</p>
              <motion.div
                animate={{ boxShadow: ["0 0 0 rgba(0,207,255,0)", "0 0 18px rgba(0,207,255,0.28)", "0 0 0 rgba(0,207,255,0)"] }}
                transition={{ duration: 4.2, repeat: Infinity, ease: "easeInOut" }}
                className="glass-strong rounded-xl px-3.5 py-2.5 border border-neon-blue/25 inline-flex items-center gap-2.5"
              >
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-neon-pink/60 to-neon-blue/60 flex items-center justify-center">
                  <span className="text-white font-black text-[9px]">G</span>
                </div>
                <span className="text-white/80 text-sm font-semibold tracking-wide">Ghost AI Solutions</span>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-white/5 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-white/20 text-xs">
            &copy; {new Date().getFullYear()} A&amp;S Mobile Detail. All rights reserved.
          </p>
          <p className="text-white/15 text-xs text-center">
            Elite mobile auto detailing &bull; Tyler TX &bull; Serving East Texas since 2021
          </p>
        </div>
        </div>
      </div>
    </footer>
  );
}
