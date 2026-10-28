import Link from "next/link";

// This release deliberately has no online submission path or configuration gate.
// Keep assessment intake unavailable until a separately reviewed receiver is ready.
export default function Booking() {
  return (
    <section id="booking" className="section-pad px-5 bg-deep-black text-white md:px-8">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neon-blue/30 bg-white/[0.04] p-7 md:p-10">
        <p className="eyebrow text-neon-blue">Vehicle Assessments</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">Discuss your vehicle with A&amp;S</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/70">
          Online requests are temporarily unavailable. This page does not collect or send an assessment request. Call, text, or email A&amp;S using the options below.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          An appointment is only confirmed after you arrange it directly with A&amp;S.
        </p>
        <div className="mt-7 grid gap-4 sm:grid-cols-2">
          <a href="tel:+19033308955" className="rounded-xl border border-white/20 p-5 transition-colors hover:border-neon-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <span className="block text-sm text-white/60">Call A&amp;S</span>
            <span className="mt-2 block text-lg font-bold">(903) 330-8955</span>
          </a>
          <a href="sms:+19033308955" className="rounded-xl border border-white/20 p-5 transition-colors hover:border-neon-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <span className="block text-sm text-white/60">Text A&amp;S</span>
            <span className="mt-2 block text-lg font-bold">(903) 330-8955</span>
          </a>
          <a href="mailto:hello@asmobiledetail.com" className="rounded-xl border border-white/20 p-5 transition-colors hover:border-neon-blue focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
            <span className="block text-sm text-white/60">Email A&amp;S</span>
            <span className="mt-2 block break-all text-lg font-bold">hello@asmobiledetail.com</span>
          </a>
        </div>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          Have your vehicle year, make and model, condition, service needs, and preferred timing ready. Text and email links open your messaging app; you will need to send the message there.
        </p>
        <Link href="/contact#contact-options" className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-6 py-4 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          View contact options
        </Link>
      </div>
    </section>
  );
}
