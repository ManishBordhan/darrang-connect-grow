import { Card, CardContent } from "@/components/ui/card";

const AboutSection = () => {
  return (
    <section className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-gray-900 dark:text-gray-100 mb-6">
            About Darrang College
          </h2>
          <p className="text-xl text-gray-700 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Since its establishment in 1945, Darrang College has been a beacon of higher education, 
            nurturing minds and shaping futures for generations of students.
          </p>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.746 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Academic Excellence</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Fostering intellectual growth and critical thinking across diverse disciplines.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Strong Community</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Building lasting connections and lifelong friendships among our diverse student body.
              </p>
            </CardContent>
          </Card>
          
          <Card className="shadow-lg hover:shadow-2xl transition-all duration-300 border-0 bg-white dark:bg-gray-800">
            <CardContent className="p-8 text-center">
              <div className="w-16 h-16 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="font-serif text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">Innovation & Growth</h3>
              <p className="text-gray-700 dark:text-gray-300">
                Embracing change and driving progress in education and research.
              </p>
            </CardContent>
          </Card>
        </div>
        
        {/* Mission Section */}
        <div className="text-center">
          <div className="inline-block p-8 bg-white dark:bg-gray-800 rounded-lg shadow-lg transition-colors duration-300">
            <h3 className="font-serif text-3xl font-bold text-gray-900 dark:text-gray-100 mb-4">Our Mission</h3>
            <p className="text-lg text-gray-700 dark:text-gray-300 max-w-2xl mx-auto">
              To transform lives, and serve the society by promoting participation in higher education. 
              To strive for excellence in “Teaching and Learning” in a student-centered environment, and research and fellowship for community development.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
