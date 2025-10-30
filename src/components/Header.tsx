import React, { useEffect, useState } from "react";
import logo from "@/assets/logo.png";
import { Link } from "react-router-dom";
import { LogIn, LogOut, User } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "@/store";
import { Button } from "./ui/button";
import { clearMessages, logoutUser } from "@/reducer/authSlice";

const Header = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { loading, error, success, token } = useSelector(
    (state: RootState) => state.auth
  );

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMounted, setIsMounted] = useState(false); // ✅ controls initial animation

  useEffect(() => {
    // run on mount
    setIsMounted(true);

    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (success || error) {
      const timer = setTimeout(() => dispatch(clearMessages()), 3000);
      return () => clearTimeout(timer);
    }
  }, [success, error, dispatch]);

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        ${isScrolled ? "py-1 shadow-md backdrop-blur-lg glass-nav" : "py-4"}
        ${isMounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-10"}
      `}
      style={{ transition: "all 0.6s ease" }} // smooth entry
    >
      <div className="container mx-auto px-6">
        <div className="flex items-center justify-between transition-all duration-300">
          {/* --- Logo --- */}
          <a href="#" className="flex items-center space-x-3 group">
            <img
              src={logo}
              alt="Darrang College Logo"
              className={`transition-all duration-300 ${
                isScrolled
                  ? "w-8 h-8 border border-slate-700"
                  : "w-12 h-12 border-2 border-slate-700"
              } bg-white/10 p-1 rounded-full group-hover:border-indigo-400 group-hover:rotate-6`}
            />
            <span
              className={`font-bold text-slate-100 hidden md:block transition-all duration-300 ${
                isScrolled ? "text-base" : "text-lg"
              }`}
            >
              Darrang College Alumni
            </span>
          </a>

          {/* --- Links --- */}
          <nav className="hidden lg:flex items-center space-x-8 font-bold text-slate-100">
            <a href="#hero" className="relative nav-link-underline hover:text-white">Home</a>
            <a href="#events" className="relative nav-link-underline hover:text-white">Events</a>
            <a href="#donate" className="relative nav-link-underline hover:text-white">Donations</a>
            <a href="#about" className="relative nav-link-underline hover:text-white">About</a>
            <a href="#highlights" className="relative nav-link-underline hover:text-white">Alumni</a>
            <a href="#gallery" className="relative nav-link-underline hover:text-white">Gallery</a>
          </nav>

          {/* --- Actions --- */}
          <div className="flex items-center gap-3">
            {!token ? (
              <>
                <Link
                  to="/login"
                  className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full bg-indigo-600 text-whitefont-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors duration-300"
                >
                  <LogIn className="w-4 h-4 mr-2" />
                  Login / Register
                </Link>
                {/* <Link to="/login" className="hidden sm:block">
                  <button className="bg-indigo-600 text-white font-semibold px-4 py-2 rounded-full hover:bg-indigo-700 transition-colors duration-200 shadow-md">
                     <LogIn className="w-4 h-4 mr-2" />
                    login
                  </button>
                </Link> */}
              </>
            ) : (
              <>
               <Link   to="/account">
               <Button
                
                 className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors duration-300"
                >
                  <User className="w-4 h-4 mr-2" />
                  MyAccount
                  </Button>
                </Link>
              <Button
                onClick={handleLogout}
                disabled={loading}
                className="hidden sm:flex items-center justify-center px-4 py-2 rounded-full font-semibold text-slate-300 hover:bg-slate-800/80 hover:text-white transition-colors duration-300"
              >
                {loading ? (
                  "Logging out..."
                ) : (
                  <>
                    <LogOut className="w-4 h-4 mr-2" /> Logout
                  </>
                )}
              </Button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* --- Alerts --- */}
      {error && (
        <div className="fixed top-16 right-4 bg-red-600 text-white px-4 py-2 rounded-md shadow-md">
          {error}
        </div>
      )}
      {success && (
        <div className="fixed top-16 right-4 bg-green-600 text-white px-4 py-2 rounded-md shadow-md">
          {success}
        </div>
      )}
    </header>
  );
};

export default Header;
