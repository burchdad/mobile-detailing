import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import TrustStrip from "@/components/TrustStrip";
import BeforeAfter from "@/components/BeforeAfter";
import Services from "@/components/Services";
import VisualImpact from "@/components/VisualImpact";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import Membership from "@/components/Membership";
import ServiceArea from "@/components/ServiceArea";
import CityCoverage from "@/components/CityCoverage";
import Booking from "@/components/Booking";
import Faq from "@/components/Faq";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoDetailing",
  name: "A&S Mobile Detail",
  description:
    "Premium mobile auto detailing in Tyler TX and East Texas. Ceramic coating, paint correction, interior restoration and fleet detailing.",
  areaServed: ["Tyler TX", "Whitehouse TX", "Lindale TX", "Longview TX"],
  telephone: "+1-903-555-0000",
  url: "https://mobile-detailing-sigma.vercel.app",
  serviceType: [
    "Exterior Detail",
    "Interior Deep Clean",
    "Full Detail",
    "Paint Correction",
    "Ceramic Coating",
    "Fleet Detailing",
    "Maintenance Plans",
  ],
};

const serviceSchema = {
  "@context": "https://schema.org",
  "@type": "ItemList",
  itemListElement: [
    { "@type": "Service", name: "Exterior Detail", url: "https://mobile-detailing-sigma.vercel.app/#services" },
    { "@type": "Service", name: "Interior Deep Clean", url: "https://mobile-detailing-sigma.vercel.app/#services" },
    { "@type": "Service", name: "Paint Correction", url: "https://mobile-detailing-sigma.vercel.app/#services" },
    { "@type": "Service", name: "Ceramic Coating", url: "https://mobile-detailing-sigma.vercel.app/ceramic-coating" },
    { "@type": "Service", name: "Fleet Detailing", url: "https://mobile-detailing-sigma.vercel.app/fleet-detailing" },
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
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(255,0,127,0.14),transparent_35%),radial-gradient(circle_at_80%_20%,rgba(0,207,255,0.14),transparent_32%),radial-gradient(circle_at_50%_80%,rgba(82,26,119,0.25),transparent_45%)]" />
        <div className="absolute inset-0 opacity-30" style={{ backgroundImage: "linear-gradient(rgba(255,255,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.04) 1px, transparent 1px)", backgroundSize: "80px 80px" }} />
      </div>

      <Navbar />
      <Hero />
      <TrustStrip />
      <BeforeAfter />
      <Services />
      <VisualImpact />
      <Process />
      <Testimonials />
      <Membership />
      <ServiceArea />
      <CityCoverage />
      <Booking />
      <Faq />
      <Footer />
      <MobileCtaBar />
    </main>
  );
}
