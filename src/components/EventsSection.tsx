import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

const EventsSection = () => {
  const events = [
    {
      title: "Annual Alumni Reunion 2025",
      date: "October 15-17, 2025",
      location: "Darrang College Campus",
      description: "Join us for three days of celebration, networking, and reminiscing with fellow alumni.",
      status: "upcoming",
      rsvp: 150
    },
    {
      title: "Distinguished Lecture Series",
      date: "November 22, 2025",
      location: "Main Auditorium",
      description: "An inspiring talk by our alumnus Dr. Dharmendra Sarmah on Chemical Change Solutions.",
      status: "upcoming",
      rsvp: 75
    },
    {
      title: "Career Guidance Workshop",
      date: "December 10, 2025",
      location: "Virtual Event",
      description: "Alumni sharing insights and career guidance for current students and recent graduates.",
      status: "upcoming",
      rsvp: 120
    }
  ];

  return (
    <section className="py-20 bg-beige-50 text-gray-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-yellow-600 mb-6">
            Upcoming Events
          </h2>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto leading-relaxed">
            Stay connected with your alma mater through our engaging events and programs 
            designed to bring our community together.
          </p>
        </div>

        {/* Events Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {events.map((event, index) => (
            <Card
              key={index}
              className="relative overflow-hidden bg-gradient-to-br from-white/60 to-yellow-50 border border-yellow-200 rounded-xl shadow-md hover:shadow-2xl transition-all duration-500 transform hover:-translate-y-2 hover:scale-105"
            >
              <CardContent className="p-6">
                {/* Badge and RSVPs */}
                <div className="flex justify-between items-start mb-4">
                  <Badge className="bg-yellow-100 text-yellow-700 border border-yellow-200 font-medium">
                    {event.status.toUpperCase()}
                  </Badge>
                  <div className="text-right">
                    <p className="text-sm text-gray-600">{event.rsvp} RSVPs</p>
                  </div>
                </div>

                {/* Event Title */}
                <h3 className="font-serif text-xl font-semibold text-yellow-700 mb-3">
                  {event.title}
                </h3>

                {/* Date & Location */}
                <div className="space-y-2 mb-4 text-gray-600 text-sm">
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    {event.date}
                  </div>
                  <div className="flex items-center">
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    {event.location}
                  </div>
                </div>

                {/* Description */}
                <p className="text-gray-700 text-sm leading-relaxed mb-6">
                  {event.description}
                </p>

                {/* RSVP Button */}
                <Button
                  size="sm"
                  className="w-full bg-yellow-600 text-white font-semibold hover:bg-yellow-700 transition-transform duration-300 hover:scale-105"
                >
                  RSVP Now
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View All Events */}
        <div className="text-center mt-16">
          <p className="text-gray-600 mb-4">
            Can't find what you're looking for? Check out our full events calendar.
          </p>
          <Button
            variant="outline"
            size="lg"
            className="text-yellow-600 border-yellow-600 hover:bg-yellow-600 hover:text-white px-8 py-4 transition-colors duration-300"
          >
            View All Events
          </Button>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;