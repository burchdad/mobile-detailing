"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Signature Detail",
    category: "Concierge Reset",
    start: "From $259",
    description: "A complete interior and exterior restoration for drivers who want the vehicle to feel crisp, cared for, and ready for attention.",
    features: ["Paint-safe foam wash", "Interior extraction and conditioning", "Trim, glass, wheels, and tires finished by hand"],
    accent: "from-neon-pink to-neon-blue",
  },
  {
    name: "Paint Correction",
    category: "Clarity Restoration",
    start: "From $349",
    description: "Machine polishing designed to reduce swirls, haze, oxidation, and light defects before the finish is protected.",
    features: ["Inspection under correction lighting", "Single or multi-stage polishing", "Gloss, depth, and reflection recovery"],
    accent: "from-neon-blue to-neon-pink",
  },
  {
    name: "Ceramic Coatings",
    category: "Long-Term Protection",
    start: "From $699",
    description: "Hydrophobic paint protection for gloss retention, easier washing, and a finish that stays impressive longer.",
    features: ["Decontamination and prep", "Professional coating application", "Maintenance guidance after delivery"],
    accent: "from-neon-pink to-neon-green",
    featured: true,
  },
  {
    name: "Interior Preservation",
    category: "Cabin Recovery",
    start: "From $189",
    description: "Deep cleaning for leather, carpet, plastics, touchpoints, and odor-prone surfaces without harsh shortcuts.",
    features: ["Steam and extraction workflow", "Leather and trim care", "Odor neutralization and final inspection"],
    accent: "from-neon-green to-neon-blue",
  },
  {
    name: "Maintenance Memberships",
    category: "Ongoing Care",
    start: "From $99/mo",
    description: "Recurring upkeep for owners who want their finish, cabin, and protection plan managed all year.",
    features: ["Priority scheduling", "Ceramic-safe maintenance", "Seasonal protection planning"],
    accent: "from-neon-blue to-neon-green",
  },
  {
    name: "Fleet Care Programs",
    category: "Business Presentation",
    start: "Custom",
    description: "Consistent mobile detailing for company vehicles where brand presentation and reliability matter.",
    features: ["Route-based scheduling", "Standardized quality checklist", "Multi-vehicle service windows"],
    accent: "from-neon-pink to-neon-blue",
  },
];

const container = { hidden: {}, show: { transition: { staggerChildren: 0.09 } } };
const item = { hidden: { opacity: 0, y: 34 }, show: { opacity: 1, y: 0 } };

export default function Services() {
  return (
    <section id="services" className="section-pad relative overflow-hidden bg-deep-black">
      <div className="absolute left-1/2 top-0 h-px w-[1000px] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-pink/35 to-transparent" />
      <div className="absolute right-[-12%] top-[18%] h-[520px] w-[520px] rounded-full bg-neon-pink/7 blur-[150px]" />
      <div className="absolute left-[-12%] bottom-[14%] h-[520px] w-[520px] rounded-full bg-neon-blue/7 blur-[150px]" />

      <div className="relative z-10 w-full px-5 md:px-8">
        <div className="mx-auto mb-16 max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-4 text-neon-pink">Premium Service Showcase</p>
            <div className="section-line mb-6" />
            <div className="grid gap-8 lg:grid-cols-[1fr_0.7fr] lg:items-end">
              <h2 className="max-w-5xl text-5xl font-black tracking-tight text-white md:text-7xl">
                Preservation Programs, Not Commodity Details
              </h2>
              <p className="text-lg leading-relaxed text-white/56">
                Every service is positioned around trust, finish quality, and long-term vehicle care. The goal is not a quick clean. The goal is a vehicle that feels protected, maintained, and worth owning.
              </p>
            </div>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3"
        >
          {services.map((service, index) => (
            <motion.article
              key={service.name}
              variants={item}
              whileHover={{ y: -10, rotateX: 2, rotateY: index % 2 === 0 ? -2 : 2 }}
              transition={{ duration: 0.32 }}
              className={`preserve-3d panel-edge shine-card relative min-h-[430px] overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018))] p-6 md:p-7 ${service.featured ? "ring-1 ring-neon-pink/45" : ""}`}
            >
              <div className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${service.accent}`} />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_12%,rgba(255,255,255,0.10),transparent_30%),linear-gradient(160deg,transparent_35%,rgba(0,0,0,0.34)_100%)]" />
              <motion.div
                className="absolute -right-20 top-16 h-52 w-52 rounded-full border border-white/10"
                animate={{ rotate: 360 }}
                transition={{ duration: 26, repeat: Infinity, ease: "linear" }}
              />
              <motion.div
                className="absolute -right-10 top-24 h-28 w-28 rounded-full border border-neon-pink/18"
                animate={{ rotate: -360 }}
                transition={{ duration: 18, repeat: Infinity, ease: "linear" }}
              />

              {service.featured ? (
                <div className="absolute right-5 top-5 rounded-full border border-neon-pink/35 bg-neon-pink/10 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-neon-pink">
                  Highest Value
                </div>
              ) : null}

              <div className="relative z-10 flex h-full flex-col">
                <div className="mb-8">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.18em] text-neon-blue">{service.category}</p>
                  <h3 className="text-3xl font-black leading-tight tracking-tight text-white">{service.name}</h3>
                  <p className="mt-4 max-w-[38ch] text-sm leading-relaxed text-white/58">{service.description}</p>
                </div>

                <div className="mb-7 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">{service.start}</div>

                <ul className="mb-8 flex-1 space-y-3">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex gap-3 text-sm leading-relaxed text-white/70">
                      <span className="mt-1 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink shadow-neon-pink-sm" />
                      {feature}
                    </li>
                  ))}
                </ul>

                <a
                  href="/assessment"
                  className={`inline-flex items-center justify-center rounded-xl bg-gradient-to-r ${service.accent} px-5 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white transition-transform hover:-translate-y-0.5`}
                >
                  Request Assessment
                </a>
              </div>
            </motion.article>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
