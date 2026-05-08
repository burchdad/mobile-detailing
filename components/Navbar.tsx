"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState, useEffect } from "react";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Results", href: "#before-after" },
  { label: "Membership", href: "#membership" },
  { label: "Area", href: "#service-area" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-4"
    >
      <div
        className={`max-w-6xl mx-auto flex items-center justify-between px-5 py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "glass-strong shadow-[0_8px_40px_rgba(0,0,0,0.7),0_0_0_1px_rgba(255,0,127,0.12)]"
            : "glass"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-9 h-9 rounded-xl bg-gradient-to-br from-neon-pink via-neon-pink/80 to-neon-blue flex items-center justify-center shadow-neon-pink-sm">
            <span className="text-white font-black text-base leading-none">A</span>
          </div>
          <div className="flex flex-col leading-none">
            <span className="font-black text-white text-base tracking-tight">
              A&amp;S <span className="gradient-text">Mobile</span>
            </span>
            <span className="text-[9px] text-white/30 tracking-[0.15em] uppercase font-medium">
              Detail &middot; Tyler TX
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="relative px-4 py-2 text-sm font-medium text-white/50 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/5 group"
            >
              {link.label}
              <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-0 h-px bg-neon-blue group-hover:w-4 transition-all duration-300" />
            </a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-3">
          <a
            href="tel:+19035550000"
            className="hidden lg:flex items-center gap-1.5 text-white/35 hover:text-white/70 text-xs font-medium transition-colors duration-200"
          >
            <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            (903) 555-0000
          </a>

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="relative overflow-hidden group px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
          >
            <span className="relative z-10">Book Now</span>
            <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-700 bg-white/25 w-1/3 pointer-events-none" />
          </motion.a>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg glass border border-white/10"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-4 h-px bg-white transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-4 h-px bg-white transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-4 h-px bg-white transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden max-w-6xl mx-auto mt-2"
      >
        <div className="glass-strong rounded-2xl px-4 py-3 border border-white/8 flex flex-col gap-1">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white hover:bg-white/5 rounded-xl transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
          <a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            className="mt-2 px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue rounded-xl shadow-neon-pink-sm"
          >
            Book Now
          </a>
        </div>
      </motion.div>
    </motion.header>
  );
}
