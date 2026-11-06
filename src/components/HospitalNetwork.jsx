import React, { useState, useEffect } from 'react';
import { 
  hospitalPartners 
} from '../data/hospitalPartners';
import { 
  Building2, 
  ShieldCheck, 
  HeartPulse, 
  Activity, 
  Brain, 
  Bone, 
  Layers, 
  Sparkles, 
  ShieldAlert, 
  Zap, 
  ArrowLeft, 
  ArrowRight, 
  CheckCircle2, 
  MapPin, 
  BedDouble, 
  Users, 
  Clock, 
  Globe, 
  Play, 
  X,
  Wind
} from 'lucide-react';

// Dynamic icon resolver
const ICON_MAP = {
  ShieldCheck,
  ShieldAlert,
  HeartPulse,
  Activity,
  Brain,
  Bone,
  Layers,
  Sparkles,
  Zap,
  Users,
  Clock,
  Globe,
  Wind
};

function DynamicSpecialtyIcon({ name, className = "w-5 h-5 text-current" }) {
  const IconComponent = ICON_MAP[name] || ShieldCheck;
  return <IconComponent className={className} />;
}

// Curated 6 specialties per hospital for the exact 3x2 grid matching reference
const HOSPITAL_DETAILS_MAP = {
  artemis: {
    stats: [
      { icon: Users, value: "100+", label: "Specialists" },
      { icon: Clock, value: "24/7", label: "Emergency Care" },
      { icon: Globe, value: "Global", label: "Patient Services" }
    ],
    editorial: "International infrastructure. Advanced technology. Compassionate care. Artemis Hospitals redefines multi-speciality healthcare in India.",
    specialties: [
      { title: "Cancer Center", subtitle: "M6 CyberKnife Technology", icon: "ShieldAlert" },
      { title: "Spine & Joint Care", subtitle: "Minimally Invasive Surgery", icon: "Bone" },
      { title: "Genetics & IVF", subtitle: "High Success Rates", icon: "Sparkles" },
      { title: "Interventional Neuro-Radiology", subtitle: "Aneurysm Coiling & Stroke Rescue", icon: "Brain" },
      { title: "Cardiac & Thoracic Surgery", subtitle: "Beating-Heart CABG, Aortic Stenting", icon: "HeartPulse" },
      { title: "Pediatric & Craniofacial", subtitle: "Specialized Care", icon: "Users" }
    ]
  },
  fortis: {
    stats: [
      { icon: Users, value: "150+", label: "Specialists" },
      { icon: Clock, value: "24/7", label: "Emergency Care" },
      { icon: Globe, value: "Global", label: "Patient Services" }
    ],
    editorial: "Home to the legendary Fortis Escorts Heart Institute and FMRI Gurgaon, recognized globally for pediatric cardiology, bone marrow transplants, and complex neuro-interventions.",
    specialties: [
      { title: "Fortis Escorts Heart Institute", subtitle: "Valve Repair & Pediatric Surgery", icon: "HeartPulse" },
      { title: "Bone Marrow & Stem Cell", subtitle: "Haploidentical Transplants", icon: "Sparkles" },
      { title: "FMRI Neurosciences & Spine", subtitle: "Stereotactic Radiosurgery & DBS", icon: "Brain" },
      { title: "Gastrointestinal & Bariatric", subtitle: "Robotic Whipple & GI Oncology", icon: "Activity" },
      { title: "Orthopedics & Joint Institute", subtitle: "Computer-Navigated Arthroplasty", icon: "Bone" },
      { title: "Pediatric & Neonatal ICU", subtitle: "Level-IV PICU Organ Support", icon: "Users" }
    ]
  },
  yatharth: {
    stats: [
      { icon: Users, value: "90+", label: "Specialists" },
      { icon: Clock, value: "24/7", label: "Emergency Care" },
      { icon: Globe, value: "Global", label: "Patient Services" }
    ],
    editorial: "Flagship incubation partner with deep administrative synergy, hosting advanced neuro-trauma suites, multi-organ transplant units, and cutting-edge resuscitation infrastructure.",
    specialties: [
      { title: "Advanced Urology & Laser", subtitle: "Holmium Laser Enucleation & RIRS", icon: "Layers" },
      { title: "Neuro-Trauma & Spine", subtitle: "Microscopic Decompression & Fusion", icon: "Brain" },
      { title: "Interventional Cardiology", subtitle: "Primary PCI & Rotablation Cath Lab", icon: "HeartPulse" },
      { title: "Critical Care & ECMO", subtitle: "High-Flow Invasive Ventilatory Units", icon: "Wind" },
      { title: "Nephrology & Renal Care", subtitle: "SLED, CRRT & Living Donor Transplant", icon: "Activity" },
      { title: "Orthopedic Reconstruction", subtitle: "Fast-Track Arthroplasty & Trauma", icon: "Bone" }
    ]
  },
  max: {
    stats: [
      { icon: Users, value: "200+", label: "Specialists" },
      { icon: Clock, value: "24/7", label: "Emergency Care" },
      { icon: Globe, value: "Global", label: "Patient Services" }
    ],
    editorial: "Internationally renowned quaternary medical network housing India's celebrated surgical boards, DaVinci Xi robotic surgical theaters, and comprehensive organ transplant centers.",
    specialties: [
      { title: "Comprehensive Oncology & BMT", subtitle: "TrueBeam STx & Allogeneic BMT", icon: "ShieldAlert" },
      { title: "DaVinci Xi Robotic Surgery", subtitle: "Robotic Uro-Oncology & Resection", icon: "Zap" },
      { title: "Cardiac Sciences & Transplants", subtitle: "TAVI/TAVR, LVAD & Complex CABG", icon: "HeartPulse" },
      { title: "Liver & Biliary Sciences", subtitle: "Living Donor Liver Transplants", icon: "Activity" },
      { title: "Brain Sciences & Spine Surgery", subtitle: "Intraoperative Brain MRI", icon: "Brain" },
      { title: "Robotic Joint Reconstruction", subtitle: "MAKO Robotic Knee & Hip", icon: "Bone" }
    ]
  }
};

// Helper to format card locations precisely matching reference image
function formatCardLocation(h) {
  if (h.id === 'artemis') return 'Sector 51, Gurgaon';
  if (h.id === 'fortis') return 'Gurgaon (FMRI) & Okhla';
  if (h.id === 'yatharth') return 'Greater Noida & Noida Ext.';
  if (h.id === 'max') return 'Saket & Shalimar Bagh';
  return h.location.split(',').slice(0, 2).join(', ');
}

// Helper to format bed counts cleanly
function formatCardBeds(h) {
  if (h.id === 'artemis') return '600+ Beds';
  if (h.id === 'fortis') return '2,000+ Beds';
  if (h.id === 'yatharth') return '1,500+ Beds';
  if (h.id === 'max') return '2,300+ Beds';
  const num = h.beds.match(/\d+[\d,]*\+?/);
  return num ? `${num[0]} Beds` : h.beds;
}

export default function HospitalNetwork({ onOpenConsultation }) {
  // Initial active hospital is Artemis Hospitals (index 2 in hospitalPartners) matching target reference!
  // In hospitalPartners: [0: Max, 1: Fortis, 2: Artemis, 3: Yatharth, 4: ANS, 5: Aakash]
  const [activeIndex, setActiveIndex] = useState(2);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showTourModal, setShowTourModal] = useState(false);

  const totalHospitals = hospitalPartners.length;

  // Active hospital
  const activeHospital = hospitalPartners[activeIndex];

  // Previous and Next indices for the 3-card carousel
  const prevIndex = (activeIndex - 1 + totalHospitals) % totalHospitals;
  const nextIndex = (activeIndex + 1) % totalHospitals;

  const leftHospital = hospitalPartners[prevIndex];
  const rightHospital = hospitalPartners[nextIndex];

  const handleSelectHospital = (targetIndex) => {
    if (targetIndex === activeIndex || isAnimating) return;
    setIsAnimating(true);
    setActiveIndex(targetIndex);
    setTimeout(() => setIsAnimating(false), 500);
  };

  const handlePrev = () => {
    handleSelectHospital(prevIndex);
  };

  const handleNext = () => {
    handleSelectHospital(nextIndex);
  };

  const activeDetails = HOSPITAL_DETAILS_MAP[activeHospital.id] || HOSPITAL_DETAILS_MAP.artemis;

  return (
    <section 
      id="network" 
      className="relative py-16 sm:py-24 px-4 sm:px-6 lg:px-8 overflow-hidden"
    >
      {/* Subtle Atmospheric Crossfading Architectural Background Visuals */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        {hospitalPartners.map((h, i) => (
          <img
            key={h.id}
            src={h.image}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover filter blur-[35px] scale-110 transition-opacity duration-700 ease-in-out ${
              i === activeIndex ? 'opacity-25' : 'opacity-0'
            }`}
          />
        ))}
        {/* Soft atmospheric cloud and sky-blue gradient layer matching reference */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#eaf3fc]/92 via-[#f2f7fd]/88 to-[#f8fbfe]/96" />
        
        {/* Subtle white rolling cloud dunes / architectural curves */}
        <svg 
          className="absolute w-full h-full inset-0 opacity-[0.07] pointer-events-none" 
          xmlns="http://www.w3.org/2000/svg" 
          viewBox="0 0 1440 900" 
          preserveAspectRatio="none"
        >
          <path 
            d="M0,200 C360,320 480,120 800,240 C1120,360 1280,200 1440,280 L1440,900 L0,900 Z" 
            fill="#1877f2" 
          />
          <path 
            d="M0,320 C400,220 560,360 880,260 C1200,160 1320,320 1440,240 L1440,900 L0,900 Z" 
            fill="#ffffff" 
          />
        </svg>
      </div>

      <div className="max-w-[1440px] mx-auto relative z-10">
        
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 sm:mb-14 gap-6">
          <div>
            {/* Small uppercase eyebrow label */}
            <div className="text-[11px] sm:text-xs font-bold tracking-[0.2em] text-slate-500 uppercase mb-2">
              OUR HOSPITAL NETWORK
            </div>

            {/* Large bold dark-navy headline */}
            <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-[#0d1b3e] tracking-tight leading-[1.12]">
              Care That Connects a Healthier India
            </h2>

            {/* Smaller supporting sentence beneath it */}
            <p className="text-sm sm:text-base text-slate-500 mt-2 font-normal max-w-xl">
              Select a hospital to explore its unique strengths, facilities and specialties.
            </p>
          </div>

          {/* Top-Right: Handwritten script (stacked 2 lines) */}
          <div className="flex items-center self-start md:self-end">
            <div className="hidden sm:flex flex-col items-end leading-[1.15] select-none">
              <span 
                className="italic text-slate-700 text-xl font-medium tracking-wide transform -rotate-3"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Better Care
              </span>
              <span 
                className="italic text-slate-700 text-xl font-medium tracking-wide transform -rotate-3 -mt-0.5"
                style={{ fontFamily: "'Playfair Display', Georgia, serif" }}
              >
                Brighter Tomorrows
              </span>
            </div>
          </div>
        </div>

        {/* ================= 3-CARD CAROUSEL WITH DOWNWARD CONNECTOR ================= */}
        <div className="relative mb-0">
          {/* Large circular navigation controls on the far left and far right */}
          <button
            onClick={handlePrev}
            aria-label="Previous Hospital in Carousel"
            className="hidden lg:flex absolute -left-5 xl:-left-7 top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-[#0d1b3e] items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-slate-100 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2.2]" />
          </button>
          <button
            onClick={handleNext}
            aria-label="Next Hospital in Carousel"
            className="hidden lg:flex absolute -right-5 xl:-right-7 top-[45%] -translate-y-1/2 z-30 w-12 h-12 rounded-full bg-white hover:bg-slate-50 text-[#0d1b3e] items-center justify-center shadow-[0_8px_25px_rgba(0,0,0,0.08)] border border-slate-100 transition-all hover:scale-110 active:scale-95 cursor-pointer"
          >
            <ArrowRight className="w-5 h-5 stroke-[2.2]" />
          </button>

          {/* 3 Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 lg:gap-7 items-center">
            
            {/* 1. LEFT CARD (Rotated approx -2.5deg) */}
            <button
              type="button"
              onClick={() => handleSelectHospital(prevIndex)}
              aria-label={`Select ${leftHospital.name}`}
              data-testid="hospital-card-left"
              className="group cursor-pointer rounded-[26px] bg-white/95 backdrop-blur-xs border border-slate-200/80 p-4 sm:p-5 lg:p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] transition-all duration-500 transform lg:-rotate-2 lg:scale-[0.96] hover:scale-[0.98] hover:-rotate-1 opacity-90 hover:opacity-100 hidden md:block text-left w-full focus:outline-hidden"
            >
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={leftHospital.image} 
                  alt={leftHospital.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#0d1b3e] tracking-tight mb-2 leading-snug">
                {leftHospital.name}
              </h3>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#1877f2] flex-shrink-0" />
                  <span className="truncate">{formatCardLocation(leftHospital)}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <BedDouble className="w-3.5 h-3.5 text-[#1877f2] flex-shrink-0" />
                  <span>{formatCardBeds(leftHospital)}</span>
                </div>
              </div>
            </button>

            {/* 2. CENTER CARD (Active / Selected Hospital with Downward Connector) */}
            <div className="relative z-20">
              {/* Floating "Most Popular" pill overlapping top edge */}
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-[#1877f2] text-white text-xs font-bold px-4 py-1 rounded-full shadow-md shadow-blue-500/30 whitespace-nowrap z-30 tracking-wide">
                Most Popular
              </div>

              {/* Main Active Card Body */}
              <div 
                className="relative rounded-[28px] bg-white border-2 border-[#1877f2] shadow-[0_22px_50px_rgba(24,119,242,0.18)] p-5 sm:p-6 lg:p-7 pt-7 pb-8 transition-all duration-500 transform lg:scale-[1.03] lg:rotate-0"
              >
                {/* Large Rounded Hospital Photo */}
                <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                  <img 
                    src={activeHospital.image} 
                    alt={activeHospital.name}
                    className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                  />
                </div>

                {/* Hospital Name */}
                <h3 className="text-xl sm:text-2xl font-extrabold text-[#0d1b3e] tracking-tight mb-2 leading-snug">
                  {activeHospital.name}
                </h3>

                {/* Metadata Row */}
                <div className="space-y-1.5 text-xs text-slate-600">
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-[#1877f2] flex-shrink-0" />
                    <span className="truncate">{formatCardLocation(activeHospital)}</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-medium">
                    <BedDouble className="w-4 h-4 text-[#1877f2] flex-shrink-0" />
                    <span className="font-semibold">{formatCardBeds(activeHospital)}</span>
                  </div>
                </div>

                {/* DOWNWARD-POINTING CONNECTOR NOTCH EMERGING FROM BOTTOM CENTER */}
                {/* Physically bridges the center card directly towards the detail profile panel below */}
                <div className="absolute -bottom-[15px] left-1/2 -translate-x-1/2 z-30 pointer-events-none flex justify-center overflow-visible">
                  <svg 
                    width="38" 
                    height="18" 
                    viewBox="0 0 38 18" 
                    fill="none" 
                    className="filter drop-shadow-[0_2px_4px_rgba(24,119,242,0.12)] overflow-visible"
                  >
                    {/* White mask over card bottom border to create seamless continuous opening */}
                    <rect x="2" y="-2" width="34" height="4" fill="#ffffff" />
                    {/* Downward triangle notch fill */}
                    <polygon points="2,0 19,16 36,0" fill="#ffffff" />
                    {/* Blue V border lines seamlessly continuing the card border */}
                    <polyline 
                      points="2,0 19,16 36,0" 
                      stroke="#1877f2" 
                      strokeWidth="2.5" 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                    />
                  </svg>
                </div>
              </div>
            </div>

            {/* 3. RIGHT CARD (Rotated approx +2.5deg) */}
            <button
              type="button"
              onClick={() => handleSelectHospital(nextIndex)}
              aria-label={`Select ${rightHospital.name}`}
              data-testid="hospital-card-right"
              className="group cursor-pointer rounded-[26px] bg-white/95 backdrop-blur-xs border border-slate-200/80 p-4 sm:p-5 lg:p-6 shadow-[0_12px_30px_rgba(15,23,42,0.05)] hover:shadow-[0_18px_40px_rgba(15,23,42,0.09)] transition-all duration-500 transform lg:rotate-2 lg:scale-[0.96] hover:scale-[0.98] hover:rotate-1 opacity-90 hover:opacity-100 hidden md:block text-left w-full focus:outline-hidden"
            >
              <div className="w-full aspect-[16/10] rounded-2xl overflow-hidden mb-4 bg-slate-100">
                <img 
                  src={rightHospital.image} 
                  alt={rightHospital.name}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <h3 className="text-base sm:text-lg lg:text-xl font-bold text-[#0d1b3e] tracking-tight mb-2 leading-snug">
                {rightHospital.name}
              </h3>
              <div className="space-y-1 text-xs text-slate-500">
                <div className="flex items-center gap-1.5 font-medium">
                  <MapPin className="w-3.5 h-3.5 text-[#1877f2] flex-shrink-0" />
                  <span className="truncate">{formatCardLocation(rightHospital)}</span>
                </div>
                <div className="flex items-center gap-1.5 font-medium">
                  <BedDouble className="w-3.5 h-3.5 text-[#1877f2] flex-shrink-0" />
                  <span>{formatCardBeds(rightHospital)}</span>
                </div>
              </div>
            </button>

          </div>
        </div>

        {/* ================= ORGANICALLY CONNECTED DETAIL PROFILE PANEL ================= */}
        {/* Large white rounded container positioned below the cards, not behind them */}
        <div 
          className="mt-8 sm:mt-10 bg-white rounded-[36px] sm:rounded-[44px] border border-blue-100 shadow-[0_25px_60px_rgba(15,23,42,0.06)] p-6 sm:p-10 lg:p-12 relative z-10 transition-all duration-500"
        >
          {/* Content container with smooth crossfade animation */}
          <div 
            key={activeHospital.id}
            className="animate-in fade-in duration-500"
          >
            {/* Header: Logo, Name, Meta, Description & 3 Circular Soft-Stat Elements */}
            <div className="flex flex-col lg:flex-row lg:items-start justify-between pb-8 border-b border-slate-100 gap-8">
              
              {/* Left Profile Info */}
              <div className="flex flex-col sm:flex-row items-start gap-5 max-w-3xl">
                {/* Hospital Logo block */}
                <div className="w-20 h-16 sm:w-28 sm:h-20 rounded-2xl bg-white border border-slate-100 p-2.5 flex items-center justify-center shadow-xs flex-shrink-0">
                  <img 
                    src={activeHospital.logo} 
                    alt={activeHospital.name}
                    className="max-h-full max-w-full object-contain"
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2.5 flex-wrap mb-1.5">
                    <h3 className="text-2xl sm:text-3xl font-extrabold text-[#0d1b3e] tracking-tight">
                      {activeHospital.name}
                    </h3>
                    <span className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-700 bg-emerald-50 border border-emerald-200/80 px-3 py-0.5 rounded-full">
                      <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                      Direct Institutional Ally
                    </span>
                  </div>

                  {/* Metadata line */}
                  <div className="flex items-center gap-x-3 gap-y-1 text-xs text-slate-500 flex-wrap font-medium mb-3">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3.5 h-3.5 text-[#1877f2]" />
                      {activeHospital.location}
                    </span>
                    <span className="text-slate-300">•</span>
                    <span>{activeHospital.beds}</span>
                    <span className="text-slate-300">•</span>
                    <span className="inline-flex items-center gap-1 text-slate-700 font-semibold">
                      <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                      {activeHospital.accreditation}
                    </span>
                  </div>

                  {/* Short descriptive editorial paragraph */}
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {activeDetails.editorial}
                  </p>
                </div>
              </div>

              {/* Right: Three Prominent Circular Soft-Stat Elements matching Reference */}
              <div className="flex items-center justify-around sm:justify-end gap-6 sm:gap-8 flex-shrink-0 self-center lg:self-auto pt-2">
                {activeDetails.stats.map((st, sIdx) => {
                  const StatIcon = st.icon;
                  return (
                    <div key={sIdx} className="flex flex-col items-center text-center">
                      <div className="w-14 h-14 rounded-full bg-blue-50/90 text-[#1877f2] flex items-center justify-center mb-1.5 shadow-xs">
                        <StatIcon className="w-6 h-6 stroke-[1.8]" />
                      </div>
                      <span className="text-lg sm:text-xl font-extrabold text-[#0d1b3e] tracking-tight">
                        {st.value}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        {st.label}
                      </span>
                    </div>
                  );
                })}
              </div>

            </div>

            {/* Grid of Six Specialty Cards in 3 Columns x 2 Rows matching Reference */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-5 my-8 sm:my-10">
              {activeDetails.specialties.map((spec, spIdx) => (
                <div
                  key={spIdx}
                  onClick={() => onOpenConsultation && onOpenConsultation({ hospital: activeHospital.name, specialty: spec.title })}
                  className="rounded-2xl bg-white border border-slate-200/70 hover:border-blue-300 hover:shadow-md p-4 sm:p-4.5 flex items-center justify-between transition-all duration-200 group/spec cursor-pointer shadow-xs"
                >
                  <div className="flex items-center min-w-0 mr-2">
                    {/* Soft circular icon container */}
                    <div className="w-12 h-12 rounded-2xl bg-blue-50/90 text-[#1877f2] group-hover/spec:bg-[#1877f2] group-hover/spec:text-white flex items-center justify-center flex-shrink-0 transition-colors mr-3.5 shadow-xs">
                      <DynamicSpecialtyIcon name={spec.icon} className="w-5 h-5" />
                    </div>
                    <div className="min-w-0">
                      <h4 className="text-sm font-bold text-[#0d1b3e] group-hover/spec:text-[#1877f2] transition-colors leading-snug truncate">
                        {spec.title}
                      </h4>
                      <p className="text-xs text-slate-500 leading-snug mt-0.5 truncate">
                        {spec.subtitle}
                      </p>
                    </div>
                  </div>

                  {/* Circular arrow button on the right */}
                  <div className="w-8 h-8 rounded-full bg-slate-50 text-slate-400 group-hover/spec:bg-blue-50 group-hover/spec:text-[#1877f2] flex items-center justify-center transition-colors flex-shrink-0 ml-2">
                    <ArrowRight className="w-3.5 h-3.5 group-hover/spec:translate-x-0.5 transition-transform" />
                  </div>
                </div>
              ))}
            </div>

            {/* Bottom Actions Row matching Reference */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-6 border-t border-slate-100 gap-4">
              {/* Left Action Buttons */}
              <div className="flex items-center gap-3.5 flex-wrap">
                <button
                  onClick={() => onOpenConsultation && onOpenConsultation({ hospital: activeHospital.name })}
                  className="inline-flex items-center gap-2.5 px-7 py-3.5 rounded-2xl bg-[#0d1b3e] hover:bg-[#1877f2] text-white font-bold text-sm shadow-md shadow-slate-900/10 hover:shadow-blue-500/20 transition-all duration-200 active:scale-95"
                >
                  <span>Consult at {activeHospital.titlePrefix || activeHospital.name}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>

                <button
                  onClick={() => setShowTourModal(true)}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 rounded-2xl bg-white border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-[#0d1b3e] font-bold text-sm shadow-xs transition-all duration-200 active:scale-95"
                >
                  <Play className="w-4 h-4 text-[#1877f2] fill-current" />
                  <span>Take a Virtual Tour</span>
                </button>
              </div>

              {/* Right text-link CTA */}
              <button
                onClick={() => onOpenConsultation && onOpenConsultation({ hospital: activeHospital.name })}
                className="inline-flex items-center gap-1.5 text-sm font-bold text-[#1877f2] hover:text-blue-700 transition-colors self-start sm:self-auto"
              >
                <span>Explore All Specialties</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>

          </div>
        </div>

      </div>

      {/* ================= VIRTUAL TOUR MODAL ================= */}
      {showTourModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-white rounded-3xl overflow-hidden shadow-2xl p-6 sm:p-8">
            <button
              onClick={() => setShowTourModal(false)}
              className="absolute top-5 right-5 w-9 h-9 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3 mb-4">
              <img 
                src={activeHospital.logo} 
                alt={activeHospital.name} 
                className="w-12 h-12 object-contain rounded-xl bg-slate-50 p-1 border border-slate-200"
              />
              <div>
                <h3 className="text-xl font-bold text-[#0d1b3e]">
                  {activeHospital.name} Virtual Tour
                </h3>
                <p className="text-xs text-slate-500">
                  {activeHospital.location} • Quaternary Surgical Facilities
                </p>
              </div>
            </div>

            <div className="relative w-full aspect-video rounded-2xl overflow-hidden mb-5 bg-slate-900 shadow-md">
              <img 
                src={activeHospital.image} 
                alt={`${activeHospital.name} Campus Preview`}
                className="w-full h-full object-cover opacity-80"
              />
              <div className="absolute inset-0 flex items-center justify-center bg-black/30">
                <div className="w-16 h-16 rounded-full bg-white text-[#1877f2] flex items-center justify-center shadow-xl animate-pulse">
                  <Play className="w-7 h-7 fill-current ml-1" />
                </div>
              </div>
            </div>

            <p className="text-xs text-slate-600 mb-5 leading-relaxed">
              Experience the state-of-the-art surgical suites, patient suites, DaVinci robotic theaters, and international patient lounges at {activeHospital.name}. Accompanied in-person by Dushyant Chauhan’s patient advocacy team.
            </p>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowTourModal(false)}
                className="px-5 py-2.5 rounded-xl border border-slate-200 text-xs font-bold text-slate-700 hover:bg-slate-50"
              >
                Close Preview
              </button>
              <button
                onClick={() => {
                  setShowTourModal(false);
                  onOpenConsultation && onOpenConsultation({ hospital: activeHospital.name });
                }}
                className="px-6 py-2.5 rounded-xl bg-[#1877f2] hover:bg-blue-600 text-white text-xs font-bold shadow-md shadow-blue-500/25"
              >
                Book Guided Campus Tour
              </button>
            </div>
          </div>
        </div>
      )}

    </section>
  );
}
