"use client";

import { motion } from "framer-motion";

const packages = [
  {
    name: "Maintenance Detail",
    tagline: "Keep it clean, keep it sharp.",
    price: "$99",
    per: "per visit",
    color: "blue",
    features: [
      "Hand wash & dry",
      "Wheel & tire cleaning",
      "Window cleaning",
      "Interior vacuum & wipe-down",
      "Air freshener",
    ],
    cta: "Book This Package",
    note: null,
    popular: false,
  },
  {
    name: "Full Interior Restoration",
    tagline: "Deep clean, top to bottom.",
    price: "$199",
    per: "per visit",
    color: "pink",
    features: [
      "Full extraction shampoo",
      "Leather conditioning",
      "Dashboard & trim dressing",
      "Odor elimination",
      "Exterior wash included",
    ],
    cta: "Book This Package",
    note: "Add ceramic coating for $299",
    popular: false,
  },
  {
    name: "Paint Enhancement",
    tagline: "For drivers who care how it shows up.",
    price: "$349",
    per: "per visit",
    color: "pink",
    features: [
      "1-stage machine polish",
      "Swirl & scratch removal",
      "Gloss enhancement",
      "Full interior restoration",
      "Paint sealant application",
    ],
    cta: "Book This Package",
    note: "Most booked premium service",
    popular: true,
  },
  {
    name: "Ceramic Coating",
    tagline: "Permanent protection. Liquid glass finish.",
    price: "$699",
    per: "starting",
    color: "green",
    features: [
      "Full paint decontamination",
      "1–2 stage paint correction",
      "Professional ceramic application",
      "2–5 year protection warranty",
      "Hydrophobic water-repel coating",
    ],
    cta: "Get a Custom Quote",
    note: "Price varies by vehicle size",
    popular: false,
  },
];

const colorMap = {
  pink: {
    accent: "from-neon-pink to-neon-blue",
    border: "border-neon-pink/30",
    hover: "hover:border-neon-pink/50 hover:shadow-neon-pink-sm",
    badge: "bg-neon-pink/15 text-neon-pink border border-neon-pink/30",
    price: "gradient-text",
  },
  blue: {
    accent: "from-neon-blue to-neon-pink",
    border: "border-neon-blue/20",
    hover: "hover:border-neon-blue/40 hover:shadow-neon-blue-sm",
    badge: "bg-neon-blue/15 text-neon-blue border border-neon-blue/30",
    price: "neon-blue-text",
  },
  green: {
    accent: "from-neon-green to-neon-blue",
    border: "border-neon-green/20",
    hover: "hover:border-neon-green/40 hover:shadow-neon-green-sm",
    badge: "bg-neon-green/15 text-neon-green border border-neon-green/30",
    price: "neon-green-text",
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
              Built for Every Driver
            </h2>
            <p className="text-white/52 max-w-3xl text-lg md:text-xl leading-relaxed">
              From quick maintenance to full paint correction &mdash; every package delivers studio-level results at your location.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-12 gap-6 w-full"
        >
          {packages.map((pkg, index) => {
            const c = colorMap[pkg.color as keyof typeof colorMap];
            const layout =
              index === 0
                ? "xl:col-span-5"
                : index === 1
                  ? "xl:col-span-3 xl:translate-y-6"
                  : index === 2
                    ? "xl:col-span-4"
                    : "xl:col-span-6 xl:-translate-y-5";

            return (
              <motion.div
                key={pkg.name}
                variants={item}
                whileHover={{ y: -8 }}
                className={`shine-card lux-panel relative glass rounded-3xl p-6 md:p-7 border transition-all duration-300 flex flex-col min-h-[420px] ${layout} ${c.border} ${c.hover} ${pkg.popular ? "ring-1 ring-neon-pink/40" : ""}`}
              >
                <div className="absolute inset-0 pointer-events-none opacity-60" style={{ background: "radial-gradient(circle at 20% 0%, rgba(255,255,255,0.14), transparent 42%)" }} />

                {pkg.popular && (
                  <div className="absolute -top-3 left-6 px-4 py-1 rounded-full text-[11px] font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm whitespace-nowrap">
                    Most Popular
                  </div>
                )}

                <div className={`absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r ${c.accent} opacity-80`} />

                {/* Header */}
                <div className="mb-5">
                  <h3 className="text-lg md:text-xl font-black text-white mb-2">{pkg.name}</h3>
                  <p className="text-sm text-white/45 max-w-[34ch]">{pkg.tagline}</p>
                </div>

                {/* Price */}
                <div className="mb-6 flex items-end gap-1.5">
                  <span className={`text-5xl md:text-6xl font-black ${c.price}`}>{pkg.price}</span>
                  <span className="text-white/35 text-sm pb-2">{pkg.per}</span>
                </div>

                {/* Features */}
                <ul className="flex-1 space-y-2.5 mb-6">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5 text-sm text-white/65">
                      <svg className="w-4 h-4 text-neon-green shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                      {f}
                    </li>
                  ))}
                </ul>

                {/* Note */}
                {pkg.note && (
                  <p className={`text-[11px] font-semibold mb-4 px-3 py-1.5 rounded-lg text-center ${c.badge}`}>
                    {pkg.note}
                  </p>
                )}

                {/* CTA */}
                <motion.a
                  href="#booking"
                  whileHover={{ scale: 1.03, y: -1 }}
                  whileTap={{ scale: 0.97 }}
                  className={`block text-center py-3.5 rounded-xl font-bold text-sm text-white bg-gradient-to-r ${c.accent} transition-all duration-200 shadow-sm`}
                >
                  {pkg.cta}
                </motion.a>
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
          Not sure which to choose? <a href="#booking" className="text-neon-blue hover:underline">Book a consultation</a> &mdash; we&apos;ll recommend the right package for your vehicle.
        </motion.p>
      </div>
    </section>
  );
}
