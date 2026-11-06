import React from 'react';
import { Mail, Phone, MapPin, ArrowUpRight, Heart, Shield } from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from './Icons';

export default function Footer({ onOpenConsultation, onOpenPodcast }) {
  return (
    <footer className="bg-[#070a10] text-slate-400 pt-16 pb-12 border-t border-white/10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-[1440px] mx-auto">
        
        {/* Top Tier: Founder Identity + Newsletter/Quick Connect */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pb-12 border-b border-white/10 items-start">
          
          <div className="lg:col-span-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="w-12 h-12 rounded-full overflow-hidden border border-blue-500/40">
                <img
                  src="/assets/founder-portrait.webp"
                  alt="Dushyant Singh Chauhan"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div>
                <h3 className="text-xl font-extrabold text-white tracking-tight">
                  Dushyant Singh Chauhan
                </h3>
                <p className="text-xs text-blue-400 font-medium">
                  Founder & CEO, HealthTravo • Pre-Incubated at GIMS
                </p>
              </div>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-lg mb-6">
              Championing ethical cross-border healthcare, international patient advocacy, and accessible clinical knowledge. Bridging global patients with India's premier super-specialty hospital ecosystem.
            </p>

            {/* Social Channels */}
            <div className="flex items-center gap-3">
              <a
                href="https://www.youtube.com/@HealthTravo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-red-600 hover:text-white flex items-center justify-center transition-all text-slate-300"
                aria-label="YouTube Channel"
              >
                <YoutubeIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.linkedin.com/in/dushyant-chauhan/"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-600 hover:text-white flex items-center justify-center transition-all text-slate-300"
                aria-label="LinkedIn Profile"
              >
                <LinkedinIcon className="w-5 h-5" />
              </a>

              <a
                href="https://www.instagram.com/healthtravo"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-pink-600 hover:text-white flex items-center justify-center transition-all text-slate-300"
                aria-label="Instagram Profile"
              >
                <InstagramIcon className="w-5 h-5" />
              </a>

              <a
                href="https://wa.me/919999089087"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-emerald-600 hover:text-white flex items-center justify-center transition-all text-slate-300"
                aria-label="WhatsApp"
              >
                <WhatsappIcon className="w-5 h-5" />
              </a>

              <a
                href="mailto:dushyanttchauhan@gmail.com"
                className="w-10 h-10 rounded-full bg-white/5 hover:bg-blue-500 hover:text-white flex items-center justify-center transition-all text-slate-300"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links & Contact Columns */}
          <div className="lg:col-span-6 grid grid-cols-1 sm:grid-cols-2 gap-8">
            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Navigation
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li><a href="#about" className="hover:text-white transition-colors">Founder Story & Vision</a></li>
                <li><a href="#videos" className="hover:text-white transition-colors">HealthTravo YouTube Library</a></li>
                <li>
                  <button 
                    onClick={onOpenPodcast} 
                    className="hover:text-white transition-colors text-left flex items-center gap-1.5 cursor-pointer text-red-400 font-semibold"
                  >
                    <span>●</span>
                    <span>Podcast Profile &amp; Media Deck</span>
                  </button>
                </li>
                <li><a href="#network" className="hover:text-white transition-colors">Accredited Hospital Alliances</a></li>
                <li><a href="#pillars" className="hover:text-white transition-colors">Strategic Pillars</a></li>
                <li><a href="#continuum" className="hover:text-white transition-colors">360° Care Journey</a></li>
                <li><a href="#testimonials" className="hover:text-white transition-colors">Patient Healing Stories</a></li>
                <li>
                  <button 
                    onClick={() => onOpenConsultation?.()} 
                    className="hover:text-white transition-colors text-left text-blue-400 font-semibold cursor-pointer"
                  >
                    Contact &amp; Consultation Desk
                  </button>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-4">
                Founder Desk Contact
              </h4>
              <ul className="space-y-2.5 text-xs">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-blue-400" />
                  <a href="tel:+919999089087" className="hover:text-white transition-colors">+91 9999089087</a>
                </li>
                <li className="flex items-center gap-2">
                  <Mail className="w-3.5 h-3.5 text-blue-400" />
                  <a href="mailto:dushyanttchauhan@gmail.com" className="hover:text-white transition-colors">dushyanttchauhan@gmail.com</a>
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span>Delhi NCR / Greater Noida, India</span>
                </li>
                <li className="pt-2">
                  <button
                    onClick={onOpenConsultation}
                    className="text-xs font-bold text-blue-400 hover:text-blue-300 flex items-center gap-1"
                  >
                    <span>Schedule Executive Call</span>
                    <ArrowUpRight className="w-3 h-3" />
                  </button>
                </li>
              </ul>
            </div>
          </div>

        </div>

        {/* Bottom Tier: Copyright & Disclaimers */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Dushyant Singh Chauhan. All rights reserved. | <a href="https://www.healthtravo.com" target="_blank" rel="noopener noreferrer" className="hover:text-slate-300">HealthTravo.com</a>
          </div>
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-emerald-500" />
            <span>Pre-Incubated under Government Institute of Medical Sciences (GIMS)</span>
          </div>
        </div>

      </div>
    </footer>
  );
}
