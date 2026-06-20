"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";

const services = [
  "Signature Detail",
  "Paint Correction",
  "Ceramic Coating",
  "Interior Preservation",
  "Vehicle Preservation Plan",
  "Fleet Care Program",
  "Not sure yet",
];

const conditions = ["Well maintained", "Needs a reset", "Heavy interior use", "Paint swirls or haze", "New vehicle protection", "Show / collector vehicle"];

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
    <section id="booking" className="section-pad relative overflow-hidden bg-deep-black">
      <div className="absolute left-1/2 top-0 h-px w-[900px] -translate-x-1/2 bg-gradient-to-r from-transparent via-neon-pink/30 to-transparent" />
      <div className="absolute left-[-10%] top-[20%] h-[520px] w-[520px] rounded-full bg-neon-pink/6 blur-[145px]" />
      <div className="absolute right-[-8%] bottom-[18%] h-[520px] w-[520px] rounded-full bg-neon-blue/7 blur-[145px]" />

      <div className="relative z-10 w-full px-5 md:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 lg:grid-cols-[0.78fr_1fr] lg:items-start">
          <motion.div
            initial={{ opacity: 0, x: -28 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
          >
            <p className="eyebrow mb-4 text-neon-pink">Concierge Booking Experience</p>
            <div className="section-line mb-6" />
            <h2 className="text-5xl font-black tracking-tight text-white md:text-7xl">Request Your Vehicle Assessment</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/56">
              Tell us what you drive, what condition it is in, and what outcome you want. We will confirm the right service path before anything is scheduled.
            </p>

            <div className="mt-8 grid gap-3">
              {["Vehicle Information", "Vehicle Condition", "Desired Services", "Schedule Assessment"].map((step, index) => (
                <div key={step} className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/28 p-4 backdrop-blur">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg border border-neon-pink/25 text-xs font-black text-neon-pink">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="text-sm font-bold uppercase tracking-[0.12em] text-white/76">{step}</span>
                </div>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.12 }}
            className="panel-edge overflow-hidden rounded-2xl border border-white/10 bg-[linear-gradient(145deg,rgba(255,255,255,0.075),rgba(255,255,255,0.018))]"
          >
            <div className="h-1 bg-gradient-to-r from-neon-pink via-neon-blue to-neon-green" />
            <div className="p-7 md:p-9">
              <AnimatePresence mode="wait">
                {submitted ? (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.94 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.45 }}
                    className="py-14 text-center"
                  >
                    <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full border border-neon-green/35 bg-neon-green/12">
                      <svg className="h-10 w-10 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="mb-3 text-3xl font-black text-white">Assessment Request Received</h3>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-white/58">
                      We will review the vehicle details and reach out to confirm the right service path, timing, and expectations.
                    </p>
                  </motion.div>
                ) : (
                  <motion.form key="form" onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Owner Details</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Full Name" placeholder="John Smith" required />
                        <Field label="Phone" placeholder="(903) 555-0000" type="tel" required />
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Vehicle Information</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field label="Vehicle" placeholder="2022 Ford F-150 Platinum" required />
                        <Select label="Desired Service" options={services} required />
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Condition And Outcome</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select label="Current Condition" options={conditions} required />
                        <Field label="Preferred Date" type="date" required />
                      </div>
                    </div>

                    <div>
                      <Field label="Service Location" placeholder="Tyler, TX address or area" required />
                    </div>

                    <div>
                      <label className="mb-1.5 block text-xs font-semibold text-white/52">What should we know before assessing the vehicle?</label>
                      <textarea
                        rows={4}
                        placeholder="Paint concerns, interior condition, coating goals, garage access, timeline..."
                        className="w-full resize-none rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 focus:border-neon-pink/55 focus:outline-none focus:shadow-neon-pink-sm"
                      />
                    </div>

                    <div className="flex items-center gap-2 rounded-xl border border-white/8 bg-black/24 px-4 py-3">
                      <svg className="h-4 w-4 shrink-0 text-neon-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                      </svg>
                      <span className="text-xs text-white/42">No payment required. We confirm fit, availability, and expectations first.</span>
                    </div>

                    <button
                      type="submit"
                      disabled={loading}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue py-4 text-base font-black uppercase tracking-[0.13em] text-white shadow-neon-pink-sm disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10">{loading ? "Sending Assessment..." : "Request Vehicle Assessment"}</span>
                      <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] bg-white/16 transition-transform duration-700 group-hover:translate-x-[250%]" />
                    </button>
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

function Field({ label, placeholder, type = "text", required = false }: { label: string; placeholder?: string; type?: string; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/52">{label} {required ? "*" : ""}</label>
      <input
        required={required}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 focus:border-neon-pink/55 focus:outline-none focus:shadow-neon-pink-sm"
        style={type === "date" ? { colorScheme: "dark" } : undefined}
      />
    </div>
  );
}

function Select({ label, options, required = false }: { label: string; options: string[]; required?: boolean }) {
  return (
    <div>
      <label className="mb-1.5 block text-xs font-semibold text-white/52">{label} {required ? "*" : ""}</label>
      <select
        required={required}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white transition-all duration-200 focus:border-neon-pink/55 focus:outline-none focus:shadow-neon-pink-sm"
        style={{ colorScheme: "dark" }}
      >
        <option value="" className="bg-[#0b0b0a]">Select...</option>
        {options.map((option) => (
          <option key={option} value={option} className="bg-[#0b0b0a]">{option}</option>
        ))}
      </select>
    </div>
  );
}
