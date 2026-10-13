import Link from "next/link";

// This release deliberately has no online submission path or configuration gate.
// Keep assessment intake unavailable until a separately reviewed receiver is ready.
export default function Booking() {
  return (
    <section id="booking" className="section-pad bg-deep-black text-white">
      <div className="mx-auto max-w-3xl rounded-2xl border border-neon-blue/30 bg-white/[0.04] p-7 md:p-10">
        <p className="eyebrow text-neon-blue">Vehicle Assessments</p>
        <h2 className="mt-4 text-3xl font-black md:text-4xl">Online requests are temporarily unavailable</h2>
        <p className="mt-5 text-lg leading-relaxed text-white/70">
          This page does not collect or send an assessment request. Use our contact options to discuss your vehicle and service needs.
        </p>
        <p className="mt-4 text-sm leading-relaxed text-white/60">
          An appointment is only confirmed after you arrange it directly with A&amp;S.
        </p>
        <Link href="/contact#contact-options" className="mt-7 inline-flex rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-6 py-4 font-bold text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-white">
          View contact options
        </Link>
      </div>
    </section>
  );
}
