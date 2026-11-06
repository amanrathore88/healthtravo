import React, { useState, useEffect } from 'react';
import { ChevronRight, Mic } from 'lucide-react';
import HeroImageReveal from './HeroImageReveal';

/**
 * TypewriterRole:
 * Smoothly types & cycles through key executive titles with a glowing neon cursor.
 */
function TypewriterRole() {
  const roles = [
    "Healthcare Strategist & International Patient Advocate",
    "Founder & CEO of HealthTravo (GIMS Pre-Incubated)",
    "Cross-Border Clinical Care Navigator",
    "Zero-Markup Hospital Pricing Pioneer",
  ];
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = roles[roleIndex];
    let timer;

    if (!isDeleting) {
      if (displayedText.length < current.length) {
        timer = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length + 1));
        }, 38);
      } else {
        timer = setTimeout(() => {
          setIsDeleting(true);
        }, 2400);
      }
    } else {
      if (displayedText.length > 0) {
        timer = setTimeout(() => {
          setDisplayedText(current.slice(0, displayedText.length - 1));
        }, 20);
      } else {
        setIsDeleting(false);
        setRoleIndex((prev) => (prev + 1) % roles.length);
      }
    }

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  return (
    <span className="inline-flex items-center min-h-[22px]">
      <span className="tracking-widest uppercase text-[11px] sm:text-xs font-semibold text-slate-300">
        {displayedText}
      </span>
      <span className="inline-block w-[2px] h-3 sm:h-3.5 bg-blue-400 ml-1.5 animate-typewriter-cursor shadow-[0_0_8px_rgba(96,165,250,0.85)]" />
    </span>
  );
}

/**
 * SnappyLetter:
 * Interactive typography character with:
 * - Load-in elastic kinetic stretch entrance
 * - Tactile snappy vertical stretch + bounce on cursor hover
 */
function SnappyLetter({ char, index, baseDelay = 0 }) {
  const [isHovered, setIsHovered] = useState(false);

  if (char === " ") {
    return <span className="inline-block">&nbsp;</span>;
  }

  return (
    <span
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      style={{
        animationDelay: `${baseDelay + index * 34}ms`,
        transform: isHovered
          ? "scaleY(1.24) scaleX(0.86) translateY(-5px)"
          : "scale(1)",
        transformOrigin: "bottom center",
        transition:
          "transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), color 0.2s ease, text-shadow 0.2s ease",
      }}
      className={`animate-snappy-letter cursor-pointer select-none transition-colors ${
        isHovered
          ? "text-blue-300 drop-shadow-[0_0_15px_rgba(147,197,253,0.75)]"
          : "text-white"
      }`}
    >
      {char}
    </span>
  );
}

function SnappyWord({ word, baseDelay = 0 }) {
  return (
    <span className="inline-block whitespace-nowrap">
      {word.split("").map((char, idx) => (
        <SnappyLetter
          key={idx}
          char={char}
          index={idx}
          baseDelay={baseDelay}
        />
      ))}
    </span>
  );
}

export default function Hero({ onOpenConsultation, onOpenPodcast }) {
  // Active indicator state for the bottom 4 glass points
  const [activePoint, setActivePoint] = useState(0);

  const heroPoints = [
    {
      num: "01",
      title: "Clinical Advocate",
      desc: "8+ Years guiding international families through India's medical corridors with radical transparency.",
    },
    {
      num: "02",
      title: "GIMS Pre-Incubated",
      desc: "Officially recognized & incubated under the Government Institute of Medical Sciences for health innovation.",
    },
    {
      num: "03",
      title: "Hospital Strategist",
      desc: "Former International Head across premier accredited super-specialties: Max, Fortis, Artemis, Yatharth.",
    },
    {
      num: "04",
      title: "360° Concierge",
      desc: "Zero-markup hospital pricing (60–80% savings), bedside advocacy, and lifetime remote continuity.",
    },
  ];

  return (
    <section 
      id="hero" 
      className="relative min-h-screen lg:min-h-screen pt-16 sm:pt-18 lg:pt-20 pb-4 sm:pb-5 lg:pb-6 px-4 sm:px-6 lg:px-10 xl:px-12 bg-[#06080e] text-white flex flex-col justify-between overflow-hidden selection:bg-blue-600 selection:text-white"
    >
      {/* Ambient Glows */}
      <div className="absolute top-1/4 right-[10%] w-[600px] h-[600px] bg-blue-600/15 rounded-full blur-[150px] pointer-events-none z-0" />
      <div className="absolute top-12 left-1/4 w-[400px] h-[400px] bg-slate-800/20 rounded-full blur-[120px] pointer-events-none z-0" />
      <div className="absolute bottom-1/4 right-0 w-[450px] h-[450px] bg-sky-500/10 rounded-full blur-[130px] pointer-events-none z-0" />

      {/* 1. FOUNDER & PATIENT IMAGE: Interactive Smoky Color Reveal on Hover */}
      <div className="hidden lg:flex absolute right-[-25px] sm:right-[-15px] lg:right-[-10px] xl:right-0 bottom-0 z-10 pointer-events-auto items-end justify-end">
        <HeroImageReveal />
      </div>

      {/* 2. HERO MAIN CONTENT: Positioned on the left beside the image, flowing along the red path */}
      <div className="w-full max-w-[1680px] mx-auto flex-1 flex flex-col justify-center z-20 my-auto py-1 pointer-events-none">
        
        {/* Left Column: Flowing Typography & CTAs along the shoulder contour */}
        <div className="max-w-2xl xl:max-w-3xl flex flex-col items-start pl-1 sm:pl-3 lg:pl-4 pointer-events-auto">
          
          {/* Eyebrow matching reference « ... » style with dynamic Typewriter effect */}
          <div className="inline-flex items-center gap-1.5 text-xs sm:text-sm text-slate-400 font-medium tracking-wide mb-2.5 sm:mb-3 min-h-[24px]">
            <span className="text-slate-500 font-serif text-base select-none">«</span>
            <TypewriterRole />
            <span className="text-slate-500 font-serif text-base select-none">»</span>
          </div>

          {/* Headline: Full Name Dushyant Singh Chauhan with Snappy Kinetic Text Stretch */}
          <h1 className="text-4xl sm:text-5xl lg:text-[64px] xl:text-[76px] font-bold text-white tracking-tight leading-[1.0] mb-3 sm:mb-4 font-sans select-none">
            <SnappyWord word="Dushyant" baseDelay={0} />{" "}
            <SnappyWord word="Singh" baseDelay={260} /> <br />
            <SnappyWord word="Chauhan" baseDelay={500} />
          </h1>

          {/* Subtitle: Cleanly bounded within the red box with zero overlap over the patient */}
          <p className="text-xs sm:text-sm lg:text-[15px] text-slate-300 max-w-md lg:max-w-[440px] xl:max-w-[460px] leading-relaxed mb-4 sm:mb-5 font-normal drop-shadow-sm">
            Standing beside with international patients through every step of their healing journey in India. Founder &amp; CEO of HealthTravo (pre-incubated at GIMS), re-engineering cross-border care with zero-markup hospital pricing and deeply personal advocacy.
          </p>

          {/* Action Buttons matching Reference */}
          <div className="flex flex-wrap items-center gap-3 sm:gap-4 w-full sm:w-auto mb-2.5">
            
            {/* Primary Action: Royal Blue Pill with White Circle Arrow Disc */}
            <button
              onClick={onOpenConsultation}
              className="inline-flex items-center justify-between gap-4 pl-6 pr-2 py-2 rounded-full bg-blue-600 hover:bg-blue-500 text-white text-xs sm:text-sm font-semibold shadow-xl shadow-blue-600/35 transition-all duration-300 hover:scale-105 active:scale-95 group cursor-pointer"
            >
              <span>Consult with Dushyant</span>
              <div className="w-7 h-7 rounded-full bg-white text-blue-600 flex items-center justify-center transition-transform group-hover:translate-x-0.5 shadow-md">
                <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
              </div>
            </button>

            {/* Secondary Action: Connects to Podcast Profile */}
            <button
              onClick={onOpenPodcast}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/[0.08] hover:bg-white/[0.15] text-slate-200 hover:text-white text-xs sm:text-sm font-semibold border border-white/[0.15] backdrop-blur-md transition-all duration-300 shadow-md cursor-pointer group"
            >
              <Mic className="w-3.5 h-3.5 text-red-400 group-hover:scale-110 transition-transform" />
              <span>Explore Podcast Profile</span>
              <ChevronRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-white group-hover:translate-x-0.5 transition-all" />
            </button>

          </div>

          {/* Authentic Trust Signal Tag */}
          <div className="inline-flex items-center gap-2 text-[10px] sm:text-[11px] text-slate-400 font-medium">
            <span className="inline-block w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Direct Bedside Advocacy for International Families • GIMS Pre-Incubated</span>
          </div>

        </div>

        {/* Mobile-only image render (with interactive touch smoke reveal) */}
        <div className="lg:hidden flex justify-center mt-6 z-10">
          <HeroImageReveal imageClassName="max-h-[38vh] w-auto object-contain drop-shadow-xl select-none block pointer-events-none" />
        </div>

      </div>

      {/* 3. BOTTOM 4 POINTS: MOVED UP, FULLY VISIBLE, FLOATING DIRECTLY IN FRONT OF IMAGE */}
      <div className="w-full max-w-[1680px] mx-auto z-20 px-1 sm:px-3 lg:px-4 mt-1 sm:mt-2 pb-2 sm:pb-3">
        
        {/* Horizontal Progress / Indicator Hairline */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 lg:gap-5 mb-2 sm:mb-2.5">
          {heroPoints.map((_, idx) => (
            <div key={idx} className="relative h-[2px] w-full rounded-full overflow-hidden bg-white/15">
              {activePoint === idx && (
                <div className="absolute inset-0 bg-white shadow-[0_0_10px_rgba(255,255,255,0.9)] transition-all duration-500" />
              )}
            </div>
          ))}
        </div>

        {/* 4 Points with True Frosted Glassmorphism sitting in front of bottom of image */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-2.5 sm:gap-3 lg:gap-5">
          {heroPoints.map((point, index) => {
            const isActive = activePoint === index;
            return (
              <div
                key={point.num}
                onClick={() => setActivePoint(index)}
                className={`relative backdrop-blur-2xl transition-all duration-300 rounded-xl lg:rounded-2xl p-2.5 sm:p-3 lg:p-3.5 cursor-pointer select-none group border ${
                  isActive 
                    ? 'bg-white/[0.12] border-white/40 shadow-[inset_0_1px_1px_rgba(255,255,255,0.3),0_15px_35px_rgba(0,0,0,0.6)]' 
                    : 'bg-white/[0.05] hover:bg-white/[0.09] border-white/[0.12] hover:border-white/[0.24] shadow-[inset_0_1px_1px_rgba(255,255,255,0.15),0_10px_25px_rgba(0,0,0,0.4)]'
                }`}
              >
                {/* Header: Circle Number + Title */}
                <div className="flex items-center gap-2">
                  <span className={`inline-flex items-center justify-center w-5 h-5 rounded-full text-[10px] font-mono font-bold transition-colors border ${
                    isActive 
                      ? 'border-blue-400 bg-blue-500/20 text-blue-300' 
                      : 'border-white/25 text-slate-300 group-hover:border-white/40 group-hover:text-white'
                  }`}>
                    {point.num}
                  </span>
                  <h3 className={`text-xs sm:text-sm font-bold tracking-wide transition-colors ${
                    isActive ? 'text-white' : 'text-slate-100 group-hover:text-white'
                  }`}>
                    {point.title}
                  </h3>
                </div>

                {/* Subtitle / Description */}
                <p className="text-[11px] sm:text-xs text-slate-300 group-hover:text-slate-200 mt-1 leading-relaxed font-normal">
                  {point.desc}
                </p>
              </div>
            );
          })}
        </div>

      </div>

    </section>
  );
}
