import React, { useState } from 'react';
import { 
  ArrowRight, 
  ArrowLeft, 
  UserCheck, 
  Building2, 
  Play, 
  Globe, 
  Users, 
  ShieldCheck 
} from 'lucide-react';

const PILLARS_CONFIG = [
  {
    id: "continuum",
    number: "01",
    title: "360° Patient Care Continuum",
    description: "A patient-centric operating system integrating medical visa, VIL letters, FRRO compliance, and bedside support.",
    image: "/assets/pillars/patient-care.jpg",
    icon: UserCheck,
    bgPosition: "left bottom",
    linkText: "Explore"
  },
  {
    id: "alliances",
    number: "02",
    title: "Accredited Hospital Alliances",
    description: "Direct strategic partnerships with JCI and NABH accredited institutions ensuring transparent doctor estimates.",
    image: "/assets/pillars/hospital-alliances.jpg",
    icon: Building2,
    bgPosition: "center top",
    linkText: "Explore"
  },
  {
    id: "media",
    number: "03",
    title: "Healthcare Media & Insights",
    description: "Host of HealthTravo on YouTube, producing expert interviews on cancer prevention, genomics, and clinical innovations.",
    image: "/assets/pillars/health-media.jpg",
    icon: Play,
    bgPosition: "right center",
    linkText: "Explore"
  },
  {
    id: "diplomacy",
    number: "04",
    title: "B2B & Diplomatic Healthcare",
    description: "Enabling embassies, offshore aggregators, and corporate wellness partners to route patients with legal support.",
    image: "/assets/pillars/diplomatic-b2b.jpg",
    icon: Globe,
    bgPosition: "right bottom",
    linkText: "Explore"
  }
];

/* Perspective rotation angles per card position: -1deg, -0.25deg, +0.25deg, +1deg */
const CARD_ROTATIONS = ['-1deg', '-0.25deg', '0.25deg', '1deg'];

export default function StrategicPillars({ onOpenConsultation }) {
  const [activePillar, setActivePillar] = useState(0);
  const carouselRef = React.useRef(null);

  const scrollToCard = (idx) => {
    setActivePillar(idx);
    if (carouselRef.current) {
      const cards = carouselRef.current.querySelectorAll('[data-pillar-card]');
      if (cards[idx]) {
        cards[idx].scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
      }
    }
  };

  const handlePrev = () => {
    const nextIdx = activePillar > 0 ? activePillar - 1 : PILLARS_CONFIG.length - 1;
    scrollToCard(nextIdx);
  };

  const handleNext = () => {
    const nextIdx = activePillar < PILLARS_CONFIG.length - 1 ? activePillar + 1 : 0;
    scrollToCard(nextIdx);
  };

  const handleSelect = (idx) => {
    scrollToCard(idx);
  };

  return (
    <section 
      id="pillars" 
      className="relative py-20 sm:py-28 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-[#f4f8fe] via-[#f9fbff] to-[#ffffff] text-slate-900 select-none"
    >
      {/* ================= ATMOSPHERIC LAYER (Extremely subtle, masked, peripheral) ================= */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {PILLARS_CONFIG.map((item, idx) => (
          <img
            key={item.id}
            src={item.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover filter blur-[55px] scale-110 transition-all duration-700 ease-in-out ${
              idx === activePillar 
                ? 'opacity-[0.12] translate-y-0 scale-105' 
                : 'opacity-0 translate-y-4 scale-110'
            }`}
            style={{ objectPosition: item.bgPosition }}
          />
        ))}

        {/* Soft atmospheric gradient veil keeping center text and cards visually dominant */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#f4f8fe]/92 via-[#ffffff]/88 to-[#ffffff]/98" />

        {/* Organic wavy decorative contours along edges */}
        <svg 
          className="absolute w-full h-full inset-0 opacity-[0.04] pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,120 C320,240 460,60 760,180 C1060,300 1200,120 1440,200 L1440,900 L0,900 Z" 
            fill="#1877f2" 
          />
          <path 
            d="M0,260 C380,140 540,320 860,200 C1180,80 1300,260 1440,160 L1440,900 L0,900 Z" 
            fill="#071A41" 
          />
        </svg>

        {/* Subtle Decorative Medical Cross Outline at Lower Right Edge */}
        <div className="absolute -bottom-16 -right-16 w-80 h-80 opacity-[0.06] pointer-events-none">
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
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-6">
          <div className="max-w-2xl">
            {/* Small uppercase eyebrow label with thin horizontal blue line */}
            <div className="flex items-center gap-3 text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-2.5">
              <span>INITIATIVES &amp; METHODOLOGY</span>
              <span className="h-[2px] w-12 bg-[#1877f2]/60 rounded-full inline-block"></span>
            </div>

            {/* Large bold dark-navy heading */}
            <h2 className="text-3xl sm:text-4xl lg:text-[50px] font-extrabold text-[#071A41] tracking-tight leading-[1.12]">
              Strategic Healthcare Pillars
            </h2>

            {/* Concise supporting sentence */}
            <p className="text-sm sm:text-base text-slate-500 mt-2.5 font-normal leading-relaxed">
              Integrated initiatives that strengthen healthcare access, awareness and global collaborations for a healthier tomorrow.
            </p>
          </div>

          {/* Top-Right: Handwritten script statement + 2 Circular Carousel Controls */}
          <div className="flex items-center gap-5 sm:gap-7 self-start md:self-end">
            <div className="hidden sm:flex flex-col items-end leading-[1.1] select-none">
              <span 
                className="italic text-slate-700 text-xl sm:text-2xl font-medium tracking-tight transform -rotate-4"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Stronger
              </span>
              <span 
                className="italic text-slate-700 text-xl sm:text-2xl font-medium tracking-tight transform -rotate-4 -mt-1"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Together
              </span>
              <div className="flex flex-col items-end transform -rotate-4 mt-0.5">
                <span 
                  className="italic text-slate-600 text-sm sm:text-base font-normal tracking-tight"
                  style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
                >
                  for a Healthier Tomorrow
                </span>
                <svg width="150" height="8" viewBox="0 0 150 8" fill="none" className="text-[#1877f2] -mt-0.5">
                  <path d="M2 5 C45 1, 105 1, 148 5" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </div>
            </div>

            {/* Carousel navigation controls (Previous & Next) */}
            <div className="flex items-center gap-2.5">
              <button
                onClick={handlePrev}
                aria-label="Previous Strategic Pillar"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-white hover:bg-slate-50 text-[#071A41] flex items-center justify-center shadow-[0_4px_14px_rgba(0,0,0,0.06)] border border-slate-200/80 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ArrowLeft className="w-4 h-4 stroke-[2.2]" />
              </button>
              <button
                onClick={handleNext}
                aria-label="Next Strategic Pillar"
                className="w-11 h-11 sm:w-12 sm:h-12 rounded-full bg-[#1877f2] hover:bg-blue-600 text-white flex items-center justify-center shadow-md shadow-blue-500/25 transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                <ArrowRight className="w-4 h-4 stroke-[2.2]" />
              </button>
            </div>
          </div>
        </div>

        {/* ================= CARDS CONTAINER (4 Columns Desktop, Snapping Carousel Mobile) ================= */}
        <div 
          ref={carouselRef}
          className="flex lg:grid lg:grid-cols-4 gap-5 lg:gap-7 items-start overflow-x-auto lg:overflow-visible snap-x snap-mandatory scroll-smooth pb-4 lg:pb-0 -mx-4 px-4 sm:mx-0 sm:px-0 mb-8 lg:mb-0 scrollbar-none"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {PILLARS_CONFIG.map((pillar, idx) => {
            const isActive = activePillar === idx;
            const IconComponent = pillar.icon;

            return (
              <div
                key={pillar.id}
                role="button"
                tabIndex={0}
                data-pillar-card
                onClick={() => handleSelect(idx)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    e.preventDefault();
                    handleSelect(idx);
                  }
                }}
                aria-label={`Select ${pillar.title}`}
                data-testid={`pillar-card-${idx}`}
                className={`snap-center flex-shrink-0 w-[86vw] sm:w-[calc(50%-12px)] lg:w-auto group cursor-pointer rounded-[24px] bg-white border transition-all duration-500 ease-out flex flex-col text-left focus:outline-hidden ${
                  isActive
                    ? 'border-[#1877f2]/40 shadow-[0_14px_40px_rgba(24,119,242,0.12),0_4px_16px_rgba(24,119,242,0.06)] ring-1 ring-[#1877f2]/15'
                    : 'border-slate-200/70 shadow-[0_8px_28px_rgba(15,23,42,0.05)] hover:shadow-[0_14px_36px_rgba(15,23,42,0.08)]'
                }`}
                style={{
                  '--card-rot': CARD_ROTATIONS[idx],
                  transform: `rotate(var(--card-rot, 0deg)) translateY(${isActive ? '-10px' : '0px'}) scale(${isActive ? '1.008' : '1'})`,
                  willChange: 'transform, box-shadow',
                }}
              >
                {/* Top Section: Spacious Editorial Media Container */}
                <div className="relative">
                  {/* Large photograph area — generous rounded corners, edge-to-edge within card padding, dominant visual */}
                  <div className="relative w-full overflow-hidden rounded-t-[24px]" style={{ aspectRatio: '16 / 11' }}>
                    <img 
                      src={pillar.image} 
                      alt={pillar.title}
                      className="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700 ease-out"
                      loading="lazy"
                      style={{ objectPosition: pillar.bgPosition }}
                    />
                    
                    {/* Very subtle bottom vignette to help text on photos with light bottoms */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/[0.08] via-transparent to-black/[0.06] pointer-events-none" />

                    {/* Elegant Sequence Number in Upper Right — lightweight, integrated with photography */}
                    <div className="absolute top-3.5 right-3.5 font-bold text-[#1877f2] text-[15px] sm:text-base tracking-wider leading-none bg-white/80 backdrop-blur-sm w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shadow-[0_2px_8px_rgba(0,0,0,0.08)]">
                      {pillar.number}
                    </div>
                  </div>

                  {/* ===== FLOATING CIRCULAR ICON — overlaps image/content boundary ===== */}
                  {/* Positioned so ~55% sits over the image and ~45% over the white content area */}
                  <div className="absolute left-5 sm:left-6 z-20" style={{ bottom: '-22px' }}>
                    <div className="w-[46px] h-[46px] sm:w-[52px] sm:h-[52px] rounded-full bg-white border border-[#d4e3f7] shadow-[0_6px_18px_rgba(24,119,242,0.13),0_2px_6px_rgba(0,0,0,0.04)] flex items-center justify-center text-[#1877f2] group-hover:scale-110 transition-transform duration-300">
                      <IconComponent className="w-[22px] h-[22px] sm:w-6 sm:h-6 stroke-[1.8]" />
                    </div>
                  </div>
                </div>

                {/* Card Content Area — begins below the floating icon with breathing room */}
                <div className="pt-8 sm:pt-9 px-5 sm:px-6 pb-5 sm:pb-6 flex flex-col flex-1">
                  {/* Card Title — strong dark navy editorial typography */}
                  <h3 className="text-[19px] sm:text-[21px] lg:text-[22px] font-bold text-[#071A41] tracking-tight leading-[1.12] mb-2.5 min-h-[48px] sm:min-h-[52px] flex items-start">
                    {pillar.title}
                  </h3>

                  {/* Descriptive Paragraph — muted slate/blue-gray */}
                  <p className="text-[13px] sm:text-[14.5px] text-slate-500 leading-[1.55] font-normal line-clamp-4 flex-1">
                    {pillar.description}
                  </p>

                  {/* Bottom Minimal Interaction Link: Explore → */}
                  <div className="pt-5 mt-auto">
                    <div 
                      onClick={(e) => {
                        e.stopPropagation();
                        onOpenConsultation?.({ pillarId: pillar.id, pillarTitle: pillar.title });
                      }}
                      className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1877f2] hover:text-blue-700 transition-colors group/link cursor-pointer"
                    >
                      <span>{pillar.linkText}</span>
                      <ArrowRight className="w-3.5 h-3.5 stroke-[2.2] transform group-hover/link:translate-x-1 transition-transform duration-200" />
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Mobile & Tablet Carousel Pagination Indicator Dots */}
        <div className="flex lg:hidden justify-center items-center gap-2 mb-6 -mt-1">
          {PILLARS_CONFIG.map((_, dotIdx) => (
            <button
              key={dotIdx}
              onClick={() => scrollToCard(dotIdx)}
              aria-label={`Go to strategic pillar ${dotIdx + 1}`}
              className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                activePillar === dotIdx 
                  ? 'w-7 bg-[#1877f2]' 
                  : 'w-2 bg-slate-300 hover:bg-slate-400'
              }`}
            />
          ))}
        </div>

        {/* ================= OPEN CREDIBILITY / STAT STRIP (No enclosing box) ================= */}
        {/* Three independent items floating directly on the section background — NO container card, NO box, NO border, NO shadow */}
        <div className="mt-14 sm:mt-16 lg:mt-20">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 lg:gap-6 items-start max-w-[1360px] mx-auto">
            
            {/* Item 1: 4 Key Initiatives */}
            <div className="flex items-center gap-4">
              <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#eef4fd] text-[#1877f2] flex items-center justify-center flex-shrink-0">
                <Users className="w-[22px] h-[22px] sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-[#071A41] tracking-tight leading-tight">
                  4 Key Initiatives
                </h4>
                <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal mt-0.5 leading-snug">
                  Driving Global Healthcare Access
                </p>
              </div>
            </div>

            {/* Subtle vertical separator before Item 2 (desktop only, built into item styling) */}
            <div className="flex items-center gap-4 md:border-l md:border-slate-200/60 md:pl-6 lg:pl-8">
              <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#eef4fd] text-[#1877f2] flex items-center justify-center flex-shrink-0">
                <ShieldCheck className="w-[22px] h-[22px] sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-[#071A41] tracking-tight leading-tight">
                  Trusted Partnerships
                </h4>
                <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal mt-0.5 leading-snug">
                  With World-Class Institutions
                </p>
              </div>
            </div>

            {/* Item 3: A Healthier Tomorrow */}
            <div className="flex items-center gap-4 md:border-l md:border-slate-200/60 md:pl-6 lg:pl-8">
              <div className="w-[52px] h-[52px] sm:w-[58px] sm:h-[58px] rounded-full bg-[#eef4fd] text-[#1877f2] flex items-center justify-center flex-shrink-0">
                <Globe className="w-[22px] h-[22px] sm:w-6 sm:h-6 stroke-[1.8]" />
              </div>
              <div>
                <h4 className="text-[17px] sm:text-[19px] font-bold text-[#071A41] tracking-tight leading-tight">
                  A Healthier Tomorrow
                </h4>
                <p className="text-[13px] sm:text-[14.5px] text-slate-500 font-normal mt-0.5 leading-snug">
                  Through Collaboration
                </p>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
