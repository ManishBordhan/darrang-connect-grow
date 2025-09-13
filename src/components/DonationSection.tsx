import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const DonationSection = () => {
  const impactStats = [
    { number: "500+", label: "Students Supported" },
    { number: "₹15.5L", label: "Scholarships Given" },
    { number: "50+", label: "Infrastructure Projects" },
    { number: "80+", label: "Years of Impact" }
  ];

  const donationOptions = [
    {
      amount: "₹500",
      title: "Joining Fee",
      description: "Help provide study materials and resources to deserving students",
      impact: "Supports 1 student for a month"
    },
    {
      amount: "₹5,000",
      title: "Life Member",
      description: "Contribute to campus development and facility improvements",
      impact: "Funds classroom equipment"
    },
    {
      amount: "₹10,000",
      title: "Donor Member",
      description: "Create opportunities for underprivileged but talented students",
      impact: "Provides semester fee support"
    }
  ];

  return (
    <section className="py-20 bg-beige-100 text-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold mb-6 text-gray-900">
            Support Our Mission
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Your generous contributions help us continue our tradition of excellence 
            and provide opportunities for the next generation of students.
          </p>
        </div>
        
        {/* Impact Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16">
          {impactStats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="text-3xl md:text-4xl font-bold text-yellow-600 mb-2">
                {stat.number}
              </div>
              <div className="text-gray-700 text-sm uppercase tracking-wide">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
        
        {/* Donation Options */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {donationOptions.map((option, index) => (
            <Card key={index} className="bg-white shadow-md border border-gray-200 hover:shadow-xl transition-all duration-300">
              <CardContent className="p-6 text-center">
                <div className="text-3xl font-bold text-yellow-600 mb-4">
                  {option.amount}
                </div>
                <h3 className="font-serif text-xl font-semibold text-gray-900 mb-3">
                  {option.title}
                </h3>
                <p className="text-gray-700 text-sm mb-4 leading-relaxed">
                  {option.description}
                </p>
                <div className="text-yellow-600 text-xs font-medium mb-6">
                  {option.impact}
                </div>
                <Button 
                  variant="hero" 
                  size="sm" 
                  className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-transform duration-300 hover:scale-105"
                >
                  Donate Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
        
        {/* Custom Amount */}
        <div className="text-center">
          <Card className="bg-white shadow-md border border-gray-200 max-w-md mx-auto hover:shadow-xl transition-all duration-300">
            <CardContent className="p-8">
              <h3 className="font-serif text-2xl font-semibold text-gray-900 mb-4">
                Custom Donation
              </h3>
              <p className="text-gray-700 text-sm mb-6">
                Choose your own amount to support the cause closest to your heart
              </p>
              <Button 
                variant="hero" 
                size="lg" 
                className="w-full bg-purple-600 text-white hover:bg-purple-700 transition-transform duration-300 hover:scale-105 text-lg py-4"
              >
                Make Custom Donation
              </Button>
            </CardContent>
          </Card>
          
          <div className="mt-8 text-center">
            <p className="text-gray-500 text-sm">
              All donations are secure and tax-deductible. You will receive a certificate of appreciation for your contribution.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;