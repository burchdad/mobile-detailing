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
import Booking from "@/components/Booking";
import Footer from "@/components/Footer";
import MobileCtaBar from "@/components/MobileCtaBar";

export default function Home() {
  return (
    <main className="relative bg-deep-black min-h-screen overflow-hidden">
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
      <Booking />
      <Footer />
      <MobileCtaBar />
    </main>
  );
}
