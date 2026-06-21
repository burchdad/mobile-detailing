"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const collection = [
  {
    name: "Silver Preservation",
    image: "/media/as-suv-interior.png",
    body: "For daily drivers that need consistent interior order, gentle exterior maintenance, and enough protection to keep the vehicle from sliding backward between seasons.",
  },
  {
    name: "Gold Preservation",
    image: "/media/as-client-collage.png",
    body: "For family vehicles, premium SUVs, and performance cars that need a more deliberate cadence: finish-safe washing, cabin conditioning, and priority care.",
  },
  {
    name: "Black Label",
    image: "/media/as-service-guide.jpg",
    body: "For owners who want the vehicle treated as an asset: finish inspections, ceramic maintenance, seasonal protection decisions, and a direct relationship with Steve.",
  },
];

export default function Membership() {
  return (
    <section id="membership" className="relative overflow-hidden bg-[#030304] px-5 py-28 md:px-8 md:py-40">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-6xl bg-gradient-to-r from-transparent via-white/14 to-transparent" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mb-20 grid gap-10 lg:grid-cols-[0.68fr_0.32fr] lg:items-end"
        >
          <div>
            <p className="eyebrow mb-5 text-neon-pink">The Preservation Collection</p>
            <h2 className="max-w-5xl text-[clamp(3.5rem,7vw,8rem)] font-black leading-[0.9] tracking-tight text-white">
              Care Plans For Vehicles That Deserve To Stay Ready
            </h2>
          </div>
          <p className="text-lg leading-relaxed text-white/55">
            No pricing table. No commodity tiers. Each program starts with a condition review, ownership goals, parking environment, and the level of protection the vehicle deserves.
          </p>
        </motion.div>

        <div className="space-y-16">
          {collection.map((item, index) => (
            <motion.article
              key={item.name}
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.72, delay: index * 0.05 }}
              className="grid gap-8 border-t border-white/10 pt-10 lg:grid-cols-[0.44fr_0.56fr] lg:items-center"
            >
              <div>
                <p className="mb-5 text-sm font-black uppercase tracking-[0.24em] text-white/24">
                  {String(index + 1).padStart(2, "0")} / Preservation
                </p>
                <h3 className="text-5xl font-black leading-[0.94] tracking-tight text-white md:text-7xl">{item.name}</h3>
                <p className="mt-7 max-w-xl text-xl leading-relaxed text-white/58">{item.body}</p>
              </div>

              <div className="relative min-h-[360px] overflow-hidden rounded-[8px] bg-black md:min-h-[460px]">
                <Image src={item.image} alt={item.name} fill className="object-cover opacity-[0.78]" sizes="(min-width: 1024px) 56vw, 100vw" />
                <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.14),rgba(0,0,0,0.48))]" />
              </div>
            </motion.article>
          ))}
        </div>

        <div className="mt-20 flex flex-col items-start justify-between gap-8 border-t border-white/10 pt-10 md:flex-row md:items-center">
          <p className="max-w-2xl text-2xl font-bold leading-snug text-white/82 md:text-3xl">
            The right plan is chosen after the vehicle is understood.
          </p>
          <Link
            href="/assessment"
            className="rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-7 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white"
          >
            Request Assessment
          </Link>
        </div>
      </div>
    </section>
  );
}
