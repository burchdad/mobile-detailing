import { cityLandingData } from "@/lib/landingData";

export default function CityCoverage() {
  const featuredCities = cityLandingData.slice(0, 8);

  return (
    <section className="section-pad bg-surface relative overflow-hidden">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-px bg-gradient-to-r from-transparent via-neon-blue/25 to-transparent" />
      <div className="absolute top-[20%] right-[8%] w-[520px] h-[260px] bg-neon-blue/8 rounded-full blur-[130px]" />
      <div className="absolute bottom-[15%] left-[8%] w-[520px] h-[260px] bg-neon-pink/8 rounded-full blur-[130px]" />

      <div className="w-full px-5 md:px-8 relative z-10">
        <div className="mx-auto max-w-7xl">
          <p className="eyebrow text-neon-blue mb-4">Local Coverage</p>
          <div className="section-line mb-6" />
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tight mb-6">Cities We Serve Across East Texas</h2>
          <p className="text-white/55 max-w-3xl text-base md:text-lg leading-relaxed mb-10">
            Browse city-specific pages with localized service details, FAQs, and booking context for your area.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
            {featuredCities.map((city) => (
              <a
                key={city.slug}
                href={`/mobile-detailing/${city.slug}`}
                className="glass rounded-2xl border border-white/10 p-5 hover:border-neon-blue/40 transition-colors"
              >
                <p className="text-white font-semibold text-lg">
                  {city.city}, {city.region}
                </p>
                <p className="text-white/45 text-sm mt-2 line-clamp-3">{city.localAngle}</p>
              </a>
            ))}
          </div>

          <div className="mt-8">
            <a
              href="/mobile-detailing"
              className="inline-flex px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
            >
              View All Service Cities
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
