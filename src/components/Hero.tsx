import React, { useState, useEffect } from 'react';
import { ArrowRight, LogIn, Menu, X, Award, Star } from 'lucide-react';
// import heroImage from "@/assets/darrang-college-hero.jpg";
import heroImage from "@/assets/darrang-clg-anim.png";

import { Link } from 'react-router-dom';
import Header from './Header';
import { checkAlumniStatus } from '@/reducer/alumniSlice';
import { useAppDispatch, useAppSelector } from '@/hook';

const App = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [counter, setCounter] = useState({ alumni: 0, years: 0, events: 0 });
  const dispatch = useAppDispatch()
  const { loading, success, error, alreadyFilled } = useAppSelector(state => state.alumni);


  useEffect(() => {
    const targets = { alumni: 50000, years: 79, events: 100 };
    const duration = 2000;
    let startTime = null;

    function animate(currentTime) {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / duration, 1);

      setCounter({
        alumni: Math.floor(progress * targets.alumni),
        years: Math.floor(progress * targets.years),
        events: Math.floor(progress * targets.events),
      });

      if (progress < 1) requestAnimationFrame(animate);
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        requestAnimationFrame(animate);
        observer.disconnect();
      }
    }, { threshold: 0.5 });

    const statsSection = document.getElementById('stats-section');
    if (statsSection) observer.observe(statsSection);

    return () => observer.disconnect();
  }, []);
  useEffect(() => {
    dispatch(checkAlumniStatus());
  }, [dispatch]);
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@700&family=Inter:wght@400;500;600;700&display=swap');

        body {
          overflow-x: hidden;
          background-color: #020617;
        }

        .font-playfair { font-family: 'Playfair Display', serif; }
        .font-inter { font-family: 'Inter', sans-serif; }

        .glass-nav {
          background: rgba(2, 6, 23, 0.5);
          backdrop-filter: blur(16px);
          border-bottom: 1px solid rgba(255, 255, 255, 0.1);
        }
        
        .nav-link-underline::after {
          content: ''; position: absolute; width: 100%; transform: scaleX(0); height: 2px;
          bottom: -6px; left: 0; background: linear-gradient(90deg, #a78bfa, #f472b6);
          transform-origin: bottom right; transition: transform 0.3s ease-out;
        }
        .nav-link-underline:hover::after { transform: scaleX(1); transform-origin: bottom left; }

        .cta-button {
          position: relative;
          overflow: hidden;
        }
        .cta-button .shine {
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(45deg, transparent, rgba(255, 255, 255, 0.2), transparent);
          transition: transform 0.8s cubic-bezier(0.23, 1, 0.32, 1);
          transform: translateX(-100%) rotate(-45deg);
        }
        .cta-button:hover .shine {
          transform: translateX(100%) rotate(-45deg);
        }
      `}</style>

      <section className="relative min-h-screen flex flex-col bg-slate-950 text-slate-200 font-inter overflow-hidden">

        {/* Background Image */}
        <div
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})`, filter: 'brightness(0.6)' }}
        ></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/60 to-transparent z-1"></div>
        {/* Removed dotted/mask effect */}

        {/* Header */}
        <Header />


        {/* Hero Content */}
        <main className="relative z-20 flex-1 flex items-center pt-20 pb-10">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl text-center lg:text-left">
              <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-200">
                <div className="mb-4 inline-flex">
                  <span className="inline-flex items-center gap-2 bg-green-500/10 text-green-300 px-4 py-1.5 rounded-full text-sm font-semibold border border-green-500/30">
                    <Award className="w-4 h-4" />
                    Darrang College Alumni Association
                  </span>
                </div>
                <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl font-extrabold text-white drop-shadow-xl leading-tight">
                  Reconnect <br className="hidden md:inline" /> Inspire  Achieve.
                </h1>
              </div>

              <div className="animate-in fade-in slide-in-from-bottom-5 duration-700 delay-300">
                <p className="mt-6 text-lg md:text-xl text-indigo-100/90 max-w-3xl mx-auto lg:mx-0 leading-relaxed drop-shadow-md">
                  Bridging generations of scholars. Join a vibrant community celebrating shared history and building future success.
                </p>
              </div>

              <div className="mt-10 flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 animate-in fade-in slide-in-from-bottom-5 duration-700 delay-400">
               
               {/* {
                alreadyFilled? 'payment' :  */}
                 <Link
                  to={alreadyFilled ?'/payment': '/registration'}
                  className="group w-full sm:w-auto flex items-center justify-center bg-green-600 text-white font-bold text-base px-8 py-3 rounded-full shadow-lg shadow-indigo-600/30 transform hover:-translate-y-1 hover:bg-green-500 hover:shadow-2xl hover:shadow-indigo-500/40 transition-all duration-300"
                >
                 {alreadyFilled ? 'Make Donation' :'Register alumni Details' } 
                  <ArrowRight className="w-5 h-5 ml-2 transform group-hover:translate-x-1 transition-transform" />
                </Link>
               {/* } */}
              
                {/* <Link to={'/account'}>
                  <button
                    className="w-full sm:w-auto text-white border border-white/20 bg-white/10 backdrop-blur-sm hover:bg-white/20 text-base px-8 py-3 rounded-full shadow-md hover:shadow-lg transition-all duration-300"
                  >
                    My Account
                  </button>
                </Link> */}
              </div>
               {alreadyFilled && (
                        <div className="mt-4 flex items-center gap-2 text-sm text-green-300 animate-in fade-in duration-500">
                            <Star className="w-4 h-4  text-green-400" />
                            <span>You're already registered. Proceed to make a donation.</span>
                        </div>
                    )}
            </div>
          </div>
        </main>
      </section>
    </>
  );
};

export default App;
