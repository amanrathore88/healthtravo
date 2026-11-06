import React, { useState } from 'react';
import { videos, videoCategories } from '../data/videos';
import { Play, ArrowUpRight, ChevronLeft, ChevronRight, Clock, Eye, Sparkles, Mic } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export default function VideoShowcase({ onSelectVideo, onOpenConsultation, onOpenPodcast }) {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [currentFeaturedIndex, setCurrentFeaturedIndex] = useState(0);

  const filteredVideos = selectedCategory === "All" 
    ? videos 
    : videos.filter(v => v.category === selectedCategory);

  const featuredVideo = filteredVideos[currentFeaturedIndex % filteredVideos.length] || videos[0];

  const handleNext = () => {
    setCurrentFeaturedIndex((prev) => (prev + 1) % filteredVideos.length);
  };

  const handlePrev = () => {
    setCurrentFeaturedIndex((prev) => (prev - 1 + filteredVideos.length) % filteredVideos.length);
  };

  return (
    <section id="videos" className="py-24 px-4 sm:px-6 lg:px-8 bg-[#F5F9FE] text-slate-900 overflow-hidden border-t border-slate-200/90">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Section Header matching reference */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <YoutubeIcon className="w-4 h-4 text-red-600" />
              <span>HealthTravo Original Talks</span>
            </div>
            <h2 className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight">
              Most Recent Videos &amp; Clinical Talks
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            <button
              onClick={onOpenPodcast}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-[#071A41] hover:bg-slate-900 text-white shadow-md transition-all shrink-0 cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5 text-red-400" />
              <span>Podcast Profile Deck</span>
            </button>

            <a
              href="https://www.youtube.com/@HealthTravo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-md shadow-red-600/25 transition-all shrink-0"
            >
              <span>Visit @HealthTravo</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        {/* Category Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-4 mb-10 no-scrollbar">
          {videoCategories.map((cat) => (
            <button
              key={cat}
              onClick={() => {
                setSelectedCategory(cat);
                setCurrentFeaturedIndex(0);
              }}
              className={`px-4 py-2 rounded-full text-xs font-bold transition-all shrink-0 ${
                selectedCategory === cat
                  ? 'bg-slate-900 text-white shadow-md'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Reference Showcase Layout: Center Stage Spotlight + Flanking Cards */}
        <div className="relative mb-16">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
            
            {/* Left Preview Card (Previous Video) */}
            <div className="hidden lg:block lg:col-span-3 opacity-60 hover:opacity-100 transition-opacity">
              {filteredVideos.length > 1 && (
                <div 
                  onClick={handlePrev}
                  className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                    <img
                      src={filteredVideos[(currentFeaturedIndex - 1 + filteredVideos.length) % filteredVideos.length].thumbnail}
                      alt="Previous video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ChevronLeft className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Previous Talk</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                      {filteredVideos[(currentFeaturedIndex - 1 + filteredVideos.length) % filteredVideos.length].title}
                    </h4>
                  </div>
                </div>
              )}
            </div>

            {/* Center Featured Video Card (Exact match to Reference Mockup) */}
            <div className="lg:col-span-6">
              <div 
                onClick={() => onSelectVideo(featuredVideo)}
                className="relative rounded-3xl overflow-hidden shadow-2xl border-4 border-white bg-slate-950 aspect-[16/10] cursor-pointer group card-hover-lift"
              >
                <img
                  src={featuredVideo.thumbnail}
                  alt={featuredVideo.title}
                  className="w-full h-full object-cover filter brightness-95 group-hover:scale-105 transition-transform duration-700"
                />

                {/* Dark Gradient Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent"></div>

                {/* Top Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2">
                  <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                    <YoutubeIcon className="w-3.5 h-3.5 text-white" />
                    <span>{featuredVideo.category}</span>
                  </span>
                  <span className="px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-md text-white text-[11px] font-medium">
                    {featuredVideo.duration}
                  </span>
                </div>

                {/* Bottom Overlay Pill Card matching Reference */}
                <div className="absolute bottom-5 left-5 right-5 p-4 sm:p-5 rounded-2xl bg-white/95 backdrop-blur-md shadow-2xl border border-white/60 flex items-center justify-between gap-4 group-hover:bg-white transition-all">
                  <div className="flex-1 pr-2">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {featuredVideo.tag}
                    </span>
                    <h3 className="text-sm sm:text-base font-extrabold text-slate-900 line-clamp-2 leading-snug">
                      {featuredVideo.title}
                    </h3>
                  </div>

                  {/* Blue Circular Play Icon matching Reference */}
                  <div className="w-12 h-12 rounded-full bg-blue-600 group-hover:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-lg shadow-blue-600/40 transition-transform group-hover:scale-110">
                    <Play className="w-5 h-5 fill-current ml-0.5" />
                  </div>
                </div>

              </div>
            </div>

            {/* Right Preview Card (Next Video) */}
            <div className="hidden lg:block lg:col-span-3 opacity-60 hover:opacity-100 transition-opacity">
              {filteredVideos.length > 1 && (
                <div 
                  onClick={handleNext}
                  className="rounded-3xl overflow-hidden border border-slate-200 bg-white shadow-sm cursor-pointer group"
                >
                  <div className="aspect-[4/3] relative overflow-hidden bg-slate-900">
                    <img
                      src={filteredVideos[(currentFeaturedIndex + 1) % filteredVideos.length].thumbnail}
                      alt="Next video"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors flex items-center justify-center">
                      <ChevronRight className="w-8 h-8 text-white drop-shadow-md" />
                    </div>
                  </div>
                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase text-slate-500">Next Talk</span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 mt-1">
                      {filteredVideos[(currentFeaturedIndex + 1) % filteredVideos.length].title}
                    </h4>
                  </div>
                </div>
              )}
            </div>

          </div>

          {/* Navigation Controls for Mobile/Tablet */}
          <div className="flex lg:hidden items-center justify-center gap-4 mt-6">
            <button
              onClick={handlePrev}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 hover:bg-slate-100"
              aria-label="Previous talk"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-bold text-slate-500">
              {currentFeaturedIndex + 1} of {filteredVideos.length}
            </span>
            <button
              onClick={handleNext}
              className="p-3 rounded-full bg-white border border-slate-200 shadow-md text-slate-800 hover:bg-slate-100"
              aria-label="Next talk"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>

        </div>

        {/* Video Grid for Browseable Catalog */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="flex items-center justify-between mb-8">
            <h3 className="text-xl sm:text-2xl font-extrabold text-slate-900">
              Browse HealthTravo Video Library
            </h3>
            <span className="text-xs font-semibold text-slate-500">
              {filteredVideos.length} Specialized Episodes Available
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredVideos.map((vid) => (
              <div
                key={vid.id}
                onClick={() => onSelectVideo(vid)}
                className="rounded-2xl overflow-hidden border border-slate-200 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group card-hover-lift"
              >
                <div>
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <img
                      src={vid.thumbnail}
                      alt={vid.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/25 group-hover:bg-black/10 transition-colors"></div>
                    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center shadow-lg">
                        <Play className="w-4 h-4 fill-current ml-0.5" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-black/75 text-[10px] text-white font-medium">
                      {vid.duration}
                    </div>
                  </div>

                  <div className="p-4">
                    <span className="text-[10px] font-bold uppercase tracking-wider text-blue-600 block mb-1">
                      {vid.category}
                    </span>
                    <h4 className="text-xs font-bold text-slate-900 line-clamp-2 leading-snug group-hover:text-blue-600 transition-colors">
                      {vid.title}
                    </h4>
                  </div>
                </div>

                <div className="px-4 pb-4 pt-1 flex items-center justify-between text-[11px] text-slate-500 border-t border-slate-100">
                  <span>{vid.tag}</span>
                  <span className="text-blue-600 font-bold flex items-center gap-0.5">
                    Watch <Play className="w-3 h-3 fill-current ml-1" />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Feature on HealthTravo Original Talks Invitation Card */}
        <div className="mt-14 p-6 sm:p-8 rounded-3xl bg-white border border-slate-200/90 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4 text-left">
            <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
              <Mic className="w-6 h-6 stroke-[2.2]" />
            </div>
            <div>
              <h4 className="text-base sm:text-lg font-bold text-[#071A41]">
                Are you a Doctor, Surgeon, or Medical Tech Innovator?
              </h4>
              <p className="text-xs sm:text-sm text-slate-500 mt-0.5 max-w-2xl">
                Feature on <strong>HealthTravo Original Talks</strong> to discuss complex surgical cases, demonstrate clinical devices/AI tools, or co-produce sponsored healthcare shows.
              </p>
            </div>
          </div>

          <button
            onClick={() => onOpenConsultation?.({ mode: 'healthtalk', source: 'videos_hub' })}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#071A41] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0 hover:scale-105 active:scale-95 cursor-pointer"
          >
            <span>Apply for HealthTravo Media</span>
            <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
          </button>
        </div>

      </div>
    </section>
  );
}
