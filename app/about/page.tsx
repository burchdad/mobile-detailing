import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "About Steve | A&S Detailing",
  description: "Meet the founder behind A&S Detailing and the quality-over-quantity philosophy behind the East Texas vehicle preservation brand.",
  alternates: { canonical: "/about" },
};

export default function AboutPage() {
  return (
    <BrandPage
      hero={{
        eyebrow: "Meet Steve",
        title: "Quality Over Volume",
        intro: "A&S exists for owners who want their vehicle treated with patience, pride, and standards that go beyond a quick detail.",
      }}
      blocks={[
        {
          eyebrow: "Founder Story",
          title: "Built by someone who cares about the finish as much as the owner does.",
          body: "Steve built A&S around a simple belief: a vehicle is personal. It carries work, family, weekends, memories, and investment. The service should honor that.",
        },
        {
          eyebrow: "Why A&S Exists",
          title: "The market had enough fast details. It needed a preservation partner.",
          body: "A&S is not structured around pushing as many vehicles through a day as possible. It is structured around inspection, communication, professional process, and a final result worth remembering.",
        },
        {
          eyebrow: "Community",
          title: "East Texas relationships matter.",
          body: "The brand grows through trust, referrals, and repeat clients who want their vehicles maintained by someone they know will do the work correctly.",
        },
      ]}
      feature={{
        eyebrow: "Standards",
        title: "The A&S operating philosophy",
        body: "Every appointment should feel calm, professional, and intentional from the first message to the final walkthrough.",
        points: ["Inspect before prescribing a service", "Use paint-safe systems and premium products", "Prioritize long-term ownership value"],
      }}
    />
  );
}
