"use client";

import { motion } from "framer-motion";

const services = [
  {
    name: "Exterior Detail",
    tagline: "Deep gloss reset with wheel and trim recovery.",
    start: "Starting at $129",
    color: "blue",
    icon: "EX",
    features: [
      "Foam pre-wash and hand decontamination",
      "Wheel faces, barrels, and tire restore",
      "Trim, glass, and finish enhancer",
    ],
    cta: "Book Exterior",
    popular: false,
  },
  {
    name: "Interior Deep Clean",
    tagline: "Extraction-level interior restoration.",
    start: "Starting at $189",
    color: "pink",
    icon: "IN",
    features: [
      "Seat and carpet extraction",
      "Leather, plastics, and trim conditioning",
      "Odor neutralization and cabin reset",
    ],
    cta: "Book Interior",
    popular: false,
  },
  {
    name: "Full Detail",
    tagline: "Complete in-and-out transformation package.",
    start: "Starting at $259",
    color: "pink",
    icon: "FD",
    features: [
      "Interior deep clean + exterior detail",
      "Paint-safe contact wash and finishing",
      "Mobile showroom-level final inspection",
    ],
    cta: "Book Full Detail",
    note: "Most booked premium service",
    popular: true,
  },
  {
    name: "Paint Correction",
    tagline: "Remove swirl marks and recover mirror depth.",
    start: "Starting at $349",
    color: "blue",
    icon: "PC",
    features: [
      "Single or multi-stage machine correction",
      "Swirl, haze, and oxidation reduction",
      "Gloss and clarity optimization",
    ],
    cta: "Book Correction",
    popular: false,
  },
  {
    name: "Ceramic Coating",
    tagline: "Long-term hydrophobic paint protection.",
    start: "Starting at $699",
    color: "green",
    icon: "CC",
    features: [
      "Paint prep and surface decontamination",
      "Professional ceramic application",
      "2-5 year protection options",
    ],
    cta: "Get Ceramic Quote",
    note: "Best paired with paint correction",
    popular: false,
  },
  {
    name: "Fleet Detailing",
    tagline: "Consistent brand-clean vehicles at scale.",
    start: "Custom fleet pricing",
    color: "blue",
    icon: "FL",
    features: [
      "Recurring multi-vehicle scheduling",
      "Standardized quality checklist",
      "Business-friendly time windows",
    ],
    cta: "Request Fleet Plan",
    popular: false,
  },
  {
    name: "Maintenance Plans",
    tagline: "Never let your finish fall off again.",
    start: "From $79/mo",
    color: "green",
    icon: "MP",
    features: [
      "Monthly or bi-weekly upkeep options",
      "Priority scheduling and member rates",
      "Consistent gloss and interior freshness",
    ],
    cta: "View Membership",
    popular: false,
  },
];

const colorMap = {
  pink: {
    accent: "from-neon-pink to-neon-blue",
    border: "border-neon-pink/30",
    hover: "hover:border-neon-pink/50 hover:shadow-neon-pink-sm",
    badge: "bg-neon-pink/15 text-neon-pink border border-neon-pink/30",
    heading: "gradient-text",
  },
  blue: {
    accent: "from-neon-blue to-neon-pink",
    border: "border-neon-blue/20",
    hover: "hover:border-neon-blue/40 hover:shadow-neon-blue-sm",
    badge: "bg-neon-blue/15 text-neon-blue border border-neon-blue/30",
    heading: "neon-blue-text",
  },
  green: {
    accent: "from-neon-green to-neon-blue",
    border: "border-neon-green/20",
    hover: "hover:border-neon-green/40 hover:shadow-neon-green-sm",
    badge: "bg-neon-green/15 text-neon-green border border-neon-green/30",
    heading: "neon-green-text",
  },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.1 } } };
const item = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } };

export default function Services() {
  return (
    <section id="services" className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[1000px] h-px bg-gradient-to-r from-transparent via-neon-pink/25 to-transparent" />
      <div className="absolute top-1/4 right-0 w-[400px] h-[600px] bg-neon-pink/4 rounded-full blur-[120px]" />
      <div className="absolute bottom-1/4 left-0 w-[400px] h-[600px] bg-neon-blue/4 rounded-full blur-[120px]" />
      <div className="absolute inset-0 speed-lines opacity-25" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-7xl mb-16 md:mb-20">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className=""
          >
            <p className="eyebrow text-neon-pink mb-4">Service Packages</p>
            <div className="section-line mb-6" />
            <h2 className="text-5xl md:text-7xl font-black text-white tracking-tight mb-6 max-w-5xl">
              Premium Service Menu
            </h2>
            <p className="text-white/52 max-w-3xl text-lg md:text-xl leading-relaxed">
              Seven elite service tracks engineered for drivers who demand finish quality, convenience, and repeatable results.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 w-full"
        >
          {services.map((service) => {
            const c = colorMap[service.color as keyof typeof colorMap];

            return (
              <motion.div
                key={service.name}
                variants={item}
                whileHover={{ y: -12, scale: 1.02 }}
                className={`shine-card relative overflow-hidden rounded-3xl border transition-all duration-300 flex flex-col min-h-[370px] group ${c.border} ${c.hover}`}
              >
                {/* Premium glassmorphism background */}
                <div className="absolute inset-0 glass-strong" />
                
                {/* Gradient accent overlay */}
                <div className="absolute inset-0 opacity-40 bg-gradient-to-br from-white/5 via-transparent to-transparent" />
                
                {/* Color-specific glow on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-30 transition-opacity duration-500 ${service.popular ? "bg-gradient-to-br from-neon-pink/20 to-transparent" : service.color === "blue" ? "bg-gradient-to-br from-neon-blue/20 to-transparent" : "bg-gradient-to-br from-neon-green/20 to-transparent"}`} />

                {/* Popular badge */}
                {service.popular && (
                  <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    className="absolute -top-4 left-6 px-4 py-2 rounded-2xl text-xs font-black text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-[0_10px_30px_rgba(255,0,127,0.25)] z-10"
                  >
                    MOST POPULAR
                  </motion.div>
                )}

                {/* Top gradient line */}
                <div className={`absolute top-0 left-0 right-0 h-px bg-gradient-to-r ${c.accent}`} />

                {/* Content */}
                <div className="relative z-10 p-6 md:p-7 flex flex-col h-full">
                  {/* Icon and header */}
                  <div className="mb-4">
                    <div className="inline-flex w-11 h-11 rounded-xl bg-white/10 border border-white/15 items-center justify-center text-[11px] tracking-[0.16em] font-black text-white/80 mb-3">
                      {service.icon}
                    </div>
                    <h3 className={`text-xl md:text-2xl font-black mb-2 leading-tight ${c.heading}`}>{service.name}</h3>
                    <p className="text-sm text-white/50 max-w-[34ch]">{service.tagline}</p>
                  </div>

                  <div className="mb-5">
                    <span className="text-xs uppercase tracking-[0.18em] text-white/40 font-semibold">{service.start}</span>
                  </div>

                  {/* Features */}
                  <ul className="flex-1 space-y-2.5 mb-5">
                    {service.features.map((f) => (
                      <li key={f} className="flex items-start gap-3 text-sm text-white/70">
                        <div className={`w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${c.badge}`}>
                          <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                          </svg>
                        </div>
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>

                  {/* Note */}
                  {service.note && (
                    <p className={`text-xs font-bold mb-5 px-3 py-2 rounded-xl text-center ${c.badge}`}>
                      {service.note}
                    </p>
                  )}

                  {/* CTA Button */}
                  <motion.a
                    href="#booking"
                    whileHover={{ scale: 1.05, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    className={`block text-center py-4 px-4 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${c.accent} shadow-[0_15px_40px_rgba(0,0,0,0.3)] hover:shadow-[0_20px_60px_rgba(0,0,0,0.4)] transition-all duration-300 uppercase tracking-wide`}
                  >
                    {service.cta}
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-center text-white/30 text-sm mt-10"
        >
          Not sure where to start? <a href="#booking" className="text-neon-blue hover:underline">Request a guided quote</a> and we&apos;ll map the right service path for your vehicle.
        </motion.p>
      </div>
    </section>
  );
}
