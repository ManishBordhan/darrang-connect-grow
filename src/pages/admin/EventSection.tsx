
// --- REUSABLE UI COMPONENTS (REVISED EVENT CARD - NO PHOTOS) ---
// --- REUSABLE UI COMPONENTS (EVENT CARD WITH IMPROVED NOTIFY SECTION) ---
// --- REUSABLE UI COMPONENTS (EVENT CARD WITH TYPESCRIPT FIX) ---

import { useAppDispatch, useAppSelector } from "@/hook";
import { createEvent, deleteEvent, updateEvent } from "@/reducer/adminSlice";
import { fetchAllEvents } from "@/reducer/publicSlice";
import { CalendarX, ClipboardCheck, Clock, Edit, Loader2, Mail, MapPin, MessageSquare, MoreVertical, Phone, Plus, Trash2, X } from "lucide-react";
import { useEffect, useState } from "react";

const EventCard = ({ event, onEdit, onDelete, onNotify }: { event: any, onEdit: () => void, onDelete: () => void, onNotify: (type: 'email' | 'whatsapp' | 'sms') => void }) => {
    const [actionsOpen, setActionsOpen] = useState(false);
    const [notifyState, setNotifyState] = useState<{ sending: string | null; sent: string[] }>({
        sending: null,
        sent: [],
    });
    
    const eventDate = new Date(event.date);
    const isPast = eventDate < new Date();

    const handleNotifyClick = (type: 'email' | 'whatsapp' | 'sms') => {
        if (notifyState.sending || notifyState.sent.includes(type)) return;

        setNotifyState(prev => ({ ...prev, sending: type }));
        onNotify(type);

        setTimeout(() => {
            setNotifyState(prev => ({
                sending: null,
                sent: [...prev.sent, type],
            }));
        }, 1500);
    };

    const StatusPill = () => {
        const pillClasses = isPast 
            ? "bg-gray-100 text-gray-700 dark:bg-gray-700 dark:text-gray-300" 
            : "bg-blue-100 text-blue-700 dark:bg-blue-900/50 dark:text-blue-300";
        return (
            <span className={`px-2.5 py-1 text-xs font-semibold rounded-full ${pillClasses}`}>
                {isPast ? 'Past Event' : 'Upcoming'}
            </span>
        );
    };

    return (
        <div className={`bg-white dark:bg-gray-800 rounded-2xl shadow-md flex flex-col hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 ${isPast ? 'opacity-75' : ''}`}>
            {/* Card Header */}
            <div className="flex items-start p-5 gap-5 border-b border-gray-200 dark:border-gray-700">
                <div className="flex-shrink-0 flex flex-col items-center justify-center w-16 h-16 rounded-lg bg-gray-50 dark:bg-gray-700/50 border dark:border-gray-600">
                    <span className="block text-xs font-semibold uppercase text-red-500 dark:text-red-400">{eventDate.toLocaleString('default', { month: 'short' })}</span>
                    <span className="block font-bold text-3xl text-gray-800 dark:text-gray-100">{eventDate.getDate()}</span>
                </div>
                
                <div className="flex-grow">
                    <div className="flex justify-between items-start">
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white leading-tight pr-2">{event.title}</h3>
                        <div className="relative flex-shrink-0">
                            <button onClick={() => setActionsOpen(!actionsOpen)} onBlur={() => setTimeout(() => setActionsOpen(false), 150)} className="p-1.5 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                                <MoreVertical className="w-5 h-5 text-gray-500" />
                            </button>
                            {actionsOpen && (
                                <div className="absolute right-0 mt-2 w-40 bg-white dark:bg-gray-700 rounded-lg shadow-xl z-10 border dark:border-gray-600">
                                    <button onClick={onEdit} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-gray-700 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-600">
                                        <Edit className="w-4 h-4" /> Edit
                                    </button>
                                    <button onClick={onDelete} className="w-full text-left flex items-center gap-3 px-4 py-2 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/30">
                                        <Trash2 className="w-4 h-4" /> Delete
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                    <div className="mt-1">
                        <StatusPill />
                    </div>
                </div>
            </div>

            {/* Card Body */}
            <div className="p-5 flex-grow space-y-4">
                <p className="text-sm text-gray-600 dark:text-gray-300">{event.description}</p>
                <div className="space-y-2 text-sm text-gray-500 dark:text-gray-400 border-t border-gray-200 dark:border-gray-700 pt-4">
                    <p className="flex items-center"><Clock className="w-4 h-4 mr-3 text-gray-400" />{event.time}</p>
                    <p className="flex items-center"><MapPin className="w-4 h-4 mr-3 text-gray-400" />{event.location}</p>
                </div>
            </div>

            {/* Card Footer with TypeScript Fix */}
            <div className="border-t border-gray-200 dark:border-gray-700 p-3 bg-gray-50/50 dark:bg-gray-800/50 rounded-b-xl">
                <div className="flex items-center justify-between">
                    <span className="text-xs font-semibold text-gray-500 dark:text-gray-400">SEND NOTIFICATION</span>
                    <div className="flex items-center gap-2">
                        {/* Email Button */}
                        <button
                            onClick={() => handleNotifyClick('email')}
                            disabled={!!notifyState.sending || notifyState.sent.includes('email')} // <-- FIX HERE
                            className="p-2 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title={notifyState.sent.includes('email') ? 'Email Sent' : 'Send Email'}
                        >
                            {notifyState.sending === 'email' ? <Loader2 className="w-4 h-4 animate-spin text-blue-500" /> :
                             notifyState.sent.includes('email') ? <ClipboardCheck className="w-4 h-4 text-green-500" /> :
                             <Mail className="w-4 h-4 text-blue-600 dark:text-blue-400" />}
                        </button>
                        {/* WhatsApp Button */}
                         <button
                            onClick={() => handleNotifyClick('whatsapp')}
                            disabled={!!notifyState.sending || notifyState.sent.includes('whatsapp')} // <-- FIX HERE
                            className="p-2 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title={notifyState.sent.includes('whatsapp') ? 'WhatsApp Sent' : 'Send WhatsApp'}
                        >
                            {notifyState.sending === 'whatsapp' ? <Loader2 className="w-4 h-4 animate-spin text-green-500" /> :
                             notifyState.sent.includes('whatsapp') ? <ClipboardCheck className="w-4 h-4 text-green-500" /> :
                             <MessageSquare className="w-4 h-4 text-green-600 dark:text-green-400" />}
                        </button>
                        {/* SMS Button */}
                         <button
                            onClick={() => handleNotifyClick('sms')}
                            disabled={!!notifyState.sending || notifyState.sent.includes('sms')} // <-- FIX HERE
                            className="p-2 w-9 h-9 flex items-center justify-center rounded-full bg-white dark:bg-gray-700 border dark:border-gray-600 shadow-sm disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                            title={notifyState.sent.includes('sms') ? 'SMS Sent' : 'Send SMS'}
                        >
                            {notifyState.sending === 'sms' ? <Loader2 className="w-4 h-4 animate-spin text-gray-500" /> :
                             notifyState.sent.includes('sms') ? <ClipboardCheck className="w-4 h-4 text-green-500" /> :
                             <Phone className="w-4 h-4 text-gray-600 dark:text-gray-400" />}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};
const EventsManager = () => {
    const dispatch = useAppDispatch();
    const { list: events, status } = useAppSelector((state) => state.events);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentEvent, setCurrentEvent] = useState<any | null>(null);
    const [filter, setFilter] = useState('Upcoming');

    // NOTE: Your real event data should be used here. I'm adding mock data for the new fields.
    const eventsWithMockData = events?.map(event => ({
        ...event,
        attendees: Math.floor(Math.random() * 200) + 50, // Mock attendee count
    }));

    const initialFormData = { title: '', date: new Date().toISOString().split('T')[0], time: '12:00', location: '', description: '' };
    const [formData, setFormData] = useState(initialFormData);

    useEffect(() => { dispatch(fetchAllEvents()); }, [dispatch]);

    const handleOpenModal = (event: any | null = null) => {
        if (event) {
            setCurrentEvent(event);
            setFormData({ ...event, date: new Date(event.date).toISOString().split('T')[0] });
        } else {
            setCurrentEvent(null);
            setFormData(initialFormData);
        }
        setIsModalOpen(true);
    };

    const handleCloseModal = () => setIsModalOpen(false);
    const handleFormChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => setFormData({ ...formData, [e.target.name]: e.target.value });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (currentEvent) {
            dispatch(updateEvent({ id: currentEvent.id, eventData: formData }));
        } else {
            dispatch(createEvent(formData));
        }
        handleCloseModal();
    };

    const handleDelete = (id: number) => {
        if (window.confirm('Are you sure you want to delete this event?')) {
            dispatch(deleteEvent(id));
        }
    };

    const filteredEvents = eventsWithMockData
        ?.filter(e => {
            const eventDate = new Date(e.date);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            if (filter === 'Upcoming') return eventDate >= today;
            if (filter === 'Past') return eventDate < today;
            return true;
        })
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
    
    const inputClasses = "w-full bg-gray-50 dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-lg px-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none";

    return (
        <div className="space-y-8">
            <div className="flex justify-between items-start flex-wrap gap-4">
               <div>
                    <h2 className="text-3xl font-bold text-gray-800 dark:text-white">Events</h2>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Create, notify, and manage all your alumni events.</p>
               </div>
                <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
                    <div className="flex space-x-1 bg-gray-100 dark:bg-gray-800 p-1 rounded-lg">
                        <button onClick={() => setFilter('Upcoming')} className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${filter === 'Upcoming' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'}`}>Upcoming</button>
                        <button onClick={() => setFilter('Past')} className={`px-3 py-1 rounded-md text-sm font-semibold transition-colors ${filter === 'Past' ? 'bg-white dark:bg-gray-700 text-blue-600 dark:text-white shadow' : 'text-gray-600 dark:text-gray-300 hover:bg-white/50 dark:hover:bg-gray-700/50'}`}>Past</button>
                    </div>
                    <button onClick={() => handleOpenModal()} className="bg-blue-600 text-white px-4 py-2 rounded-lg flex items-center hover:bg-blue-700 transition-colors shadow hover:shadow-lg">
                        <Plus className="w-5 h-5 mr-2" /> Create Event
                    </button>
                </div>
            </div>

            {isModalOpen && (
                 <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4 transition-opacity duration-300 ease-in-out">
                 <div className="bg-white dark:bg-gray-800 rounded-xl shadow-2xl p-8 w-full max-w-lg">
                     <div className="flex justify-between items-center mb-6">
                         <h3 className="text-2xl font-bold text-gray-800 dark:text-white">{currentEvent ? 'Edit Event' : 'Create New Event'}</h3>
                         <button onClick={handleCloseModal} className="text-gray-500 hover:text-gray-800 dark:hover:text-white"><X className="w-6 h-6" /></button>
                     </div>
                     <form onSubmit={handleSubmit} className="space-y-4">
                         <div>
                             <label htmlFor="title" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Event Title</label>
                             <input type="text" name="title" id="title" value={formData.title} onChange={handleFormChange} className={inputClasses} required />
                         </div>
                         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                             <div>
                                 <label htmlFor="date" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Date</label>
                                 <input type="date" name="date" id="date" value={formData.date} onChange={handleFormChange} className={inputClasses} required />
                             </div>
                             <div>
                                 <label htmlFor="time" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Time</label>
                                 <input type="time" name="time" id="time" value={formData.time} onChange={handleFormChange} className={inputClasses} required />
                             </div>
                         </div>
                         <div>
                             <label htmlFor="location" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Location</label>
                             <input type="text" name="location" id="location" value={formData.location} onChange={handleFormChange} className={inputClasses} required />
                         </div>
                         <div>
                             <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Description</label>
                             <textarea name="description" id="description" value={formData.description} onChange={handleFormChange} rows={4} className={inputClasses} required />
                         </div>
                         <div className="pt-4 flex justify-end">
                             <button type="button" onClick={handleCloseModal} className="px-6 py-2 bg-gray-200 dark:bg-gray-600 text-gray-800 dark:text-gray-200 rounded-lg hover:bg-gray-300 dark:hover:bg-gray-500 transition-colors mr-4">Cancel</button>
                             <button type="submit" className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors shadow hover:shadow-lg">{status === 'loading' ? <Loader2 className="w-5 h-5 animate-spin"/> : (currentEvent ? 'Save Changes' : 'Create Event')}</button>
                         </div>
                     </form>
                 </div>
             </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
                {status === 'loading' ? (
                    <div className="col-span-full flex justify-center items-center h-64"><Loader2 className="w-12 h-12 animate-spin text-blue-500" /></div>
                ) : filteredEvents?.length > 0 ? (
                    filteredEvents.map(event => (
                        <EventCard
                            key={event.id}
                            event={event}
                            onEdit={() => handleOpenModal(event)}
                            onDelete={() => handleDelete(event.id)}
                            onNotify={(type) => { console.log(`Notify event ${event.id} via ${type}`) }}
                        />
                    ))
                ) : (
                    <div className="col-span-full flex flex-col items-center justify-center text-center py-20 bg-white dark:bg-gray-800 rounded-2xl">
                        <CalendarX className="w-16 h-16 text-gray-300 dark:text-gray-600" />
                        <h3 className="mt-4 text-xl font-semibold text-gray-800 dark:text-white">No {filter.toLowerCase()} events found</h3>
                        <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">Click 'Create Event' to get started.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default EventsManager;