import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import VisualImpact from "@/components/VisualImpact";
import OwnerJournal from "@/components/OwnerJournal";
import Testimonials from "@/components/Testimonials";
import Membership from "@/components/Membership";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";
import { FinalLuxuryCta } from "@/components/BrandPlatform";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: "A&S Mobile Detail",
  description:
    "Premium mobile auto detailing in Tyler TX and East Texas. Ceramic coating, paint correction, interior restoration and fleet detailing.",
  areaServed: ["Tyler TX", "Whitehouse TX", "Lindale TX", "Longview TX"],
  telephone: "+1-903-330-8955",
  url: "https://asdetailing.org",
  serviceType: [
    "Concierge Maintenance",
    "Interior Restoration",
    "Paint Enhancement",
    "Ceramic Protection",
    "Fleet Preservation",
    "Vehicle Preservation Programs",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "Service", name: "Concierge Maintenance", url: "https://asdetailing.org/services/mobile-detailing" },
    { "@type": "Service", name: "Interior Restoration", url: "https://asdetailing.org/services/interior-restoration" },
    { "@type": "Service", name: "Paint Enhancement", url: "https://asdetailing.org/services/paint-correction" },
    { "@type": "Service", name: "Ceramic Protection", url: "https://asdetailing.org/services/ceramic-coatings" },
    { "@type": "Service", name: "Fleet Preservation", url: "https://asdetailing.org/services/fleet-care" },
  ],
};

export default function Home() {
  return (
    <main className="relative bg-deep-black min-h-screen overflow-hidden">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <div className="pointer-events-none fixed inset-0 -z-10">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(200,169,106,0.13),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(138,164,173,0.11),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(33,30,24,0.5),transparent_45%)]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <Navbar />
      <Hero />
      <TrustStrip />
      <BeforeAfter />
      <Services />
      <VisualImpact />
      <OwnerJournal />
      <Testimonials />
      <Membership />
      <FinalLuxuryCta title="Your Vehicle Deserves Better." />
      <Footer />
      <MobileCtaBar />
    </main>
  );
}
