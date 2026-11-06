import React from 'react';
import { Heart, Users, ShieldCheck, Globe } from 'lucide-react';

export default function FounderQuoteBanner() {
  return (
    <section 
      id="founder-promise" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f4f8fe] via-[#f9fbff] to-[#ffffff] text-slate-900 select-none border-t border-slate-200/60"
    >
      {/* ================= ATMOSPHERIC LAYER ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft curving organic ambient wave on left */}
        <svg 
          className="absolute left-0 top-0 w-full h-full opacity-[0.25] pointer-events-none" 
          viewBox="0 0 1440 600" 
          fill="none" 
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="none"
        >
          <path 
            d="M -100,120 C 180,60 260,340 540,240 C 720,180 840,400 1100,320" 
            stroke="#1877f2" 
            strokeWidth="2.5" 
            strokeOpacity="0.35"
            strokeDasharray="6 6"
          />
          <path 
            d="M -60,260 C 220,160 320,460 620,360 C 820,290 980,480 1200,420" 
            stroke="#1877f2" 
            strokeWidth="1.5" 
            strokeOpacity="0.2" 
          />
        </svg>

        {/* Soft ambient blue glow behind the founder photo */}
        <div className="absolute top-1/4 left-10 w-96 h-96 bg-blue-100/50 rounded-full blur-3xl pointer-events-none" />
      </div>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ================= MAIN FLOATING WHITE CARD ================= */}
        <div className="rounded-[32px] sm:rounded-[40px] bg-white border border-slate-200/80 shadow-[0_12px_45px_rgba(15,23,42,0.05)] p-6 sm:p-10 lg:p-12 relative">
          
          <div className="flex flex-col lg:flex-row items-center lg:items-start justify-between gap-8 lg:gap-12">
            
            {/* ================= LEFT: FOUNDER PORTRAIT + FLOATING BADGE ================= */}
            <div className="relative shrink-0">
              {/* Founder Image Container */}
              <div className="w-48 h-48 sm:w-56 sm:h-56 lg:w-60 lg:h-60 rounded-[24px] sm:rounded-[28px] overflow-hidden bg-slate-950 shadow-xl border border-slate-100 relative">
                <img
                  src="/assets/founder-portrait.webp"
                  alt="Dushyant Singh Chauhan"
                  className="w-full h-full object-cover object-top filter contrast-[1.03] brightness-[1.02]"
                  loading="lazy"
                />
              </div>

              {/* Overlapping Floating Badge: People First Always */}
              <div className="absolute -bottom-4 -left-3 sm:-bottom-5 sm:-left-4 z-20 rounded-2xl bg-white border border-slate-200/90 shadow-[0_8px_24px_rgba(15,23,42,0.1)] p-2.5 sm:p-3 flex items-center gap-3 backdrop-blur-xs">
                <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-[#edf4fd] border border-blue-100 text-[#1877f2] flex items-center justify-center shrink-0 shadow-2xs">
                  <Heart className="w-4 h-4 sm:w-5 sm:h-5 fill-current stroke-[1.5]" />
                </div>
                <div className="text-left">
                  <span className="text-xs sm:text-sm font-extrabold text-[#071A41] leading-tight block">
                    People First
                  </span>
                  <span className="text-[10px] sm:text-xs text-slate-400 font-semibold leading-tight block mt-0.5">
                    Always
                  </span>
                </div>
              </div>
            </div>

            {/* ================= MIDDLE: MESSAGE FROM THE FOUNDER & QUOTE ================= */}
            <div className="flex-1 flex flex-col justify-between pt-4 lg:pt-0 lg:px-2 text-left">
              
              {/* Eyebrow Pill Badge */}
              <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#edf4fd] border border-blue-200/70 text-[#1877f2] text-xs font-bold uppercase tracking-wider mb-4 self-start">
                <Heart className="w-3.5 h-3.5 fill-current stroke-[1.5]" />
                <span>MESSAGE FROM THE FOUNDER</span>
              </div>

              {/* Large Quote Headline with Decorative Pale Blue Quote Mark */}
              <div className="relative mb-6">
                {/* Pale blue quotation mark mark */}
                <div className="text-[#cfe3ff] text-5xl sm:text-6xl font-serif font-black select-none leading-none -mb-3 opacity-90">
                  “
                </div>
                <h3 className="text-xl sm:text-2xl lg:text-[30px] xl:text-[32px] font-extrabold text-[#071A41] tracking-tight leading-[1.25]">
                  "Our promise is simple:<br />
                  Every patient is treated with the care{" "}
                  <br className="hidden sm:inline" />
                  and dignity we would want for our own family."
                </h3>
              </div>

              {/* Founder Identity & Credential Details Row */}
              <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-2 border-t border-slate-100">
                {/* Name & Title */}
                <div>
                  <h4 className="text-base sm:text-lg font-extrabold text-[#071A41] tracking-tight leading-tight">
                    Dushyant Singh Chauhan
                  </h4>
                  <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-0.5">
                    Founder &amp; CEO, HealthBravo
                  </p>
                </div>

                {/* Vertical Divider */}
                <div className="hidden sm:block w-[1px] h-8 bg-slate-200 mx-3 self-center" />

                {/* Pre-Incubation Institution */}
                <div className="flex items-start gap-2">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1877f2] mt-1.5 shrink-0 inline-block" />
                  <div>
                    <span className="text-xs sm:text-[13px] text-slate-600 font-semibold block leading-tight">
                      Govt. Institute of Medical Sciences (GIMS)
                    </span>
                    <span className="text-xs sm:text-[13px] text-slate-500 font-normal block leading-tight mt-0.5">
                      Pre-Incubated
                    </span>
                  </div>
                </div>
              </div>

            </div>

            {/* ================= RIGHT: SCRIPT STATEMENT & SIGNATURE ================= */}
            <div className="flex flex-col sm:flex-row lg:flex-col justify-between items-start sm:items-center lg:items-end shrink-0 w-full lg:w-auto pt-6 lg:pt-0 border-t lg:border-t-0 border-slate-100 select-none gap-6 sm:gap-4">
              
              {/* Top: Handwritten Script Brand Flourish */}
              <div className="flex flex-col items-start lg:items-end leading-[1.1] w-fit">
                <span 
                  className="italic text-slate-700 text-xl sm:text-2xl font-medium tracking-tight transform -rotate-5 inline-block"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Better Care
                </span>
                <span 
                  className="italic text-slate-700 text-xl sm:text-2xl font-medium tracking-tight transform -rotate-5 mt-0.5 inline-block"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Brighter Tomorrows
                </span>
                <svg width="140" height="8" viewBox="0 0 140 8" fill="none" className="text-[#1877f2] mt-0.5">
                  <path d="M2 5 C40 1, 95 1, 138 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>

              {/* Bottom: Authentic Cursive Signature */}
              <div className="flex flex-col items-start lg:items-end w-fit">
                <span 
                  className="text-slate-800 text-2xl sm:text-[30px] font-semibold tracking-wide transform -rotate-3 inline-block"
                  style={{ fontFamily: "'Caveat', cursive, sans-serif" }}
                >
                  Dushyant Singh Chauhan
                </span>
                <svg width="140" height="12" viewBox="0 0 140 12" fill="none" className="text-[#071A41] -mt-1">
                  <path d="M5 7 Q 45 2, 90 8 T 135 5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
                </svg>
              </div>

            </div>

          </div>

        </div>

        {/* ================= HORIZONTAL CREDIBILITY STRIP (Floating on Background) ================= */}
        <div className="mt-12 sm:mt-16">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 items-center max-w-[1240px] mx-auto">
            
            {/* Item 1: Patient-Centric Approach */}
            <div className="flex items-center gap-4 justify-start sm:justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#edf4fd] border border-blue-100 text-[#1877f2] flex items-center justify-center shrink-0 shadow-2xs">
                <Users className="w-6 h-6 stroke-[1.9]" />
              </div>
              <div className="text-left">
                <h4 className="text-base sm:text-[17px] font-bold text-[#071A41] tracking-tight leading-tight">
                  Patient-Centric Approach
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 leading-snug">
                  People. Purpose. Progress.
                </p>
              </div>
            </div>

            {/* Item 2: Trusted Leadership */}
            <div className="flex items-center gap-4 justify-start sm:justify-center md:border-x md:border-slate-200/70 md:px-6">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#edf4fd] border border-blue-100 text-[#1877f2] flex items-center justify-center shrink-0 shadow-2xs">
                <ShieldCheck className="w-6 h-6 stroke-[1.9]" />
              </div>
              <div className="text-left">
                <h4 className="text-base sm:text-[17px] font-bold text-[#071A41] tracking-tight leading-tight">
                  Trusted Leadership
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 leading-snug">
                  Building a Healthier India
                </p>
              </div>
            </div>

            {/* Item 3: Stronger Partnerships */}
            <div className="flex items-center gap-4 justify-start sm:justify-center">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-full bg-[#edf4fd] border border-blue-100 text-[#1877f2] flex items-center justify-center shrink-0 shadow-2xs">
                <Globe className="w-6 h-6 stroke-[1.9]" />
              </div>
              <div className="text-left">
                <h4 className="text-base sm:text-[17px] font-bold text-[#071A41] tracking-tight leading-tight">
                  Stronger Partnerships
                </h4>
                <p className="text-xs sm:text-[13px] text-slate-500 font-medium mt-1 leading-snug">
                  For Global Impact
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
