import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRightFromLine, Sparkles, Heart, Users, Award, Gem } from "lucide-react";
import { Link } from "react-router-dom";

const DonationSection = () => {
  const donationPlans = [
    {
      title: "Donor Member",
      amount: "₹25,000+",
      description: "Make a lasting contribution as a donor member.",
      tiers: [
        { label: "₹25,000+", benefit: "Donor member" },
        { label: "₹50,000+", benefit: "Silver Donor member" },
        { label: "₹1,00,000+", benefit: "Gold Donor member" },
      ],
      icon: Gem,
      buttonText: "Become a Donor",
    },
    {
      title: "Life Member",
      amount: "₹5,000+",
      description: "Become a lifetime member with recognition & impact.",
      tiers: [
        { label: "₹5,000+", benefit: "Life Member" },
        { label: "₹10,000+", benefit: "Silver Life Member" },
        { label: "₹20,000+", benefit: "Gold Life Member" },
      ],
      icon: Award,
      buttonText: "Become a Life Member",
    },
    {
      title: "General Member",
      amount: "₹500",
      description: "Join as a general member and support our mission every year.",
      tiers: [
        { label: "₹500", benefit: "Annual Membership" },
        { label: "₹100/year", benefit: "Renewal Fee" },
      ],
      icon: Users,
      buttonText: "Join Now",
    },
    {
      title: "Custom Donation",
      amount: "You Choose",
      description:
        "Give a custom amount that feels right for you. Every contribution helps build a stronger legacy.",
      tiers: [],
      icon: Heart,
      isCustom: true,
      buttonText: "Donate an Amount",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-br from-indigo-50 to-purple-100 dark:from-slate-900 dark:to-slate-800 text-gray-900 dark:text-gray-200">
      <div className="container mx-auto px-4 grid grid-cols-1 lg:grid-cols-3 gap-10">
        {/* Left Side: Info Section */}
        <div className="bg-violet-600 text-white p-8 rounded-2xl shadow-lg max-w-sm w-full font-sans lg:sticky lg:top-10 self-start">
          <div className="bg-violet-700 inline-flex items-center gap-2 px-3 py-1 rounded-full text-sm font-semibold">
            <Sparkles className="w-4 h-4" />
            <span>Alumni Fund</span>
          </div>
          <h2 className="text-4xl font-bold mt-4">
            Support to Shine Our College Better
          </h2>
          <p className="text-violet-200 mt-2 text-sm leading-6">
            Your contribution directly aids in modernizing campus facilities,
            funding student scholarships, and providing essential resources for
            academic excellence.
          </p>
          <button
            className="bg-violet-500 hover:bg-violet-400 transition-colors rounded-full w-12 h-12 flex items-center justify-center mt-6"
            aria-label="Contribute Now"
          >
            <ArrowRightFromLine className="w-5 h-5" />
          </button>
          <div className="relative bg-lime-300 text-slate-800 p-5 rounded-lg mt-8 testimonial-bubble">
            <p className="text-sm font-medium">
              "Together, our contributions create opportunities for the next
              generation and ensure Darrang College remains a beacon of
              excellence for years to come."
            </p>
            <div className="flex items-center gap-3 mt-4">
              <img
                src="https://placehold.co/40x40/E2E8F0/475569"
                alt="Darrang College Alumni Association"
                className="w-10 h-10 rounded-full border-2 border-slate-400"
              />
              <div>
                <p className="font-bold text-sm">
                  Darrang College Alumni Association
                </p>
                <p className="text-xs text-slate-600">Executive Committee</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Donation Plans */}
        <div className="lg:col-span-2">
          <div className="text-center lg:text-left mb-10">
            <h1 className="text-2xl md:text-3xl font-bold dark:text-white">
              Choose Your Way to Give
            </h1>
            <p className="mt-2 text-slate-500 dark:text-slate-400">
              For every donation, you will receive a certificate to honor your
              contribution.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {donationPlans.map((plan, index) => (
              <Card
                key={index}
                className={`relative flex flex-col z-10 rounded-2xl transition-all duration-300 text-gray-900
                  bg-gradient-to-br from-white to-purple-50 dark:from-slate-800 dark:to-slate-900
                  shadow-lg hover:shadow-xl hover:-translate-y-1
                  ${ plan.isCustom
                    ? 'border-2 border-dashed border-purple-400 dark:border-purple-600'
                    : 'border-2 border-purple-300 hover:border-purple-400 dark:border-purple-800 dark:hover:border-purple-600'
                  }`}
              >
                <CardContent className="p-6 text-center flex flex-col flex-grow">
                  <div className="flex items-center justify-center mb-6">
                    <div className="flex items-center gap-2 px-3 py-2 rounded-full bg-purple-100 dark:bg-purple-900/50 text-purple-800 dark:text-purple-300 shadow-md">
                      <plan.icon className="w-5 h-5" />
                      <h3 className="text-lg font-semibold">{plan.title}</h3>
                    </div>
                  </div>
                  <div className="text-4xl font-bold text-purple-700 dark:text-purple-400 mb-4">
                    {plan.amount}
                  </div>
                  <p className="text-slate-600 dark:text-slate-300 text-base mb-6">
                    {plan.description}
                  </p>

                  {plan.tiers.length > 0 && (
                    <ul className="space-y-3 text-sm text-gray-700 dark:text-gray-300">
                      {plan.tiers.map((tier, i) => (
                        <li
                          key={i}
                          className="flex flex-col items-center border border-gray-200 dark:border-gray-700 rounded-lg py-2 px-4 bg-white/70 dark:bg-slate-800/50 backdrop-blur-sm"
                        >
                          <span className="font-semibold text-purple-600 dark:text-purple-400">
                            {tier.label}
                          </span>
                          <span className="text-gray-600 dark:text-gray-400">{tier.benefit}</span>
                        </li>
                      ))}
                    </ul>
                  )}

                  <div className="flex-grow"></div>

                  <Link to={"/registration"} className="mt-8">
                    <Button
                      size="lg"
                      className="w-full text-base py-3 transition-transform duration-300 hover:scale-105 shadow-md bg-purple-600 text-white hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800"
                    >
                      {plan.buttonText}
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;

