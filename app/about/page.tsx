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
        title: "The Owner Behind The Standard",
        intro: "A&S is personal because the work is personal. Steve built the company for owners who want accountability, patience, and a vehicle cared for with intent.",
      }}
      blocks={[
        {
          eyebrow: "Founder Story",
          title: "Every vehicle leaves with Steve's approval.",
          body: "The brand is not built around speed. It is built around the final walkthrough, the surfaces most people miss, and the pride that comes from returning a vehicle correctly.",
        },
        {
          eyebrow: "Why A&S Exists",
          title: "East Texas did not need another car wash.",
          body: "It needed a preservation partner for owners who notice shortcuts, value communication, and want the work handled by someone accountable for the result.",
        },
        {
          eyebrow: "Community",
          title: "The business grows through trust, not volume.",
          body: "Referrals, repeat clients, and long-term preservation programs matter because they prove something stronger than advertising: owners come back.",
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
