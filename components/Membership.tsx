"use client";

import { motion } from "framer-motion";

const tiers = [
  {
    name: "Silver Plan",
    audience: "Daily-driver preservation",
    price: "$99",
    perks: ["Monthly maintenance detail", "Paint-safe wash process", "Interior touchpoint reset", "Priority seasonal scheduling"],
    accent: "from-neon-blue to-neon-pink",
  },
  {
    name: "Gold Plan",
    audience: "Premium family and performance vehicles",
    price: "$179",
    perks: ["Two visits per month", "Ceramic-safe maintenance", "Leather and trim conditioning", "10% preferred-client add-on pricing", "First access appointment windows"],
    accent: "from-neon-pink to-neon-blue",
    featured: true,
  },
  {
    name: "Black Label Plan",
    audience: "Collectors, show vehicles, and high-value finishes",
    price: "$299",
    perks: ["Weekly or custom cadence", "Monthly finish inspection", "Ceramic maintenance boosters", "Seasonal protection plan", "Dedicated vehicle care records"],
    accent: "from-neon-pink to-neon-green",
  },
];

export default function Membership() {
  return (
    <section id="membership" className="section-pad relative overflow-hidden bg-deep-black">
      <div className="absolute left-1/2 top-0 h-px w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />
      <div className="absolute left-[8%] top-[20%] h-[520px] w-[520px] rounded-full bg-neon-pink/6 blur-[150px]" />
      <div className="absolute right-[10%] bottom-[12%] h-[420px] w-[420px] rounded-full bg-neon-blue/7 blur-[140px]" />

      <div className="relative z-10 w-full px-5 md:px-8">
        <div className="mx-auto max-w-7xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="mb-14 max-w-4xl"
          >
            <p className="eyebrow mb-4 text-neon-pink">Vehicle Preservation Plans</p>
            <div className="section-line mb-6" />
            <h2 className="text-5xl font-black tracking-tight text-white md:text-7xl">A Vehicle That Stays Ready</h2>
            <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/56">
              Memberships are not subscriptions. They are managed care plans for owners who want priority scheduling, consistent protection, and a vehicle that never slides backward.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
            {tiers.map((tier, index) => (
              <motion.article
                key={tier.name}
                initial={{ opacity: 0, y: 36 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                whileHover={{ y: -8 }}
                className={`panel-edge shine-card relative overflow-hidden rounded-2xl border bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018))] ${tier.featured ? "border-neon-pink/45 ring-1 ring-neon-pink/35" : "border-white/10"}`}
              >
                <div className={`h-1 bg-gradient-to-r ${tier.accent}`} />
                {tier.featured ? (
                  <div className="absolute right-5 top-5 rounded-full bg-neon-pink/12 px-3 py-1 text-[10px] font-black uppercase tracking-[0.16em] text-neon-pink">
                    Recommended
                  </div>
                ) : null}

                <div className="p-7">
                  <p className="text-[10px] font-bold uppercase tracking-[0.18em] text-neon-blue">{tier.audience}</p>
                  <h3 className="mt-3 text-3xl font-black text-white">{tier.name}</h3>
                  <div className="mt-5 text-5xl font-black text-neon-pink">
                    {tier.price}<span className="text-base font-medium text-white/35">/mo</span>
                  </div>

                  <ul className="mt-8 min-h-[210px] space-y-3">
                    {tier.perks.map((perk) => (
                      <li key={perk} className="flex gap-3 text-sm leading-relaxed text-white/68">
                        <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-neon-pink" />
                        {perk}
                      </li>
                    ))}
                  </ul>

                  <a
                    href="/assessment"
                    className={`mt-8 inline-flex w-full justify-center rounded-xl bg-gradient-to-r ${tier.accent} px-5 py-3.5 text-sm font-black uppercase tracking-[0.13em] text-white`}
                  >
                    Discuss This Plan
                  </a>
                </div>
              </motion.article>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-white/32">
            Plans are tailored after vehicle condition, coating status, parking environment, and driving habits are reviewed.
          </p>
        </div>
      </div>
    </section>
  );
}
