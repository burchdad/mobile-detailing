"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const reviews = [
  {
    name: "Marcus T.",
    location: "Tyler, TX",
    rating: 5,
    text: "Hands down the best detail I&apos;ve ever had. They came to my office and I picked up a car that looked straight off the showroom floor. Will never go back to a traditional car wash.",
    service: "Full Interior Restoration",
    initials: "MT",
  },
  {
    name: "Jessica R.",
    location: "Whitehouse, TX",
    rating: 5,
    text: "The paint correction on my white SUV is unreal. Deep scratches are gone, the gloss is insane. I&apos;ve gotten compliments from complete strangers. Worth every penny.",
    service: "Paint Enhancement",
    initials: "JR",
  },
  {
    name: "Derek L.",
    location: "Lindale, TX",
    rating: 5,
    text: "Got the ceramic coating on my truck. Two months later and water still beads off perfectly. It always looks freshly washed. A&S are the real deal &mdash; true professionals.",
    service: "Ceramic Coating",
    initials: "DL",
  },
  {
    name: "Amanda K.",
    location: "Flint, TX",
    rating: 5,
    text: "Monthly membership has been a game changer. My car is consistently clean and I never have to think about it. The team is always on time and always thorough.",
    service: "Monthly Membership",
    initials: "AK",
  },
  {
    name: "Brandon H.",
    location: "Bullard, TX",
    rating: 5,
    text: "Had dog hair embedded in every inch of my seats. They extracted all of it and left the interior smelling incredible. I was genuinely shocked at the transformation.",
    service: "Full Interior Restoration",
    initials: "BH",
  },
];

export default function Testimonials() {
  const [current, setCurrent] = useState(0);

  const prev = () => setCurrent((c) => (c - 1 + reviews.length) % reviews.length);
  const next = () => setCurrent((c) => (c + 1) % reviews.length);

  return (
    <section className="section-pad bg-charcoal relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-blue/25 to-transparent" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-neon-blue/4 rounded-full blur-[120px]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-5xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-14"
          >
            <p className="eyebrow text-neon-blue mb-4">Client Reviews</p>
            <div className="section-line mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-4">
              Local East Texas Drivers
            </h2>
            <p className="text-white/40 text-sm tracking-wide">5.0 stars &bull; 100+ verified reviews &bull; Repeat clients</p>
          </motion.div>

        {/* Carousel */}
        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, x: 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -60 }}
              transition={{ duration: 0.45, ease: "easeOut" }}
              className="glass-strong rounded-3xl p-8 md:p-10 border border-white/8 relative overflow-hidden"
            >
              {/* Shimmer */}
              <div className="absolute inset-0 opacity-0 hover:opacity-100 transition-opacity duration-700" style={{ background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.025) 50%, transparent 60%)" }} />

              {/* Quote mark */}
              <div className="text-[80px] leading-none font-black text-neon-pink/10 absolute top-4 left-8 select-none">&ldquo;</div>

              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: reviews[current].rating }).map((_, i) => (
                  <motion.svg
                    key={i}
                    initial={{ scale: 0, rotate: -30 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ delay: i * 0.06, duration: 0.3 }}
                    className="w-5 h-5 text-neon-pink"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </motion.svg>
                ))}
              </div>

              {/* Quote */}
              <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-8 relative z-10"
                dangerouslySetInnerHTML={{ __html: `&ldquo;${reviews[current].text}&rdquo;` }}
              />

              {/* Author */}
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-neon-pink to-neon-blue flex items-center justify-center text-white font-black text-sm shrink-0">
                  {reviews[current].initials}
                </div>
                <div>
                  <div className="font-bold text-white">{reviews[current].name}</div>
                  <div className="flex items-center gap-2 mt-0.5">
                    <span className="text-white/40 text-xs">{reviews[current].location}</span>
                    <span className="w-1 h-1 rounded-full bg-white/20" />
                    <span className="text-neon-blue/70 text-xs font-medium">{reviews[current].service}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Nav buttons */}
          <div className="flex items-center justify-center gap-4 mt-8">
            <motion.button
              onClick={prev}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-neon-blue/40 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
            </motion.button>

            {/* Dots */}
            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrent(i)}
                  className={`transition-all duration-300 rounded-full ${i === current ? "w-6 h-2 bg-neon-pink" : "w-2 h-2 bg-white/20 hover:bg-white/40"}`}
                />
              ))}
            </div>

            <motion.button
              onClick={next}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="w-10 h-10 rounded-xl glass border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:border-neon-blue/40 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </motion.button>
          </div>
        </div>
        </div>
      </div>
    </section>
  );
}
