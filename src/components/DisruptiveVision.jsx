import React from 'react';
import { ArrowUpRight, Heart, Sparkles, MessageCircle, Quote } from 'lucide-react';

export default function DisruptiveVision({ onOpenConsultation }) {
  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f2f0eb] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Split Grid matching Reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
          
          {/* Left Column: Heading & Large Impact Metric */}
          <div className="lg:col-span-6">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-3">
              Founding Philosophy
            </span>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-[1.12] mb-6">
              Disruptive Empathy in Cross-Border Healthcare
            </h2>
            <p className="text-lg sm:text-xl font-medium text-slate-700 leading-relaxed mb-6">
              Across 8+ years and 10+ nations, Dushyant has guided hundreds of families through India’s medical corridors—proving that transparency, technology, and unconditional care can eliminate cross-border exploitation.
            </p>
          </div>

          {/* Right Column: Large Imagery Frame */}
          <div className="lg:col-span-6">
            <div className="rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-900 aspect-video relative group">
              <img
                src="/assets/patients/consultation-desk.jpg"
                alt="Dushyant consulting with chief doctors and international patient"
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
              <div className="absolute bottom-6 left-6 right-6 text-white">
                <span className="px-3 py-1 rounded-full bg-blue-600/90 text-white text-[11px] font-bold uppercase tracking-wider">
                  Transparent Case Reviews
                </span>
                <p className="text-sm font-semibold mt-2 text-slate-200">
                  Every treatment estimate and surgical pathway is verified by senior medical boards before patients leave their home country.
                </p>
              </div>
            </div>
          </div>

        </div>

        {/* Lower Row matching reference: Small avatar + quote column + CTA button */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center pt-8 border-t border-slate-300/70">
          
          <div className="md:col-span-2 flex justify-start">
            <div className="w-20 h-20 rounded-2xl overflow-hidden shadow-lg border-2 border-white">
              <img
                src="/assets/founder-portrait.webp"
                alt="Dushyant Chauhan"
                className="w-full h-full object-cover object-top"
              />
            </div>
          </div>

          <div className="md:col-span-7">
            <p className="text-sm sm:text-base text-slate-700 italic font-medium leading-relaxed">
              "Medical travel is fundamentally different from commercial tourism. It is a moment of profound vulnerability where families entrust us with their loved ones' lives. Our duty is not to close sales—our duty is to be their fearless advocate."
            </p>
            <span className="text-xs font-bold text-slate-900 mt-2 block">
              — Dushyant Singh Chauhan, Founder & CEO HealthTravo
            </span>
          </div>

          <div className="md:col-span-3 flex justify-start md:justify-end">
            <button
              onClick={onOpenConsultation}
              className="flex items-center gap-3 px-6 py-3.5 rounded-full text-xs font-bold uppercase tracking-wider bg-slate-900 hover:bg-blue-600 text-white shadow-lg transition-all"
            >
              <span>Book Strategic Session</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>
    </section>
  );
}
