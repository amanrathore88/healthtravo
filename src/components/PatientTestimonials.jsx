import React, { useState } from 'react';
import { testimonials } from '../data/testimonials';
import { Quote, ChevronLeft, ChevronRight, Star, Heart, CheckCircle } from 'lucide-react';

export default function PatientTestimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const activeTestimonial = testimonials[currentIndex];

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
  };

  return (
    <section id="testimonials" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#f2f0eb] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Header matching reference */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-16">
          
          <div className="lg:col-span-4">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
              Verified Patient Trust
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight leading-snug">
              What Our Patients & Families Say
            </h2>
            <p className="text-sm text-slate-600 mt-4 leading-relaxed">
              Every international patient journey is personal. Here are authentic accounts of hope, successful treatment, and recovery guided by Dushyant and HealthTravo.
            </p>

            {/* Avatar switcher row matching reference */}
            <div className="flex items-center gap-3 mt-6 flex-wrap">
              {testimonials.map((t, idx) => (
                <button
                  key={t.id}
                  onClick={() => setCurrentIndex(idx)}
                  className={`relative w-12 h-12 rounded-full overflow-hidden border-2 transition-all ${
                    currentIndex === idx 
                      ? 'border-blue-600 scale-110 shadow-lg shadow-blue-600/30 ring-2 ring-blue-600/30' 
                      : 'border-white opacity-60 hover:opacity-100'
                  }`}
                >
                  <img
                    src={t.avatar}
                    alt={t.name}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Right Quote Showcase matching reference */}
          <div className="lg:col-span-8 bg-white p-8 sm:p-12 rounded-3xl border border-slate-200 shadow-xl relative flex flex-col justify-between min-h-[340px]">
            
            <div>
              {/* Quote Mark & Treatment Pill */}
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <Quote className="w-8 h-8 text-blue-600 fill-blue-100" />
                  <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-50 text-blue-700">
                    {activeTestimonial.treatment}
                  </span>
                </div>

                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 text-amber-400 fill-amber-400" />
                  ))}
                </div>
              </div>

              {/* Main Statement Quote */}
              <p className="text-lg sm:text-xl lg:text-2xl font-semibold text-slate-900 leading-relaxed italic mb-8">
                "{activeTestimonial.quote}"
              </p>
            </div>

            {/* Footer Row: Patient Info + Arrow Controls */}
            <div className="pt-6 border-t border-slate-100 flex items-center justify-between flex-wrap gap-4">
              
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-slate-200">
                  <img
                    src={activeTestimonial.avatar}
                    alt={activeTestimonial.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div>
                  <h4 className="text-sm font-extrabold text-slate-900">
                    {activeTestimonial.name}
                  </h4>
                  <p className="text-xs font-medium text-slate-500">
                    {activeTestimonial.country} • <span className="text-emerald-600 font-semibold">{activeTestimonial.outcome}</span>
                  </p>
                </div>
              </div>

              {/* Navigation Arrows matching reference */}
              <div className="flex items-center gap-3">
                <button
                  onClick={handlePrev}
                  className="w-10 h-10 rounded-full border border-slate-200 bg-white hover:bg-slate-50 text-slate-800 flex items-center justify-center shadow-sm transition-all"
                  aria-label="Previous testimonial"
                >
                  <ChevronLeft className="w-5 h-5" />
                </button>
                <button
                  onClick={handleNext}
                  className="w-10 h-10 rounded-full bg-slate-900 hover:bg-blue-600 text-white flex items-center justify-center shadow-md transition-all"
                  aria-label="Next testimonial"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}
