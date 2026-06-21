"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import type { ReactNode } from "react";
import { featuredProjects, projectImages } from "@/lib/projectMedia";

const programs = [
  {
    name: "Silver Preservation",
    image: projectImages.genesisSide,
    body: "For the daily driver that still deserves intention: clean touchpoints, protected surfaces, and a steady cadence that keeps the vehicle from sliding backward.",
    benefits: ["Consistent presentation", "Paint-safe maintenance", "Priority seasonal care"],
  },
  {
    name: "Gold Preservation",
    image: projectImages.genesisSide,
    body: "For premium family vehicles and ownership routines where convenience, gloss, and cabin order need to stay part of daily life.",
    benefits: ["Higher care cadence", "Interior conditioning", "Ceramic-safe upkeep"],
  },
  {
    name: "Black Label",
    image: projectImages.fordCabinWide,
    body: "For owners who want the details managed: inspections, protection planning, and a direct relationship with the person responsible for the finish.",
    benefits: ["Owner-led oversight", "Finish inspections", "Bespoke preservation path"],
  },
];

const stories = [
  {
    owner: "Whitehouse owner",
    vehicle: "Premium SUV",
    result: "Paint correction restored depth and removed visible defects.",
  },
  {
    owner: "Tyler owner",
    vehicle: "Work Truck",
    result: "Mobile care returned the vehicle looking ready without interrupting the day.",
  },
  {
    owner: "Flint owner",
    vehicle: "Family Vehicle",
    result: "Recurring preservation kept the vehicle clean, protected, and easy to live with.",
  },
];

function FadeIn({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-80px" }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomeEditorial() {
  return (
    <>
      <section className="relative min-h-screen overflow-hidden bg-black">
        <Image src={projectImages.genesisSide} alt="Genesis vehicle preservation profile" fill className="object-cover opacity-60" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.18),rgba(0,0,0,0.78))]" />
        <div className="relative z-10 flex min-h-screen items-center px-5 md:px-8">
          <FadeIn className="mx-auto w-full max-w-7xl">
            <h2 className="max-w-5xl text-[clamp(3.2rem,8vw,8.5rem)] font-black leading-[0.92] tracking-tight text-white">
              Some vehicles are transportation.
              <span className="block text-white/54">Others deserve protection.</span>
            </h2>
          </FadeIn>
        </div>
      </section>

      <section className="relative overflow-hidden bg-[#f1eee6] px-5 py-24 text-[#111] md:px-8 md:py-36">
        <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[0.48fr_0.52fr] lg:items-center">
          <FadeIn>
            <p className="mb-6 text-xs font-black uppercase tracking-[0.24em] text-[#8b6e32]">Steve&apos;s Philosophy</p>
            <blockquote className="max-w-3xl text-[clamp(2.4rem,5vw,5.7rem)] font-black leading-[0.98] tracking-tight">
              &ldquo;I didn&apos;t start A&amp;S to clean vehicles. I started it because every vehicle deserves to be protected.&rdquo;
            </blockquote>
            <p className="mt-8 max-w-xl text-lg leading-relaxed text-black/58">
              Every vehicle leaves with Steve&apos;s approval before it leaves his care.
            </p>
          </FadeIn>
          <FadeIn className="relative min-h-[420px] overflow-hidden rounded-[8px] bg-black md:min-h-[640px]">
            <Image src={projectImages.fordLeatherFront} alt="Owner-led cabin preservation detail" fill className="object-cover opacity-90" sizes="(min-width: 1024px) 52vw, 100vw" />
          </FadeIn>
        </div>
      </section>

      <section id="before-after" className="bg-[#050505] px-5 py-24 text-white md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-4xl">
            <p className="eyebrow mb-5 text-neon-pink">Transformation Showcase</p>
            <h2 className="text-[clamp(2.8rem,6vw,6.8rem)] font-black leading-[0.96] tracking-tight">
              Proof, not decoration.
            </h2>
          </FadeIn>
          <div className="grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
            <FadeIn className="relative min-h-[560px] overflow-hidden rounded-[8px] bg-black md:min-h-[720px]">
              <Image src={projectImages.fordCabinWide} alt="King Ranch leather cabin restoration" fill className="object-cover opacity-90" sizes="(min-width: 1024px) 58vw, 100vw" />
              <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_38%,rgba(0,0,0,0.78))]" />
              <div className="absolute bottom-8 left-8 right-8">
                <p className="eyebrow mb-3 text-neon-pink">Leather Cabin Restoration</p>
                <h3 className="max-w-xl text-4xl font-black tracking-tight md:text-6xl">A cabin that feels cared for again.</h3>
              </div>
            </FadeIn>
            <div className="grid gap-5">
              {featuredProjects.slice(0, 2).map((project) => (
                <FadeIn key={project.title} className="relative min-h-[330px] overflow-hidden rounded-[8px] bg-black">
                  <Image src={project.image} alt={project.title} fill className="object-cover opacity-[0.88]" sizes="(min-width: 1024px) 42vw, 100vw" />
                  <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent_35%,rgba(0,0,0,0.78))]" />
                  <div className="absolute bottom-6 left-6 right-6">
                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neon-blue">{project.vehicle}</p>
                    <h3 className="mt-2 text-2xl font-black tracking-tight">{project.title}</h3>
                  </div>
                </FadeIn>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-black">
        <Image src={projectImages.genesisFront} alt="Protected Genesis front detail" fill className="object-cover opacity-[0.58]" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.88),rgba(0,0,0,0.34),rgba(0,0,0,0.72))]" />
        <div className="relative z-10 flex min-h-screen items-center px-5 md:px-8">
          <FadeIn className="mx-auto w-full max-w-7xl">
            <h2 className="max-w-5xl text-[clamp(3rem,8vw,8.8rem)] font-black leading-[0.9] tracking-tight text-white">
              Protection begins long before the final shine.
            </h2>
            <p className="mt-8 max-w-2xl text-lg leading-relaxed text-white/58 md:text-2xl">
              The visible finish is only the last part of the standard.
            </p>
          </FadeIn>
        </div>
      </section>

      <section className="bg-[#0a0a09] px-5 py-24 text-white md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-4xl">
            <p className="eyebrow mb-5 text-neon-blue">Client Stories</p>
            <h2 className="text-[clamp(2.8rem,6vw,6.8rem)] font-black leading-[0.96] tracking-tight">
              Owners remember the way the vehicle felt when it came back.
            </h2>
          </FadeIn>
          <div className="divide-y divide-white/10">
            {stories.map((story) => (
              <FadeIn key={story.vehicle} className="grid gap-6 py-10 first:pt-0 md:grid-cols-[0.32fr_0.68fr] md:py-14">
                <div>
                  <p className="text-xs font-black uppercase tracking-[0.22em] text-neon-pink">{story.owner}</p>
                  <p className="mt-3 text-lg font-bold text-white/54">{story.vehicle}</p>
                </div>
                <p className="text-3xl font-black leading-tight tracking-tight text-white md:text-6xl">{story.result}</p>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section id="membership" className="bg-[#f4f1e9] px-5 py-24 text-[#111] md:px-8 md:py-36">
        <div className="mx-auto max-w-7xl">
          <FadeIn className="mb-16 max-w-4xl">
            <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-[#8b6e32]">Vehicle Preservation Programs</p>
            <h2 className="text-[clamp(2.8rem,6vw,6.8rem)] font-black leading-[0.96] tracking-tight">
              Care plans for vehicles that deserve to stay ready.
            </h2>
          </FadeIn>
          <div className="space-y-16">
            {programs.map((program, index) => (
              <FadeIn key={program.name} className="grid gap-8 border-t border-black/12 pt-10 lg:grid-cols-[0.42fr_0.58fr] lg:items-center">
                <div>
                  <p className="mb-5 text-xs font-black uppercase tracking-[0.24em] text-black/38">{String(index + 1).padStart(2, "0")} / Preservation</p>
                  <h3 className="text-4xl font-black leading-tight tracking-tight md:text-6xl">{program.name}</h3>
                  <p className="mt-6 max-w-xl text-lg leading-relaxed text-black/58">{program.body}</p>
                  <div className="mt-7 flex flex-wrap gap-x-5 gap-y-2">
                    {program.benefits.map((benefit) => (
                      <span key={benefit} className="text-[10px] font-black uppercase tracking-[0.18em] text-black/45">{benefit}</span>
                    ))}
                  </div>
                </div>
                <div className="relative min-h-[340px] overflow-hidden rounded-[8px] bg-black md:min-h-[520px]">
                  <Image src={program.image} alt={program.name} fill className="object-cover opacity-90" sizes="(min-width: 1024px) 58vw, 100vw" />
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      <section className="relative min-h-screen overflow-hidden bg-black px-5 md:px-8">
        <Image src={projectImages.mazdaSide} alt="Black vehicle preservation profile" fill className="object-cover opacity-40" sizes="100vw" />
        <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(0,0,0,0.56),rgba(0,0,0,0.86))]" />
        <div className="relative z-10 flex min-h-screen items-center justify-center text-center">
          <FadeIn>
            <p className="eyebrow mb-6 text-neon-pink">A&S Detailing</p>
            <h2 className="mx-auto max-w-4xl text-[clamp(4rem,10vw,10rem)] font-black uppercase leading-[0.84] tracking-tight text-white">
              Your Vehicle Deserves Better
            </h2>
            <Link
              href="/assessment"
              className="mt-10 inline-flex rounded-[6px] bg-gradient-to-r from-neon-pink to-neon-blue px-8 py-4 text-[11px] font-black uppercase tracking-[0.16em] text-white shadow-neon-pink-sm"
            >
              Request Your Assessment
            </Link>
          </FadeIn>
        </div>
      </section>
    </>
  );
}
