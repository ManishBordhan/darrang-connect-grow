import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  const impactStats = [
    { number: "500+", label: "Students Supported" },
    { number: "₹2.5L", label: "Scholarships Given" },
    { number: "50+", label: "Infrastructure Projects" },
    { number: "25+", label: "Years of Impact" }
  ];

  const donationOptions = [
    {
      amount: "₹1,000",
      title: "Student Support",
      description: "Help provide study materials and resources to deserving students",
      impact: "Supports 1 student for a month"
    },
    {
      amount: "₹5,000",
      title: "Infrastructure Fund",
      description: "Contribute to campus development and facility improvements",
      impact: "Funds classroom equipment"
    },
    {
      amount: "₹10,000",
      title: "Scholarship Fund",
      description: "Create opportunities for underprivileged but talented students",
      impact: "Provides semester fee support"
    }
  ];

  return (
    <section className="py-20 bg-college-navy text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6">
            Support Our Mission
          </h2>
          <p className="text-xl text-white/80 max-w-3xl mx-auto leading-relaxed">
            Your generous contributions help us continue our tradition of excellence 
            and provide opportunities for the next generation of students.
          </p>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-college-gold mb-2">
                {stat.number}
              </div>
              <div className="text-white/80 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Donation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {donationOptions.map((option, index) => (
            <Card key={index} className="bg-white/10 backdrop-blur-sm border-white/20 hover:bg-white/15 transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-college-gold mb-4">
                  {option.amount}
                </div>
                <h3 className="font-serif text-xl font-semibold text-white mb-3">
                  {option.title}
                </h3>
                <p className="text-white/80 text-sm mb-4 leading-relaxed">
                  {option.description}
                </p>
                <div className="text-college-gold text-xs font-medium mb-6">
                  {option.impact}
                </div>
                <Button variant="outline-hero" size="sm" className="w-full">
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Custom Amount */}
        <div className="text-center">
          <Card className="bg-white/10 backdrop-blur-sm border-white/20 max-w-md mx-auto">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-semibold text-white mb-4">
                Custom Donation
              </h3>
              <p className="text-white/80 text-sm mb-6">
                Choose your own amount to support the cause closest to your heart
              </p>
              <Button variant="hero" size="lg" className="w-full text-lg py-4">
                Make Custom Donation
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-white/60 text-sm">
              All donations are secure and tax-deductible. You will receive a receipt for your contribution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;