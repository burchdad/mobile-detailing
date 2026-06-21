"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import logoImage from "../logo.png";

const navLinks = [
  { label: "Services", href: "/services" },
  { label: "Results", href: "/results" },
  { label: "Media", href: "/media" },
  { label: "Membership", href: "/membership" },
  { label: "Journal", href: "/journal" },
];

const mobileLinks = [
  { label: "About Steve", href: "/about" },
  ...navLinks,
  { label: "Service Area", href: "/service-area" },
  { label: "FAQ", href: "/faq" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className="fixed inset-x-0 top-0 z-50 px-4 pt-4 md:px-6"
    >
      <div
        className={`mx-auto flex h-[72px] max-w-7xl items-center justify-between rounded-[8px] px-4 transition-all duration-500 md:px-5 ${
          scrolled
            ? "border border-white/10 bg-black/58 shadow-[0_20px_80px_rgba(0,0,0,0.38)] backdrop-blur-xl"
            : "border border-white/[0.06] bg-black/24 backdrop-blur-md"
        }`}
      >
        <Link href="/" className="group flex min-w-0 items-center gap-3">
          <span className="flex h-10 w-10 shrink-0 items-center justify-center overflow-hidden rounded-[6px] bg-white/[0.03]">
            <Image src={logoImage} alt="A&S Detailing" className="h-full w-full object-cover opacity-90 transition-opacity group-hover:opacity-100" priority />
          </span>
          <span className="hidden leading-none sm:block">
            <span className="block text-sm font-black uppercase tracking-[0.22em] text-white">A&S Detailing</span>
            <span className="mt-1 block text-[10px] font-semibold uppercase tracking-[0.18em] text-white/42">Vehicle Preservation</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-7 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              className="text-[11px] font-bold uppercase tracking-[0.18em] text-white/52 transition-colors hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          <Link
            href="/contact"
            className="hidden text-[11px] font-bold uppercase tracking-[0.16em] text-white/42 transition-colors hover:text-white xl:block"
          >
            Contact
          </Link>
          <Link
            href="/assessment"
            className="rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-4 py-3 text-[10px] font-black uppercase tracking-[0.16em] text-white shadow-neon-pink-sm md:px-5"
          >
            Assessment
          </Link>
          <button
            className="flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-[6px] border border-white/10 bg-white/[0.03] lg:hidden"
            onClick={() => setMenuOpen((open) => !open)}
            aria-label="Toggle navigation"
          >
            <span className={`h-px w-4 bg-white/80 transition-transform ${menuOpen ? "translate-y-[6px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-white/55 transition-opacity ${menuOpen ? "opacity-0" : ""}`} />
            <span className={`h-px w-4 bg-white/80 transition-transform ${menuOpen ? "-translate-y-[6px] -rotate-45" : ""}`} />
          </button>
        </div>
      </div>

      <motion.div
        initial={false}
        animate={{ height: menuOpen ? "auto" : 0, opacity: menuOpen ? 1 : 0 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
        className="mx-auto mt-2 max-w-7xl overflow-hidden lg:hidden"
      >
        <div className="rounded-[8px] border border-white/10 bg-black/72 p-3 backdrop-blur-xl">
          {mobileLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              onClick={() => setMenuOpen(false)}
              className="block rounded-[6px] px-4 py-3 text-sm font-semibold text-white/70 transition-colors hover:bg-white/[0.04] hover:text-white"
            >
              {link.label}
            </Link>
          ))}
        </div>
      </motion.div>
    </motion.header>
  );
}
