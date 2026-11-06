import React, { useState, useRef, useEffect } from 'react';
import { ChevronRight, ShieldCheck, HeartPulse } from 'lucide-react';

export default function AboutFounder({ onOpenConsultation }) {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection Observer for scroll-triggered entrance reveals
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.15 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // 3D Perspective Tilt & Specular Light Sheen for International Medicine Image
  const [tilt, setTilt] = useState({ rotateX: 0, rotateY: 0, sheenX: 50, sheenY: 50, sheenOpacity: 0 });
  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    
    // Tilt angle calculation (-8deg to +8deg)
    const rotateX = (0.5 - y) * 12;
    const rotateY = (x - 0.5) * 12;

    setTilt({
      rotateX,
      rotateY,
      sheenX: x * 100,
      sheenY: y * 100,
      sheenOpacity: 0.35,
    });
  };

  const handleMouseLeave = () => {
    setTilt({
      rotateX: 0,
      rotateY: 0,
      sheenX: 50,
      sheenY: 50,
      sheenOpacity: 0,
    });
  };

  return (
    <section 
      ref={sectionRef}
      id="about" 
      className="scroll-mt-32 -mt-1 sm:-mt-1.5 lg:-mt-2 rounded-t-[36px] sm:rounded-t-[48px] lg:rounded-t-[60px] xl:rounded-t-[72px] pt-24 sm:pt-28 lg:pt-36 pb-20 sm:pb-24 lg:pb-32 px-6 sm:px-10 lg:px-16 bg-gradient-to-b from-[#f2efe9] via-[#f7f6f2] to-[#faf9f6] text-slate-900 overflow-hidden relative z-30 shadow-[0_-20px_50px_rgba(0,0,0,0.35)] selection:bg-slate-900 selection:text-white"
    >
      <div className="max-w-[1440px] mx-auto">

        {/* TOP ROW: Kinetic Typography + International Medicine Visual with 3D Tilt Reveal */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center mb-16 sm:mb-20 lg:mb-24">
          
          {/* Top Left: Eyebrow + Heading + Lead Dual-Tone Statement */}
          <div className="lg:col-span-6 flex flex-col justify-center">
            
            {/* Section Eyebrow matching the HealthTravo master narrative */}
            <div 
              className={`inline-flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-wider text-blue-900/80 uppercase mb-3 sm:mb-4 transition-all duration-700 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
              <span>The Philosophy of HealthTravo</span>
            </div>

            {/* Main Heading: Staggered Word Reveal */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-950 leading-[1.04] font-sans">
              <span 
                className={`inline-block transition-all duration-700 delay-100 ease-out hover:text-blue-950 hover:-translate-y-0.5 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                Ethical
              </span>{' '}
              <br />
              <span 
                className={`inline-block transition-all duration-700 delay-200 ease-out hover:text-blue-950 hover:-translate-y-0.5 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                healthcare
              </span>{' '}
              <span 
                className={`inline-block transition-all duration-700 delay-300 ease-out hover:text-blue-950 hover:-translate-y-0.5 cursor-default ${
                  isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
                }`}
              >
                vision
              </span>
            </h2>

            {/* Lead Statement: Dual-Tone Reading Illuminator */}
            <p 
              className={`mt-7 sm:mt-9 text-lg sm:text-xl lg:text-[23px] leading-[1.4] max-w-xl font-sans transition-all duration-1000 delay-300 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'
              }`}
            >
              <span className="text-slate-950 font-semibold">
                Across 8+ years navigating India's premier accredited medical corridors, Dushyant has stood beside hundreds of international families—{' '}
              </span>
              <span className="text-slate-600 font-normal">
                transforming cross-border surgical journeys through radical cost transparency, uncompromised clinical governance, and restored human vitality.
              </span>
            </p>

            {/* Sub-highlights Pill Badges */}
            <div 
              className={`flex flex-wrap items-center gap-2.5 mt-6 transition-all duration-700 delay-500 ease-out ${
                isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
              }`}
            >
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100/70 border border-blue-200 text-blue-900 text-xs font-medium shadow-sm">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-700" />
                <span>Zero Commercial Markups</span>
              </div>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-100/70 border border-emerald-200 text-emerald-900 text-xs font-medium shadow-sm">
                <HeartPulse className="w-3.5 h-3.5 text-emerald-700" />
                <span>Bedside Advocacy First</span>
              </div>
            </div>

          </div>

          {/* Top Right: International Medicine Visual + 3D Tilt & Specular Light Sheen */}
          <div className="lg:col-span-6 relative flex justify-center lg:justify-end">
            <div 
              className="relative w-full max-w-lg lg:max-w-xl"
              style={{ perspective: '1000px' }}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              
              {/* Layer 1: Asymmetrical Tilted White Card Backdrop reacting gently to tilt */}
              <div 
                className="absolute -inset-3 sm:-inset-5 bg-white rounded-[32px] sm:rounded-[40px] shadow-2xl shadow-slate-300/70 transform -rotate-3 sm:-rotate-[3.5deg] transition-transform duration-500 pointer-events-none"
                style={{
                  transform: `rotate(-3deg) translate3d(${tilt.rotateY * 0.8}px, ${-tilt.rotateX * 0.8}px, 0px)`,
                }}
              />

              {/* Layer 2: Ultra-crisp International Medicine Image with Smooth Scroll Wipe & 3D Tilt */}
              <div 
                className={`relative rounded-[28px] sm:rounded-[34px] overflow-hidden shadow-2xl bg-slate-950 aspect-[16/10] border border-white/80 cursor-pointer transition-all duration-500 group ${
                  isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
                }`}
                style={{
                  transform: `rotateX(${tilt.rotateX}deg) rotateY(${tilt.rotateY}deg) scale3d(1.01, 1.01, 1.01)`,
                  transformStyle: 'preserve-3d',
                }}
              >
                {/* Real International Medicine Image */}
                <img
                  src="/assets/international-medicine-care.jpg"
                  alt="Multinational medical team consulting over international cross-border clinical diagnostics in modern hospital suite"
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                />

                {/* Ambient Specular Glass Sheen following cursor */}
                <div 
                  className="absolute inset-0 pointer-events-none transition-opacity duration-300"
                  style={{
                    background: `radial-gradient(circle 320px at ${tilt.sheenX}% ${tilt.sheenY}%, rgba(255,255,255,${tilt.sheenOpacity}), transparent 70%)`,
                  }}
                />

                {/* Subtle dark vignette overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-slate-950/20 pointer-events-none" />

                {/* Top Badge: Live Cross-Border Clinical Consultation */}
                <div className="absolute top-4 left-4 px-3.5 py-1.5 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 text-white text-[11px] font-medium flex items-center gap-2 shadow-lg pointer-events-none">
                  <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
                  <span>Global Clinical Coordination</span>
                </div>

                {/* Bottom Badge: Institutional Accreditation */}
                <div className="absolute bottom-4 right-4 px-3.5 py-1.5 rounded-full bg-white/95 backdrop-blur-md border border-slate-200 text-slate-900 text-[11px] font-semibold flex items-center gap-1.5 shadow-lg pointer-events-none">
                  <span>Max • Fortis • Artemis • GIMS</span>
                </div>

              </div>

            </div>
          </div>

        </div>

        {/* BOTTOM ROW: 3-Column Layout (Founder Portrait + Authority Narrative & CTA + Endorsement Quote) */}
        <div 
          className={`grid grid-cols-1 md:grid-cols-12 gap-8 lg:gap-12 items-start pt-4 sm:pt-6 transition-all duration-1000 delay-400 ease-out ${
            isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
          }`}
        >
          
          {/* Column 1 (Left): High-Quality Authentic Photo of the Founder (Dushyant Singh Chauhan) */}
          <div className="md:col-span-3 lg:col-span-3 flex justify-start">
            <div className="w-full max-w-[240px] rounded-[24px] sm:rounded-[28px] overflow-hidden shadow-xl border-2 border-white/90 aspect-[4/3] bg-slate-950 relative group cursor-pointer">
              {/* Authentic Photo of Dushyant */}
              <img
                src="/assets/founder-portrait.jpg"
                alt="Dushyant Singh Chauhan - Founder & CEO, HealthTravo"
                className="w-full h-full object-cover object-top transform group-hover:scale-108 transition-transform duration-700 ease-out"
              />

              {/* Luminous Rim Glow on Hover */}
              <div className="absolute inset-0 ring-2 ring-blue-500/0 group-hover:ring-blue-500/60 transition-all duration-500 rounded-[24px] sm:rounded-[28px] pointer-events-none" />

              {/* Floating Credential Pill sliding up on hover */}
              <div className="absolute bottom-2.5 left-2.5 right-2.5 transform translate-y-2 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300 ease-out pointer-events-none">
                <div className="px-2.5 py-1.5 rounded-xl bg-slate-950/85 backdrop-blur-md border border-white/20 text-[10px] font-semibold text-white shadow-lg flex items-center justify-between">
                  <span>Dushyant Singh Chauhan</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                </div>
              </div>

              {/* Permanent subtle name pill */}
              <div className="absolute top-2.5 left-2.5 px-2.5 py-1 rounded-lg bg-slate-950/70 backdrop-blur-md text-[10px] text-white/90 font-medium tracking-wide border border-white/10 group-hover:opacity-0 transition-opacity">
                Founder &amp; Advocate
              </div>
            </div>
          </div>

          {/* Column 2 (Center): Authority Bio Paragraph + Sleek Black Pill Button with Arrow Badge */}
          <div className="md:col-span-5 lg:col-span-5 flex flex-col justify-between">
            <p className="text-xs sm:text-[13px] lg:text-sm text-slate-700 leading-relaxed font-normal">
              Engineered to eliminate exploitative medical tourism markups, HealthTravo was founded under the incubation of the <strong className="font-semibold text-slate-900">Government Institute of Medical Sciences (GIMS)</strong>. Dushyant bridges global patients directly to premier chief surgeons across <strong className="font-semibold text-slate-900">Max, Fortis, Artemis, and Yatharth</strong>—ensuring zero commercial hospital bias, bedside advocacy, and 60–80% verified pricing savings.
            </p>

            {/* Signature Pill Button with Round Arrow Disc */}
            <div className="mt-6 sm:mt-8">
              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center justify-between gap-6 pl-6 pr-2 py-2 rounded-full bg-slate-950 hover:bg-blue-600 text-white text-xs sm:text-sm font-semibold shadow-lg shadow-black/10 hover:shadow-blue-600/30 transition-all duration-300 group cursor-pointer"
              >
                <span>Consult with Dushyant</span>
                <div className="w-8 h-8 rounded-full bg-white/20 group-hover:bg-white group-hover:text-blue-600 text-white flex items-center justify-center transition-all shadow-sm">
                  <ChevronRight className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            </div>
          </div>

          {/* Column 3 (Right): Notable Quote / Hospital Directorate Endorsement */}
          <div className="md:col-span-4 lg:col-span-4 bg-white/70 backdrop-blur-sm rounded-2xl p-5 border border-slate-200/80 shadow-sm hover:shadow-md transition-all duration-300">
            <div className="flex items-center gap-1.5 mb-2.5 text-amber-500 text-xs">
              {"★".repeat(5)}
            </div>
            <p className="text-xs sm:text-[13px] lg:text-sm text-slate-700 leading-relaxed italic font-serif">
              “Dushyant has established an uncompromising ethical benchmark for cross-border care. His team doesn’t just arrange hospital admissions; they stand at the patient’s bedside, question surgical protocols, and protect international families as their own.”
            </p>
            <div className="mt-3.5 pt-3 border-t border-slate-200/70 flex items-center justify-between">
              <span className="text-[11px] font-semibold text-slate-900 uppercase tracking-wide">Hospital Directorate Endorsement</span>
              <span className="text-[10px] text-slate-500 font-medium">New Delhi / NCR</span>
            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
