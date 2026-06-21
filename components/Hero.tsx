"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import carImage from "../car.png";

export default function Hero() {
  return (
    <section className="relative min-h-screen overflow-hidden bg-black">
      <Image
        src={carImage}
        alt="A protected luxury vehicle in a dark cinematic environment"
        priority
        className="absolute inset-0 h-full w-full object-cover object-[62%_50%] opacity-70"
      />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.86)_0%,rgba(0,0,0,0.58)_42%,rgba(0,0,0,0.18)_100%)]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_30%,rgba(138,164,173,0.18),transparent_34%),radial-gradient(circle_at_18%_70%,rgba(200,169,106,0.14),transparent_36%)]" />

      <motion.div
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, ease: "easeOut" }}
        className="relative z-10 flex min-h-screen items-end px-5 pb-20 pt-36 md:px-8 md:pb-24"
      >
        <div className="mx-auto w-full max-w-7xl">
          <p className="eyebrow mb-6 text-neon-pink">East Texas Vehicle Preservation</p>
          <h1 className="max-w-5xl text-[clamp(3.35rem,10.4vw,9.2rem)] font-black uppercase leading-[0.9] tracking-tight text-white md:leading-[0.86]">
            Vehicle Preservation For Owners Who Notice Everything
          </h1>
          <div className="mt-10 flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <p className="max-w-xl text-base leading-relaxed text-white/62 md:text-xl">
              Owner-led care for vehicles that represent more than transportation.
            </p>
            <a
              href="/assessment"
              className="inline-flex w-fit rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-neon-pink-sm"
            >
              Request Assessment
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
