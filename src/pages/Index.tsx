import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import AlumniHighlights from "@/components/AlumniHighlights";
import EventsSection from "@/components/EventsSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen">
      <Hero />
      <AboutSection />
      <AlumniHighlights />
      <EventsSection />
      <DonationSection />
      <Footer />
    </div>
  );
};

export default Index;
