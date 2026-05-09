"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useState, useEffect } from "react";
import logoImage from "../logo.png";

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
      className="fixed top-0 left-0 right-0 z-50 px-4 md:px-6 pt-3 md:pt-4"
    >
      <div
        className={`max-w-7xl mx-auto flex items-center justify-between px-4 md:px-6 py-2 md:py-3 rounded-2xl transition-all duration-500 ${
          scrolled
            ? "bg-black/40 backdrop-blur-md border border-white/8 shadow-[0_8px_32px_rgba(0,0,0,0.6),0_0_0_1px_rgba(0,207,255,0.08),0_0_60px_rgba(0,207,255,0.15)]"
            : "bg-black/20 backdrop-blur-sm border border-white/5"
        }`}
      >
        {/* Logo */}
        <Link href="/" className="group relative shrink-0 -m-2 p-2 rounded-xl transition-all duration-300 hover:bg-white/5">
          <div className="relative w-24 md:w-28 rounded-lg border border-white/10 bg-black/25 p-1 md:p-1.5 backdrop-blur-sm transition-all duration-300 group-hover:border-neon-pink/40">
            <Image
              src={logoImage}
              alt="A&S Mobile Detail logo"
              className="h-auto w-full"
              priority
            />
          </div>
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              className="relative text-sm font-medium text-white/60 hover:text-white transition-colors duration-300 group"
              whileHover={{ y: -2 }}
            >
              {link.label}
              <motion.span
                className="absolute -bottom-1 left-0 right-0 h-px bg-gradient-to-r from-neon-pink via-neon-blue to-transparent"
                initial={{ scaleX: 0, transformOrigin: "left" }}
                whileHover={{ scaleX: 1 }}
                transition={{ duration: 0.4 }}
              />
            </motion.a>
          ))}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2 md:gap-4">
          <motion.a
            href="tel:+19035550000"
            className="hidden lg:flex items-center gap-2 text-white/40 hover:text-white/80 text-xs font-medium transition-all duration-300 px-3 py-1.5 rounded-lg hover:bg-white/5"
            whileHover={{ x: 2 }}
          >
            <svg className="w-3.5 h-3.5 text-neon-green" fill="currentColor" viewBox="0 0 20 20">
              <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
            </svg>
            <span>(903) 555-0000</span>
          </motion.a>

          <motion.a
            href="#booking"
            whileHover={{ scale: 1.05, y: -2 }}
            whileTap={{ scale: 0.95 }}
            className="relative overflow-hidden group px-4 md:px-6 py-2 md:py-2.5 rounded-xl font-bold text-xs md:text-sm text-white bg-gradient-to-r from-neon-pink via-neon-blue to-neon-pink shadow-[0_0_20px_rgba(255,0,127,0.3)] hover:shadow-[0_0_40px_rgba(255,0,127,0.5)] transition-all duration-500"
          >
            <span className="relative z-10 flex items-center justify-center gap-1.5">
              <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Book Now
            </span>
            <motion.div
              className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20"
              animate={{ x: ["-100%", "100%"] }}
              transition={{ duration: 1.2, repeat: Infinity }}
            />
          </motion.a>

          {/* Mobile menu button */}
          <button
            className="md:hidden w-9 h-9 flex flex-col items-center justify-center gap-1.5 rounded-lg bg-black/30 backdrop-blur-md border border-white/10 hover:border-white/20 transition-all duration-300"
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label="Toggle menu"
          >
            <span className={`w-4 h-px bg-white/80 transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-[7px]" : ""}`} />
            <span className={`w-4 h-px bg-white/60 transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`w-4 h-px bg-white/80 transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-[7px]" : ""}`} />
          </button>
        </div>
      </div>

      {/* Mobile dropdown */}
      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        className="md:hidden overflow-hidden max-w-7xl mx-auto mt-2 px-4 md:px-6"
      >
        <div className="bg-black/40 backdrop-blur-md rounded-2xl px-4 py-4 border border-white/8 flex flex-col gap-1">
          {navLinks.map((link) => (
            <motion.a
              key={link.label}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              whileHover={{ x: 4, backgroundColor: "rgba(255,255,255,0.08)" }}
              className="px-4 py-3 text-sm font-medium text-white/70 hover:text-white rounded-lg transition-all duration-200"
            >
              {link.label}
            </motion.a>
          ))}
          <motion.a
            href="#booking"
            onClick={() => setMenuOpen(false)}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.96 }}
            className="mt-3 px-4 py-3 text-center text-sm font-bold text-white bg-gradient-to-r from-neon-pink via-neon-blue to-neon-pink rounded-lg shadow-[0_0_20px_rgba(255,0,127,0.3)]"
          >
            Book Now
          </motion.a>
        </div>
      </motion.div>
    </motion.header>
  );
}
