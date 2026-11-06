import React, { useState } from 'react';
import { careStages } from '../data/strategicPillars';
import { carePhotos } from '../data/testimonials';
import { PlaneTakeoff, Stethoscope, HeartPulse, CheckCircle2, ChevronRight, ShieldCheck, ArrowRight } from 'lucide-react';

export default function CareContinuum({ onOpenConsultation }) {
  const [activeStage, setActiveStage] = useState(0);

  const stageIcons = [
    <PlaneTakeoff className="w-5 h-5" />,
    <Stethoscope className="w-5 h-5" />,
    <HeartPulse className="w-5 h-5" />
  ];

  return (
    <section id="continuum" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F9FE] text-slate-900 border-t border-slate-200/80">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider mb-3">
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>A 360° Patient Care Continuum</span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight mb-4">
            A Meticulously Managed Journey, From Home to Healing
          </h2>
          <p className="text-base text-slate-600">
            A systematic, transparent protocol ensuring every international patient receives world-class clinical oversight from pre-departure planning through long-term recovery back home.
          </p>
        </div>

        {/* Interactive 3-Stage Tab Selector */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-12">
          {careStages.map((stage, idx) => {
            const isSelected = activeStage === idx;
            return (
              <button
                key={stage.step}
                onClick={() => setActiveStage(idx)}
                className={`text-left p-6 rounded-3xl transition-all duration-300 border ${
                  isSelected
                    ? 'bg-white border-blue-500 shadow-xl shadow-blue-500/10 scale-[1.02]'
                    : 'bg-white/60 border-slate-200/80 hover:bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-center justify-between mb-3">
                  <span className={`w-10 h-10 rounded-2xl flex items-center justify-center font-bold text-sm ${
                    isSelected ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-700'
                  }`}>
                    {stageIcons[idx]}
                  </span>
                  <span className={`text-xs font-bold px-2.5 py-1 rounded-full ${
                    isSelected ? 'bg-blue-50 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    Phase {stage.step}
                  </span>
                </div>
                <h3 className="text-lg font-bold text-slate-900 mb-1">
                  {stage.title}
                </h3>
                <p className="text-xs text-slate-500 font-medium">
                  {stage.tagline}
                </p>
              </button>
            );
          })}
        </div>

        {/* Selected Stage Detail Showcase */}
        <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200 shadow-lg mb-16">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            
            {/* Left: Checkpoints */}
            <div className="lg:col-span-7">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block mb-2">
                Phase {careStages[activeStage].step} Breakdown
              </span>
              <h4 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-6">
                {careStages[activeStage].title} Protocols
              </h4>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8">
                {careStages[activeStage].items.map((item, i) => (
                  <div key={i} className="flex items-start gap-3 p-4 rounded-2xl bg-slate-50 border border-slate-100">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <div>
                      <h5 className="text-xs font-bold text-slate-900 mb-1">
                        {item.title}
                      </h5>
                      <p className="text-xs text-slate-600 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button
                onClick={onOpenConsultation}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-600 hover:bg-blue-500 text-white shadow-md shadow-blue-600/20 transition-all"
              >
                <span>Request Case Evaluation for This Stage</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>

            {/* Right: Real Photographic Proof */}
            <div className="lg:col-span-5">
              <div className="relative rounded-2xl overflow-hidden shadow-xl border-2 border-white aspect-[4/3] bg-slate-900">
                <img
                  src={carePhotos[activeStage % carePhotos.length].src}
                  alt={carePhotos[activeStage % carePhotos.length].title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent"></div>
                <div className="absolute bottom-4 left-4 right-4 text-white">
                  <span className="text-[10px] uppercase font-bold text-amber-300 tracking-wider">
                    Actual On-Ground Case
                  </span>
                  <p className="text-xs font-bold text-white mt-0.5">
                    {carePhotos[activeStage % carePhotos.length].title}
                  </p>
                  <p className="text-[11px] text-slate-300 mt-0.5">
                    {carePhotos[activeStage % carePhotos.length].subtitle}
                  </p>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
