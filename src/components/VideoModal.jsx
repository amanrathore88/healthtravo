import React, { useEffect } from 'react';
import { X, ArrowUpRight, ShieldCheck, Share2 } from 'lucide-react';
import { YoutubeIcon } from './Icons';

export default function VideoModal({ video, onClose }) {
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!video) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/85 backdrop-blur-md animate-fadeIn">
      
      {/* Modal Container */}
      <div className="relative w-full max-w-4xl bg-[#0f172a] rounded-3xl border border-white/15 shadow-2xl overflow-hidden flex flex-col">
        
        {/* Top Header Bar */}
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-white/10 bg-[#131d33]">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-red-600/90 text-white text-[11px] font-bold uppercase tracking-wider flex items-center gap-1.5">
              <YoutubeIcon className="w-3.5 h-3.5" />
              <span>{video.category}</span>
            </span>
            <span className="text-xs text-slate-400 font-medium hidden sm:inline">
              HealthTravo Channel
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-white/10 text-slate-400 hover:text-white transition-colors"
            aria-label="Close modal"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Video Player (Responsive 16:9 Iframe) */}
        <div className="relative aspect-video w-full bg-black">
          <iframe
            src={`https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0`}
            title={video.title}
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>

        {/* Bottom Details */}
        <div className="p-6 bg-[#0d1424] text-slate-200">
          <h3 className="text-base sm:text-xl font-bold text-white mb-2 leading-snug">
            {video.title}
          </h3>
          <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-4">
            {video.description}
          </p>

          <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-white/10 text-xs">
            <div className="flex items-center gap-2 text-slate-400">
              <span>Hosted by <strong className="text-white">Dushyant Singh Chauhan</strong></span>
              <span>•</span>
              <span className="text-emerald-400">Verified Healthcare Content</span>
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${video.id}`}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full bg-red-600 hover:bg-red-500 text-white font-bold transition-colors"
            >
              <span>Watch on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

      </div>

    </div>
  );
}
