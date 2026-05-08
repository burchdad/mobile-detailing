"use client";

import { motion } from "framer-motion";

const cities = [
  { name: "Tyler", sub: "Primary Hub", primary: true },
  { name: "Whitehouse", sub: "10 min away" },
  { name: "Lindale", sub: "15 min away" },
  { name: "Flint", sub: "12 min away" },
  { name: "Bullard", sub: "20 min away" },
  { name: "Longview", sub: "45 min away" },
  { name: "Nacogdoches", sub: "60 min away" },
  { name: "Jacksonville", sub: "40 min away" },
];

const mapNodes = [
  { x: 50, y: 50, label: "Tyler", primary: true, color: "#ff007f" },
  { x: 65, y: 40, label: "Whitehouse", color: "#00cfff" },
  { x: 72, y: 28, label: "Lindale", color: "#00cfff" },
  { x: 40, y: 65, label: "Flint", color: "#00cfff" },
  { x: 55, y: 72, label: "Bullard", color: "#39ff14" },
  { x: 82, y: 35, label: "Longview", color: "#39ff14" },
  { x: 60, y: 85, label: "Jacksonville", color: "#39ff14" },
];

export default function ServiceArea() {
  return (
    <section id="service-area" className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-green/25 to-transparent" />
      <div className="absolute top-1/3 right-0 w-80 h-80 bg-neon-green/4 rounded-full blur-[100px]" />

      <div className="max-w-6xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <p className="eyebrow text-neon-green mb-4">Coverage Area</p>
            <div className="section-line mb-6 bg-gradient-to-r from-neon-green to-neon-blue" />
            <h2 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-5">
              We Come <span className="gradient-text-alt">To You</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-10 max-w-md">
              Based in Tyler, TX &mdash; serving all of East Texas. If you&apos;re within our service radius, we&apos;ll come to your door. No extra travel fees for most areas.
            </p>

            <div className="grid grid-cols-2 gap-3 mb-10">
              {cities.map((city, i) => (
                <motion.div
                  key={city.name}
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.06, duration: 0.5 }}
                  className={`glass rounded-xl px-4 py-3 border transition-all duration-200 flex items-center gap-3 ${
                    city.primary
                      ? "border-neon-pink/40 bg-neon-pink/5"
                      : "border-white/7 hover:border-neon-green/30"
                  }`}
                >
                  <div className={`w-2 h-2 rounded-full shrink-0 ${city.primary ? "bg-neon-pink animate-glow-pulse" : "bg-neon-green/60"}`} />
                  <div>
                    <div className={`text-sm font-bold ${city.primary ? "text-neon-pink" : "text-white"}`}>{city.name}</div>
                    <div className="text-[11px] text-white/35">{city.sub}</div>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.a
              href="#booking"
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.97 }}
              className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full font-bold text-white bg-gradient-to-r from-neon-green to-neon-blue shadow-neon-green-sm text-sm"
            >
              Check My Area &amp; Book
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </motion.a>
          </motion.div>

          {/* Right: map visual */}
          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative aspect-square max-w-sm mx-auto">
              {/* Map background */}
              <div className="absolute inset-0 glass-strong rounded-3xl border border-white/8 overflow-hidden">
                <div className="absolute inset-0" style={{ backgroundImage: "linear-gradient(rgba(0,207,255,0.05) 1px,transparent 1px),linear-gradient(90deg,rgba(0,207,255,0.05) 1px,transparent 1px)", backgroundSize: "30px 30px" }} />
                {/* Service radius ring */}
                <motion.div
                  className="absolute rounded-full border border-neon-pink/20"
                  style={{ width: "55%", height: "55%", top: "22.5%", left: "22.5%" }}
                  animate={{ scale: [1, 1.04, 1], opacity: [0.4, 0.7, 0.4] }}
                  transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                />
                <motion.div
                  className="absolute rounded-full border border-neon-blue/10"
                  style={{ width: "75%", height: "75%", top: "12.5%", left: "12.5%" }}
                  animate={{ scale: [1, 1.03, 1], opacity: [0.2, 0.4, 0.2] }}
                  transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                />
              </div>

              {/* City nodes */}
              {mapNodes.map((node, i) => (
                <motion.div
                  key={node.label}
                  className="absolute"
                  style={{ left: `${node.x}%`, top: `${node.y}%`, transform: "translate(-50%,-50%)" }}
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + i * 0.1, duration: 0.4 }}
                >
                  {/* Ping ring */}
                  <motion.div
                    className="absolute inset-0 rounded-full"
                    style={{ backgroundColor: node.color }}
                    animate={{ scale: [1, node.primary ? 3 : 2.5], opacity: [0.6, 0] }}
                    transition={{ duration: 2.5, repeat: Infinity, delay: i * 0.4 }}
                  />
                  <div
                    className="relative w-3 h-3 rounded-full border-2 border-deep-black"
                    style={{ backgroundColor: node.color, boxShadow: `0 0 8px ${node.color}` }}
                  />
                  <div className="absolute left-4 top-1/2 -translate-y-1/2 text-[10px] font-bold text-white/70 whitespace-nowrap">
                    {node.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
