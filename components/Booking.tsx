"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const services = [
  "Maintenance Detail — $99",
  "Full Interior Restoration — $199",
  "Paint Enhancement — $349",
  "Ceramic Coating — $699+",
  "Monthly Membership",
  "Other / Not Sure",
];

export default function Booking() {
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <section id="booking" className="section-pad bg-deep-black relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />
      <div className="absolute top-1/4 left-0 w-[500px] h-[500px] bg-neon-pink/5 rounded-full blur-[140px]" />
      <div className="absolute bottom-1/4 right-0 w-[500px] h-[500px] bg-neon-blue/5 rounded-full blur-[140px]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="text-center mb-12"
          >
            <p className="eyebrow text-neon-pink mb-4">Book A Detail</p>
            <div className="section-line mx-auto mb-6" />
            <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">
              Request Your <span className="gradient-text">Premium Detail</span>
            </h2>
            <p className="text-white/45 text-lg max-w-2xl mx-auto">
              Fill out the form below and we&apos;ll confirm your appointment within 24 hours.
            </p>
          </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.15 }}
          className="glass-strong rounded-3xl border border-white/8 overflow-hidden"
        >
          {/* Top bar */}
          <div className="h-1 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green" />

          <div className="p-8 md:p-10">
            <AnimatePresence mode="wait">
              {submitted ? (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: "easeOut" }}
                  className="text-center py-12"
                >
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
                    className="w-20 h-20 rounded-full bg-gradient-to-br from-neon-green/20 to-neon-blue/20 border border-neon-green/40 flex items-center justify-center mx-auto mb-6"
                  >
                    <svg className="w-10 h-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </motion.div>
                  <h3 className="text-2xl font-black text-white mb-3">Request Received!</h3>
                  <p className="text-white/55 max-w-sm mx-auto text-sm leading-relaxed">
                    We&apos;ll confirm your appointment within 24 hours. Check your phone for a text from us. We can&apos;t wait to transform your ride.
                  </p>
                </motion.div>
              ) : (
                <motion.form
                  key="form"
                  onSubmit={handleSubmit}
                  className="space-y-5"
                >
                  {/* Personal info */}
                  <div>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Your Info</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div className="group">
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Full Name *</label>
                        <input
                          required
                          type="text"
                          placeholder="John Smith"
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Phone *</label>
                        <input
                          required
                          type="tel"
                          placeholder="(903) 555-0000"
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Vehicle info */}
                  <div>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Vehicle &amp; Service</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Vehicle *</label>
                        <input
                          required
                          type="text"
                          placeholder="2022 Ford F-150"
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200"
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Service *</label>
                        <select
                          required
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200 appearance-none"
                          style={{ colorScheme: "dark" }}
                        >
                          <option value="" className="bg-[#0c0c18]">Select a service...</option>
                          {services.map((s) => (
                            <option key={s} value={s} className="bg-[#0c0c18]">{s}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  {/* Scheduling */}
                  <div>
                    <p className="text-xs font-semibold text-white/30 uppercase tracking-wider mb-4">Scheduling</p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Preferred Date *</label>
                        <input
                          required
                          type="date"
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200"
                          style={{ colorScheme: "dark" }}
                        />
                      </div>
                      <div>
                        <label className="text-xs font-semibold text-white/50 mb-1.5 block">Service Location *</label>
                        <input
                          required
                          type="text"
                          placeholder="Tyler, TX (address or area)"
                          className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  <div>
                    <label className="text-xs font-semibold text-white/50 mb-1.5 block">Additional Notes</label>
                    <textarea
                      rows={3}
                      placeholder="Anything else we should know about your vehicle..."
                      className="w-full bg-white/4 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/25 text-sm focus:outline-none focus:border-neon-blue/50 focus:shadow-neon-blue-sm transition-all duration-200 resize-none"
                    />
                  </div>

                  {/* Trust line */}
                  <div className="flex items-center gap-2 py-1">
                    <svg className="w-4 h-4 text-neon-green shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                    <span className="text-white/35 text-xs">No payment required &mdash; we confirm availability before scheduling.</span>
                  </div>

                  <motion.button
                    type="submit"
                    disabled={loading}
                    whileHover={{ scale: loading ? 1 : 1.02 }}
                    whileTap={{ scale: loading ? 1 : 0.98 }}
                    className="relative w-full overflow-hidden group py-4 rounded-xl font-black text-base text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm disabled:opacity-70 disabled:cursor-not-allowed transition-all duration-200"
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2">
                      {loading ? (
                        <>
                          <svg className="w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                          </svg>
                          Sending Request...
                        </>
                      ) : (
                        <>
                          Request My Premium Detail
                          <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-200" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                          </svg>
                        </>
                      )}
                    </span>
                    <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] group-hover:translate-x-[250%] transition-transform duration-700 bg-white/15 w-2/5 pointer-events-none" />
                  </motion.button>
                </motion.form>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
        </div>
      </div>
    </section>
  );
}
