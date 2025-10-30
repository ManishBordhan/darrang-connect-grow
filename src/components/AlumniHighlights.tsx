import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { GraduationCap, ChevronDown, ChevronUp, Users, Search, Award } from "lucide-react";

// The main section component
const AlumniHighlights = () => {
  // Assume a larger list of alumni
  const alumni = [
    {
      name: "Mr. Apurba Saikia",
      year: "1978",
      achievement: "Architect of Alumni Gallery",
      description: "Designed and developed the Darrang College Alumni Gallery, creating an engaging space for alumni.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717867954.jpg",
      memberType: "Gold Donor",
    },
    {
      name: "Dr. Dharmendra Sarmah",
      year: "1978",
      achievement: "Retired HoD, Dept. of Chemistry",
      description: "Led the Chemistry Department, mentoring faculty and students and contributing to the department’s growth.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717869360.jpg",
      memberType: "Donor Member",
    },
    {
      name: "Namita Bora",
      year: "2002",
      achievement: "Assam Civil Service (ACS)",
      description: "Contributing to public administration, policy implementation, and governance for state development.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717867664.jpg",
      memberType: "Silver Donor",
    },
    {
      name: "Alumnus One",
      year: "1995",
      achievement: "Tech Innovator",
      description: "Founder of a leading tech startup, innovating in the field of artificial intelligence.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumnus",
      memberType: "Gold Donor",
    },
    {
      name: "Alumnus Two",
      year: "2010",
      achievement: "Renowned Artist",
      description: "An acclaimed artist whose work has been featured in international galleries and exhibitions.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumna",
      memberType: "Silver Donor",
    },
    {
      name: "Alumnus Three",
      year: "1988",
      achievement: "Social Entrepreneur",
      description: "Dedicated to creating sustainable solutions for community development and social change.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumnus",
      memberType: "Donor Member",
    },
    {
      name: "Alumnus Four",
      year: "2005",
      achievement: "Medical Researcher",
      description: "Pioneering new research in medical science to combat global health challenges.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumna",
      memberType: "Gold Donor",
    },
    {
      name: "Alumnus Five",
      year: "1999",
      achievement: "Bestselling Author",
      description: "Authored several award-winning novels that have been translated into multiple languages.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumnus",
      memberType: "Silver Donor",
    },
     {
      name: "Alumnus Six",
      year: "2015",
      achievement: "Environmental Activist",
      description: "Leads a non-profit organization focused on reforestation and combating climate change.",
      image: "https://placehold.co/400x400/E2E8F0/475569?text=Alumna",
      memberType: "Donor Member",
    },
  ];

  // ✨ NEW: State for handling the search input
  const [searchTerm, setSearchTerm] = useState("");

  // ✨ NEW: Filter alumni based on the search term
  const filteredAlumni = alumni.filter(person =>
    person.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.achievement.toLowerCase().includes(searchTerm.toLowerCase()) ||
    person.year.includes(searchTerm)
  );

  return (
    <section className="relative py-20 bg-slate-50 dark:bg-slate-900 transition-colors duration-300 overflow-hidden">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#d2d6db_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* LEFT HIGHLIGHT PANEL */}
          <div className="lg:col-span-1 bg-gradient-to-b from-indigo-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl flex flex-col">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Users className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4">Distinguished Alumni</h2>
            <p className="text-indigo-200 leading-relaxed mb-auto">
              Celebrating the achievements of our graduates who make their mark in diverse fields around the world.
            </p>
            <div className="space-y-6 mt-8">
                <div className="bg-lime-300 text-slate-900 p-4 rounded-lg flex items-center space-x-3">
                  <Award className="w-8 h-8 text-slate-700 flex-shrink-0" />
                  <div>
                    <p className="text-3xl font-bold text-slate-800">50,000+</p>
                    <p className="font-semibold text-slate-700">Strong Alumni Network</p>
                  </div>
                </div>
            </div>
          </div>

          {/* RIGHT CONTENT AREA */}
          <div className="lg:col-span-3 flex flex-col">
            {/* ✨ NEW: Search Bar */}
            <div className="relative mb-8">
                <input
                    type="text"
                    placeholder="Search by name, achievement, or year..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full py-3 pl-12 pr-4 text-slate-700 bg-white/70 dark:bg-slate-800/70 border border-slate-300 dark:border-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 backdrop-blur-sm"
                />
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
            </div>

            {/* ✨ NEW: Scrollable container for alumni cards */}
            <div className="flex-grow h-[600px] overflow-y-auto pr-2 -mr-2">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* ✨ UPDATED: Maps over the filtered array */}
                {filteredAlumni.length > 0 ? (
                    filteredAlumni.map((person, index) => (
                    <AlumniCard key={index} person={person} />
                    ))
                ) : (
                    // ✨ NEW: No results message
                    <div className="md:col-span-2 lg:col-span-3 text-center py-12">
                        <p className="text-slate-500 dark:text-slate-400">No alumni found matching your search.</p>
                    </div>
                )}
                </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

// The AlumniCard component remains unchanged
const AlumniCard = ({ person }) => {
  const [showMore, setShowMore] = useState(false);
  const isGoldMember = person.memberType.includes("Gold");

  const getBadgeColor = (memberType) => {
    if (memberType.includes("Gold")) return "bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-900/50 dark:text-amber-300 dark:border-amber-700/50";
    if (memberType.includes("Silver")) return "bg-slate-100 text-slate-800 border-slate-200 dark:bg-slate-700 dark:text-slate-300 dark:border-slate-600";
    return "bg-indigo-100 text-indigo-800 border-indigo-200 dark:bg-indigo-900/50 dark:text-indigo-300 dark:border-indigo-700/50";
  };

  return (
    <Card className={`relative bg-white/60 dark:bg-slate-800/60 backdrop-blur-lg border rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 flex flex-col group ${isGoldMember ? 'border-amber-400/50' : 'border-slate-200 dark:border-slate-700'}`}>
      <Badge className={`absolute top-3 right-3 z-10 ${getBadgeColor(person.memberType)}`}>
        {person.memberType}
      </Badge>
      <CardContent className="p-6 flex flex-col flex-grow text-center">
        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white dark:border-slate-700 shadow-md mb-4 mx-auto transition-all duration-300 group-hover:border-indigo-300">
          <img
            src={person.image}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
            alt={person.name}
          />
        </div>
        <h3 className="text-xl font-bold text-slate-900 dark:text-white hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors cursor-pointer">{person.name}</h3>
        <p className="text-sm text-indigo-600 dark:text-indigo-400 font-medium">{person.achievement}</p>
        <div className="flex items-center justify-center text-xs text-slate-500 dark:text-slate-400 mt-2">
          <GraduationCap className="w-3 h-3 mr-1.5" />
          <span>{person.year}</span>
        </div>
        <div className="border-t border-slate-200 dark:border-slate-700 my-4"></div>
        <div className={`grid transition-all duration-500 ease-in-out ${showMore ? 'grid-rows-[1fr]' : 'grid-rows-[0fr]'}`}>
          <div className="overflow-hidden">
            <p className="text-sm text-slate-600 dark:text-slate-300 mb-4">
              {person.description}
            </p>
          </div>
        </div>
        <div className="mt-auto">
          <button
            onClick={() => setShowMore(!showMore)}
            className="text-indigo-600 hover:text-indigo-800 dark:text-indigo-400 dark:hover:text-indigo-300 text-sm font-medium flex items-center justify-center mx-auto"
          >
            <span>{showMore ? "Show Less" : "Read More"}</span>
            {showMore ? <ChevronUp className="w-4 h-4 ml-1" /> : <ChevronDown className="w-4 h-4 ml-1" />}
          </button>
        </div>
      </CardContent>
    </Card>
  );
};

export default AlumniHighlights;