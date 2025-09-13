import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const AlumniHighlights = () => {
  const alumni = [
    {
      name: "Dr. Dharmendra Sarmah",
      year: "Class of 1978",
      achievement: "Retired HoD, Department of Chemistry, Darrang College, Tezpur",
      description: "Led the Chemistry Department at Darrang College, Tezpur, overseeing academic programs, mentoring faculty and students, and contributing to the department’s growth until retirement.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717869360.jpg"
    },
    {
      name: "Namita Bora",
      year: "Class of 2002",
      achievement: "ACS",
      description: "Contributing to public administration, policy implementation, and governance for the development of the state.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717867664.jpg"
    },
    {
      name: "Mr. Apurba Saikia",
      year: "Class of 1978",
      achievement: "Engineer and Architect of Darrang College Alumni Gallery",
      description: "Designed and developed the Darrang College Alumni Gallery as the Engineer and Architect, overseeing planning, implementation, and ensuring a functional and engaging space for alumni interactions.",
      image: "https://darrangcollege.ac.in/upload/alumni_member/1717867954.jpg"
    }
  ];

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-college-primary mb-6">
            Distinguished Alumni
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Celebrating the remarkable achievements of our graduates who continue to make 
            their mark in diverse fields around the world.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {alumni.map((person, index) => (
            <Card 
              key={index} 
              className="shadow-card hover:shadow-elegant transition-all duration-500 transform hover:-translate-y-2 border-0 overflow-hidden"
            >
              <div className="aspect-square overflow-hidden">
                <img 
                  src={person.image} 
                  alt={person.name}
                  className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
                />
              </div>
              <CardContent className="p-6">
                <div className="text-center">
                  <h3 className="font-serif text-2xl font-semibold text-college-primary mb-2">
                    {person.name}
                  </h3>
                  <p className="text-college-gold font-medium mb-2">{person.year}</p>
                  <h4 className="text-lg font-semibold text-college-navy mb-3">
                    {person.achievement}
                  </h4>
                  <p className="text-muted-foreground text-sm leading-relaxed">
                    {person.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
        
        <div className="text-center mt-16">
          <Button size="lg" className="text-lg px-8 py-4">
            View All Alumni Stories
          </Button>
        </div>
      </div>
    </section>
  );
};

export default AlumniHighlights;