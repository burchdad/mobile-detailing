import type { Metadata } from "next";
import { BrandHero, FinalLuxuryCta } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Reviews | A&S Detailing",
  description: "Client stories and social proof for A&S Detailing, East Texas vehicle preservation and concierge automotive care.",
  alternates: { canonical: "/reviews" },
};

const reviews = [
  {
    vehicle: "Premium SUV",
    location: "Whitehouse, TX",
    quote: "The paint correction on my white SUV is unreal. Deep scratches are gone, the gloss is insane.",
  },
  {
    vehicle: "Work Truck",
    location: "Tyler, TX",
    quote: "They came to my office and I picked up a vehicle that looked straight off the showroom floor.",
  },
  {
    vehicle: "Family Vehicle",
    location: "Flint, TX",
    quote: "Monthly preservation has been a game changer. The vehicle is consistently clean, protected, and handled by someone who cares.",
  },
];

export default function ReviewsPage() {
  return (
    <main className="min-h-screen bg-deep-black text-white">
      <BrandHero
        eyebrow="Client Stories"
        title="Trust Built One Vehicle At A Time"
        intro="Luxury service is personal. These stories show why East Texas owners trust Steve and A&S with vehicles that matter to them."
      />
      <section className="px-5 py-20 md:px-8 md:py-28">
        <div className="mx-auto max-w-7xl">
          <div className="mb-16 grid gap-8 border-y border-white/10 py-10 md:grid-cols-3">
            <div>
              <p className="text-5xl font-black text-neon-pink">5.0</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-white/42">Local rating</p>
            </div>
            <div>
              <p className="text-5xl font-black text-neon-pink">500+</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-white/42">Vehicles serviced</p>
            </div>
            <div>
              <p className="text-5xl font-black text-neon-pink">East TX</p>
              <p className="mt-2 text-xs font-black uppercase tracking-[0.18em] text-white/42">Mobile concierge care</p>
            </div>
          </div>
          <div className="divide-y divide-white/10">
            {reviews.map((review) => (
              <article key={review.vehicle} className="grid gap-8 py-12 lg:grid-cols-[0.28fr_0.72fr]">
                <div>
                  <p className="text-sm font-black uppercase tracking-[0.2em] text-neon-blue">{review.vehicle}</p>
                  <p className="mt-3 text-white/42">{review.location}</p>
                </div>
                <p className="text-3xl font-black leading-tight tracking-tight text-white md:text-6xl">&ldquo;{review.quote}&rdquo;</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <FinalLuxuryCta />
    </main>
  );
}
