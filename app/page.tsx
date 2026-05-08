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

export default function Home() {
  return (
    <main className="bg-deep-black min-h-screen">
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
    </main>
  );
}
