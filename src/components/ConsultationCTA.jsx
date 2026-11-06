import React from 'react';
import { 
  ArrowRight, 
  UserCheck, 
  Building2, 
  Globe, 
  ShieldCheck, 
  FileText, 
  Users 
} from 'lucide-react';
import { WhatsappIcon } from './Icons';

export default function ConsultationCTA({ onOpenConsultation }) {
  const networkCards = [
    {
      id: "patients",
      icon: Users,
      title: "Patients & Families",
      description: "Direct clinical navigation, visa expedited support & personal bedside advocacy.",
      context: "patient_family"
    },
    {
      id: "hospitals",
      icon: Building2,
      title: "Hospitals & Institutions",
      description: "Direct strategic alliances, transparent doctor pricing & clinical partnerships.",
      context: "hospital_partner"
    },
    {
      id: "facilitators",
      icon: Globe,
      title: "Global Facilitators",
      description: "Ethical cross-border routing for embassies, aggregators & international insurers.",
      context: "global_facilitator"
    }
  ];

  return (
    <section 
      id="contact" 
      className="relative py-24 sm:py-32 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f8fafd] via-[#ffffff] to-[#f4f8fe] text-slate-900 select-none border-t border-slate-200/60"
    >
      {/* ================= ATMOSPHERIC LAYER ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {/* Soft radial illumination from corners */}
        <div className="absolute -top-32 -right-32 w-[600px] h-[600px] bg-gradient-to-bl from-blue-100/50 via-sky-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        <div className="absolute -bottom-32 -left-32 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 via-indigo-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />

        {/* Organic wavy decorative contours along edges */}
        <svg 
          className="absolute w-full h-full inset-0 opacity-[0.04] pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,80 C360,200 520,30 820,150 C1120,270 1260,90 1440,160 L1440,900 L0,900 Z" 
            fill="#1877f2" 
          />
          <path 
            d="M0,220 C420,100 580,280 900,160 C1220,40 1340,220 1440,130 L1440,900 L0,900 Z" 
            fill="#071A41" 
          />
        </svg>

        {/* Faint Healthcare Cross Watermark at Bottom Right */}
        <div className="absolute -bottom-14 -right-14 w-80 h-80 opacity-[0.06] pointer-events-none">
          <svg viewBox="0 0 200 200" fill="none" className="w-full h-full text-[#1877f2]">
            <path 
              d="M70 20 H130 V70 H180 V130 H130 V180 H70 V130 H20 V70 H70 V20 Z" 
              stroke="currentColor" 
              strokeWidth="4" 
              strokeLinejoin="round" 
            />
          </svg>
        </div>
      </div>

      {/* ================= MAIN CONTENT WRAPPER ================= */}
      <div className="max-w-[1440px] mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 xl:gap-20 items-center">
          
          {/* ================= LEFT COLUMN: CONTENT & ACTIONS (~55% width) ================= */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Small uppercase eyebrow label with horizontal blue accent line */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-4">
              <span>EXECUTIVE COLLABORATION &amp; PATIENT INQUIRIES</span>
              <span className="h-[2px] w-12 bg-[#1877f2]/60 rounded-full inline-block"></span>
            </div>

            {/* Founder Core Promise Callout (Communicating Founder's Message via Editorial Typography) */}
            <div className="inline-flex items-center gap-2.5 px-3.5 py-1.5 rounded-full bg-blue-50/90 border border-blue-100/90 text-slate-700 text-xs sm:text-[13px] font-medium mb-5 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#1877f2] shrink-0 animate-pulse" />
              <span className="italic text-slate-800 font-serif font-medium">"Our promise is simple: Every patient is treated with dignity &amp; family-level care."</span>
              <span className="text-slate-400 text-[11px] hidden sm:inline">• Dushyant S. Chauhan</span>
            </div>

            {/* Large bold dark-navy headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] xl:text-[54px] font-extrabold text-[#071A41] tracking-tight leading-[1.12] mb-5">
              Let’s Build the Future of <br className="hidden sm:inline" />
              <span className="text-[#071A41]">Healthcare, Together.</span>
            </h2>

            {/* Restrained slate-blue/gray supporting paragraph */}
            <p className="text-base sm:text-[17px] text-slate-600 leading-relaxed font-normal mb-8 max-w-xl">
              Whether you are an international family seeking world-class surgical care in India, a hospital administrator exploring partnerships, or an overseas facilitator looking for ethical ground representation—connect with Dushyant today.
            </p>

            {/* Action Buttons Row */}
            <div className="flex flex-wrap items-center gap-4 mb-10 w-full sm:w-auto">
              {/* Primary CTA: Schedule Consultation */}
              <button
                onClick={() => onOpenConsultation?.({ source: "executive_section" })}
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-[#1877f2] hover:bg-blue-600 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all duration-300 hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
              >
                <span>Schedule Consultation</span>
                <ArrowRight className="w-4 h-4 stroke-[2.4] transform group-hover:translate-x-1.5 transition-transform duration-200" />
              </button>

              {/* Secondary CTA: Direct WhatsApp */}
              <a
                href="https://wa.me/919999089087?text=Hello%20Dushyant,%20I%20would%20like%20to%20consult%20regarding%20healthcare%20services%20and%20HealthTravo."
                target="_blank"
                rel="noopener noreferrer"
                className="group w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-6 py-4 rounded-full bg-white hover:bg-slate-50 text-[#071A41] border border-slate-200/90 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xs hover:shadow-md transition-all duration-300 hover:-translate-y-0.5 active:scale-[0.98] cursor-pointer"
              >
                <WhatsappIcon className="w-4 h-4 text-emerald-600 fill-current" />
                <span>Direct WhatsApp</span>
              </a>
            </div>

            {/* Horizontal Credibility Row (Clean, Open, Floating on Background) */}
            <div className="pt-6 border-t border-slate-200/70 w-full">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-2 lg:gap-4 items-center">
                
                {/* Item 1: Direct Founder Response */}
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0">
                    <UserCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#071A41]">
                    Direct Founder Response
                  </span>
                </div>

                {/* Item 2: Hospital Direct Billing */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200/80 sm:pl-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0">
                    <ShieldCheck className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#071A41]">
                    Hospital Direct Billing
                  </span>
                </div>

                {/* Item 3: Fast-Track Visa Letters */}
                <div className="flex items-center gap-2.5 sm:border-l sm:border-slate-200/80 sm:pl-4">
                  <div className="w-8 h-8 rounded-full bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0">
                    <FileText className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <span className="text-xs sm:text-[13px] font-semibold text-[#071A41]">
                    Fast-Track Visa Letters
                  </span>
                </div>

              </div>
            </div>

          </div>

          {/* ================= RIGHT COLUMN: HEALTHCARE NETWORK VISUALIZATION (~45% width) ================= */}
          <div className="lg:col-span-5 relative">
            
            {/* Upper Right: Handwritten script editorial statement matching Strategic Pillars reference */}
            <div className="flex justify-end mb-4 sm:mb-6 pr-2">
              <div className="flex flex-col items-end leading-[1.1] select-none">
                <span 
                  className="italic text-slate-700 text-xl sm:text-2xl font-medium tracking-tight transform -rotate-4"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  Healthcare Without Borders
                </span>
                <svg width="170" height="8" viewBox="0 0 170 8" fill="none" className="text-[#1877f2] -mt-0.5">
                  <path d="M2 5 C50 1, 120 1, 168 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Container for the 3 Floating Network Cards + Background World Map / Connectivity Mesh */}
            <div className="relative p-2 sm:p-4">
              
              {/* ===== DOTTED WORLD MAP & CONNECTION PATHS (Extremely subtle, faint background) ===== */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
                <svg 
                  className="w-full h-full opacity-[0.14] text-[#1877f2]" 
                  viewBox="0 0 500 420" 
                  fill="none" 
                  xmlns="http://www.w3.org/2000/svg" 
                  preserveAspectRatio="xMidYMid meet"
                >
                  {/* Subtle Dotted Matrix Pattern representing continents */}
                  <pattern id="world-dots" x="0" y="0" width="16" height="16" patternUnits="userSpaceOnUse">
                    <circle cx="2" cy="2" r="1.2" fill="currentColor" opacity="0.6" />
                  </pattern>
                  <rect width="500" height="420" fill="url(#world-dots)" />

                  {/* Elegant Geodesic Curved Connection Arcs */}
                  <path 
                    d="M 60,80 Q 220,30 380,120" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                    opacity="0.8" 
                  />
                  <path 
                    d="M 80,240 Q 260,180 420,260" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                    opacity="0.7" 
                  />
                  <path 
                    d="M 140,340 Q 300,280 440,360" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeDasharray="4 4" 
                    opacity="0.6" 
                  />

                  {/* Pulsing Blue Nodes along connection paths */}
                  <circle cx="60" cy="80" r="4" fill="#1877f2" />
                  <circle cx="380" cy="120" r="4" fill="#1877f2" />
                  <circle cx="260" cy="180" r="3.5" fill="#1877f2" />
                  <circle cx="420" cy="260" r="4" fill="#1877f2" />
                </svg>

                {/* Subtle Glowing Globe Wireframe at Lower-Right Edge (Partially Cropped) */}
                <div className="absolute -bottom-12 -right-12 w-64 h-64 rounded-full opacity-[0.12] border-2 border-[#1877f2] flex items-center justify-center pointer-events-none">
                  <div className="w-52 h-52 rounded-full border border-[#1877f2] border-dashed" />
                  <div className="absolute inset-0 bg-radial from-blue-400/30 to-transparent blur-xl" />
                </div>
              </div>

              {/* ===== THREE FLOATING INFORMATION CARDS ===== */}
              <div className="relative z-10 flex flex-col gap-4 sm:gap-5">
                {networkCards.map((card, idx) => {
                  const IconComp = card.icon;
                  // Subtle progressive horizontal offset creating an editorial rhythm
                  const offsetClass = 
                    idx === 0 ? "sm:translate-x-0" :
                    idx === 1 ? "sm:translate-x-3 lg:translate-x-4" :
                    "sm:translate-x-1 lg:translate-x-2";

                  return (
                    <div
                      key={card.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => onOpenConsultation?.({ source: `network_${card.id}`, context: card.context })}
                      onKeyDown={(e) => {
                        if (e.key === 'Enter' || e.key === ' ') {
                          e.preventDefault();
                          onOpenConsultation?.({ source: `network_${card.id}`, context: card.context });
                        }
                      }}
                      className={`group cursor-pointer rounded-2xl sm:rounded-[24px] bg-white/95 backdrop-blur-xs border border-slate-200/80 hover:border-[#1877f2]/50 p-4 sm:p-5 shadow-[0_8px_24px_rgba(15,23,42,0.04)] hover:shadow-[0_16px_36px_rgba(24,119,242,0.12)] transition-all duration-300 transform ${offsetClass} hover:-translate-y-1.5 focus:outline-hidden text-left flex items-center justify-between gap-4`}
                    >
                      {/* Left: Pale-Blue Circular Icon Container + Content */}
                      <div className="flex items-center gap-4 min-w-0">
                        <div className="w-12 h-12 sm:w-13 sm:h-13 rounded-2xl bg-[#edf4fd] border border-blue-100/90 text-[#1877f2] flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform duration-300 shadow-2xs">
                          <IconComp className="w-5 h-5 sm:w-6 sm:h-6 stroke-[2]" />
                        </div>
                        <div className="min-w-0">
                          <h3 className="text-base sm:text-lg font-bold text-[#071A41] tracking-tight leading-snug group-hover:text-[#1877f2] transition-colors duration-200 truncate">
                            {card.title}
                          </h3>
                          <p className="text-xs sm:text-[13px] text-slate-500 leading-snug font-normal mt-0.5 line-clamp-2">
                            {card.description}
                          </p>
                        </div>
                      </div>

                      {/* Right: Minimal Circular Arrow Action */}
                      <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-slate-100/90 group-hover:bg-[#1877f2] text-slate-400 group-hover:text-white flex items-center justify-center shrink-0 shadow-2xs transition-all duration-200 group-hover:scale-105">
                        <ArrowRight className="w-3.5 h-3.5 stroke-[2.4] transform group-hover:translate-x-0.5 transition-transform duration-200" />
                      </div>
                    </div>
                  );
                })}
              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
}
