"use client";

import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { projectImages } from "../lib/projectMedia";

const primaryLinks = [
  { label: "Home", href: "/" },
  { label: "About Steve", href: "/about" },
  { label: "Ceramic Protection", href: "/services/ceramic-coatings" },
  { label: "Paint Correction", href: "/services/paint-correction" },
  { label: "Preservation Programs", href: "/membership" },
  { label: "Gallery", href: "/gallery" },
  { label: "Media", href: "/media" },
  { label: "Client Stories", href: "/reviews" },
  { label: "Contact", href: "/contact" },
];

const preservationPaths = [
  {
    label: "Silver Preservation",
    detail: "Daily-driver presentation",
    href: "/membership#silver",
    image: projectImages.hondaSideFinished,
  },
  {
    label: "Gold Preservation",
    detail: "Gloss, cabin order, routine care",
    href: "/membership#gold",
    image: projectImages.genesisSide,
  },
  {
    label: "Black Label",
    detail: "Highest-touch ownership care",
    href: "/membership#black-label",
    image: projectImages.fordCabinWide,
  },
  {
    label: "Ceramic Protection",
    detail: "Long-term exterior defense",
    href: "/services/ceramic-coatings",
    image: projectImages.genesisFront,
  },
  {
    label: "Paint Enhancement",
    detail: "Clarity, depth, and reflection",
    href: "/services/paint-correction",
    image: projectImages.mazdaSide,
  },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeImage, setActiveImage] = useState(preservationPaths[0].image);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 36);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = menuOpen ? "hidden" : previousOverflow;
    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <motion.header
        initial={{ y: -18, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.65, ease: "easeOut" }}
        className={`fixed inset-x-0 top-0 z-[80] h-[76px] transition-colors duration-500 ${
          scrolled || menuOpen ? "bg-black/74 backdrop-blur-xl" : "bg-gradient-to-b from-black/58 to-transparent"
        }`}
      >
        <div className="mx-auto grid h-full max-w-[1720px] grid-cols-[1fr_auto_1fr] items-center px-5 md:px-10">
          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            aria-label="Open navigation menu"
            aria-expanded={menuOpen}
            className="flex w-fit items-center gap-3 text-sm font-medium text-white transition-colors hover:text-white/72"
          >
            <span className="flex h-4 w-4 flex-col justify-center gap-[5px]" aria-hidden="true">
              <span className="block h-px w-4 bg-current" />
              <span className="block h-px w-4 bg-current" />
            </span>
            <span>Menu</span>
          </button>

          <Link
            href="/"
            onClick={closeMenu}
            className="text-center text-[18px] font-black uppercase leading-none tracking-[0.36em] text-white md:text-[24px] md:tracking-[0.48em]"
            aria-label="A&S Detailing home"
          >
            A&amp;S
          </Link>

          <div className="flex items-center justify-end gap-5">
            <Link
              href="/contact"
              className="hidden text-[12px] font-semibold uppercase tracking-[0.18em] text-white/72 transition-colors hover:text-white md:inline-flex"
            >
              Contact
            </Link>
            <Link
              href="/assessment"
              className="rounded-full bg-white px-4 py-2 text-[11px] font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-white/82 md:px-5"
            >
              Assessment
            </Link>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {menuOpen ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}
            className="fixed inset-0 z-[100] bg-black text-black"
          >
            <div className="grid h-dvh grid-cols-1 overflow-y-auto bg-[#f5f3ee] lg:grid-cols-[32vw_32vw_1fr] lg:overflow-hidden">
              <motion.aside
                initial={{ x: -32, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -24, opacity: 0 }}
                transition={{ duration: 0.42, ease: "easeOut" }}
                className="flex min-h-dvh flex-col justify-between px-7 py-8 md:px-12 lg:px-14"
              >
                <div>
                  <button
                    type="button"
                    onClick={closeMenu}
                    aria-label="Close navigation menu"
                    className="mb-12 flex h-14 w-14 items-center justify-center rounded-full bg-black text-white transition-colors hover:bg-black/78"
                  >
                    <span className="relative block h-5 w-5" aria-hidden="true">
                      <span className="absolute left-0 top-1/2 block h-px w-5 rotate-45 bg-current" />
                      <span className="absolute left-0 top-1/2 block h-px w-5 -rotate-45 bg-current" />
                    </span>
                  </button>

                  <nav className="space-y-1" aria-label="Primary navigation">
                    {primaryLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={closeMenu}
                        className="group flex min-h-14 items-center justify-between rounded-[6px] px-3 text-[23px] font-medium tracking-[-0.02em] text-black transition-colors hover:bg-black/[0.055] md:text-[28px]"
                      >
                        <span>{link.label}</span>
                        <span className="text-2xl text-black/34 transition-transform group-hover:translate-x-1 group-hover:text-black" aria-hidden="true">
                          &rsaquo;
                        </span>
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="mt-14 flex items-end justify-between gap-8 border-t border-black/10 pt-8">
                  <div>
                    <p className="text-[11px] font-black uppercase tracking-[0.24em] text-black/46">East Texas</p>
                    <p className="mt-2 max-w-[18rem] text-xl font-semibold leading-tight text-black">Vehicle preservation for owners who notice everything.</p>
                  </div>
                </div>
              </motion.aside>

              <motion.section
                initial={{ x: -16, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                exit={{ x: -12, opacity: 0 }}
                transition={{ duration: 0.48, delay: 0.04, ease: "easeOut" }}
                className="bg-[#e8e8e6] px-7 py-10 md:px-12 lg:h-dvh lg:overflow-y-auto lg:px-16"
              >
                <p className="mb-10 text-[11px] font-black uppercase tracking-[0.24em] text-black/42">Preservation Paths</p>
                <div className="space-y-10">
                  {preservationPaths.map((path) => (
                    <Link
                      key={path.href}
                      href={path.href}
                      onMouseEnter={() => setActiveImage(path.image)}
                      onFocus={() => setActiveImage(path.image)}
                      onClick={closeMenu}
                      className="group block"
                    >
                      <div className="relative mb-4 aspect-[2.35/1] overflow-hidden rounded-[6px] bg-black/5">
                        <Image
                          src={path.image}
                          alt=""
                          fill
                          sizes="(min-width: 1024px) 32vw, 90vw"
                          className="object-cover transition-transform duration-700 group-hover:scale-[1.035]"
                        />
                      </div>
                      <div className="flex items-end justify-between gap-6 border-b border-black/10 pb-6">
                        <div>
                          <h3 className="text-[25px] font-medium tracking-[-0.03em] text-black md:text-[31px]">{path.label}</h3>
                          <p className="mt-2 text-sm font-medium text-black/48">{path.detail}</p>
                        </div>
                        <span className="pb-1 text-2xl text-black/30 transition-transform group-hover:translate-x-1 group-hover:text-black" aria-hidden="true">
                          &rsaquo;
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </motion.section>

              <motion.section
                initial={{ scale: 1.03, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 1.02, opacity: 0 }}
                transition={{ duration: 0.55, ease: "easeOut" }}
                className="relative hidden min-h-dvh overflow-hidden bg-black lg:block"
              >
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeImage}
                    initial={{ opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 1.01 }}
                    transition={{ duration: 0.55, ease: "easeOut" }}
                    className="absolute inset-0"
                  >
                    <Image src={activeImage} alt="" fill sizes="36vw" className="object-cover opacity-58 blur-[1px]" priority />
                  </motion.div>
                </AnimatePresence>
                <div className="absolute inset-0 bg-gradient-to-b from-black/42 via-black/70 to-black" />
                <div className="relative flex h-full flex-col justify-end p-14 text-white">
                  <p className="text-[11px] font-black uppercase tracking-[0.28em] text-white/46">A&amp;S Detailing</p>
                  <h2 className="mt-5 max-w-[24rem] text-[52px] font-black uppercase leading-[0.88] tracking-[-0.04em]">
                    East Texas Vehicle Preservation.
                  </h2>
                  <Link
                    href="/assessment"
                    onClick={closeMenu}
                    className="mt-8 inline-flex w-fit rounded-full bg-white px-6 py-3 text-[11px] font-black uppercase tracking-[0.16em] text-black transition-colors hover:bg-white/82"
                  >
                    Request Assessment
                  </Link>
                </div>
              </motion.section>
            </div>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}
