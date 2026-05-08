"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    name: "Michael T.",
    location: "Tyler, TX",
    rating: 5,
    text: "Absolutely blown away. My truck looked better than when I drove it off the lot. The team was professional, thorough, and exceeded every expectation.",
    initials: "MT",
    color: "from-neon-pink to-neon-blue",
  },
  {
    name: "Sarah K.",
    location: "Whitehouse, TX",
    rating: 5,
    text: "The ceramic coating they applied is incredible. Water literally beads off and the paint looks like liquid glass. Worth every single penny.",
    initials: "SK",
    color: "from-neon-blue to-neon-green",
  },
  {
    name: "James R.",
    location: "Lindale, TX",
    rating: 5,
    text: "I've tried other detailers before — nothing compares. They came to my house, were on time, and did work I didn't think was possible on my older vehicle.",
    initials: "JR",
    color: "from-neon-green to-neon-pink",
  },
  {
    name: "Amanda L.",
    location: "Flint, TX",
    rating: 5,
    text: "My car was in rough shape after years of neglect. The interior restoration was absolutely transformational. Smells fresh, looks brand new. Highly recommend.",
    initials: "AL",
    color: "from-neon-pink to-neon-green",
  },
  {
    name: "Derek M.",
    location: "Bullard, TX",
    rating: 5,
    text: "Used them for paint correction on my black BMW. The swirls are completely gone and the depth of color is unreal. Professional, knowledgeable, and proud of their work.",
    initials: "DM",
    color: "from-neon-blue to-neon-pink",
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: i * 0.08, duration: 0.3 }}
          className="text-yellow-400 text-sm"
        >
          ★
        </motion.span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const [active, setActive] = useState(0);

  const prev = () => setActive((a) => (a === 0 ? reviews.length - 1 : a - 1));
  const next = () => setActive((a) => (a === reviews.length - 1 ? 0 : a + 1));

  const review = reviews[active];

  return (
    <section className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[120px]" />

      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <p className="text-neon-green text-sm font-semibold tracking-widest uppercase mb-3">
            Social Proof
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-2">
            Trusted by Local Drivers
          </h2>
          <p className="text-white/40">East Texas speaks for itself.</p>
        </motion.div>

        {/* Main review card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            initial={{ opacity: 0, x: 40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -40 }}
            transition={{ duration: 0.4 }}
            className="glass rounded-3xl p-8 md:p-12 border border-white/10 text-center mb-8 relative overflow-hidden"
          >
            {/* bg accent */}
            <div className={`absolute inset-0 bg-gradient-to-br ${review.color} opacity-5 pointer-events-none`} />

            {/* Avatar */}
            <div className={`w-16 h-16 mx-auto rounded-full bg-gradient-to-br ${review.color} flex items-center justify-center text-xl font-black text-white mb-5 shadow-glow-sm`}>
              {review.initials}
            </div>

            <Stars count={review.rating} />

            <blockquote className="text-xl md:text-2xl font-medium text-white/90 mt-5 mb-6 leading-relaxed">
              &ldquo;{review.text}&rdquo;
            </blockquote>

            <div>
              <div className="font-bold text-white">{review.name}</div>
              <div className="text-white/40 text-sm">{review.location}</div>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Navigation */}
        <div className="flex items-center justify-center gap-6">
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={prev}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            ←
          </motion.button>

          {/* Dots */}
          <div className="flex gap-2">
            {reviews.map((_, i) => (
              <button
                key={i}
                onClick={() => setActive(i)}
                className={`w-2 h-2 rounded-full transition-all duration-300 ${
                  i === active
                    ? "bg-neon-pink w-6 shadow-neon-pink"
                    : "bg-white/20"
                }`}
              />
            ))}
          </div>

          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={next}
            className="w-10 h-10 rounded-full glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white transition-colors"
          >
            →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
