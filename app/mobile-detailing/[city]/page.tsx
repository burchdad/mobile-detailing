import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { cityLandingData } from "@/lib/landingData";
import { siteUrl } from "@/lib/site";

type Props = {
  params: { city: string };
};

const cityCoverageProofBySlug: Record<string, string[]> = {
  "tyler-tx": ["Downtown + South Tyler route windows", "Home and office appointment blocks", "Same-week booking availability"],
  "whitehouse-tx": ["Residential driveway-focused service windows", "Interior restoration demand coverage", "Recurring maintenance routes"],
  "lindale-tx": ["Correction + coating package demand", "Weekend-friendly booking windows", "Premium vehicle finish programs"],
  "longview-tx": ["Commuter and corporate vehicle coverage", "Commercial fleet route support", "Protection-first package requests"],
  "flint-tx": ["Family SUV interior recovery demand", "Luxury owner maintenance cycles", "Seasonal protection upgrades"],
  "bullard-tx": ["Recurring maintenance memberships", "Ceramic upkeep route support", "Priority booking for returning clients"],
  "jacksonville-tx": ["Weekday mobile appointment density", "Exterior refresh demand", "Business fleet inquiries"],
  "nacogdoches-tx": ["Long-distance driver protection programs", "Correction package demand", "Premium full-detail route blocks"],
  "kilgore-tx": ["Commuter-focused service windows", "Interior reset request volume", "Flexible midday appointments"],
  "henderson-tx": ["Seasonal correction + interior bundles", "Residential/mobile convenience", "Priority maintenance follow-ups"],
  "athens-tx": ["Monthly paint-safe wash schedules", "Long-term exterior preservation", "Driver-friendly booking cadence"],
  "palestine-tx": ["Full-detail conversion demand", "Residential + workplace service mix", "Business vehicle appearance programs"],
};

const cityTestimonialBySlug: Record<string, { quote: string; author: string }> = {
  "tyler-tx": { quote: "My SUV looked brand new without leaving my office parking lot. This is premium service done right.", author: "Tyler Client" },
  "whitehouse-tx": { quote: "Interior stains I thought were permanent are gone. The convenience and finish quality are unreal.", author: "Whitehouse Driver" },
  "lindale-tx": { quote: "Paint correction and ceramic made my truck look deeper and glossier than when I bought it.", author: "Lindale Owner" },
  "longview-tx": { quote: "Our vehicles stay client-ready every week. Reliable and seriously high-level work.", author: "Longview Fleet Client" },
  "flint-tx": { quote: "They handled my family vehicle with luxury-level attention to detail. Huge transformation.", author: "Flint Customer" },
  "bullard-tx": { quote: "Membership has been worth every dollar. My car always looks polished.", author: "Bullard Member" },
  "jacksonville-tx": { quote: "Fast booking, on-time arrival, and top-tier results. Exactly what I needed.", author: "Jacksonville Client" },
  "nacogdoches-tx": { quote: "Ceramic coating was a game changer. Water beads right off and gloss stays insane.", author: "Nacogdoches Owner" },
  "kilgore-tx": { quote: "They made my commuter car look premium again without disrupting my day.", author: "Kilgore Driver" },
  "henderson-tx": { quote: "Interior and exterior both came back to life. Easily the best detail I have had.", author: "Henderson Client" },
  "athens-tx": { quote: "Consistent, professional, and flawless finish every visit.", author: "Athens Client" },
  "palestine-tx": { quote: "From booking to final walkthrough, everything felt elite and smooth.", author: "Palestine Customer" },
};

export function generateStaticParams() {
  return cityLandingData.map((city) => ({ city: city.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const landing = cityLandingData.find((city) => city.slug === params.city);

  if (!landing) {
    return {
      title: "City Not Found | A&S Mobile Detail",
      description: "The requested city page could not be found.",
    };
  }

  return {
    title: `${landing.title} | A&S Mobile Detail`,
    description: landing.description,
    keywords: [
      `mobile detailing ${landing.city} ${landing.region}`,
      `ceramic coating ${landing.city} ${landing.region}`,
      `paint correction ${landing.city} ${landing.region}`,
      `interior detailing ${landing.city} ${landing.region}`,
    ],
    alternates: {
      canonical: `/mobile-detailing/${landing.slug}`,
    },
    openGraph: {
      title: `${landing.title} | A&S Mobile Detail`,
      description: landing.description,
      url: `${siteUrl}/mobile-detailing/${landing.slug}`,
      images: [
        {
          url: `${siteUrl}/mobile-detailing/${landing.slug}/opengraph-image`,
          width: 1200,
          height: 630,
          alt: `${landing.city} mobile detailing`,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${landing.title} | A&S Mobile Detail`,
      description: landing.description,
      images: [`${siteUrl}/mobile-detailing/${landing.slug}/opengraph-image`],
    },
  };
}

export default function CityLandingPage({ params }: Props) {
  const landing = cityLandingData.find((city) => city.slug === params.city);

  if (!landing) {
    notFound();
  }

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "AutoDetailing",
    name: "A&S Mobile Detail",
    areaServed: `${landing.city}, ${landing.region}`,
    url: `${siteUrl}/mobile-detailing/${landing.slug}`,
  };

  const serviceSchema = {
    "@context": "https://schema.org",
    "@type": "Service",
    name: `Mobile Detailing in ${landing.city}, ${landing.region}`,
    areaServed: `${landing.city}, ${landing.region}`,
    provider: {
      "@type": "AutoDetailing",
      name: "A&S Mobile Detail",
      url: siteUrl,
    },
    url: `${siteUrl}/mobile-detailing/${landing.slug}`,
  };

  const nearbyCities = cityLandingData.filter((city) => landing.nearby.includes(city.slug));
  const coverageProof = cityCoverageProofBySlug[landing.slug] ?? [];
  const testimonial = cityTestimonialBySlug[landing.slug] ?? {
    quote: `Professional mobile detailing delivered in ${landing.city} with premium finish quality and effortless booking.`,
    author: `${landing.city} Client`,
  };

  const cityFaqs = [
    {
      q: `Do you provide mobile detailing throughout ${landing.city}, ${landing.region}?`,
      a: `Yes. We service ${landing.city} and surrounding neighborhoods with fully mobile appointments at your home or workplace.`,
    },
    {
      q: `What services are most requested in ${landing.city}?`,
      a: `${landing.serviceFocus.join(", ")} are the most requested services in ${landing.city}, depending on vehicle condition and owner priorities.`,
    },
    {
      q: `How quickly can I book in ${landing.city}?`,
      a: `Most clients in ${landing.city} receive date options quickly, and we confirm details by text for a smooth booking experience.`,
    },
  ];

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: cityFaqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: faq.a,
      },
    })),
  };

  return (
    <main className="min-h-screen bg-deep-black text-white">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <section className="section-pad relative overflow-hidden">
        <div className="absolute inset-0 mesh-bg opacity-70" />
        <div className="absolute top-[16%] left-[8%] w-[500px] h-[260px] bg-neon-pink/10 rounded-full blur-[130px]" />
        <div className="absolute bottom-[14%] right-[8%] w-[500px] h-[260px] bg-neon-blue/10 rounded-full blur-[130px]" />

        <div className="relative z-10 w-full px-5 md:px-8">
          <div className="mx-auto max-w-5xl">
            <p className="eyebrow text-neon-blue mb-4">City Landing Page</p>
            <div className="section-line mb-6" />
            <h1 className="text-5xl md:text-7xl font-black tracking-tight mb-6">
              Premium Mobile Detailing in {landing.city}, {landing.region}
            </h1>
            <p className="text-white/60 text-lg md:text-xl max-w-3xl leading-relaxed">
              {landing.description}
            </p>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Popular Services</p>
                <p className="text-white font-semibold">{landing.serviceFocus.join(", ")}</p>
              </div>
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Service Model</p>
                <p className="text-white font-semibold">Fully mobile at your home or office</p>
              </div>
              <div className="glass rounded-2xl border border-white/10 p-5">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Booking Window</p>
                <p className="text-white font-semibold">Fast scheduling and SMS confirmation</p>
              </div>
            </div>

            <div className="mt-8 glass rounded-2xl border border-white/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-neon-blue/80 mb-2">Local Service Context</p>
              <p className="text-white/75 leading-relaxed">{landing.localAngle}</p>
            </div>

            <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-3">
              {landing.serviceFocus.map((service) => (
                <div key={service} className="glass rounded-xl border border-white/10 px-4 py-3">
                  <p className="text-white/80 text-sm font-semibold">{service}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 glass rounded-2xl border border-white/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">Service Area Proof in {landing.city}</p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                {coverageProof.map((proof) => (
                  <div key={proof} className="rounded-xl border border-white/10 bg-white/[0.02] px-4 py-3">
                    <p className="text-white/70 text-sm">{proof}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="mt-8 glass rounded-2xl border border-white/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-neon-pink/80 mb-3">Local Client Voice</p>
              <blockquote className="text-white text-lg md:text-xl leading-relaxed font-medium">&ldquo;{testimonial.quote}&rdquo;</blockquote>
              <p className="text-white/45 text-sm mt-3">{testimonial.author}</p>
            </div>

            <div className="mt-10 glass rounded-2xl border border-white/10 p-5 md:p-6">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-4">Frequently Asked in {landing.city}</p>
              <div className="space-y-3">
                {cityFaqs.map((faq) => (
                  <details key={faq.q} className="group border border-white/10 rounded-xl px-4 py-3 open:bg-white/[0.02]">
                    <summary className="cursor-pointer list-none text-white font-semibold flex items-center justify-between gap-3">
                      <span>{faq.q}</span>
                      <span className="text-neon-blue transition-transform group-open:rotate-45">+</span>
                    </summary>
                    <p className="text-white/65 text-sm mt-3 leading-relaxed">{faq.a}</p>
                  </details>
                ))}
              </div>
            </div>

            <div className="mt-10 flex flex-wrap gap-3">
              <a
                href="/assessment"
                className="px-6 py-3.5 rounded-xl font-bold text-white bg-gradient-to-r from-neon-pink to-neon-blue shadow-neon-pink-sm"
              >
                Request Assessment in {landing.city}
              </a>
              <a
                href="/#services"
                className="px-6 py-3.5 rounded-xl font-bold text-white/80 glass border border-white/15 hover:border-neon-blue/40 transition-colors"
              >
                View Services
              </a>
            </div>

            <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
              <a href="/ceramic-coating" className="glass rounded-2xl border border-white/10 p-5 hover:border-neon-blue/40 transition-colors">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Related Service</p>
                <p className="text-white font-semibold">Explore Ceramic Coating</p>
              </a>
              <a href="/fleet-detailing" className="glass rounded-2xl border border-white/10 p-5 hover:border-neon-green/40 transition-colors">
                <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-2">Commercial Option</p>
                <p className="text-white font-semibold">Explore Fleet Detailing</p>
              </a>
            </div>

            <div className="mt-8">
              <p className="text-xs uppercase tracking-[0.18em] text-white/45 mb-3">Nearby Cities We Serve</p>
              <div className="flex flex-wrap gap-2.5">
                {nearbyCities.map((city) => (
                  <a
                    key={city.slug}
                    href={`/mobile-detailing/${city.slug}`}
                    className="px-4 py-2 rounded-full glass border border-white/10 text-sm text-white/80 hover:border-neon-blue/40 transition-colors"
                  >
                    {city.city}, {city.region}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
