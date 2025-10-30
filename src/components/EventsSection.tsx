import React, { useState, useMemo, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "@/hook";
import { fetchAllEvents } from "../reducer/publicSlice";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CalendarDays, MapPin, Users, Eye, EyeOff, Ticket } from "lucide-react";

const EventsSection = () => {
  const dispatch = useAppDispatch();
  const { list: allEvents, status, error } = useAppSelector((state) => state.event);

  const [showAll, setShowAll] = useState(false);
  const [filter, setFilter] = useState<'upcoming' | 'past'>('upcoming');

  useEffect(() => {
    if (status === 'idle') dispatch(fetchAllEvents());
  }, [status, dispatch]);

  const { upcomingEvents, pastEvents } = useMemo(() => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = allEvents
      .filter(event => new Date(event.date) >= today)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());

    const past = allEvents
      .filter(event => new Date(event.date) < today)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

    return { upcomingEvents: upcoming, pastEvents: past };
  }, [allEvents]);

  const displayedEvents = filter === 'upcoming' ? upcomingEvents : pastEvents;
  const eventsToRender = showAll ? displayedEvents : displayedEvents.slice(0, 3);
  const nextEvent = upcomingEvents.length > 0 ? upcomingEvents[0] : null;

  if (status === "loading") return <p className="text-center py-20">Loading events...</p>;
  if (status === "failed") return <p className="text-center py-20">Error: {error}</p>;

  const getBadgeClass = (type) => {
    switch (type?.toLowerCase()) {
      case 'webinar': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-300 border-blue-500/20';
      case 'reunion': return 'bg-emerald-100 text-emerald-800 dark:bg-emerald-900/50 dark:text-emerald-300 border-emerald-500/20';
      case 'networking': return 'bg-amber-100 text-amber-800 dark:bg-amber-900/50 dark:text-amber-300 border-amber-500/20';
      default: return 'bg-slate-100 text-slate-800 dark:bg-slate-700 dark:text-slate-300 border-slate-500/20';
    }
  };

  return (
    <section className="py-20 bg-slate-200 dark:bg-slate-900 transition-colors duration-300">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-12">
          {/* LEFT HIGHLIGHT PANEL */}
          <div className="lg:col-span-1 bg-gradient-to-b from-indigo-600 to-blue-700 text-white p-8 rounded-2xl shadow-2xl flex flex-col">
            <div className="w-16 h-16 bg-white/10 border border-white/20 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-sm">
              <Ticket className="w-8 h-8 text-white" strokeWidth={2} />
            </div>
            <h2 className="font-serif text-3xl font-bold mb-4">Community Events</h2>
            <p className="text-indigo-200 leading-relaxed">
              Stay connected with your alma mater and fellow alumni through our engaging events.
            </p>
            {nextEvent && (
              <div className="mt-6 border-t border-white/20 pt-6 pb-4">
                <div className="relative bg-lime-300 text-slate-800 p-5 rounded-lg">
                  <p className="text-sm font-bold text-slate-700 mb-1">NEXT UP:</p>
                  <h3 className="text-lg font-bold text-slate-900 mb-2">{nextEvent.title}</h3>
                  <div className="flex items-center text-sm text-slate-600">
                    <CalendarDays size={16} className="mr-2 flex-shrink-0" />
                    <span>{new Date(nextEvent.date).toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })}</span>
                  </div>
                </div>
              </div>
            )}
            <Button
              onClick={() => setShowAll(!showAll)}
              variant="outline"
              className="mt-auto w-full group bg-slate-800 text-white border border-transparent hover:bg-white hover:text-black hover:border-black transition-colors duration-300"
            >
              {showAll ? 'Show Fewer' : 'View Full Calendar'}
              {showAll ? <EyeOff className="w-5 h-5 ml-2" /> : <Eye className="w-5 h-5 ml-2" />}
            </Button>
          </div>

          {/* RIGHT CONTENT AREA - Events List */}
          <div className="lg:col-span-3">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
              <div>
                <h2 className="font-serif text-4xl font-bold text-slate-900 dark:text-white mb-2">Events</h2>
                <p className="text-lg text-slate-600 dark:text-slate-400">Explore our gatherings, past and present.</p>
              </div>
              <div className="flex space-x-2 mt-4 sm:mt-0">
                <Button
                  variant={filter === 'upcoming' ? 'default' : 'outline'}
                  onClick={() => setFilter('upcoming')}
                  className={filter === 'upcoming' ? 'bg-indigo-600 text-white' : 'bg-transparent'}
                >
                  Upcoming
                </Button>
                <Button
                  variant={filter === 'past' ? 'default' : 'outline'}
                  onClick={() => setFilter('past')}
                  className={filter === 'past' ? 'bg-indigo-600 text-white' : 'bg-transparent'}
                >
                  Past Events
                </Button>
              </div>
            </div>

            <div className={`space-y-6 transition-all duration-500 ${showAll ? 'max-h-[70vh] overflow-y-auto pr-4' : ''}`}>
              {eventsToRender.length > 0 ? (
                eventsToRender.map((event, index) => {
                  const month = new Date(event.date).toLocaleString('default', { month: 'short' }).toUpperCase();
                  const day = new Date(event.date).getDate();

                  return (
                    <Card
                      key={event.id || index}
                      className="bg-white dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-2xl shadow-md hover:shadow-2xl hover:-translate-y-1 transition-transform duration-300"
                    >
                      <CardContent className="p-6 flex flex-col sm:flex-row items-start sm:items-center gap-6">
                        {/* Date Block */}
                        <div className="flex-shrink-0 text-center bg-indigo-50 dark:bg-indigo-900 p-4 rounded-xl w-20 h-20 flex flex-col justify-center items-center border border-indigo-200 dark:border-indigo-700">
                          <p className="text-sm font-semibold text-indigo-600 dark:text-indigo-400">{month}</p>
                          <p className="text-2xl font-bold text-slate-900 dark:text-white">{day}</p>
                        </div>

                        {/* Details Block */}
                        <div className="flex-1">
                          <h3 className="font-serif text-xl font-semibold text-slate-900 dark:text-white mb-2">{event.title}</h3>

                          {/* Metadata Row */}
                          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 dark:text-slate-400 mb-2">
                            {event.eventType && (
                              <Badge variant="outline" className={`font-medium ${getBadgeClass(event.eventType)}`}>
                                {event.eventType}
                              </Badge>
                            )}
                            {event.location && (
                              <div className="flex items-center">
                                <MapPin className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                <span>{event.location}</span>
                              </div>
                            )}
                            {event.attendees && (
                              <div className="flex items-center">
                                <Users className="w-4 h-4 mr-1.5 flex-shrink-0" />
                                <span>{event.attendees} Attendees</span>
                              </div>
                            )}
                          </div>

                          <p className="text-slate-600 dark:text-slate-300 text-sm leading-relaxed line-clamp-2">{event.description}</p>
                        </div>
                      </CardContent>
                    </Card>
                  );
                })
              ) : (
                <div className="text-center py-10">
                  <p className="text-slate-600 dark:text-slate-400">No {filter} events found.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EventsSection;
