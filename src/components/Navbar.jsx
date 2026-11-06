import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, ArrowUpRight, ChevronRight, ChevronDown, Mic, Play } from 'lucide-react';

export default function Navbar({ onOpenConsultation, onOpenPodcast }) {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mediaDropdownOpen, setMediaDropdownOpen] = useState(false);
  const [mobileMediaOpen, setMobileMediaOpen] = useState(true);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setMediaDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const standardNavLinks = [
    { label: "About", href: "#about" },
    { label: "Hospital Network", href: "#network" },
    { label: "Strategic Pillars", href: "#pillars" },
    { label: "360° Care Journey", href: "#continuum" },
    { label: "Patient Stories", href: "#testimonials" },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-4 sm:px-6 lg:px-8 ${
      scrolled 
        ? 'py-3 bg-[#0b0f17]/90 backdrop-blur-md border-b border-white/10 shadow-xl shadow-black/30' 
        : 'pt-4 pb-2'
    }`}>
      <div className="max-w-[1720px] mx-auto flex items-center justify-between">
        
        {/* Brand Logo & Healthtravo Media Title */}
        <a href="#" className="flex items-center gap-3 group cursor-pointer">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden shrink-0 ring-2 ring-white/20 group-hover:ring-blue-400/60 shadow-md group-hover:scale-105 transition-all duration-300">
            <img 
              src="/assets/healthtravo-media-logo.png" 
              alt="Healthtravo Media" 
              className="w-full h-full object-cover rounded-full"
            />
          </div>
          <div className="flex flex-col text-left">
            <span className="text-base sm:text-lg font-black tracking-tight text-white group-hover:text-blue-400 transition-colors font-sans leading-none">
              Healthtravo Media
            </span>
            <span className="text-[10px] font-semibold text-slate-400 group-hover:text-slate-300 transition-colors tracking-wide mt-1">
              by Dushyant Singh Chauhan
            </span>
          </div>
        </a>

        {/* Desktop Floating Pill Navigation */}
        <nav className="hidden lg:flex items-center gap-1 px-4 py-2 rounded-full glass-pill shadow-xl shadow-black/40">
          {/* 1. About */}
          <a
            href="#about"
            className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
          >
            About
          </a>

          {/* 2. Media Dropdown (YouTube Talks & Podcast Profile) */}
          <div 
            ref={dropdownRef}
            className="relative"
            onMouseEnter={() => setMediaDropdownOpen(true)}
            onMouseLeave={() => setMediaDropdownOpen(false)}
          >
            <button
              type="button"
              onClick={() => setMediaDropdownOpen(!mediaDropdownOpen)}
              className={`px-3.5 py-1.5 text-xs font-semibold rounded-full transition-all duration-200 flex items-center gap-1.5 cursor-pointer ${
                mediaDropdownOpen 
                  ? 'text-white bg-white/15' 
                  : 'text-slate-300 hover:text-white hover:bg-white/10'
              }`}
            >
              <span>Media</span>
              <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${mediaDropdownOpen ? 'rotate-180 text-blue-400' : 'text-slate-400'}`} />
            </button>

            {/* Dropdown Menu Container */}
            {mediaDropdownOpen && (
              <div className="absolute top-full left-1/2 -translate-x-1/2 pt-2 z-50">
                <div className="w-64 p-2 rounded-2xl bg-[#0b0f17]/95 backdrop-blur-xl border border-white/15 shadow-2xl shadow-black/70 flex flex-col gap-1 animate-in fade-in zoom-in-95 duration-150 text-left">
                  
                  {/* Dropdown Option 1: YouTube Talks */}
                  <a
                    href="#videos"
                    onClick={() => setMediaDropdownOpen(false)}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group cursor-pointer"
                  >
                    <div className="w-8 h-8 rounded-lg bg-red-600/20 text-red-500 group-hover:bg-red-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Play className="w-4 h-4 fill-current ml-0.5" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-red-400 transition-colors">
                        YouTube Talks
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        Recent videos &amp; clinical discussions
                      </div>
                    </div>
                  </a>

                  {/* Dropdown Option 2: Podcast Profile */}
                  <button
                    type="button"
                    onClick={() => {
                      setMediaDropdownOpen(false);
                      onOpenPodcast?.();
                    }}
                    className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-white/10 transition-colors group text-left cursor-pointer w-full"
                  >
                    <div className="w-8 h-8 rounded-lg bg-blue-600/20 text-blue-400 group-hover:bg-blue-600 group-hover:text-white flex items-center justify-center shrink-0 transition-colors">
                      <Mic className="w-4 h-4" />
                    </div>
                    <div className="min-w-0">
                      <div className="text-xs font-bold text-white group-hover:text-blue-400 transition-colors flex items-center gap-1.5">
                        <span>Podcast Profile</span>
                        <span className="text-[9px] px-1.5 py-0.5 rounded-full bg-blue-500/30 text-blue-300 font-semibold leading-none">Deck</span>
                      </div>
                      <div className="text-[10px] text-slate-400 truncate">
                        “Healing Health with Communication”
                      </div>
                    </div>
                  </button>

                </div>
              </div>
            )}
          </div>

          {/* 3. Other Core Navigation Links */}
          {standardNavLinks.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-300 hover:text-white hover:bg-white/10 rounded-full transition-all duration-200"
            >
              {link.label}
            </a>
          ))}
        </nav>

        {/* Right Action Button: Get started > */}
        <div className="hidden sm:flex items-center gap-3">
          <button
            onClick={onOpenConsultation}
            className="flex items-center gap-2 pl-4 pr-1.5 py-1.5 rounded-full text-xs font-bold bg-[#e3dfd7] hover:bg-white text-slate-950 shadow-md transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
          >
            <span>Get started</span>
            <div className="w-6 h-6 rounded-full bg-slate-900/10 group-hover:bg-slate-900/20 flex items-center justify-center transition-colors">
              <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
            </div>
          </button>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex sm:hidden items-center">
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2.5 rounded-full glass-pill text-slate-200 hover:text-white"
            aria-label="Toggle navigation menu"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="lg:hidden mt-3 max-w-sm mx-auto p-5 rounded-3xl glass-pill shadow-2xl border border-white/10 flex flex-col gap-2.5">
          
          {/* About */}
          <a
            href="#about"
            onClick={() => setMobileMenuOpen(false)}
            className="px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all"
          >
            About
          </a>

          {/* Media Expandable Group */}
          <div className="flex flex-col rounded-xl bg-white/5 border border-white/10 overflow-hidden">
            <button
              type="button"
              onClick={() => setMobileMediaOpen(!mobileMediaOpen)}
              className="px-4 py-2.5 text-sm font-semibold text-white flex items-center justify-between transition-colors"
            >
              <span className="flex items-center gap-2">
                <span>Media</span>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-blue-600/40 text-blue-300 font-bold uppercase tracking-wider">Talks &amp; Deck</span>
              </span>
              <ChevronDown className={`w-4 h-4 text-slate-400 transition-transform ${mobileMediaOpen ? 'rotate-180 text-blue-400' : ''}`} />
            </button>

            {mobileMediaOpen && (
              <div className="px-2 pb-2 pt-1 flex flex-col gap-1 border-t border-white/10">
                <a
                  href="#videos"
                  onClick={() => setMobileMenuOpen(false)}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2.5"
                >
                  <Play className="w-3.5 h-3.5 text-red-500 fill-current" />
                  <span>YouTube Talks</span>
                </a>
                <button
                  type="button"
                  onClick={() => {
                    setMobileMenuOpen(false);
                    onOpenPodcast?.();
                  }}
                  className="px-3 py-2 text-xs font-medium text-slate-300 hover:text-white hover:bg-white/10 rounded-lg flex items-center gap-2.5 text-left w-full cursor-pointer"
                >
                  <Mic className="w-3.5 h-3.5 text-blue-400" />
                  <span>Podcast Profile &amp; Deck</span>
                </button>
              </div>
            )}
          </div>

          {/* Remaining Standard Links (Contact Desk removed!) */}
          {standardNavLinks.slice(1).map((link) => (
            <a
              key={link.label}
              href={link.href}
              onClick={() => setMobileMenuOpen(false)}
              className="px-4 py-2.5 text-sm font-semibold text-slate-200 hover:text-blue-400 hover:bg-white/5 rounded-xl transition-all"
            >
              {link.label}
            </a>
          ))}

          {/* Bottom CTA Button */}
          <div className="pt-2 border-t border-white/10 flex flex-col gap-2">
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onOpenConsultation();
              }}
              className="w-full flex items-center justify-center gap-2 py-3 rounded-xl text-xs font-bold uppercase bg-blue-600 hover:bg-blue-500 text-white shadow-lg shadow-blue-600/30 cursor-pointer transition-all"
            >
              <span>Get started</span>
              <ChevronRight className="w-4 h-4 stroke-[2.5]" />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
