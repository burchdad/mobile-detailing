"use client";

import { motion } from "framer-motion";

const packages = [
  {
    name: "Maintenance Detail",
    price: "From $99",
    popular: false,
    color: "neon-blue",
    gradient: "from-neon-blue/20 to-transparent",
    border: "border-neon-blue/30 hover:border-neon-blue/70",
    shadow: "hover:shadow-neon-blue",
    features: [
      "Full exterior hand wash & dry",
      "Wheel & tire cleaning",
      "Interior vacuum & wipe-down",
      "Window cleaning (in & out)",
      "Tire dressing",
    ],
    desc: "Routine upkeep that keeps your vehicle looking sharp between full services.",
  },
  {
    name: "Full Interior Restoration",
    price: "From $199",
    popular: false,
    color: "neon-green",
    gradient: "from-neon-green/20 to-transparent",
    border: "border-neon-green/30 hover:border-neon-green/70",
    shadow: "hover:shadow-neon-green",
    features: [
      "Deep steam cleaning",
      "Leather conditioning & care",
      "Carpet extraction & deodorize",
      "Vent & trim detailing",
      "Headliner cleaning",
    ],
    desc: "Transform your cabin back to showroom condition with a complete deep clean.",
  },
  {
    name: "Paint Enhancement",
    price: "From $349",
    popular: true,
    color: "neon-pink",
    gradient: "from-neon-pink/20 to-transparent",
    border: "border-neon-pink/50 hover:border-neon-pink",
    shadow: "hover:shadow-neon-pink",
    features: [
      "Full wash & iron decontamination",
      "Clay bar treatment",
      "1-step paint correction",
      "Gloss enhancement polish",
      "Sealant protection layer",
    ],
    desc: "Restore the depth and gloss of your paint with professional enhancement.",
  },
  {
    name: "Ceramic Coating",
    price: "From $699",
    popular: false,
    color: "neon-blue",
    gradient: "from-neon-blue/20 to-transparent",
    border: "border-neon-blue/30 hover:border-neon-blue/70",
    shadow: "hover:shadow-neon-blue",
    features: [
      "Full paint correction included",
      "Professional ceramic application",
      "2–5 year protection warranty",
      "Hydrophobic self-cleaning effect",
      "UV & chemical resistance",
    ],
    desc: "The pinnacle of paint protection. A permanent glass-like shield for your vehicle.",
  },
];

const colorMap: Record<string, string> = {
  "neon-pink": "text-neon-pink",
  "neon-blue": "text-neon-blue",
  "neon-green": "text-neon-green",
};

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12 } },
};

const item = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

export default function Services() {
  return (
    <section id="services" className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[600px] h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />

      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-green text-sm font-semibold tracking-widest uppercase mb-3">
            Our Services
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Choose Your Experience
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Every package is delivered with the same obsessive attention to detail — because your vehicle deserves nothing less.
          </p>
        </motion.div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6"
        >
          {packages.map((pkg) => (
            <motion.div
              key={pkg.name}
              variants={item}
              whileHover={{ scale: 1.03, y: -6 }}
              className={`relative glass rounded-2xl p-6 border transition-all duration-300 flex flex-col ${pkg.border} ${pkg.shadow}`}
            >
              {/* Most popular badge */}
              {pkg.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink whitespace-nowrap">
                  ★ Most Popular
                </div>
              )}

              {/* Gradient accent */}
              <div
                className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${pkg.gradient} opacity-30 pointer-events-none`}
              />

              <div className="relative z-10 flex flex-col flex-1">
                <h3 className={`text-lg font-bold mb-1 ${colorMap[pkg.color]}`}>
                  {pkg.name}
                </h3>
                <p className="text-3xl font-black text-white mb-3">{pkg.price}</p>
                <p className="text-white/50 text-sm mb-5 leading-relaxed">
                  {pkg.desc}
                </p>

                <ul className="space-y-2 mb-6 flex-1">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2 text-sm text-white/70">
                      <span className={`mt-0.5 text-xs ${colorMap[pkg.color]}`}>✓</span>
                      {f}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#booking"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`block text-center py-3 rounded-xl font-bold text-sm border transition-all duration-300 ${
                    pkg.popular
                      ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white border-transparent shadow-neon-pink"
                      : `border-current ${colorMap[pkg.color]} hover:bg-white/5`
                  }`}
                >
                  Book This Package
                </motion.a>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
