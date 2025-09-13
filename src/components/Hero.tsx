import heroImage from "@/assets/darrang-college-hero.jpg";
import logo from "@/assets/logo.png";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-gray-900">
      {/* Background Image with Gradient & Blur */}
      <div className="absolute inset-0 z-0">
        <img
          src={heroImage}
          alt="Darrang College Campus"
          className="w-full h-full object-cover brightness-50 blur-sm"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/25 to-black/50"></div>
      </div>

      {/* Animated Floating Shapes */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute w-40 h-40 bg-purple-600/20 rounded-full top-10 left-10 animate-float-slow"></div>
        <div className="absolute w-32 h-32 bg-yellow-400/20 rounded-full top-1/2 right-20 animate-float-slow animation-delay-2000"></div>
        <div className="absolute w-24 h-24 bg-purple-500/10 rounded-full bottom-20 left-1/3 animate-float-slow animation-delay-1000"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-gray-100 px-6 max-w-5xl mx-auto">
        {/* College Logo */}
        <img
          src={logo}
          alt="Darrang College Logo"
          className="mx-auto mb-6 w-32 md:w-40 lg:w-48 drop-shadow-lg"
        />

        <h1 className="font-serif text-5xl md:text-7xl font-extrabold drop-shadow-lg mb-4">
          Darrang College
        </h1>
        <h2 className="font-serif text-2xl md:text-3xl text-yellow-400 mb-6">
          Alumni Association
        </h2>
        <p className="text-lg md:text-xl lg:text-2xl mb-10 max-w-3xl mx-auto leading-relaxed text-gray-200">
          Bridging generations of scholars. Building futures together. 
          Join us in celebrating achievements, networking, and giving back to the community.
        </p>

        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/Registration">
            <Button
              size="lg"
              className="bg-purple-600 text-white font-semibold rounded-full text-xl px-12 py-5 
              shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-purple-700 transition-all duration-300"
            >
              Register Yourself
            </Button>
          </Link>
          <Button
            size="lg"
            className="bg-purple-600 text-white font-semibold rounded-full text-xl px-12 py-5 
            shadow-lg hover:shadow-xl transform hover:-translate-y-1 hover:bg-purple-700 transition-all duration-300"
          >
            Make a Donation
          </Button>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 text-gray-100 animate-bounce">
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 14l-7 7m0 0l-7-7m7 7V3"
          />
        </svg>
      </div>
    </section>
  );
};

export default Hero;