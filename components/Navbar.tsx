"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const navLinks = [
  { label: "Services", href: "#services" },
  { label: "Before & After", href: "#before-after" },
  { label: "Membership", href: "#membership" },
  { label: "Service Area", href: "#service-area" },
];

export default function Navbar() {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 px-6 py-4"
    >
      <div className="max-w-6xl mx-auto flex items-center justify-between glass rounded-2xl px-6 py-3 border border-white/8">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center text-white font-black text-sm shadow-neon-pink">
            A
          </div>
          <span className="font-black text-white text-lg tracking-tight">
            A&S <span className="gradient-text">Mobile</span>
          </span>
        </Link>

        {/* Nav links */}
        <nav className="hidden md:flex items-center gap-6">
          {navLinks.map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="text-white/60 text-sm font-medium hover:text-white transition-colors duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* CTA */}
        <motion.a
          href="#booking"
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="relative overflow-hidden group px-5 py-2.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink"
        >
          <span className="relative z-10">Book Now</span>
          <span className="absolute inset-0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 bg-white/20 w-1/3" />
        </motion.a>
      </div>
    </motion.header>
  );
}
