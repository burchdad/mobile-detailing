"use client";

import { motion } from "framer-motion";

const cities = [
  { name: "Tyler", primary: true },
  { name: "Whitehouse", primary: false },
  { name: "Lindale", primary: false },
  { name: "Flint", primary: false },
  { name: "Bullard", primary: false },
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-neon-blue/6 rounded-full blur-[120px]" />
      </div>

      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            <p className="text-neon-blue text-sm font-semibold tracking-widest uppercase mb-3">
              Service Area
            </p>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-6">
              Proudly Serving{" "}
              <span className="gradient-text">East Texas</span>
            </h2>
            <p className="text-white/50 leading-relaxed mb-10">
              We bring the detail shop to your doorstep anywhere across East Texas.
              No need to drop your car off — we come fully equipped and ready to work.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1, duration: 0.5 }}
                  whileHover={{ scale: 1.05 }}
                  className={`glass rounded-xl py-3 px-4 border text-center transition-all duration-300 ${
                    city.primary
                      ? "border-neon-pink/50 shadow-neon-pink"
                      : "border-white/10 hover:border-neon-blue/40"
                  }`}
                >
                  <div
                    className={`font-bold ${
                      city.primary ? "text-neon-pink" : "text-white"
                    }`}
                  >
                    {city.name}
                  </div>
                  {city.primary && (
                    <div className="text-xs text-white/40 mt-0.5">Primary Hub</div>
                  )}
                </motion.div>
              ))}
            </div>

            <p className="text-white/30 text-sm mt-6">
              Don&apos;t see your city? Contact us — we likely serve your area.
            </p>
          </motion.div>

          {/* Right — Map placeholder */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            <div className="glass rounded-2xl border border-white/10 h-80 lg:h-[420px] overflow-hidden relative">
              {/* Map placeholder design */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/80 to-deep-black/80">
                {/* Grid lines simulating map */}
                <svg
                  className="absolute inset-0 w-full h-full opacity-20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <defs>
                    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#00cfff" strokeWidth="0.5" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#grid)" />
                </svg>

                {/* City dots */}
                {[
                  { x: "50%", y: "45%", label: "Tyler", primary: true },
                  { x: "58%", y: "52%", label: "Whitehouse", primary: false },
                  { x: "45%", y: "32%", label: "Lindale", primary: false },
                  { x: "46%", y: "58%", label: "Flint", primary: false },
                  { x: "55%", y: "65%", label: "Bullard", primary: false },
                ].map((dot) => (
                  <motion.div
                    key={dot.label}
                    className="absolute -translate-x-1/2 -translate-y-1/2"
                    style={{ left: dot.x, top: dot.y }}
                    animate={{
                      scale: dot.primary ? [1, 1.3, 1] : [1, 1.1, 1],
                    }}
                    transition={{
                      duration: 2,
                      repeat: Infinity,
                      ease: "easeInOut",
                      delay: Math.random() * 2,
                    }}
                  >
                    <div
                      className={`w-3 h-3 rounded-full ${
                        dot.primary ? "bg-neon-pink shadow-neon-pink" : "bg-neon-blue shadow-neon-blue"
                      }`}
                    />
                    {dot.primary && (
                      <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-neon-pink/20 animate-ping" />
                    )}
                    <div className="absolute left-4 top-1/2 -translate-y-1/2 text-xs text-white/70 whitespace-nowrap font-medium">
                      {dot.label}
                    </div>
                  </motion.div>
                ))}

                {/* Service radius circle */}
                <div
                  className="absolute top-[45%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-52 h-52 rounded-full border border-neon-blue/20"
                  style={{ background: "radial-gradient(circle, rgba(0,207,255,0.06) 0%, transparent 70%)" }}
                />
              </div>

              <div className="absolute bottom-4 left-4 right-4 text-center text-xs text-white/30">
                East Texas Service Region
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
