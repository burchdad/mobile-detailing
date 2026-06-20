import type { Metadata } from "next";
import { BrandPage } from "@/components/BrandPlatform";

export const metadata: Metadata = {
  title: "Vehicle Preservation Programs | A&S Detailing",
  description: "Luxury vehicle preservation programs for East Texas owners who want consistent detailing, coating maintenance, and priority care.",
  alternates: { canonical: "/membership" },
};

export default function MembershipPage() {
  return (
    <BrandPage
      hero={{
        eyebrow: "Vehicle Preservation Programs",
        title: "A Vehicle That Stays Ready",
        intro: "Silver, Gold, and Black Label Preservation programs are designed for owners who want priority care, seasonal protection, and consistent presentation.",
      }}
      blocks={[
        {
          eyebrow: "Silver Preservation",
          title: "For daily drivers that deserve consistent care.",
          body: "Monthly maintenance keeps the vehicle from sliding backward, with paint-safe washing, cabin upkeep, and priority seasonal scheduling.",
        },
        {
          eyebrow: "Gold Preservation",
          title: "For premium vehicles that need a higher cadence.",
          body: "Gold supports family, luxury, and performance vehicles with more frequent visits, ceramic-safe maintenance, and preferred add-on access.",
        },
        {
          eyebrow: "Black Label Preservation",
          title: "For high-value finishes and owners who want the details managed.",
          body: "Black Label is a bespoke maintenance experience for collectors, show vehicles, ceramic-coated vehicles, and owners who expect elevated care.",
        },
      ]}
      feature={{
        eyebrow: "Not A Subscription",
        title: "A managed care relationship",
        body: "The program begins with vehicle condition, coating status, storage environment, and driving habits so the cadence actually fits the vehicle.",
        points: ["Priority scheduling", "Ceramic maintenance boosters", "Seasonal protection planning"],
      }}
    />
  );
}
