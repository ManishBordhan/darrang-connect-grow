import { Card, CardContent } from "@/components/ui/card";
import { Landmark, BookOpen, Users, Lightbulb, Calendar, GraduationCap, Goal, CheckCircle2 } from "lucide-react";

const AboutSection = () => {
  return (
    <section className="py-20 bg-slate-200 dark:bg-slate-900 transition-colors duration-300">
      <div className="absolute inset-0 h-full w-full bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] dark:bg-[radial-gradient(#334155_1px,transparent_1px)] [background-size:16px_16px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)]"></div>
      
      <div className="container mx-auto px-4 relative">
        {/* Added lg:items-center for vertical alignment */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 lg:items-center">

        

          {/* Left CONTENT AREA */}
          <div className="lg:col-span-2 space-y-8">
            {/* Row 1: Unified Feature Card */}
            <Card className="shadow-lg border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  {/* Feature Item 1 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <BookOpen className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Academic Excellence</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Fostering intellectual growth and critical thinking.</p>
                    </div>
                  </div>
                  {/* Feature Item 2 */}
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                      <Users className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Strong Community</h4>
                      <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Building lasting connections and lifelong friendships.</p>
                    </div>
                  </div>
                  {/* Feature Item 3 */}
                  <div className="md:col-span-2">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-12 h-12 bg-slate-100 dark:bg-slate-700 rounded-lg flex items-center justify-center">
                        <Lightbulb className="w-6 h-6 text-purple-600 dark:text-purple-400" />
                      </div>
                      <div>
                        <h4 className="text-lg font-semibold text-gray-900 dark:text-gray-100">Innovation & Growth</h4>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">Embracing modern teaching methods and driving progress.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            
            {/* Row 2, containing two columns */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Updated "Our Mission" Card */}
              <Card className="shadow-lg border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg h-full">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-4">
                    <Goal className="w-7 h-7 text-purple-600 dark:text-purple-400" />
                    <h3 className="font-serif text-2xl font-bold text-gray-900 dark:text-gray-100">
                      Our Mission
                    </h3>
                  </div>
                  <ul className="space-y-3 text-gray-700 dark:text-gray-300">
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>To transform lives and serve society through higher education.</span>
                    </li>
                    <li className="flex items-start">
                      <CheckCircle2 className="w-5 h-5 text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                      <span>To strive for excellence in teaching and learning in a student-centered environment.</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              {/* From the Principal's Desk */}
              <Card className="shadow-lg border-slate-200/50 dark:border-slate-700/50 bg-white/50 dark:bg-slate-800/50 backdrop-blur-lg h-full">
                <CardContent className="p-8">
                    <div className="flex items-center space-x-4">
                      <img 
                        src="https://placehold.co/80x80/E2E8F0/475569"
                        alt="Principal of Darrang College"
                        className="rounded-full w-20 h-20 border-4 border-white dark:border-slate-700 shadow-md"
                      />
                      <div>
                        <h3 className="font-serif text-xl font-bold text-gray-900 dark:text-gray-100">
                          From the Principal's Desk
                        </h3>
                         <p className="font-semibold text-gray-800 dark:text-gray-200 mt-1">Dr. Anjali Das</p>
                      </div>
                    </div>
                    <blockquote className="mt-4 border-l-4 border-purple-500 pl-4 italic text-sm text-gray-700 dark:text-gray-300">
                      <p>"We are dedicated to fostering an environment where curiosity thrives and potential is realized."</p>
                    </blockquote>
                </CardContent>
              </Card>
            </div>

          </div>
            {/* Right HIGHLIGHT PANEL */}
          <div className="lg:col-span-1 bg-gradient-to-b from-violet-600 to-indigo-700 text-white p-8 rounded-2xl shadow-2xl flex flex-col">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Landmark className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-4xl font-bold mb-4">
              About Darrang College
            </h2>
            <p className="text-violet-200 leading-relaxed mb-8">
              Since 1945, Darrang College has been a beacon of higher education, nurturing minds and shaping futures for generations.
            </p>
            
            <div className="mt-auto space-y-5 border-t border-white/20 pt-6">
              {/* Stat Item 1 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Calendar size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">1945</p>
                  <p className="text-sm text-violet-200">Founded</p>
                </div>
              </div>
              {/* Stat Item 2 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <GraduationCap size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">5,000+</p>
                  <p className="text-sm text-violet-200">Students</p>
                </div>
              </div>
              {/* Stat Item 3 */}
              <div className="flex items-center space-x-3">
                <div className="flex-shrink-0 w-10 h-10 bg-white/10 rounded-full flex items-center justify-center backdrop-blur-sm">
                  <Users size={20} />
                </div>
                <div>
                  <p className="text-2xl font-bold text-white">50k+</p>
                  <p className="text-sm text-violet-200">Alumni</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;