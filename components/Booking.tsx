"use client";

import { AnimatePresence, motion } from "framer-motion";
import Link from "next/link";
import AssessmentUnavailable from "./AssessmentUnavailable";
import { useEffect, useRef, useState } from "react";
import type { InputHTMLAttributes } from "react";
import { assessmentServices, assessmentConditions, isAssessmentReceipt, validateAssessment } from "@/lib/assessment";

export default function Booking({ available = false }: { available?: boolean }) {
  const [receipt, setReceipt] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const pending = useRef(false);
  const lastAttempt = useRef<{ payload: string; key: string; started: number } | null>(null);
  const activeRequest = useRef<AbortController | null>(null);
  const successHeading = useRef<HTMLHeadingElement>(null);
  const errorRef = useRef<HTMLDivElement>(null);

  useEffect(() => () => activeRequest.current?.abort(), []);
  useEffect(() => { if (error) errorRef.current?.focus(); }, [error]);

  if (!available) return <AssessmentUnavailable />;

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (pending.current || !available) return;
    const formData = new FormData(event.currentTarget);
    const values = Object.fromEntries(formData.entries());
    const validation = validateAssessment(values);
    if (!validation.ok) { setError(validation.message); return; }
    const payload = JSON.stringify({ ...validation.data, website: values.website ?? "" });
    const attempt = lastAttempt.current?.payload === payload
      ? lastAttempt.current
      : { payload, key: crypto.randomUUID(), started: Date.now() };
    if (Date.now() - attempt.started >= 23 * 60 * 60 * 1000) {
      setError("The retry window has expired. Contact A&S before starting another request."); return;
    }
    lastAttempt.current = attempt;
    pending.current = true;
    setLoading(true);
    setError("");
    const controller = new AbortController();
    activeRequest.current = controller;
    const timeout = window.setTimeout(() => controller.abort(), 15000);
    try {
      const response = await fetch("/api/assessment", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Idempotency-Key": attempt.key, "X-Assessment-Started": String(attempt.started) },
        body: payload,
        signal: controller.signal,
      });
      const result: unknown = await response.json();
      if (response.ok && isAssessmentReceipt(result)) {
        setReceipt(result.messageId);
      } else {
        setError(response.status === 503
          ? "Online requests are temporarily unavailable. If you already tried sending, contact A&S before starting a new request."
          : response.status === 429 ? "Too many attempts. Wait a minute before retrying."
          : response.status === 409 ? "The retry window has expired. Contact A&S before starting another request."
          : response.status === 400 ? "Check your details and try again."
          : "We couldn't confirm email acceptance. Your details are still here. Keep this page open and retry without changing them, or contact A&S.");
      }
    } catch {
      setError("We couldn't confirm email acceptance. Your details are still here. Keep this page open and retry without changing them, or contact A&S.");
    } finally {
      window.clearTimeout(timeout);
      activeRequest.current = null;
      pending.current = false;
      setLoading(false);
    }
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
            <h2 className="text-4xl font-black tracking-tight text-white [overflow-wrap:anywhere] md:text-6xl">Request Your Vehicle Assessment</h2>
            <p className="mt-6 text-lg leading-relaxed text-white/56">
              Tell us what you drive, what condition it is in, and what outcome you want. We will confirm the right service path before anything is scheduled.
            </p>

            <div className="mt-8 grid gap-3">
              {["Vehicle Information", "Vehicle Condition", "Desired Services", "Request Assessment"].map((step, index) => (
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
                {receipt ? (
                  <motion.div
                    key="success"
                    onAnimationComplete={() => successHeading.current?.focus()}
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
                    <h3 ref={successHeading} tabIndex={-1} className="mb-3 text-3xl font-black text-white">Request Accepted for Email Delivery</h3>
                    <p className="mx-auto max-w-md text-sm leading-relaxed text-white/58">
                      Our email service accepted your request for delivery to A&amp;S. This does not confirm inbox delivery or an appointment. A&amp;S will confirm service details and availability with you.
                    </p>
                    <p className="mt-4 text-xs text-white/58">Reference: {receipt}</p>
                  </motion.div>
                ) : (
                  <motion.form key="form" method="post" action="/api/assessment" onSubmit={handleSubmit} aria-busy={loading} className="space-y-6">
                    <noscript><p className="text-sm text-white/80">JavaScript is required for online requests. Please <a href="/contact" className="underline">contact A&amp;S directly</a>.</p></noscript>
                    {!available ? (
                      <div role="status" className="rounded-xl border border-neon-blue/40 bg-black/30 p-4 text-sm text-white/80">
                        Online requests are temporarily unavailable. Please <Link href="/contact" className="underline">contact A&amp;S directly</Link>.
                      </div>
                    ) : null}
                    {error ? (
                      <div ref={errorRef} tabIndex={-1} role="alert" className="rounded-xl border border-neon-pink/50 bg-black/30 p-4 text-sm text-white/80">
                        {error} <Link href="/contact" className="underline">Contact A&amp;S</Link>
                      </div>
                    ) : null}
                    <fieldset disabled={loading || !available} className="space-y-6">
                    <legend className="sr-only">Vehicle assessment request</legend>
                    <div hidden aria-hidden="true">
                      <label htmlFor="assessment-website">Leave this blank</label>
                      <input id="assessment-website" name="website" tabIndex={-1} autoComplete="off" />
                    </div>
                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Owner Details</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field name="fullName" autoComplete="name" maxLength={100} label="Full Name" placeholder="John Smith" required />
                        <Field name="phone" autoComplete="tel" maxLength={30} label="Phone" placeholder="Your phone number" type="tel" required />
                        <Field name="email" autoComplete="email" maxLength={254} label="Email (optional)" type="email" />
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Vehicle Information</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Field name="vehicle" maxLength={150} label="Vehicle" placeholder="2022 Ford F-150 Platinum" required />
                        <Select name="service" label="Desired Service" options={assessmentServices} required />
                      </div>
                    </div>

                    <div>
                      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.18em] text-white/36">Condition And Outcome</p>
                      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                        <Select name="condition" label="Current Condition" options={assessmentConditions} required />
                        <Field name="preferredDate" label="Preferred Date (not confirmed)" type="date" required />
                      </div>
                    </div>

                    <div>
                      <Field name="location" maxLength={250} label="Service Location" placeholder="Tyler, TX address or area" required />
                    </div>

                    <div>
                      <label htmlFor="assessment-notes" className="mb-1.5 block text-xs font-semibold text-white/52">What should we know before assessing the vehicle?</label>
                      <textarea
                        id="assessment-notes"
                        name="notes"
                        maxLength={2000}
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
                      disabled={loading || !available}
                      className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue py-4 text-base font-black uppercase tracking-[0.13em] text-white shadow-neon-pink-sm disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      <span className="relative z-10">{loading ? "Sending Assessment..." : !available ? "Online Requests Unavailable" : "Request Vehicle Assessment"}</span>
                      <span className="absolute inset-0 -skew-x-12 translate-x-[-150%] bg-white/16 transition-transform duration-700 group-hover:translate-x-[250%]" />
                    </button>
                    <p className="text-xs leading-relaxed text-white/50">Submitting shares these details with A&amp;S to respond to this request. Please do not include payment details or other sensitive information.</p>
                    </fieldset>
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

function Field({ label, name, type = "text", required = false, ...props }: InputHTMLAttributes<HTMLInputElement> & { label: string; name: string }) {
  const id = `assessment-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white/52">{label} {required ? "*" : ""}</label>
      <input
        {...props}
        id={id}
        name={name}
        required={required}
        type={type}
        className="w-full rounded-xl border border-white/10 bg-white/[0.04] px-4 py-3 text-sm text-white placeholder-white/25 transition-all duration-200 focus:border-neon-pink/55 focus:outline-none focus:shadow-neon-pink-sm"
        style={type === "date" ? { colorScheme: "dark" } : undefined}
      />
    </div>
  );
}

function Select({ label, name, options, required = false }: { label: string; name: string; options: readonly string[]; required?: boolean }) {
  const id = `assessment-${name}`;
  return (
    <div>
      <label htmlFor={id} className="mb-1.5 block text-xs font-semibold text-white/52">{label} {required ? "*" : ""}</label>
      <select
        id={id}
        name={name}
        required={required}
        defaultValue=""
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
