import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Mic, 
  Play, 
  Download, 
  Share2, 
  ExternalLink, 
  Award, 
  ShieldCheck, 
  CheckCircle2, 
  XCircle, 
  Building2, 
  GraduationCap, 
  Hospital, 
  School, 
  Cpu, 
  Activity, 
  HeartHandshake, 
  Leaf, 
  Dna, 
  Users, 
  Video, 
  ArrowUpRight, 
  Clock, 
  ChevronRight, 
  Sparkles,
  MessageCircle,
  HelpCircle,
  Stethoscope,
  Globe,
  Radio,
  FileDown
} from 'lucide-react';
import { YoutubeIcon, LinkedinIcon, InstagramIcon, WhatsappIcon } from './Icons';
import { videos } from '../data/videos';

export default function PodcastProfilePage({ 
  onNavigateHome, 
  onOpenConsultation,
  onSelectVideo 
}) {
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // 9 Collaboration Sectors from Slide 6 of the PDF
  const collaborationSectors = [
    {
      id: 'doctors',
      icon: Stethoscope,
      title: 'Doctors & Specialists',
      desc: 'Top super-specialists, department heads & surgeons sharing clinical pearls and surgical breakthroughs.',
      badge: 'Clinical Excellence'
    },
    {
      id: 'universities',
      icon: GraduationCap,
      title: 'Universities & Colleges',
      desc: 'Collaborative academic lectures, youth health drives, and medical symposium broadcasts.',
      badge: 'Academic Alliances'
    },
    {
      id: 'clinics',
      icon: Hospital,
      title: 'Clinics & Day-Care',
      desc: 'Highlighting community outpatient initiatives, preventative screenings, and local health leaders.',
      badge: 'Community Care'
    },
    {
      id: 'schools',
      icon: School,
      title: 'Schools & Youth Health',
      desc: 'Adolescent health awareness, nutritional education, postural well-being, and basic life support.',
      badge: 'Youth Education'
    },
    {
      id: 'startups',
      icon: Cpu,
      title: 'Health Startups & AI',
      desc: 'Showcasing health-tech hardware, AI diagnostic instruments, surgical robotics, and digital health apps.',
      badge: 'HealthTech & Demos'
    },
    {
      id: 'diagnostics',
      icon: Activity,
      title: 'Diagnostic Centers',
      desc: 'Demystifying complex blood pathology, PET/MRI imaging, and the science of early disease detection.',
      badge: 'Diagnostic Science'
    },
    {
      id: 'nursing',
      icon: HeartHandshake,
      title: 'Nursing Homes & Care',
      desc: 'Patient advocacy, ethical hospital protocols, geriatric care, and critical ICU navigation.',
      badge: 'Patient Advocacy'
    },
    {
      id: 'ayurveda',
      icon: Leaf,
      title: 'Ayurveda & Naturopathy',
      desc: 'Evidence-based holistic lifestyle medicine, metabolic detoxification, and integrative health.',
      badge: 'Holistic Health'
    },
    {
      id: 'genetics',
      icon: Dna,
      title: 'Clinical Genetics',
      desc: 'Exploring rare genetic disorders, gene therapies, chromosomal screenings, and prenatal counseling.',
      badge: 'Genomic Medicine'
    }
  ];

  // Popular Podcasts matching exact HealthTravo YouTube Channel titles and descriptions
  const popularPodcasts = [
    {
      id: 'global-trust-indian-healthcare',
      videoId: 'qy1rR8y_fF8',
      title: 'Global Trust in Indian Healthcare: A Story of Hope, Health & Healing',
      tagline: 'Patient Success Story • Robotic Surgery',
      category: 'Patient Stories',
      doctor: 'Dr. Dushyant Nadar • Yatharth Hospital',
      views: 'High Impact',
      duration: 'Case Study',
      thumbnail: '/assets/videos/global-trust-indian-healthcare.jpg',
      desc: 'Patient Testimonial | Robotic Pyeloplasty Surgery. From Fiji to India — this is the powerful story of how one patient overcame a major urological issue with the help of robotic surgery at Yatharth Hospital, Noida, under Dr. Dushyant Nadar.'
    },
    {
      id: 'matri-period-pain-relief',
      videoId: '_CnobRZ_ZxM',
      title: 'Matri: A revolutionary Period Pain Relief Device | Shark Tank India S3 | ft. Mr. Roni & Mr. Rohan',
      tagline: 'Shark Tank India S3 • MedTech Innovation',
      category: 'Healthcare Innovation',
      doctor: 'Mr. Roni Mondal & Mr. Rohan • Co-Founders, Matri',
      views: 'Shark Tank S3',
      duration: 'MedTech Feature',
      thumbnail: '/assets/videos/matri-period-pain-relief.jpg',
      desc: 'In this podcast, meet the visionary co-founders of Matri, Mr. Roni Mondal and Mr. Rohan, presenting their groundbreaking wearable period pain relief device featured on Shark Tank India Season 3.'
    },
    {
      id: 'laparoscopic-hysterectomy-success',
      videoId: 'nkEUOIr9RTc',
      title: 'Successful Laparoscopic Hysterectomy | Patient Success Story: Hope & Healing Beyond Borders',
      tagline: 'Minimally Invasive Gynaecology',
      category: 'Patient Stories',
      doctor: 'Dr. Roli Banthia • Yatharth Hospital',
      views: 'Featured Story',
      duration: 'Case Study',
      thumbnail: '/assets/videos/laparoscopic-hysterectomy-success.jpg',
      desc: 'A Journey of Hope from Fiji to India! Meet Folake Jenyo, who traveled from Fiji to Yatharth Hospital Noida Extension seeking expert care under Dr. Roli Banthia, undergoing a successful laparoscopic hysterectomy.'
    },
    {
      id: 'prevent-chronic-kidney-disease',
      videoId: 'ncFJwvyeS28',
      title: 'How to prevent Chronic Kidney Disease? | Stages, Symptoms, and Treatment | ft. Dr. Upendra Singh',
      tagline: 'Renal Care & Nephrology Masterclass',
      category: 'Doctor Interviews',
      doctor: 'Dr. Upendra Singh • Chief Nephrologist',
      views: 'Must Watch',
      duration: 'Specialist Talk',
      thumbnail: '/assets/videos/prevent-chronic-kidney-disease.jpg',
      desc: "In this podcast, we dive deep into the world of Chronic Kidney Disease (CKD). Learn about the different stages of CKD, diagnosis, early warning signs, and risk factors like diabetes and hypertension."
    },
    {
      id: 'clinical-genetics-future',
      videoId: 'YE72Vxqz5Sc',
      title: 'How Clinical Genetics is Shaping Our Future: The Genetic Revolution | Ft. Dr. B P Das',
      tagline: 'Genomic Medicine & Hereditary Disorders',
      category: 'Doctor Interviews',
      doctor: 'Dr. Biswa Pratim Das • Senior Geneticist',
      views: 'Expert Insight',
      duration: 'Deep Dive',
      thumbnail: '/assets/videos/clinical-genetics-future.jpg',
      desc: 'Expert Geneticist Dr. Biswa Pratim Das breaks down the significance of clinical genetics in modern healthcare, the process and benefits of genetic testing and counseling, and managing inherited disorders.'
    },
    {
      id: 'womens-health-pcos-cancer',
      videoId: 'rsp0pj1E4Oo',
      title: 'Miscarriages, PCOS, Cancer & Hidden Women’s Health Dangers: Truth Exposed | ft. Dr. Shehla Jamal',
      tagline: 'Women’s Health & Preventative Oncology',
      category: 'Health Awareness',
      doctor: 'Dr. Shehla Jamal • Senior Gynecologist',
      views: '100K+ Views',
      duration: 'Masterclass',
      thumbnail: '/assets/videos/womens-health-pcos-cancer.jpg',
      desc: '10 Women’s Health Mistakes We ALL Make—Doctors Warn STOP NOW! An evidence-based masterclass covering pressing women’s health issues, PCOS, reproductive well-being, and preventative oncology.'
    },
    {
      id: 'temi-ai-robot-healthcare',
      videoId: '-cstSxvZPGw',
      title: 'Temi AI-Enabled Robot: The Future of Healthcare? | Game-Changer in Robotics!',
      tagline: 'AI & Autonomous Medical Robotics',
      category: 'Healthcare Innovation',
      doctor: 'Autonomous Robotics Innovation Review',
      views: 'Future Tech',
      duration: 'Tech Review',
      thumbnail: '/assets/videos/temi-ai-robot-healthcare.jpg',
      desc: 'In this episode of HealthTravo, we explore the incredible potential of Temi, an AI-enabled robot transforming healthcare with autonomous telepresence, patient assistance, and smart clinical workflows.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F5F9FE] text-slate-900 font-sans selection:bg-[#1877f2] selection:text-white">
      
      {/* ================= TOP STICKY APP BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200/90 px-4 sm:px-6 lg:px-8 py-3 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between gap-4">
          
          {/* Back Button & Brand */}
          <div className="flex items-center gap-3 sm:gap-4 min-w-0">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all hover:-translate-x-0.5 cursor-pointer shrink-0"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block shrink-0" />

            <div className="flex flex-col text-left min-w-0">
              <span className="text-sm font-extrabold text-[#071A41] tracking-tight truncate">
                HealthTravo Original Talks
              </span>
              <span className="text-[10px] font-semibold text-[#1877f2] uppercase tracking-wider truncate">
                Official Podcast Profile &amp; Media House Deck
              </span>
            </div>
          </div>

          {/* Quick Actions */}
          <div className="flex items-center gap-2.5 sm:gap-3 shrink-0">
            {/* Download PDF button */}
            <a
              href="/HealthTravo-Podcast-Profile.pdf"
              download="HealthTravo-Podcast-Profile.pdf"
              className="hidden md:inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-800 text-xs font-bold transition-all border border-slate-300/80 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5 stroke-[2.2]" />
              <span>Download PDF Deck</span>
            </a>

            {/* Subscribe to YouTube */}
            <a
              href="https://www.youtube.com/@HealthTravo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-red-600 hover:bg-red-700 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <YoutubeIcon className="w-3.5 h-3.5 fill-current" />
              <span className="hidden sm:inline">Subscribe</span>
            </a>

            {/* Apply to Feature */}
            <button
              onClick={() => onOpenConsultation?.({ mode: 'healthtalk', source: 'podcast_topbar' })}
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-[#071A41] hover:bg-slate-900 text-white text-xs font-bold shadow-xs transition-all cursor-pointer"
            >
              <Mic className="w-3.5 h-3.5" />
              <span>Apply to Feature</span>
            </button>
          </div>

        </div>
      </header>

      {/* ================= HERO SECTION (SLIDE 1 FROM PDF) ================= */}
      <section className="relative pt-12 sm:pt-20 pb-16 sm:pb-24 px-4 sm:px-6 lg:px-8 overflow-hidden bg-gradient-to-b from-white via-[#F5F9FE] to-white border-b border-slate-200/80">
        
        {/* Subtle Background Lighting & Shapes */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
          <div className="absolute -top-40 -right-40 w-[650px] h-[650px] bg-gradient-to-bl from-blue-100/60 via-red-50/20 to-transparent rounded-full blur-3xl pointer-events-none" />
          <div className="absolute -bottom-40 -left-40 w-[650px] h-[650px] bg-gradient-to-tr from-amber-100/40 via-blue-50/30 to-transparent rounded-full blur-3xl pointer-events-none" />
        </div>

        <div className="max-w-[1440px] mx-auto relative z-10">
          
          {/* Top Eyebrow Badges */}
          <div className="flex flex-wrap items-center justify-center gap-2 sm:gap-3 mb-6">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-200/80 text-[#1877f2] text-[11px] font-extrabold tracking-widest uppercase shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-[#1877f2] animate-pulse" />
              <span>Presentation by TEAM HEALTHTRAVO</span>
            </div>

            <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-emerald-50 border border-emerald-200/80 text-emerald-700 text-[11px] font-bold uppercase tracking-wider">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>Pre-Incubated at GIMS, Greater Noida</span>
            </div>
          </div>

          {/* Core Title (Matching Slide 1) */}
          <div className="text-center max-w-4xl mx-auto">
            <h1 className="text-4xl sm:text-6xl lg:text-[72px] font-extrabold text-[#071A41] tracking-tight leading-[1.08] mb-6">
              “Healing Health <br />
              <span className="text-[#1877f2] relative inline-block">
                with Communication”
                <svg width="220" height="12" viewBox="0 0 220 12" fill="none" className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 text-orange-500 w-full max-w-[280px]">
                  <path d="M3 9 C70 2, 150 2, 217 9" stroke="currentColor" strokeWidth="4" strokeLinecap="round" />
                </svg>
              </span>
            </h1>

            {/* Orange-Red Slogan Banner matching exact slide 1 text */}
            <div className="inline-block px-5 sm:px-8 py-2.5 sm:py-3 rounded-full bg-gradient-to-r from-orange-500 to-red-600 text-white font-extrabold text-sm sm:text-lg tracking-tight shadow-lg shadow-orange-500/25 mb-8 transform hover:scale-105 transition-transform duration-300">
              Together, Let’s Fight Back Against Health Misinformation
            </div>

            <p className="text-slate-600 text-base sm:text-xl max-w-2xl mx-auto leading-relaxed mb-10 font-normal">
              HealthTravo is empowering millions with verified clinical knowledge, debunking dangerous viral myths, and connecting patients directly to India’s most respected medical minds.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
              <button
                onClick={() => onOpenConsultation?.({ mode: 'healthtalk', source: 'podcast_hero' })}
                className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full bg-[#071A41] hover:bg-slate-900 text-white text-xs sm:text-sm font-bold uppercase tracking-wider shadow-lg shadow-[#071A41]/25 hover:scale-105 active:scale-95 transition-all cursor-pointer"
              >
                <Mic className="w-4 h-4 text-blue-400" />
                <span>Apply for HealthTravo Media</span>
              </button>

              <a
                href="#episodes"
                className="inline-flex items-center gap-2.5 px-7 py-4 rounded-full bg-white hover:bg-slate-50 text-slate-800 border border-slate-300 text-xs sm:text-sm font-bold uppercase tracking-wider shadow-2xs hover:shadow-md transition-all hover:-translate-y-0.5"
              >
                <Play className="w-4 h-4 text-red-600 fill-current" />
                <span>Watch Popular Podcasts</span>
              </a>

              <a
                href="/HealthTravo-Podcast-Profile.pdf"
                download="HealthTravo-Podcast-Profile.pdf"
                className="inline-flex items-center gap-2 px-6 py-4 rounded-full bg-blue-50 hover:bg-blue-100 text-[#1877f2] border border-blue-200 text-xs sm:text-sm font-bold transition-all cursor-pointer"
              >
                <FileDown className="w-4 h-4" />
                <span>PDF Profile</span>
              </a>
            </div>

          </div>

          {/* 4 Core Quantitative Impact Highlights */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 max-w-5xl mx-auto">
            
            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-blue-50 text-[#1877f2] flex items-center justify-center mb-3">
                <Building2 className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#071A41]">GIMS Cohort</div>
              <div className="text-xs text-slate-500 mt-0.5">Pre-Incubated under Disease Prevention</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-red-50 text-red-600 flex items-center justify-center mb-3">
                <Radio className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#071A41]">100K+ Viewers</div>
              <div className="text-xs text-slate-500 mt-0.5">Engaged across YouTube, Talks &amp; Community</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-indigo-50 text-indigo-600 flex items-center justify-center mb-3">
                <Users className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#071A41]">9+ Sectors</div>
              <div className="text-xs text-slate-500 mt-0.5">Doctors, Colleges, Startups &amp; Hospitals</div>
            </div>

            <div className="p-5 rounded-2xl bg-white border border-slate-200/90 shadow-sm text-left">
              <div className="w-10 h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                <ShieldCheck className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="text-xl sm:text-2xl font-extrabold text-[#071A41]">100% Verified</div>
              <div className="text-xs text-slate-500 mt-0.5">Zero medical jargon, strictly ethical content</div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 1: INTRODUCTION & WHY HEALTHTRAVO (SLIDE 2) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
            
            {/* Left: Narrative & Institutional Standing */}
            <div className="lg:col-span-7 space-y-6 text-left">
              
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1877f2] text-xs font-bold uppercase tracking-wider">
                <span>Introduction • Slide 2 of Profile</span>
              </div>

              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A41] tracking-tight leading-tight">
                WHY HealthTravo? <br />
                <span className="text-[#1877f2]">More than a channel, we are a movement.</span>
              </h2>

              <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
                HealthTravo is your ultimate destination for credible, actionable healthcare information. Dedicated to healthcare promotion and disease prevention, we are proud to be <strong className="text-slate-900 font-semibold">pre-incubated with the prestigious Government Institute of Medical Sciences (GIMS), Gr. Noida</strong>, under their Disease Prevention cohort.
              </p>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
                We aim to evolve into a comprehensive <strong className="text-[#071A41] font-semibold">Healthcare Media House</strong>, dedicated to delivering accessible, reliable, and impactful health content for all. We empower people with knowledge to make informed healthcare decisions.
              </p>

              {/* GIMS Institutional Card */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-blue-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                  <Award className="w-6 h-6" />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-[#071A41]">
                    GIMS Startup — Centre For Medical Innovation
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    Government Institute of Medical Sciences, Greater Noida, UP. Backed by medical researchers, academic faculty, and tertiary care clinicians.
                  </p>
                </div>
              </div>

            </div>

            {/* Right: Founder Interview Editorial Image Mockup */}
            <div className="lg:col-span-5">
              <div className="relative rounded-3xl overflow-hidden border-2 border-slate-200/90 shadow-xl bg-slate-900">
                <img
                  src="/assets/videos/healing-health-communication.jpg"
                  alt="Dushyant interviewing medical specialist"
                  className="w-full aspect-[4/3] object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent flex flex-col justify-end p-6 text-left">
                  <span className="text-xs font-bold uppercase tracking-wider text-blue-400">
                    On-Air Studio &amp; Clinic Discussions
                  </span>
                  <p className="text-sm text-white font-medium mt-1">
                    Unfiltered, honest dialogues between doctors and patient advocates.
                  </p>
                </div>
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 2: MISSION & VISION (SLIDE 3) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F9FE] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1877f2] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Foundation &amp; Purpose • Slide 3 of Profile</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-[#071A41] tracking-tight">
              Our Mission &amp; Vision
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Transforming how health information is communicated from hospital consulting rooms to everyday households across the globe.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            
            {/* Mission Card */}
            <div className="bg-white rounded-3xl p-8 sm:p-10 border border-slate-200/90 shadow-md text-left relative overflow-hidden group hover:border-[#1877f2]/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-orange-50 text-orange-600 flex items-center justify-center mb-6 shadow-2xs">
                <Stethoscope className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-orange-50 text-orange-700 text-xs font-bold uppercase tracking-wider mb-4">
                Our Mission
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-[#071A41] tracking-tight mb-4">
                Bridging the Healthcare Knowledge Gap
              </h3>

              <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-serif italic border-l-2 border-orange-500 pl-4 py-1">
                “We aim to bridge the gap between complex medical information and the everyday person, ensuring healthcare is accessible, understandable, and actionable.”
              </p>
            </div>

            {/* Vision Card */}
            <div className="bg-[#071A41] text-white rounded-3xl p-8 sm:p-10 shadow-md text-left relative overflow-hidden group hover:ring-2 hover:ring-blue-500/50 transition-all">
              <div className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center mb-6 shadow-sm">
                <Globe className="w-7 h-7 stroke-[2.2]" />
              </div>

              <div className="inline-block px-3 py-1 rounded-full bg-blue-900/60 text-blue-300 text-xs font-bold uppercase tracking-wider mb-4 border border-blue-700/50">
                Our Vision
              </div>

              <h3 className="text-xl sm:text-2xl font-extrabold text-white tracking-tight mb-4">
                The Global Healthcare Media House
              </h3>

              <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-serif italic border-l-2 border-blue-400 pl-4 py-1">
                “To become the foremost Health Channel and Media House, promoting healthcare and health awareness on a global scale.”
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 3: PROBLEMS VS. SOLUTIONS (SLIDES 4 & 5) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
              <span>Diagnosis vs. Treatment • Slides 4 &amp; 5 of Profile</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A41] tracking-tight">
              The Problem in Healthcare vs. Our Solution
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Why patient confusion leads to delayed treatments—and how HealthTravo delivers clarity.
            </p>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch max-w-6xl mx-auto">
            
            {/* The Problem Column (Slide 4) */}
            <div className="lg:col-span-6 bg-red-50/40 rounded-3xl p-6 sm:p-9 border border-red-200/80 text-left flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-red-100 text-red-800 text-xs font-bold uppercase tracking-wider mb-4">
                  <XCircle className="w-3.5 h-3.5 text-red-600" />
                  <span>Problem Statement in Healthcare</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#071A41] tracking-tight mb-6">
                  Where Healthcare Fails the Everyday Patient:
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Lack of Health Education",
                      desc: "Medical terminology is treated as an insider dialect. Patients leave consultations anxious and unaware of basic pathology."
                    },
                    {
                      title: "Lack of Health Awareness",
                      desc: "Preventive screening is neglected until symptoms become acute, dramatically escalating costs and mortality."
                    },
                    {
                      title: "Lack of Credible Medical Experts on Social Media",
                      desc: "Algorithms promote sensational home remedies and unqualified influencers over evidence-based clinical science."
                    },
                    {
                      title: "Lack of Chronic Condition Support",
                      desc: "Patients with diabetes, hypertension, or kidney disease lack daily guidance to navigate lifestyle, diet, and medication."
                    }
                  ].map((prob, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-red-100 shadow-2xs flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-red-100 text-red-600 flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✕
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-slate-900">{prob.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{prob.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-red-200/60 text-xs text-slate-500 italic">
                *Identified by HealthTravo research &amp; GIMS clinical observations.
              </div>
            </div>

            {/* The Solution Column (Slide 5) */}
            <div className="lg:col-span-6 bg-blue-50/50 rounded-3xl p-6 sm:p-9 border border-blue-200/90 text-left flex flex-col justify-between">
              <div>
                <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-100 text-[#1877f2] text-xs font-bold uppercase tracking-wider mb-4">
                  <CheckCircle2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Solutions in Healthcare</span>
                </div>

                <h3 className="text-2xl font-extrabold text-[#071A41] tracking-tight mb-6">
                  How HealthTravo Addresses These Challenges Head-On:
                </h3>

                <div className="space-y-4">
                  {[
                    {
                      title: "Understanding Medical Information",
                      desc: "We decode surgical procedures, lab reports, and treatment pathways into empathetic, human visual media."
                    },
                    {
                      title: "Making Informed Decisions About Health",
                      desc: "We equip patients with questions to ask their doctors, ensuring family autonomy and second-opinion confidence."
                    },
                    {
                      title: "Credible Content from Credible Medical Experts",
                      desc: "Every discussion features accredited surgeons, clinical department heads, and verified academic instructors."
                    },
                    {
                      title: "Managing Chronic Conditions",
                      desc: "In-depth masterclasses on renal failure prevention, cardiac rehab, cancer triage, and glycemic stability."
                    }
                  ].map((sol, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white border border-blue-100 shadow-2xs flex items-start gap-3.5">
                      <div className="w-6 h-6 rounded-full bg-blue-100 text-[#1877f2] flex items-center justify-center text-xs font-bold shrink-0 mt-0.5">
                        ✓
                      </div>
                      <div>
                        <h4 className="text-sm font-bold text-[#071A41]">{sol.title}</h4>
                        <p className="text-xs text-slate-500 mt-1 leading-relaxed">{sol.desc}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="mt-6 pt-4 border-t border-blue-200/60 text-xs text-slate-500 italic">
                *Pre-incubated under GIMS Disease Prevention framework.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* ================= SECTION 4: OUR SERVICES & 9 SECTORS (SLIDE 6) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F9FE] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1877f2] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Collaboration Network • Slide 6 of Profile</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A41] tracking-tight">
              Our Services: Who We Collaborate With
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              As dedicated health promoters, we collaborate and produce podcasts and HealthTravo Media features across 9 core healthcare pillars.
            </p>
          </div>

          {/* 9 Sectors Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto mb-12">
            {collaborationSectors.map((sector) => {
              const IconComp = sector.icon;
              return (
                <div
                  key={sector.id}
                  className="bg-white rounded-2xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-[#1877f2]/50 transition-all duration-300 text-left flex flex-col justify-between group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-11 h-11 rounded-xl bg-blue-50 group-hover:bg-[#1877f2] text-[#1877f2] group-hover:text-white flex items-center justify-center transition-colors">
                        <IconComp className="w-5 h-5 stroke-[2.2]" />
                      </div>
                      <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400 group-hover:text-[#1877f2] transition-colors">
                        {sector.badge}
                      </span>
                    </div>

                    <h3 className="text-base font-bold text-[#071A41] tracking-tight mb-2">
                      {sector.title}
                    </h3>

                    <p className="text-xs text-slate-500 leading-relaxed font-normal">
                      {sector.desc}
                    </p>
                  </div>

                  <div className="mt-5 pt-3 border-t border-slate-100 flex items-center justify-between">
                    <span className="text-[11px] font-semibold text-slate-400">Available for Talks</span>
                    <button
                      onClick={() => onOpenConsultation?.({ mode: 'healthtalk', context: sector.title })}
                      className="text-xs font-bold text-[#1877f2] hover:text-blue-700 flex items-center gap-1 cursor-pointer"
                    >
                      <span>Schedule</span>
                      <ChevronRight className="w-3.5 h-3.5 stroke-[2.5]" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Banner inside section */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/90 shadow-sm max-w-4xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-6 text-left">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 text-indigo-600 flex items-center justify-center shrink-0">
                <Mic className="w-6 h-6 stroke-[2.2]" />
              </div>
              <div>
                <h4 className="text-base font-bold text-[#071A41]">
                  Want to record an episode with your institution?
                </h4>
                <p className="text-xs text-slate-500 mt-0.5">
                  We schedule in-studio, remote 4K, and on-site filming for colleges, clinics, hospitals, and startups.
                </p>
              </div>
            </div>
            <button
              onClick={() => onOpenConsultation?.({ mode: 'healthtalk', source: 'sectors_cta' })}
              className="px-6 py-3 rounded-full bg-[#071A41] hover:bg-slate-900 text-white text-xs font-bold uppercase tracking-wider shadow-md transition-all shrink-0 cursor-pointer"
            >
              Book Podcast Recording
            </button>
          </div>

        </div>
      </section>

      {/* ================= SECTION 5: POPULAR PODCASTS (SLIDE 7) ================= */}
      <section id="episodes" className="py-20 px-4 sm:px-6 lg:px-8 bg-white border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-6">
            <div className="text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-50 text-red-700 text-xs font-bold uppercase tracking-wider mb-3">
                <YoutubeIcon className="w-4 h-4 text-red-600" />
                <span>Featured Talks • Slide 7 of Profile</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-extrabold text-[#071A41] tracking-tight">
                Our Popular Podcasts
              </h2>
              <p className="text-sm text-slate-600 mt-2 max-w-xl">
                Real hospital documentaries, surgery debriefs, and deep-dive health masterclasses documented by Dushyant Singh Chauhan.
              </p>
            </div>

            <a
              href="https://www.youtube.com/@HealthTravo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider bg-red-600 hover:bg-red-700 text-white shadow-md transition-all shrink-0 self-start md:self-auto cursor-pointer"
            >
              <span>Subscribe on YouTube</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* 6 Popular Episodes Grid matching Slide 7 */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {popularPodcasts.map((podcast) => (
              <div
                key={podcast.id}
                onClick={() => {
                  const match = videos.find(v => v.id === podcast.videoId) || {
                    id: podcast.videoId,
                    title: podcast.title,
                    description: podcast.desc,
                    category: podcast.category,
                    thumbnail: podcast.thumbnail
                  };
                  onSelectVideo?.(match);
                }}
                className="rounded-3xl overflow-hidden border border-slate-200/90 bg-white shadow-sm hover:shadow-xl transition-all duration-300 flex flex-col justify-between cursor-pointer group text-left card-hover-lift"
              >
                <div>
                  {/* Thumbnail / Header Simulation */}
                  <div className="aspect-video relative overflow-hidden bg-slate-900">
                    <img
                      src={podcast.thumbnail}
                      alt={podcast.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10 group-hover:via-black/20 transition-colors" />

                    {/* Play Button Overlay */}
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform">
                        <Play className="w-5 h-5 fill-current ml-0.5" />
                      </div>
                    </div>

                    <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/60 backdrop-blur-xs text-[10px] font-bold text-white uppercase tracking-wider">
                      {podcast.category}
                    </div>

                    <div className="absolute bottom-3 right-3 px-2 py-0.5 rounded bg-black/80 text-[10px] text-white font-medium">
                      {podcast.duration}
                    </div>
                  </div>

                  {/* Content */}
                  <div className="p-6">
                    <span className="text-[11px] font-bold text-[#1877f2] uppercase tracking-wider block mb-1">
                      {podcast.tagline}
                    </span>
                    <h3 className="text-base sm:text-lg font-bold text-[#071A41] leading-snug group-hover:text-[#1877f2] transition-colors mb-2 line-clamp-2">
                      {podcast.title}
                    </h3>
                    <p className="text-xs text-slate-500 leading-relaxed line-clamp-3 mb-4">
                      {podcast.desc}
                    </p>
                  </div>
                </div>

                <div className="px-6 pb-5 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <span className="text-slate-500 font-medium truncate max-w-[180px]">{podcast.doctor}</span>
                  <span className="text-red-600 font-bold flex items-center gap-1 group-hover:translate-x-0.5 transition-transform">
                    <span>Watch Now</span>
                    <Play className="w-3 h-3 fill-current ml-0.5" />
                  </span>
                </div>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ================= SECTION 6: COMMUNITY, SOCIALS & QR CHANNELS (SLIDES 8 & 9) ================= */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-[#F5F9FE] border-b border-slate-200/80">
        <div className="max-w-[1440px] mx-auto">
          
          <div className="text-center max-w-3xl mx-auto mb-14">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 text-[#1877f2] text-xs font-bold uppercase tracking-wider mb-3">
              <span>Audience Growth &amp; Engagement • Slides 8 &amp; 9</span>
            </div>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-extrabold text-[#071A41] tracking-tight">
              Connect Across Our Global Channels
            </h2>
            <p className="text-sm sm:text-base text-slate-600 mt-2">
              Subscribe, follow, and engage with the HealthTravo community across YouTube, LinkedIn, Instagram, and WhatsApp.
            </p>
          </div>

          {/* Social Channels Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto mb-14">
            
            {/* YouTube */}
            <a
              href="https://www.youtube.com/@HealthTravo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-red-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-red-50 text-red-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <YoutubeIcon className="w-7 h-7 fill-current" />
              </div>
              <h3 className="text-base font-bold text-[#071A41]">YouTube Channel</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">@HealthTravo • Long-form hospital documentaries and specialist talks.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-red-600 group-hover:underline">
                <span>Subscribe Now</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* LinkedIn */}
            <a
              href="https://www.linkedin.com/in/dushyant-chauhan/"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-blue-600/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-blue-50 text-blue-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <LinkedinIcon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#071A41]">LinkedIn Network</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">Dushyant Chauhan • Healthcare leadership, clinical B2B, and GIMS updates.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-blue-600 group-hover:underline">
                <span>Follow Professional Deck</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* Instagram */}
            <a
              href="https://www.instagram.com/healthtravo"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-pink-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-pink-50 text-pink-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <InstagramIcon className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-[#071A41]">Instagram Community</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">@healthtravo • Quick clinical reels, myth busters, and daily health tips.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-pink-600 group-hover:underline">
                <span>Follow on Instagram</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

            {/* WhatsApp Community */}
            <a
              href="https://wa.me/919999089087?text=Hello%20Dushyant,%20I%20am%20interested%20in%20collaborating%20with%20HealthTravo%20Original%20Talks."
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs hover:shadow-lg hover:border-emerald-500/50 transition-all text-center group cursor-pointer"
            >
              <div className="w-14 h-14 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                <WhatsappIcon className="w-7 h-7 fill-current" />
              </div>
              <h3 className="text-base font-bold text-[#071A41]">Founder WhatsApp</h3>
              <p className="text-xs text-slate-500 mt-1 mb-4">+91 9999089087 • Direct channel for interview inquiries and scheduling.</p>
              <div className="inline-flex items-center gap-1.5 text-xs font-bold text-emerald-600 group-hover:underline">
                <span>Chat with Dushyant</span>
                <ArrowUpRight className="w-3.5 h-3.5" />
              </div>
            </a>

          </div>

          {/* Slide 8 & 9 "Thank You" Banner */}
          <div className="bg-gradient-to-r from-[#071A41] to-[#0d2a6b] text-white rounded-3xl p-8 sm:p-12 text-center max-w-4xl mx-auto shadow-xl relative overflow-hidden">
            <div className="relative z-10">
              <div className="w-16 h-16 rounded-full bg-blue-500/20 border border-blue-400/40 flex items-center justify-center mx-auto mb-5 text-blue-300">
                <HeartHandshake className="w-8 h-8 stroke-[2.2]" />
              </div>
              
              <h3 className="text-2xl sm:text-3xl font-extrabold tracking-tight mb-3">
                “Thank You for Standing with Credible Healthcare”
              </h3>

              <p className="text-slate-300 text-sm sm:text-base max-w-xl mx-auto leading-relaxed mb-8">
                Like, Share, and Subscribe to help us build India’s most trusted Healthcare Media House. Together, we can eradicate health misinformation.
              </p>

              <div className="flex flex-wrap items-center justify-center gap-4">
                <a
                  href="/HealthTravo-Podcast-Profile.pdf"
                  download="HealthTravo-Podcast-Profile.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-white text-slate-900 font-bold text-xs uppercase tracking-wider hover:bg-slate-100 transition-all cursor-pointer shadow-md"
                >
                  <Download className="w-4 h-4" />
                  <span>Download Full Presentation (PDF)</span>
                </a>

                <button
                  onClick={() => onOpenConsultation?.({ mode: 'healthtalk', source: 'thankyou_banner' })}
                  className="inline-flex items-center gap-2 px-6 py-3.5 rounded-full bg-[#1877f2] hover:bg-blue-600 text-white font-bold text-xs uppercase tracking-wider transition-all cursor-pointer shadow-md"
                >
                  <Mic className="w-4 h-4" />
                  <span>Schedule an Episode</span>
                </button>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}
