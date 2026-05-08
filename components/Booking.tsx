"use client";

import { motion } from "framer-motion";
import { useState } from "react";

type FormData = {
  name: string;
  phone: string;
  email: string;
  vehicle: string;
  service: string;
  address: string;
  date: string;
  notes: string;
};

const services = [
  "Maintenance Detail",
  "Full Interior Restoration",
  "Paint Enhancement",
  "Ceramic Coating",
  "Custom Quote",
];

export default function Booking() {
  const [form, setForm] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    vehicle: "",
    service: "",
    address: "",
    date: "",
    notes: "",
  });
  const [submitted, setSubmitted] = useState(false);

  const update = (field: keyof FormData, value: string) =>
    setForm((f) => ({ ...f, [field]: value }));

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const inputClass =
    "w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-white/30 text-sm outline-none transition-all duration-300 focus:border-neon-blue/60 focus:shadow-[0_0_0_2px_rgba(0,207,255,0.15)] focus:bg-white/8";

  return (
    <section
      id="booking"
      className="section-pad bg-charcoal relative overflow-hidden"
    >
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[600px] bg-gradient-radial from-neon-pink/8 via-transparent to-transparent pointer-events-none" />

      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          <p className="text-neon-pink text-sm font-semibold tracking-widest uppercase mb-3">
            Get Started
          </p>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
            Ready To Transform
            <br />
            <span className="gradient-text">Your Vehicle?</span>
          </h2>
          <p className="text-white/50">
            Book your premium mobile detail today. We&apos;ll confirm within 2 hours.
          </p>
        </motion.div>

        {submitted ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass rounded-3xl p-12 border border-neon-green/40 text-center shadow-neon-green"
          >
            <div className="text-6xl mb-5">✅</div>
            <h3 className="text-2xl font-black text-white mb-3">
              Booking Received!
            </h3>
            <p className="text-white/60">
              We&apos;ll reach out within 2 hours to confirm your appointment.
              Get ready for a showroom-level detail.
            </p>
          </motion.div>
        ) : (
          <motion.form
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            onSubmit={handleSubmit}
            className="glass rounded-3xl p-8 md:p-10 border border-white/10"
          >
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Full Name *
                </label>
                <input
                  required
                  type="text"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  placeholder="John Smith"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Phone *
                </label>
                <input
                  required
                  type="tel"
                  value={form.phone}
                  onChange={(e) => update("phone", e.target.value)}
                  placeholder="(903) 555-0000"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Email *
                </label>
                <input
                  required
                  type="email"
                  value={form.email}
                  onChange={(e) => update("email", e.target.value)}
                  placeholder="you@email.com"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Vehicle *
                </label>
                <input
                  required
                  type="text"
                  value={form.vehicle}
                  onChange={(e) => update("vehicle", e.target.value)}
                  placeholder="2022 Ford F-150"
                  className={inputClass}
                />
              </div>
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Service *
                </label>
                <select
                  required
                  value={form.service}
                  onChange={(e) => update("service", e.target.value)}
                  className={inputClass + " cursor-pointer"}
                >
                  <option value="" className="bg-slate-900">
                    Select a service
                  </option>
                  {services.map((s) => (
                    <option key={s} value={s} className="bg-slate-900">
                      {s}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                  Preferred Date *
                </label>
                <input
                  required
                  type="date"
                  value={form.date}
                  onChange={(e) => update("date", e.target.value)}
                  className={inputClass + " [color-scheme:dark]"}
                />
              </div>
            </div>

            <div className="mb-4">
              <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                Service Address *
              </label>
              <input
                required
                type="text"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
                placeholder="123 Main St, Tyler, TX 75701"
                className={inputClass}
              />
            </div>

            <div className="mb-8">
              <label className="block text-white/50 text-xs font-medium mb-1.5 uppercase tracking-wide">
                Additional Notes
              </label>
              <textarea
                rows={3}
                value={form.notes}
                onChange={(e) => update("notes", e.target.value)}
                placeholder="Any specific concerns, requests, or details about your vehicle..."
                className={inputClass + " resize-none"}
              />
            </div>

            <motion.button
              type="submit"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="relative overflow-hidden w-full py-4 rounded-2xl font-bold text-lg text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink group"
            >
              <span className="relative z-10">Book My Premium Detail →</span>
              <span className="absolute inset-0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[200%] transition-transform duration-700 bg-white/20 w-1/3" />
            </motion.button>

            <p className="text-center text-white/25 text-xs mt-4">
              No payment required to book. We&apos;ll contact you to confirm.
            </p>
          </motion.form>
        )}
      </div>
    </section>
  );
}
