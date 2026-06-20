import Link from "next/link";

type HeroProps = {
  eyebrow: string;
  title: string;
  intro: string;
  cta?: string;
  ctaHref?: string;
};

type EditorialBlock = {
  eyebrow: string;
  title: string;
  body: string;
};

export function BrandHero({ eyebrow, title, intro, cta = "Request Your Assessment", ctaHref = "/assessment" }: HeroProps) {
  return (
    <section className="relative overflow-hidden px-5 pb-24 pt-36 md:px-8 md:pb-32 md:pt-44">
      <div className="absolute inset-0 mesh-bg opacity-45" />
      <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(0,0,0,0.9),rgba(0,0,0,0.5),rgba(0,0,0,0.18))]" />
      <div className="absolute right-[-14%] top-[8%] h-[680px] w-[680px] rounded-full bg-neon-blue/8 blur-[170px]" />
      <div className="absolute left-[-12%] bottom-[-18%] h-[560px] w-[560px] rounded-full bg-neon-pink/8 blur-[160px]" />
      <div className="relative z-10 mx-auto max-w-7xl">
        <p className="eyebrow mb-6 text-neon-pink">{eyebrow}</p>
        <h1 className="max-w-6xl text-[clamp(4rem,9vw,9.5rem)] font-black leading-[0.88] tracking-tight text-white">
          {title}
        </h1>
        <div className="mt-10 grid gap-8 lg:grid-cols-[0.72fr_0.28fr] lg:items-end">
          <p className="max-w-3xl text-xl leading-relaxed text-white/62 md:text-2xl">{intro}</p>
          <Link
            href={ctaHref}
            className="inline-flex w-fit rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-7 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-neon-pink-sm"
          >
            {cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

export function EditorialSections({ blocks }: { blocks: readonly EditorialBlock[] }) {
  return (
    <section className="px-5 py-20 md:px-8 md:py-28">
      <div className="mx-auto max-w-7xl">
        <div className="divide-y divide-white/8">
          {blocks.map((block, index) => (
            <article key={block.title} className="grid gap-8 py-14 first:pt-0 last:pb-0 lg:grid-cols-[0.36fr_0.64fr]">
              <div>
                <p className="eyebrow text-neon-blue">{block.eyebrow}</p>
                <p className="mt-5 text-6xl font-black leading-none text-white/8 md:text-8xl">{String(index + 1).padStart(2, "0")}</p>
              </div>
              <div>
                <h2 className="max-w-4xl text-4xl font-black tracking-tight text-white md:text-6xl">{block.title}</h2>
                <p className="mt-6 max-w-3xl text-lg leading-relaxed text-white/58 md:text-xl">{block.body}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function SplitFeature({
  eyebrow,
  title,
  body,
  points,
}: {
  eyebrow: string;
  title: string;
  body: string;
  points: readonly string[];
}) {
  return (
    <section className="relative overflow-hidden px-5 py-20 md:px-8 md:py-28">
      <div className="absolute inset-x-0 top-0 mx-auto h-px max-w-5xl bg-gradient-to-r from-transparent via-white/16 to-transparent" />
      <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="eyebrow mb-5 text-neon-pink">{eyebrow}</p>
          <h2 className="text-5xl font-black tracking-tight text-white md:text-7xl">{title}</h2>
          <p className="mt-7 text-lg leading-relaxed text-white/58">{body}</p>
        </div>
        <div className="space-y-5">
          {points.map((point, index) => (
            <div key={point} className="group grid grid-cols-[64px_1fr] items-start gap-5 py-5">
              <span className="text-3xl font-black text-neon-pink/70">{String(index + 1).padStart(2, "0")}</span>
              <p className="border-b border-white/8 pb-5 text-xl font-semibold leading-relaxed text-white/74 group-last:border-b-0">{point}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export function FinalLuxuryCta({
  title = "Ready To Protect Your Vehicle?",
  body = "Request a guided assessment and we will recommend the right preservation path for your vehicle, condition, and ownership goals.",
}: {
  title?: string;
  body?: string;
}) {
  return (
    <section className="relative overflow-hidden px-5 py-24 md:px-8 md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(200,169,106,0.12),transparent_42%)]" />
      <div className="relative z-10 mx-auto max-w-5xl text-center">
        <p className="eyebrow mb-5 text-neon-pink">A&S Detailing</p>
        <h2 className="text-5xl font-black tracking-tight text-white md:text-8xl">{title}</h2>
        <p className="mx-auto mt-7 max-w-2xl text-lg leading-relaxed text-white/58">{body}</p>
        <Link
          href="/assessment"
          className="mt-10 inline-flex rounded-xl bg-gradient-to-r from-neon-pink to-neon-blue px-8 py-4 text-sm font-black uppercase tracking-[0.14em] text-white shadow-neon-pink-sm"
        >
          Request Your Assessment
        </Link>
      </div>
    </section>
  );
}

export function BrandPage({
  hero,
  blocks,
  feature,
}: {
  hero: HeroProps;
  blocks: readonly EditorialBlock[];
  feature?: { eyebrow: string; title: string; body: string; points: readonly string[] };
}) {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero {...hero} />
      <EditorialSections blocks={blocks} />
      {feature ? <SplitFeature {...feature} /> : null}
      <FinalLuxuryCta />
    </main>
  );
}
