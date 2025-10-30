import React, { useState, useEffect } from 'react';
import { AreaChart, Area, PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend, XAxis, YAxis } from 'recharts';
import { Users,Search, Menu,  Sun, Moon, TrendingUp, CreditCard, Loader2, } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '@/hook';

// --- API & REDUX IMPORTS (ASSUMED TO BE CORRECT) ---
import {
    fetchDashboardData,
  
} from '../../reducer/adminSlice';
import EventsManager from './EventSection';
import PaymentRequests from './PaymentRequests';
import PaymentsManager from './PaymentManager';
import Alumnilist from './AlumniList';
import AlumniDetailsPage from './AlimniDetails';
import Sidebar from './Sidebar';
import DataTable from './Datatable';
import StatusPill from './StatusPill';

// --- REUSABLE UI COMPONENTS ---

const StatCard = ({ title, value, icon: Icon, change, changeType }: { title: string; value: string; icon: React.ElementType; change?: string; changeType?: 'increase' | 'decrease' }) => (
    <div className="bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow duration-300 border border-gray-200 dark:border-gray-700 flex flex-col justify-between">
        <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
            <div className="bg-blue-100 dark:bg-blue-900/50 p-2 rounded-lg">
                <Icon className="w-6 h-6 text-blue-500 dark:text-blue-400" />
            </div>
        </div>
        <div>
            <p className="text-3xl font-bold text-gray-900 dark:text-white mt-2">{value}</p>
            {change && (
                <p className={`text-xs mt-1 flex items-center ${changeType === 'increase' ? 'text-green-500' : 'text-red-500'}`}>
                    <TrendingUp className={`w-4 h-4 mr-1 ${changeType === 'decrease' ? 'transform rotate-180' : ''}`} />
                    {change}
                </p>
            )}
        </div>
    </div>
);


// --- PAGE CONTENT COMPONENTS ---

const DashboardContent = () => {
    const dispatch = useAppDispatch();
    const { stats, collectionGrowth, membershipDistribution, recentPayments, recentRegistrations, status } = useAppSelector((state) => state.dashboard);

    useEffect(() => { dispatch(fetchDashboardData()); }, [dispatch]);

    if (status === 'loading') return <div className="flex justify-center items-center h-screen"><Loader2 className="w-12 h-12 animate-spin text-blue-500" /></div>;

    const PIE_COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444'];

    return (
        <div className="space-y-8">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {stats?.map((card: any) => <StatCard key={card.title} {...card} icon={Users} />)}
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-8">
                <div className="lg:col-span-3 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Collection Growth</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <AreaChart data={collectionGrowth}>
                            <defs><linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1"><stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} /><stop offset="95%" stopColor="#3B82F6" stopOpacity={0} /></linearGradient></defs>
                            <XAxis dataKey="name" stroke="currentColor" fontSize={12} />
                            <YAxis tickFormatter={(value: number) => `₹${value / 1000}k`} stroke="currentColor" fontSize={12} />
                            <Tooltip contentStyle={{ backgroundColor: 'rgba(255, 255, 255, 0.8)', backdropFilter: 'blur(5px)', border: '1px solid #ddd', borderRadius: '8px' }} />
                            <Area type="monotone" dataKey="amount" stroke="#3B82F6" fillOpacity={1} fill="url(#colorUv)" />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="lg:col-span-2 bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-md border border-gray-200 dark:border-gray-700">
                    <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">Membership Types</h3>
                    <ResponsiveContainer width="100%" height={300}>
                        <PieChart>
                            <Pie data={membershipDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={100} label>
                                {membershipDistribution?.map((entry, index) => <Cell key={`cell-${index}`} fill={PIE_COLORS[index % PIE_COLORS.length]} />)}
                            </Pie>
                            <Tooltip />
                            <Legend />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <DataTable title="Recent Payments" icon={CreditCard} headers={["Name", "Amount", "Date", "Status"]} data={recentPayments}
                    renderRow={(payment: any) => (
                        <tr key={payment.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900 dark:text-white">{payment.name}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">₹{payment.amount}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{payment.date}</td>
                            <td className="px-6 py-4 whitespace-nowrap"><StatusPill status={payment.status || 'Paid'} /></td>
                        </tr>
                    )} />
                <DataTable title="Recent Registrations" icon={Users} headers={["Name", "Batch", "Joined"]} data={recentRegistrations}
                    renderRow={(alumnus: any) => (
                        <tr key={alumnus.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors">
                            <td className="px-6 py-4 whitespace-nowrap">
                                <div className="flex items-center">
                                    <div className="flex-shrink-0 h-10 w-10">
                                        <div className="h-10 w-10 rounded-full bg-blue-200 text-blue-700 flex items-center justify-center font-bold">
                                            {alumnus.name.charAt(0)}
                                        </div>
                                    </div>
                                    <div className="ml-4">
                                        <div className="text-sm font-medium text-gray-900 dark:text-white">{alumnus.name}</div>
                                        <div className="text-xs text-gray-500 dark:text-gray-400">{alumnus.email}</div>
                                    </div>
                                </div>
                            </td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{alumnus.batch}</td>
                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-300">{new Date(alumnus.created_at).toLocaleDateString()}</td>
                        </tr>
                    )} />
            </div>
        </div>
    );
};



const NewsManager = () => <div>News Manager</div>; // Placeholder
const SiteSettings = () => <div>Site Settings</div>; // Placeholder

// --- LAYOUT COMPONENTS ---



const Header = ({ setSidebarOpen, toggleTheme, isDarkMode }: { setSidebarOpen: (isOpen: boolean) => void, toggleTheme: () => void, isDarkMode: boolean }) => (
    <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-sm p-4 flex items-center justify-between sticky top-6 z-30 mb-8">
        <div className="flex items-center">
            <button onClick={() => setSidebarOpen(true)} className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                <Menu className="w-6 h-6" />
            </button>
            <div className="relative hidden md:block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input type="text" placeholder="Search..." className="bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all w-64" />
            </div>
        </div>
        <div className="flex items-center space-x-4">
            <button onClick={toggleTheme} className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700">
                {isDarkMode ? <Sun className="w-6 h-6 text-yellow-400" /> : <Moon className="w-6 h-6 text-gray-700" />}
            </button>
            <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
            <div className="flex items-center space-x-3">
                <img className="h-10 w-10 rounded-full" src="https://placehold.co/100x100" alt="Admin avatar" />
                <div>
                    <p className="font-semibold text-sm text-gray-900 dark:text-white">Admin User</p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
                </div>
            </div>
        </div>
    </header>
);

// --- MAIN DASHBOARD COMPONENT ---

// const Dashboard = () => {
//     const [activePage, setActivePage] = useState('dashboard');
//     const [isSidebarOpen, setSidebarOpen] = useState(false);
//     const [isDarkMode, setIsDarkMode] = useState(() => {
//         if (typeof window !== 'undefined') {
//             return localStorage.getItem('theme') === 'dark';
//         }
//         return false;
//     });

//     useEffect(() => {
//         if (isDarkMode) {
//             document.documentElement.classList.add('dark');
//             localStorage.setItem('theme', 'dark');
//         } else {
//             document.documentElement.classList.remove('dark');
//             localStorage.setItem('theme', 'light');
//         }
//     }, [isDarkMode]);

//     const toggleTheme = () => setIsDarkMode(!isDarkMode);

//     const renderContent = () => {
//         switch (activePage) {
//             case 'dashboard': return <DashboardContent />;
//             case 'alumni': return <Alumnilist />;
//             case 'alumniDetails': return <AlumniDetailsPage/>
//             case 'payments': return <PaymentsManager />;
//             case 'payment-requests': return <PaymentRequests />;
//             case 'events': return <EventsManager />;
//             case 'news': return <NewsManager />;
//             case 'settings': return <SiteSettings />;
//             default: return <DashboardContent />;
//         }
//     };

//     return (
//         <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans">
//             <div className="flex">
//                 <Sidebar activePage={activePage} setActivePage={setActivePage} isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
//                 <main className="flex-1 p-6">
//                     <Header setSidebarOpen={setSidebarOpen} toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
//                     {renderContent()}
//                 </main>
//             </div>
//         </div>
//     );
// }

export default DashboardContent;