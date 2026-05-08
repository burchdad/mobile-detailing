"use client";

import { motion } from "framer-motion";

const plans = [
  {
    name: "Bronze",
    freq: "Monthly",
    price: "$79",
    period: "/mo",
    popular: false,
    color: "neon-blue",
    border: "border-neon-blue/30 hover:border-neon-blue/60",
    shadow: "hover:shadow-neon-blue",
    gradient: "from-neon-blue/15 to-transparent",
    perks: [
      "1 Maintenance Detail/month",
      "Priority booking",
      "10% off add-ons",
      "Exterior focus",
    ],
  },
  {
    name: "Silver",
    freq: "Bi-Weekly",
    price: "$139",
    period: "/mo",
    popular: true,
    color: "neon-pink",
    border: "border-neon-pink/50 hover:border-neon-pink",
    shadow: "hover:shadow-neon-pink",
    gradient: "from-neon-pink/20 to-neon-blue/10",
    perks: [
      "2 Details/month (bi-weekly)",
      "Interior + Exterior included",
      "Priority same-day booking",
      "15% off all add-ons",
      "Free seasonal inspection",
    ],
  },
  {
    name: "Gold",
    freq: "Weekly",
    price: "$249",
    period: "/mo",
    popular: false,
    color: "neon-green",
    border: "border-neon-green/30 hover:border-neon-green/60",
    shadow: "hover:shadow-neon-green",
    gradient: "from-neon-green/15 to-transparent",
    perks: [
      "4 Details/month (weekly)",
      "Full interior + exterior every visit",
      "VIP scheduling — always first",
      "20% off all add-ons",
      "Free annual paint inspection",
      "Dedicated account manager",
    ],
  },
];

const colorMap: Record<string, string> = {
  "neon-pink": "text-neon-pink",
  "neon-blue": "text-neon-blue",
  "neon-green": "text-neon-green",
};

export default function Membership() {
  return (
    <section id="membership" className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-0 w-80 h-80 bg-neon-green/6 rounded-full blur-[120px]" />
      <div className="absolute bottom-0 right-0 w-80 h-80 bg-neon-pink/6 rounded-full blur-[120px]" />

      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-pink text-sm font-semibold tracking-widest uppercase mb-3">
            Membership Plans
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Always Show-Ready
          </h2>
          <p className="text-white/50 max-w-xl mx-auto">
            Join our membership program and lock in priority access, recurring service, and exclusive member pricing.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {plans.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              whileHover={{ scale: 1.03, y: -5 }}
              className={`relative glass rounded-2xl p-7 border transition-all duration-300 flex flex-col ${plan.border} ${plan.shadow}`}
            >
              {plan.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink whitespace-nowrap">
                  ⭐ Best Value
                </div>
              )}

              <div className={`absolute inset-0 rounded-2xl bg-gradient-to-b ${plan.gradient} opacity-40 pointer-events-none`} />

              <div className="relative z-10 flex flex-col flex-1">
                <div className="flex items-start justify-between mb-1">
                  <div>
                    <h3 className={`text-xl font-black ${colorMap[plan.color]}`}>
                      {plan.name}
                    </h3>
                    <p className="text-white/40 text-xs">{plan.freq} service</p>
                  </div>
                </div>

                <div className="my-5 pb-5 border-b border-white/8">
                  <span className="text-4xl font-black text-white">{plan.price}</span>
                  <span className="text-white/40 text-sm">{plan.period}</span>
                </div>

                <ul className="space-y-3 mb-7 flex-1">
                  {plan.perks.map((p) => (
                    <li key={p} className="flex items-start gap-2 text-sm text-white/70">
                      <span className={`mt-0.5 text-xs ${colorMap[plan.color]}`}>✓</span>
                      {p}
                    </li>
                  ))}
                </ul>

                <motion.a
                  href="#booking"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.96 }}
                  className={`block text-center py-3 rounded-xl font-bold text-sm transition-all duration-300 ${
                    plan.popular
                      ? "bg-gradient-to-r from-neon-pink to-neon-blue text-white shadow-neon-pink"
                      : `border border-current ${colorMap[plan.color]} hover:bg-white/5`
                  }`}
                >
                  Get Started
                </motion.a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
