import React, { useState, useEffect } from 'react';
import { 
  ArrowLeft, 
  Stethoscope, 
  Mic, 
  Send, 
  CheckCircle2, 
  Phone, 
  Mail, 
  MapPin, 
  Clock, 
  ShieldCheck, 
  Building2, 
  FileText, 
  Upload, 
  Sparkles, 
  Video, 
  Tv, 
  Briefcase, 
  UserCheck,
  ChevronRight,
  ExternalLink,
  Award,
  Calendar,
  Layers,
  AlertCircle
} from 'lucide-react';
import { WhatsappIcon, YoutubeIcon, LinkedinIcon } from './Icons';

// =========================================================================
// GOOGLE SHEETS INTEGRATION CONFIGURATION
// 1. Follow the 3-minute setup in GOOGLE_SHEETS_SETUP_GUIDE.md
// 2. Paste your deployed Web App URL below (or set VITE_GOOGLE_SHEET_URL in .env)
// =========================================================================
const GOOGLE_SHEET_WEBAPP_URL = 
  import.meta.env?.VITE_GOOGLE_SHEET_URL || 
  "https://script.google.com/macros/s/AKfycbz0MlkIm161eGrBRjGFpJ75X2nz2GY7JJ4zSF6NCG-lGGawtko_Xm6DmkMgZu5ppIuB_w/exec";

export default function ContactPage({ onNavigateHome, initialTab = 'consultation', initialData = null }) {
  // Active Tab Mode: 'consultation' | 'healthtalk'
  const [activeTab, setActiveTab] = useState(initialTab);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [submittedData, setSubmittedData] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [activeTab]);

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  // Consultation Form State
  const [consultForm, setConsultForm] = useState({
    fullName: '',
    phone: '',
    email: '',
    country: '',
    preferredHospital: initialData?.hospital || '',
    specialty: initialData?.specialty || '',
    services: ['Doctor Second Opinion', 'Hospital Cost & Package Estimate'],
    medicalQuery: initialData?.context ? `Context: ${initialData.context}` : '',
    fileName: '',
    fileBase64: '',
    fileMimeType: '',
    fileSizeFormatted: ''
  });

  // Handle medical record selection & base64 conversion for Google Drive upload
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // 15MB limit
    const maxBytes = 15 * 1024 * 1024;
    if (file.size > maxBytes) {
      alert("Please select a file under 15MB. For large CT/MRI scans, you can submit the form and send files directly via WhatsApp.");
      return;
    }

    const reader = new FileReader();
    reader.onload = () => {
      const dataUrl = reader.result;
      const base64Index = dataUrl.indexOf('base64,');
      const base64Data = base64Index !== -1 ? dataUrl.substring(base64Index + 7) : dataUrl;

      setConsultForm(prev => ({
        ...prev,
        fileName: file.name,
        fileMimeType: file.type || 'application/octet-stream',
        fileBase64: base64Data,
        fileSizeFormatted: (file.size / (1024 * 1024)).toFixed(2) + ' MB'
      }));
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveFile = (e) => {
    e?.stopPropagation?.();
    setConsultForm(prev => ({
      ...prev,
      fileName: '',
      fileMimeType: '',
      fileBase64: '',
      fileSizeFormatted: ''
    }));
  };

  // HealthTravo Media Form State
  const [healthTalkForm, setHealthTalkForm] = useState({
    fullName: '',
    organization: '',
    designation: '',
    phone: '',
    email: '',
    website: '',
    collabType: 'podcast', // podcast | product | show | institution
    topicTitle: '',
    message: '',
    filmingMode: 'remote' // remote | studio | onsite
  });

  // Toggle Services Checkbox for Consultation
  const toggleService = (service) => {
    setConsultForm(prev => {
      const exists = prev.services.includes(service);
      return {
        ...prev,
        services: exists 
          ? prev.services.filter(s => s !== service)
          : [...prev.services, service]
      };
    });
  };

  // Secure asynchronous submission to Google Sheets
  const submitToGoogleSheet = async (payload) => {
    setIsSubmitting(true);

    if (GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL.trim() !== '') {
      try {
        // mode: 'no-cors' with 'text/plain' prevents browser CORS preflight blocks
        // while securely delivering the JSON payload to the Google Apps Script doPost endpoint
        await fetch(GOOGLE_SHEET_WEBAPP_URL, {
          method: 'POST',
          mode: 'no-cors',
          headers: {
            'Content-Type': 'text/plain;charset=utf-8',
          },
          body: JSON.stringify(payload),
        });
      } catch (err) {
        console.warn('Google Sheets logging status:', err);
      }
    } else {
      console.info('[HealthTravo Secure Portal] Ready for Google Sheet Web App URL. Payload captured:', payload);
    }

    // Brief smooth UX transition
    await new Promise(resolve => setTimeout(resolve, 600));

    setIsSubmitting(false);
    setSubmittedData(payload);
    setIsSubmitted(true);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handle Consultation Submit
  const handleConsultSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: 'Doctor & Clinical Consultation',
      ...consultForm
    };
    await submitToGoogleSheet(payload);
  };

  // Handle HealthTravo Media Submit
  const handleHealthTalkSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      type: 'HealthTravo Media Collab',
      ...healthTalkForm
    };
    await submitToGoogleSheet(payload);
  };

  // Generate WhatsApp Message
  const getWhatsAppLink = (data) => {
    if (!data) return 'https://wa.me/919999089087';
    let text = '';
    if (data.type === 'Doctor & Clinical Consultation') {
      text = `*New Clinical Consultation Request*\n\n` +
        `*Name:* ${data.fullName}\n` +
        `*Phone:* ${data.phone}\n` +
        `*Email:* ${data.email || 'N/A'}\n` +
        `*Country:* ${data.country || 'N/A'}\n` +
        `*Hospital Preference:* ${data.preferredHospital || 'General Recommendation'}\n` +
        `*Specialty:* ${data.specialty || 'General Inquiry'}\n` +
        `*Services Required:* ${data.services.join(', ')}\n` +
        `*Notes/Query:* ${data.medicalQuery || 'None'}`;
    } else {
      text = `*New HealthTravo Media Application*\n\n` +
        `*Applicant:* ${data.fullName}\n` +
        `*Designation:* ${data.designation}\n` +
        `*Organization:* ${data.organization}\n` +
        `*Contact:* ${data.phone}\n` +
        `*Collab Type:* ${data.collabType.toUpperCase()}\n` +
        `*Proposed Topic:* ${data.topicTitle}\n` +
        `*Filming Mode:* ${data.filmingMode}\n` +
        `*Key Objectives:* ${data.message}`;
    }
    return `https://wa.me/919999089087?text=${encodeURIComponent(text)}`;
  };

  return (
    <div className="min-h-screen bg-[#F5F9FE] text-slate-900 font-sans selection:bg-[#1877f2] selection:text-white pb-20">
      
      {/* ================= STICKY TOP APP BAR ================= */}
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-slate-200/80 px-4 sm:px-6 lg:px-8 py-3.5 shadow-2xs">
        <div className="max-w-[1440px] mx-auto flex items-center justify-between">
          
          {/* Back Button + Brand Identity */}
          <div className="flex items-center gap-3 sm:gap-4">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-bold transition-all hover:-translate-x-0.5 cursor-pointer"
              title="Return to Main Website"
            >
              <ArrowLeft className="w-4 h-4 stroke-[2.5]" />
              <span className="hidden sm:inline">Back to Home</span>
            </button>

            <div className="h-4 w-px bg-slate-200 hidden sm:block" />

            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full overflow-hidden shrink-0 border border-slate-200 shadow-2xs">
                <img
                  src="/assets/healthtravo-media-logo.png"
                  alt="Healthtravo Media"
                  className="w-full h-full object-cover rounded-full"
                />
              </div>
              <div className="flex flex-col text-left">
                <span className="text-sm font-extrabold text-[#071A41] tracking-tight leading-none">
                  Healthtravo Media
                </span>
                <span className="text-[10px] font-semibold text-[#1877f2] uppercase tracking-wider mt-0.5">
                  Executive Desk &amp; Consultations
                </span>
              </div>
            </div>
          </div>

          {/* Quick Direct Desk Connect */}
          <div className="flex items-center gap-3">
            <a
              href="tel:+919999089087"
              className="hidden md:inline-flex items-center gap-2 text-xs font-semibold text-slate-600 hover:text-[#071A41] transition-colors"
            >
              <Phone className="w-3.5 h-3.5 text-[#1877f2]" />
              <span>+91 9999089087</span>
            </a>

            <a
              href="https://wa.me/919999089087?text=Hello%20Dushyant,%20I%20would%20like%20to%20connect%20with%20HealthTravo."
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1877f2] hover:bg-blue-600 text-white text-xs font-bold shadow-xs hover:shadow-md transition-all cursor-pointer"
            >
              <WhatsappIcon className="w-3.5 h-3.5 fill-current" />
              <span>Direct WhatsApp</span>
            </a>
          </div>

        </div>
      </header>

      {/* ================= MAIN CONTAINER ================= */}
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12">
        
        {/* Top Editorial Eyebrow & Hero Title */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-12">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-blue-50 border border-blue-100 text-[#1877f2] text-[11px] font-bold tracking-widest uppercase mb-4 shadow-2xs">
            <span className="w-2 h-2 rounded-full bg-[#1877f2] animate-pulse" />
            <span>Dedicated Consultation &amp; Collaboration Portal</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[44px] font-extrabold text-[#071A41] tracking-tight leading-[1.15] mb-4">
            Consultation &amp; HealthTravo Media Desk
          </h1>

          <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
            Select your journey below: connect directly with India’s foremost doctors and super-specialty hospitals for treatment, or collaborate with us to feature on <strong className="text-slate-900 font-semibold">HealthTravo Original Talks</strong> to showcase clinical breakthroughs, podcasts, and medical devices.
          </p>
        </div>

        {/* ================= THE TWO PRIMARY TOGGLE BUTTONS ================= */}
        <div className="max-w-2xl mx-auto mb-10 sm:mb-12">
          <div className="grid grid-cols-1 sm:grid-cols-2 p-1.5 rounded-2xl bg-white border border-slate-200 shadow-sm gap-2">
            
            {/* Button 1: Doctor Consultation */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('consultation');
                setIsSubmitted(false);
              }}
              className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                activeTab === 'consultation'
                  ? 'bg-[#071A41] text-white shadow-md shadow-[#071A41]/20 ring-1 ring-[#071A41]'
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                activeTab === 'consultation' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-blue-50 text-[#1877f2]'
              }`}>
                <Stethoscope className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight">
                    Consultation
                  </span>
                  {activeTab === 'consultation' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  )}
                </div>
                <p className={`text-xs mt-0.5 leading-snug line-clamp-1 ${
                  activeTab === 'consultation' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  See a doctor &amp; medical guidance
                </p>
              </div>
            </button>

            {/* Button 2: HealthTravo Media */}
            <button
              type="button"
              onClick={() => {
                setActiveTab('healthtalk');
                setIsSubmitted(false);
              }}
              className={`flex items-center gap-3.5 p-3.5 sm:p-4 rounded-xl text-left transition-all duration-300 cursor-pointer ${
                activeTab === 'healthtalk'
                  ? 'bg-[#071A41] text-white shadow-md shadow-[#071A41]/20 ring-1 ring-[#071A41]'
                  : 'bg-transparent text-slate-600 hover:text-slate-900 hover:bg-slate-50'
              }`}
            >
              <div className={`w-11 h-11 rounded-xl flex items-center justify-center shrink-0 transition-colors ${
                activeTab === 'healthtalk' 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-indigo-50 text-indigo-600'
              }`}>
                <Mic className="w-5 h-5 stroke-[2.2]" />
              </div>
              <div className="min-w-0">
                <div className="flex items-center gap-1.5">
                  <span className="text-sm font-bold tracking-tight">
                    HealthTravo Media
                  </span>
                  {activeTab === 'healthtalk' && (
                    <span className="w-1.5 h-1.5 rounded-full bg-blue-400 shrink-0" />
                  )}
                </div>
                <p className={`text-xs mt-0.5 leading-snug line-clamp-1 ${
                  activeTab === 'healthtalk' ? 'text-blue-100' : 'text-slate-500'
                }`}>
                  Podcast, products &amp; shows
                </p>
              </div>
            </button>

          </div>
        </div>

        {/* ================= MAIN CONTENT GRID (FORM + SIDEBAR) ================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 sm:gap-10 items-start">
          
          {/* ================= LEFT / MAIN COLUMN: THE ACTIVE FORM ================= */}
          <div className="lg:col-span-8">
            
            {/* SUCCESS STATE DISPLAY */}
            {isSubmitted && submittedData ? (
              <div className="bg-white rounded-3xl p-8 sm:p-12 border border-slate-200/90 shadow-xl text-center">
                <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 border border-emerald-200 flex items-center justify-center mx-auto mb-6 shadow-sm">
                  <CheckCircle2 className="w-8 h-8 stroke-[2.5]" />
                </div>

                <h3 className="text-2xl sm:text-3xl font-extrabold text-[#071A41] mb-2 tracking-tight">
                  Inquiry Dispatched Successfully!
                </h3>
                
                <p className="text-sm sm:text-base text-slate-600 max-w-lg mx-auto mb-5 leading-relaxed">
                  Thank you, <strong className="text-slate-900">{submittedData.fullName}</strong>. Your {submittedData.type} request has been received by Dushyant Singh Chauhan and the clinical coordination desk.
                </p>

                {GOOGLE_SHEET_WEBAPP_URL && GOOGLE_SHEET_WEBAPP_URL.trim() !== '' ? (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-6">
                    <ShieldCheck className="w-4 h-4 text-emerald-600" />
                    <span>Logged securely to private Google Sheet desk</span>
                  </div>
                ) : (
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-amber-50 border border-amber-200 text-amber-800 text-xs font-medium mb-6">
                    <AlertCircle className="w-4 h-4 text-amber-600 shrink-0" />
                    <span>Google Sheet Web App URL pending deployment in ContactPage.jsx</span>
                  </div>
                )}

                {/* Information Card */}
                <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200/80 max-w-md mx-auto text-left mb-8 text-xs sm:text-sm space-y-2">
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Category:</span>
                    <span className="font-bold text-[#071A41]">{submittedData.type}</span>
                  </div>
                  <div className="flex justify-between border-b border-slate-200 pb-2">
                    <span className="text-slate-500">Phone / WhatsApp:</span>
                    <span className="font-semibold text-slate-800">{submittedData.phone}</span>
                  </div>
                  {submittedData.preferredHospital && (
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Preferred Hospital:</span>
                      <span className="font-semibold text-slate-800">{submittedData.preferredHospital}</span>
                    </div>
                  )}
                  {submittedData.topicTitle && (
                    <div className="flex justify-between border-b border-slate-200 pb-2">
                      <span className="text-slate-500">Proposed Topic:</span>
                      <span className="font-semibold text-slate-800">{submittedData.topicTitle}</span>
                    </div>
                  )}
                  <div className="flex justify-between pt-1">
                    <span className="text-slate-500">Expected SLA:</span>
                    <span className="font-bold text-emerald-600">Within 4 Business Hours</span>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                  <a
                    href={getWhatsAppLink(submittedData)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-emerald-600/25 transition-all"
                  >
                    <WhatsappIcon className="w-4 h-4 fill-current" />
                    <span>Open in WhatsApp Now</span>
                  </a>

                  <button
                    onClick={() => {
                      setIsSubmitted(false);
                      setSubmittedData(null);
                    }}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-full bg-white hover:bg-slate-100 text-slate-700 font-bold text-xs sm:text-sm border border-slate-300 transition-all cursor-pointer"
                  >
                    Submit Another Request
                  </button>
                </div>
              </div>
            ) : (
              /* FORM CARDS */
              <div className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200/90 shadow-lg">
                
                {/* ========================================================
                    MODE 1: DOCTOR & CLINICAL CONSULTATION FORM
                   ======================================================== */}
                {activeTab === 'consultation' && (
                  <form onSubmit={handleConsultSubmit} className="space-y-8">
                    
                    {/* Form Intro Banner */}
                    <div className="pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-[#1877f2] uppercase tracking-wider mb-1">
                        <Stethoscope className="w-4 h-4" />
                        <span>Doctor &amp; Hospital Consultation</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#071A41] tracking-tight">
                        See a Doctor or Request a Second Opinion
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Connect with super-specialist surgeons, obtain genuine hospital package estimates, and access expedited medical visa invitation letters (VIL).
                      </p>
                    </div>

                    {/* Section 1: Patient & Contact Info */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1877f2] flex items-center justify-center text-[10px] font-extrabold">1</span>
                        <span>Patient &amp; Contact Details</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Full Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Patient / Inquirer Full Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Rahul Sharma or John Doe"
                            value={consultForm.fullName}
                            onChange={(e) => setConsultForm({ ...consultForm, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all"
                          />
                        </div>

                        {/* WhatsApp / Phone */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            WhatsApp / Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 9999089087 or +971 50 1234567"
                            value={consultForm.phone}
                            onChange={(e) => setConsultForm({ ...consultForm, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all"
                          />
                        </div>

                        {/* Email Address */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Email Address <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="email"
                            placeholder="patient@example.com"
                            value={consultForm.email}
                            onChange={(e) => setConsultForm({ ...consultForm, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all"
                          />
                        </div>

                        {/* Country / City */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Country &amp; City of Residence <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dubai (UAE), Nairobi (Kenya), or Delhi"
                            value={consultForm.country}
                            onChange={(e) => setConsultForm({ ...consultForm, country: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 2: Clinical Requirements & Hospital Preference */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1877f2] flex items-center justify-center text-[10px] font-extrabold">2</span>
                        <span>Clinical Department &amp; Hospital Preferences</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 mb-5">
                        {/* Clinical Specialty */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Clinical Specialty / Department <span className="text-red-500">*</span>
                          </label>
                          <select
                            value={consultForm.specialty}
                            onChange={(e) => setConsultForm({ ...consultForm, specialty: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all cursor-pointer"
                          >
                            <option value="">Select Medical Specialty...</option>
                            <option value="Cardiology & Heart Surgery">Cardiology &amp; Cardiac Surgery</option>
                            <option value="Oncology & Bone Marrow">Oncology &amp; Cancer Treatment</option>
                            <option value="Orthopaedics & Spine">Orthopaedics, Joint Replacement &amp; Spine</option>
                            <option value="Neurosciences & Neurosurgery">Neurosciences &amp; Brain Surgery</option>
                            <option value="Organ Transplant (Liver/Kidney)">Organ Transplants (Liver / Kidney / Lung)</option>
                            <option value="Robotic & Minimally Invasive Surgery">Robotic &amp; Minimally Invasive Surgery</option>
                            <option value="Gastroenterology & Hepatology">Gastroenterology &amp; Hepatology</option>
                            <option value="IVF & Reproductive Sciences">IVF &amp; Reproductive Medicine</option>
                            <option value="General Clinical Inquiry">Other / General Health Inquiry</option>
                          </select>
                        </div>

                        {/* Hospital Partner */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Preferred Hospital Partner
                          </label>
                          <select
                            value={consultForm.preferredHospital}
                            onChange={(e) => setConsultForm({ ...consultForm, preferredHospital: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all cursor-pointer"
                          >
                            <option value="">Need Dushyant's Clinical Recommendation</option>
                            <option value="Max Healthcare">Max Super Speciality Hospital (Delhi NCR)</option>
                            <option value="Fortis Healthcare">Fortis Healthcare Network</option>
                            <option value="Artemis Hospitals">Artemis Hospital (Gurugram)</option>
                            <option value="Yatharth Super Speciality">Yatharth Super Speciality Hospital</option>
                            <option value="Medanta - The Medicity">Medanta - The Medicity</option>
                            <option value="Apollo Hospitals">Apollo Hospitals</option>
                          </select>
                        </div>
                      </div>

                      {/* Required Services Checkboxes */}
                      <label className="block text-xs font-bold text-slate-700 mb-2">
                        Assistance Required <span className="text-slate-400 font-normal">(Select all that apply)</span>
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                        {[
                          'Doctor Second Opinion',
                          'Hospital Cost & Package Estimate',
                          'Medical Visa Invitation Letter (VIL)',
                          'Bedside Concierge & Airport Pickup',
                          'Direct Tele-Consultation with Surgeon',
                          'Insurance / Facilitator Direct Billing'
                        ].map((srv) => (
                          <label 
                            key={srv} 
                            className={`flex items-center gap-2.5 p-3 rounded-xl border text-xs font-semibold cursor-pointer transition-all ${
                              consultForm.services.includes(srv)
                                ? 'bg-blue-50/80 border-[#1877f2] text-[#071A41]'
                                : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                            }`}
                          >
                            <input
                              type="checkbox"
                              checked={consultForm.services.includes(srv)}
                              onChange={() => toggleService(srv)}
                              className="w-4 h-4 rounded text-[#1877f2] focus:ring-0 border-slate-300"
                            />
                            <span>{srv}</span>
                          </label>
                        ))}
                      </div>
                    </div>

                    {/* Section 3: Clinical Notes & Reports */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-blue-100 text-[#1877f2] flex items-center justify-center text-[10px] font-extrabold">3</span>
                        <span>Clinical Notes &amp; Documents</span>
                      </h3>

                      <div className="space-y-4">
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Medical History / Current Diagnosis / Doctor Preferences
                          </label>
                          <textarea
                            rows={4}
                            placeholder="Please summarize the medical condition, current symptoms, prior surgeries or treatments, and any specific doctor or surgeon you wish to consult with..."
                            value={consultForm.medicalQuery}
                            onChange={(e) => setConsultForm({ ...consultForm, medicalQuery: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-[#1877f2]/30 focus:border-[#1877f2] transition-all resize-none"
                          />
                        </div>

                        {/* File Upload Component */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Attach Medical Records / Scans / Biopsy Reports
                          </label>
                          {consultForm.fileName ? (
                            <div className="p-4 rounded-xl border border-blue-200 bg-blue-50/70 flex items-center justify-between gap-3 shadow-xs">
                              <div className="flex items-center gap-3 min-w-0">
                                <div className="w-10 h-10 rounded-lg bg-blue-100 text-[#1877f2] flex items-center justify-center shrink-0">
                                  <FileText className="w-5 h-5" />
                                </div>
                                <div className="min-w-0">
                                  <p className="text-xs font-bold text-[#071A41] truncate">
                                    {consultForm.fileName}
                                  </p>
                                  <p className="text-[11px] text-blue-600 font-medium">
                                    {consultForm.fileSizeFormatted} • Uploads to your Google Drive &amp; links in Google Sheet
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="px-3 py-1.5 rounded-lg bg-white hover:bg-red-50 text-slate-600 hover:text-red-600 border border-slate-200 text-xs font-bold transition-all cursor-pointer shrink-0"
                              >
                                Remove
                              </button>
                            </div>
                          ) : (
                            <div className="p-4 rounded-xl border-2 border-dashed border-slate-200 hover:border-[#1877f2] bg-slate-50/70 hover:bg-blue-50/30 transition-all flex flex-col items-center justify-center text-center cursor-pointer relative group">
                              <Upload className="w-6 h-6 text-slate-400 group-hover:text-[#1877f2] mb-1.5 transition-colors" />
                              <span className="text-xs font-bold text-slate-700 group-hover:text-[#1877f2] transition-colors">
                                Click or drag &amp; drop reports (PDF, JPG, PNG up to 15MB)
                              </span>
                              <span className="text-[11px] text-slate-400 mt-0.5">
                                Automatically saved to Google Drive and clickable in your Google Sheet.
                              </span>
                              <input
                                type="file"
                                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                                className="absolute inset-0 opacity-0 cursor-pointer"
                                onChange={handleFileChange}
                              />
                            </div>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <ShieldCheck className="w-4 h-4 text-emerald-600 shrink-0" />
                        <span>100% confidential under ethical medical guidelines.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#1877f2] hover:bg-blue-600 disabled:bg-blue-400 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-blue-500/25 hover:shadow-blue-500/35 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>{consultForm.fileBase64 ? "Uploading Scan & Saving to Sheet..." : "Saving Securely to Sheet..."}</span>
                          </>
                        ) : (
                          <>
                            <span>Request Clinical Consultation</span>
                            <Send className="w-4 h-4 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

                {/* ========================================================
                    MODE 2: HEALTH TALK, PODCAST & MEDIA COLLAB FORM
                   ======================================================== */}
                {activeTab === 'healthtalk' && (
                  <form onSubmit={handleHealthTalkSubmit} className="space-y-8">
                    
                    {/* Form Intro Banner */}
                    <div className="pb-6 border-b border-slate-100">
                      <div className="flex items-center gap-2.5 text-xs font-bold text-indigo-600 uppercase tracking-wider mb-1">
                        <Mic className="w-4 h-4" />
                        <span>HealthTravo Original Talks &amp; Media</span>
                      </div>
                      <h2 className="text-2xl font-extrabold text-[#071A41] tracking-tight">
                        Podcasts, Product Demos &amp; Health Shows
                      </h2>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1">
                        Showcase medical devices, record high-impact clinical podcast episodes, or produce sponsored health masterclasses reaching doctors, hospital leaders, and patients across India and worldwide.
                      </p>
                    </div>

                    {/* Section 1: Collaboration Category */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-3 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-extrabold">1</span>
                        <span>Select Media Collaboration Type <span className="text-red-500">*</span></span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                        
                        {/* Option 1: Podcast Episode */}
                        <div
                          onClick={() => setHealthTalkForm({ ...healthTalkForm, collabType: 'podcast' })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            healthTalkForm.collabType === 'podcast'
                              ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600 flex items-center justify-center">
                              <Mic className="w-4 h-4 stroke-[2.4]" />
                            </div>
                            <span className="text-sm font-bold text-[#071A41]">
                              Podcast Guest Episode
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            Appear as a guest surgeon, clinician, or healthcare leader on <em>HealthTravo Original Talks</em>.
                          </p>
                        </div>

                        {/* Option 2: Product & Device Showcase */}
                        <div
                          onClick={() => setHealthTalkForm({ ...healthTalkForm, collabType: 'product' })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            healthTalkForm.collabType === 'product'
                              ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-blue-100 text-blue-600 flex items-center justify-center">
                              <Sparkles className="w-4 h-4 stroke-[2.4]" />
                            </div>
                            <span className="text-sm font-bold text-[#071A41]">
                              Product &amp; Device Showcase
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            Demonstrate medical equipment, health-tech hardware, surgical tools, or AI clinical solutions.
                          </p>
                        </div>

                        {/* Option 3: Sponsored Health Show / Series */}
                        <div
                          onClick={() => setHealthTalkForm({ ...healthTalkForm, collabType: 'show' })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            healthTalkForm.collabType === 'show'
                              ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-purple-100 text-purple-600 flex items-center justify-center">
                              <Tv className="w-4 h-4 stroke-[2.4]" />
                            </div>
                            <span className="text-sm font-bold text-[#071A41]">
                              Sponsored Health Show / Series
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            Co-produce episodic health awareness series, disease prevention campaigns, or masterclasses.
                          </p>
                        </div>

                        {/* Option 4: Institutional Partnership & PR */}
                        <div
                          onClick={() => setHealthTalkForm({ ...healthTalkForm, collabType: 'institution' })}
                          className={`p-4 rounded-2xl border text-left cursor-pointer transition-all ${
                            healthTalkForm.collabType === 'institution'
                              ? 'bg-indigo-50/70 border-indigo-600 ring-1 ring-indigo-600 shadow-sm'
                              : 'bg-slate-50 border-slate-200 hover:border-slate-300 hover:bg-slate-100/70'
                          }`}
                        >
                          <div className="flex items-center gap-3 mb-2">
                            <div className="w-8 h-8 rounded-lg bg-amber-100 text-amber-600 flex items-center justify-center">
                              <Briefcase className="w-4 h-4 stroke-[2.4]" />
                            </div>
                            <span className="text-sm font-bold text-[#071A41]">
                              Hospital PR &amp; Media Alliances
                            </span>
                          </div>
                          <p className="text-xs text-slate-500 leading-snug">
                            Broadcast institutional milestones, clinical trials, surgical firsts, and conference media coverage.
                          </p>
                        </div>

                      </div>
                    </div>

                    {/* Section 2: Speaker & Brand Profile */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-extrabold">2</span>
                        <span>Speaker &amp; Organization Profile</span>
                      </h3>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5">
                        {/* Speaker Name */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Speaker / Founder / Representative Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Dr. Rajesh Sharma or Priya Kapoor"
                            value={healthTalkForm.fullName}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, fullName: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* Designation / Role */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Designation &amp; Specialization <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Director - Robotic Cardiac Surgery or VP Product"
                            value={healthTalkForm.designation}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, designation: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* Organization / Hospital / Brand */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Hospital / Company / Brand Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Medtronic, Max Healthcare, or BioHealth AI"
                            value={healthTalkForm.organization}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, organization: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* WhatsApp / Phone */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            WhatsApp / Direct Phone Number <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="tel"
                            required
                            placeholder="e.g. +91 9999089087"
                            value={healthTalkForm.phone}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, phone: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* Official Email */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Official Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="email"
                            required
                            placeholder="doctor@hospital.org or media@brand.com"
                            value={healthTalkForm.email}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, email: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* Website or LinkedIn URL */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Website / Portfolio / LinkedIn Profile <span className="text-slate-400 font-normal">(Optional)</span>
                          </label>
                          <input
                            type="url"
                            placeholder="https://linkedin.com/in/... or https://hospital.com"
                            value={healthTalkForm.website}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, website: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Section 3: Proposed Topic & Highlights */}
                    <div>
                      <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 mb-4 flex items-center gap-2">
                        <span className="w-5 h-5 rounded-full bg-indigo-100 text-indigo-600 flex items-center justify-center text-[10px] font-extrabold">3</span>
                        <span>Show Topic &amp; Audience Value</span>
                      </h3>

                      <div className="space-y-4">
                        {/* Topic Title */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Proposed Episode / Product Demonstration Title <span className="text-red-500">*</span>
                          </label>
                          <input
                            type="text"
                            required
                            placeholder="e.g. Next-Generation Robotic Mitral Valve Repair: Outcomes & Patient Journey"
                            value={healthTalkForm.topicTitle}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, topicTitle: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all"
                          />
                        </div>

                        {/* Core Message */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-1.5">
                            Key Talking Points / Innovation Breakthrough <span className="text-red-500">*</span>
                          </label>
                          <textarea
                            rows={4}
                            required
                            placeholder="Explain the clinical innovation, product capabilities, research data, or key message you want our audience of 100,000+ patients and doctors to take away..."
                            value={healthTalkForm.message}
                            onChange={(e) => setHealthTalkForm({ ...healthTalkForm, message: e.target.value })}
                            className="w-full px-4 py-3 rounded-xl bg-slate-50 border border-slate-200 text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-indigo-500/30 focus:border-indigo-500 transition-all resize-none"
                          />
                        </div>

                        {/* Filming Preference */}
                        <div>
                          <label className="block text-xs font-bold text-slate-700 mb-2">
                            Preferred Filming Mode
                          </label>
                          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                            {[
                              { id: 'studio', label: 'In-Studio (Delhi NCR)', desc: 'Full broadcast setup' },
                              { id: 'remote', label: 'Remote 4K Studio', desc: 'Global high-def stream' },
                              { id: 'onsite', label: 'On-Site Hospital / Lab', desc: 'Mobile production crew' }
                            ].map((mode) => (
                              <label
                                key={mode.id}
                                className={`p-3 rounded-xl border text-left cursor-pointer transition-all ${
                                  healthTalkForm.filmingMode === mode.id
                                    ? 'bg-indigo-50/80 border-indigo-600 text-indigo-950 ring-1 ring-indigo-600'
                                    : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                                }`}
                              >
                                <input
                                  type="radio"
                                  name="filmingMode"
                                  checked={healthTalkForm.filmingMode === mode.id}
                                  onChange={() => setHealthTalkForm({ ...healthTalkForm, filmingMode: mode.id })}
                                  className="sr-only"
                                />
                                <div className="text-xs font-bold">{mode.label}</div>
                                <div className="text-[11px] text-slate-400 mt-0.5">{mode.desc}</div>
                              </label>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Submit Actions */}
                    <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-4">
                      <div className="flex items-center gap-2 text-xs text-slate-500">
                        <Sparkles className="w-4 h-4 text-indigo-600 shrink-0" />
                        <span>Media kit and scheduling coordinator will respond in 24 hours.</span>
                      </div>

                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-full bg-[#071A41] hover:bg-slate-900 disabled:bg-slate-700 text-white font-bold text-xs sm:text-sm uppercase tracking-wider shadow-lg shadow-[#071A41]/25 transition-all hover:scale-[1.02] active:scale-[0.98] cursor-pointer disabled:cursor-not-allowed"
                      >
                        {isSubmitting ? (
                          <>
                            <span className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                            <span>Saving Securely to Sheet...</span>
                          </>
                        ) : (
                          <>
                            <span>Submit HealthTravo Media Proposal</span>
                            <Send className="w-4 h-4 stroke-[2.2]" />
                          </>
                        )}
                      </button>
                    </div>

                  </form>
                )}

              </div>
            )}

          </div>

          {/* ================= RIGHT COLUMN: EXECUTIVE DESK INFO & TRUST ================= */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Founder Direct Card */}
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200/90 shadow-sm text-left relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50/60 rounded-full blur-2xl -mr-8 -mt-8 pointer-events-none" />
              
              <div className="flex items-center gap-3.5 mb-5 relative z-10">
                <div className="w-14 h-14 rounded-2xl overflow-hidden border-2 border-blue-500/40 shadow-sm shrink-0">
                  <img
                    src="/assets/founder-portrait.webp"
                    alt="Dushyant Singh Chauhan"
                    className="w-full h-full object-cover object-top"
                  />
                </div>
                <div>
                  <h4 className="text-base font-extrabold text-[#071A41] tracking-tight">
                    Dushyant Singh Chauhan
                  </h4>
                  <p className="text-xs text-[#1877f2] font-semibold">
                    Founder &amp; CEO, HealthTravo
                  </p>
                  <p className="text-[11px] text-slate-400">
                    Pre-Incubated at GIMS
                  </p>
                </div>
              </div>

              <blockquote className="text-xs sm:text-[13px] text-slate-600 italic border-l-2 border-[#1877f2] pl-3 py-0.5 mb-6 font-serif">
                "Whether you are fighting for your loved one's treatment or building a healthcare product that can transform millions of lives, our desk is directly open to you."
              </blockquote>

              <div className="space-y-3 pt-2 border-t border-slate-100 text-xs">
                
                {/* Phone */}
                <a
                  href="tel:+919999089087"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#071A41] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0">
                    <Phone className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Direct Hotline</span>
                    <span className="font-semibold">+91 9999089087</span>
                  </div>
                </a>

                {/* Official & Personal Email */}
                <a
                  href="mailto:dushyanttchauhan@gmail.com"
                  className="flex items-center gap-3 p-2.5 rounded-xl hover:bg-slate-50 text-slate-700 hover:text-[#071A41] transition-colors"
                >
                  <div className="w-8 h-8 rounded-lg bg-blue-50 text-[#1877f2] flex items-center justify-center shrink-0">
                    <Mail className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Official &amp; Founder Desk</span>
                    <span className="font-semibold">dushyanttchauhan@gmail.com</span>
                  </div>
                </a>

                {/* Location */}
                <div className="flex items-center gap-3 p-2.5 rounded-xl text-slate-700">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0">
                    <MapPin className="w-4 h-4 stroke-[2.2]" />
                  </div>
                  <div>
                    <span className="text-[10px] uppercase font-bold text-slate-400 block">Incubation &amp; Studio</span>
                    <span className="font-semibold">Greater Noida / Delhi NCR, India</span>
                  </div>
                </div>

              </div>

              {/* Instant WhatsApp Action */}
              <div className="mt-6 pt-4 border-t border-slate-100">
                <a
                  href="https://wa.me/919999089087?text=Hello%20Dushyant,%20I%20am%20reaching%20out%20via%20the%20HealthTravo%20Contact%20Desk."
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2.5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold uppercase tracking-wider shadow-sm transition-all"
                >
                  <WhatsappIcon className="w-4 h-4 fill-current" />
                  <span>Start WhatsApp Conversation</span>
                </a>
              </div>

            </div>

            {/* Credibility & SLA Guarantee Box */}
            <div className="bg-[#071A41] text-white rounded-3xl p-6 sm:p-7 shadow-md">
              <h4 className="text-xs font-bold uppercase tracking-wider text-blue-300 mb-4 flex items-center gap-2">
                <Clock className="w-4 h-4 text-blue-400" />
                <span>Our Response SLA &amp; Ethics</span>
              </h4>

              <div className="space-y-3.5 text-xs text-slate-300">
                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Under 4 Hours Response</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">International patient urgent queries are reviewed on high priority.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Zero Broker Markups</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">Patients pay hospital billing desks directly with complete cost clarity.</p>
                  </div>
                </div>

                <div className="flex items-start gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <div>
                    <strong className="text-white">Full Media Production Kit</strong>
                    <p className="text-slate-400 text-[11px] mt-0.5">HealthTravo Media applicants receive full audio-video production &amp; distribution support.</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Process Steps Card */}
            <div className="bg-white rounded-3xl p-6 border border-slate-200/90 shadow-2xs text-left">
              <h4 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4 flex items-center gap-2">
                <Layers className="w-4 h-4 text-[#1877f2]" />
                <span>What Happens Next?</span>
              </h4>

              <div className="relative pl-5 space-y-4 before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-slate-200 text-xs">
                <div className="relative">
                  <div className="absolute -left-[17px] top-0.5 w-3 h-3 rounded-full bg-[#1877f2] ring-2 ring-white" />
                  <strong className="text-[#071A41] block">1. Form Submission</strong>
                  <span className="text-slate-500 text-[11px]">Your medical records or show proposal are securely cataloged.</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[17px] top-0.5 w-3 h-3 rounded-full bg-blue-400 ring-2 ring-white" />
                  <strong className="text-[#071A41] block">2. Clinical / Editorial Review</strong>
                  <span className="text-slate-500 text-[11px]">Dushyant matches reports with top surgeons or reviews show outline.</span>
                </div>

                <div className="relative">
                  <div className="absolute -left-[17px] top-0.5 w-3 h-3 rounded-full bg-emerald-500 ring-2 ring-white" />
                  <strong className="text-[#071A41] block">3. Direct Coordination</strong>
                  <span className="text-slate-500 text-[11px]">We establish direct WhatsApp / phone contact with recommendations.</span>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

    </div>
  );
}
