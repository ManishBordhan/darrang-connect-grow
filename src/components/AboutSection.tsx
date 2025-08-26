import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gradient-subtle">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-college-primary mb-6">
            A Legacy of Excellence
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            Since its establishment, Darrang College has been a beacon of higher education, 
            nurturing minds and shaping futures for generations of students.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-college-primary mb-4">Academic Excellence</h3>
              <p className="text-muted-foreground">Fostering intellectual growth and critical thinking across diverse disciplines.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-college-primary mb-4">Strong Community</h3>
              <p className="text-muted-foreground">Building lasting connections and lifelong friendships among our diverse student body.</p>
            </CardContent>
          </Card>
          
          <Card className="shadow-card hover:shadow-elegant transition-all duration-300 border-0">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-gradient-accent rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-college-primary mb-4">Innovation & Growth</h3>
              <p className="text-muted-foreground">Embracing change and driving progress in education and research.</p>
            </CardContent>
          </Card>
        </div>
        
        <div className="text-center">
          <div className="inline-block p-8 bg-white rounded-lg shadow-card">
            <h3 className="font-serif text-3xl font-bold text-college-primary mb-4">Our Mission</h3>
            <p className="text-lg text-muted-foreground max-w-2xl">
              To provide quality education that empowers students to become responsible citizens, 
              innovative thinkers, and leaders who contribute meaningfully to society.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;