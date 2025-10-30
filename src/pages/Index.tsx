// Index.jsx
import Hero from "@/components/Hero";
import AboutSection from "@/components/AboutSection";
import AlumniHighlights from "@/components/AlumniHighlights";
import EventsSection from "@/components/EventsSection";
import DonationSection from "@/components/DonationSection";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen scroll-smooth">
      <section id="hero">
        <Hero />
      </section>

      <section id="events">
        <EventsSection />
      </section>
      <section id="donate">
        <DonationSection />
      </section>
       <section id="about">
        <AboutSection />
      </section>
      <section id="highlights">
        <AlumniHighlights />
      </section>

     



      <Footer />
    </div>
  );
};

export default Index;

