// src/features/admin/Sidebar.tsx
import React from "react";
import { NavLink } from "react-router-dom";
import {
  Users,
  Calendar,
  Newspaper,
  Settings,
  CreditCard,
  LayoutDashboard,
  ClipboardCheck,
  X,
} from "lucide-react";

interface SidebarProps {
  isSidebarOpen: boolean;
  setSidebarOpen: (isOpen: boolean) => void;
}

const Sidebar: React.FC<SidebarProps> = ({ isSidebarOpen, setSidebarOpen }) => {
  const navItems = [
    { name: "Dashboard", icon: LayoutDashboard, path: "/dashboard", exact: true },
    { name: "Alumni", icon: Users, path: "/dashboard/alumni" },
    { name: "Payments", icon: CreditCard, path: "/dashboard/payments" },
    { name: "Pay Requests", icon: ClipboardCheck, path: "/dashboard/payment-requests" },
    { name: "Events", icon: Calendar, path: "/dashboard/events" },
    { name: "News", icon: Newspaper, path: "/dashboard/news" },
    { name: "Settings", icon: Settings, path: "/dashboard/settings" },
  ];

  return (
    <>
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 bg-black bg-opacity-50 z-30 md:hidden"
        ></div>
      )}

      {/* Sidebar */}
      <aside
        className={`fixed inset-y-0 left-0 bg-gray-900 text-white w-64 p-4 transform transition-transform duration-300 ease-in-out z-40 md:relative md:translate-x-0 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        {/* Close button for mobile */}
        <div className="flex justify-between items-center mb-10 md:hidden">
          <h1 className="text-white text-lg font-bold">Alumni Admin</h1>
          <button onClick={() => setSidebarOpen(false)} className="p-2 rounded-full hover:bg-gray-700">
            <X className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Logo + Title (desktop) */}
        <div className="hidden md:flex items-center justify-center mb-10 h-16">
          <img
            src="https://placehold.co/40x40/3B82F6/FFFFFF?text=DC"
            alt="Darrang College Logo"
            className="rounded-full"
          />
          <h1 className="text-white text-xl font-bold ml-3">Alumni Admin</h1>
        </div>

        {/* Navigation */}
        <nav>
          <ul className="space-y-2">
            {navItems.map((item) => (
              <li key={item.name}>
                <NavLink
                  to={item.path}
                  end={item.exact} // 👈 Fixes dashboard always active
                  onClick={() => setSidebarOpen(false)}
                  className={({ isActive }) =>
                    `flex items-center p-3 rounded-lg transition-all duration-200 relative ${
                      isActive
                        ? "bg-blue-600 text-white shadow-lg"
                        : "text-gray-300 hover:bg-gray-700/50 hover:text-white"
                    }`
                  }
                >
                  <item.icon className="w-5 h-5 mr-4" />
                  <span>{item.name}</span>
                  {item.name === "Dashboard" && item.exact && (
                    <span className="sr-only">(current)</span>
                  )}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};

export default Sidebar;
