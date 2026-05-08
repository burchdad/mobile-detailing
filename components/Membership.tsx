"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Bronze",
    tagline: "For daily drivers",
    price: "$79",
    period: "/mo",
    color: "blue",
    perks: [
      "1 maintenance detail/month",
      "Exterior wash & dry",
      "Interior vacuum",
      "Window cleaning",
      "Priority scheduling",
    ],
    cta: "Start Bronze",
    best: false,
  },
  {
    name: "Silver",
    tagline: "For family vehicles",
    price: "$139",
    period: "/mo",
    color: "pink",
    perks: [
      "2 details/month",
      "Full interior & exterior",
      "Leather conditioning",
      "Tire dressing",
      "10% off add-ons",
      "First priority booking",
    ],
    cta: "Start Silver — Best Value",
    best: true,
  },
  {
    name: "Gold",
    tagline: "For premium vehicle owners",
    price: "$249",
    period: "/mo",
    color: "green",
    perks: [
      "4 details/month",
      "Full interior restoration",
      "Monthly paint inspection",
      "Ceramic coating touch-ups",
      "20% off all services",
      "Dedicated account manager",
    ],
    cta: "Start Gold",
    best: false,
  },
];

const colorMap = {
  blue: {
    gradient: "from-neon-blue/15 to-transparent",
    border: "border-neon-blue/25",
    hover: "hover:border-neon-blue/50 hover:shadow-neon-blue-sm",
    badge: "bg-neon-blue/10 text-neon-blue",
    cta: "from-neon-blue to-neon-pink",
    price: "neon-blue-text",
  },
  pink: {
    gradient: "from-neon-pink/15 to-transparent",
    border: "border-neon-pink/35",
    hover: "hover:border-neon-pink/60",
    badge: "bg-neon-pink/10 text-neon-pink",
    cta: "from-neon-pink to-neon-blue",
    price: "gradient-text",
  },
  green: {
    gradient: "from-neon-green/10 to-transparent",
    border: "border-neon-green/25",
    hover: "hover:border-neon-green/50 hover:shadow-neon-green-sm",
    badge: "bg-neon-green/10 text-neon-green",
    cta: "from-neon-green to-neon-blue",
    price: "neon-green-text",
  },
};

const container = { hidden: {}, show: { transition: { staggerChildren: 0.12 } } };
const item = { hidden: { opacity: 0, y: 36 }, show: { opacity: 1, y: 0 } };

export default function Membership() {
  return (
    <section id="membership" className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-pink/25 to-transparent" />
      <div className="absolute top-1/2 left-1/4 w-96 h-96 bg-neon-pink/5 rounded-full blur-[120px]" />
      <div className="absolute top-1/2 right-1/4 w-96 h-96 bg-neon-green/4 rounded-full blur-[120px]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-6xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-16"
          >
            <p className="eyebrow text-neon-pink mb-4">Membership Plans</p>
            <div className="section-line mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
              Always Drive Clean
            </h2>
            <p className="text-white/45 max-w-2xl mx-auto text-lg">
              Recurring care for drivers who want a showroom-ready vehicle without the effort. Cancel anytime.
            </p>
          </motion.div>

          <motion.div
            variants={container}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
          {tiers.map((tier) => {
            const c = colorMap[tier.color as keyof typeof colorMap];
            return (
              <motion.div
                key={tier.name}
                variants={item}
                whileHover={{ y: -6 }}
                className={`shine-card relative glass rounded-2xl border transition-all duration-300 flex flex-col overflow-hidden ${c.border} ${c.hover} ${tier.best ? "ring-1 ring-neon-pink/40" : ""}`}
              >
                {/* Gradient top accent */}
                <div className={`h-1 w-full bg-gradient-to-r ${c.cta}`} />

                {tier.best && (
                  <div className="absolute top-4 right-4 px-2.5 py-1 rounded-full text-[10px] font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm">
                    Best Value
                  </div>
                )}

                <div className="p-7 flex-1 flex flex-col">
                  {/* Header */}
                  <div className="mb-6">
                    <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${c.badge} mb-3 inline-block`}>
                      {tier.name}
                    </span>
                    <div className={`text-3xl font-black mt-2 ${c.price}`}>
                      {tier.price}<span className="text-white/30 text-base font-medium">{tier.period}</span>
                    </div>
                    <p className="text-white/40 text-xs mt-1">{tier.tagline}</p>
                  </div>

                  {/* Perks */}
                  <ul className="flex-1 space-y-3 mb-8">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex items-start gap-2.5 text-sm text-white/65">
                        <svg className="w-4 h-4 text-neon-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                        </svg>
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <motion.a
                    href="#booking"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    className={`block text-center py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${c.cta} transition-all duration-200`}
                  >
                    {tier.cta}
                  </motion.a>
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-white/25 text-xs mt-8"
        >
          No contracts. No commitment. Cancel anytime. &bull; Pricing based on standard vehicles; oversized vehicles may vary.
        </motion.p>
        </div>
      </div>
    </section>
  );
}
