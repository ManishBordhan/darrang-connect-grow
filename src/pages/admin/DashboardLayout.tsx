// src/features/admin/DashboardLayout.tsx
import React, { useState, useEffect } from "react";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { Menu, Search, Sun, Moon } from "lucide-react";

const Header = ({ setSidebarOpen, toggleTheme, isDarkMode }: any) => (
  <header className="bg-white/70 dark:bg-gray-800/70 backdrop-blur-lg border-b border-gray-200 dark:border-gray-700/50 rounded-2xl shadow-sm p-4 flex items-center justify-between sticky top-6 z-30 mb-8">
    <div className="flex items-center">
      <button
        onClick={() => setSidebarOpen(true)}
        className="md:hidden mr-4 p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        <Menu className="w-6 h-6" />
      </button>
      <div className="relative hidden md:block">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search..."
          className="bg-gray-100 dark:bg-gray-700 rounded-full pl-10 pr-4 py-2 focus:ring-2 focus:ring-blue-500 focus:outline-none transition-all w-64"
        />
      </div>
    </div>

    <div className="flex items-center space-x-4">
      <button
        onClick={toggleTheme}
        className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700"
      >
        {isDarkMode ? (
          <Sun className="w-6 h-6 text-yellow-400" />
        ) : (
          <Moon className="w-6 h-6 text-gray-700" />
        )}
      </button>
      <div className="w-px h-8 bg-gray-200 dark:bg-gray-700"></div>
      <div className="flex items-center space-x-3">
        <img
          className="h-10 w-10 rounded-full"
          src="https://placehold.co/100x100"
          alt="Admin avatar"
        />
        <div>
          <p className="font-semibold text-sm text-gray-900 dark:text-white">
            Admin User
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400">Super Admin</p>
        </div>
      </div>
    </div>
  </header>
);

export default function DashboardLayout() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(
    () => localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [isDarkMode]);

  const toggleTheme = () => setIsDarkMode(!isDarkMode);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-200 font-sans flex">
      <Sidebar isSidebarOpen={isSidebarOpen} setSidebarOpen={setSidebarOpen} />
      <main className="flex-1 p-6">
        <Header
          setSidebarOpen={setSidebarOpen}
          toggleTheme={toggleTheme}
          isDarkMode={isDarkMode}
        />
        <Outlet /> {/* This renders the current page */}
      </main>
    </div>
  );
}
