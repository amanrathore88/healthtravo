import React, { useState, useEffect } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AboutFounder from './components/AboutFounder';
import HospitalNetwork from './components/HospitalNetwork';
import StrategicPillars from './components/StrategicPillars';
import CareContinuum from './components/CareContinuum';
import VideoShowcase from './components/VideoShowcase';
import PatientTestimonials from './components/PatientTestimonials';
import FounderQuoteBanner from './components/FounderQuoteBanner';
import ConsultationCTA from './components/ConsultationCTA';
import Footer from './components/Footer';
import VideoModal from './components/VideoModal';
import ContactPage from './components/ContactPage';
import PodcastProfilePage from './components/PodcastProfilePage';
import { videos } from './data/videos';

export default function App() {
  const [selectedVideo, setSelectedVideo] = useState(null);
  
  // Navigation View State: 'home' | 'contact' | 'podcast'
  const [currentView, setCurrentView] = useState(() => {
    const hash = window.location.hash;
    if (hash.startsWith('#/podcast')) return 'podcast';
    if (hash.startsWith('#/contact')) return 'contact';
    return 'home';
  });

  // Contact Page Pre-selected Tab & Context Data
  const [contactInitialTab, setContactInitialTab] = useState(() => {
    return window.location.hash.includes('healthtalk') ? 'healthtalk' : 'consultation';
  });
  const [contactInitialData, setContactInitialData] = useState(null);

  // Synchronize routing with browser window hash
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash;
      if (hash.startsWith('#/podcast')) {
        setCurrentView('podcast');
      } else if (hash.startsWith('#/contact')) {
        setCurrentView('contact');
        if (hash.includes('healthtalk')) {
          setContactInitialTab('healthtalk');
        } else {
          setContactInitialTab('consultation');
        }
      } else {
        setCurrentView('home');
      }
    };

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  // Handler to open Contact Page from any button across the website
  const handleOpenConsultation = (options = {}) => {
    const isHealthTalk = 
      options?.mode === 'healthtalk' || 
      options?.source?.includes('healthtalk') || 
      options?.source?.includes('podcast');

    const tab = isHealthTalk ? 'healthtalk' : 'consultation';
    setContactInitialTab(tab);
    setContactInitialData(options);
    setCurrentView('contact');
    window.location.hash = isHealthTalk ? '#/contact?tab=healthtalk' : '#/contact';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to open Podcast Profile Page
  const handleOpenPodcast = () => {
    setCurrentView('podcast');
    window.location.hash = '#/podcast';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Handler to return to Home view
  const handleNavigateHome = () => {
    setCurrentView('home');
    window.location.hash = '';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handlePlayFeaturedVideo = () => {
    setSelectedVideo(videos[0]);
  };

  // 1. If in dedicated contact view, render ContactPage + Footer
  if (currentView === 'contact') {
    return (
      <div className="min-h-screen bg-[#F5F9FE] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
        <ContactPage
          onNavigateHome={handleNavigateHome}
          initialTab={contactInitialTab}
          initialData={contactInitialData}
        />
        <Footer 
          onOpenConsultation={handleOpenConsultation}
          onOpenPodcast={handleOpenPodcast}
        />
      </div>
    );
  }

  // 2. If in dedicated podcast profile view, render PodcastProfilePage + Footer
  if (currentView === 'podcast') {
    return (
      <div className="min-h-screen bg-[#F5F9FE] text-slate-900 flex flex-col selection:bg-blue-600 selection:text-white">
        <PodcastProfilePage
          onNavigateHome={handleNavigateHome}
          onOpenConsultation={handleOpenConsultation}
          onSelectVideo={setSelectedVideo}
        />
        <Footer 
          onOpenConsultation={handleOpenConsultation}
          onOpenPodcast={handleOpenPodcast}
        />
        {selectedVideo && (
          <VideoModal 
            video={selectedVideo} 
            onClose={() => setSelectedVideo(null)} 
          />
        )}
      </div>
    );
  }

  // 3. Otherwise, render full standard homepage experience
  return (
    <div className="min-h-screen bg-[#0b0f17] text-slate-100 flex flex-col selection:bg-blue-600 selection:text-white">
      {/* Top Floating Navbar */}
      <Navbar 
        onOpenConsultation={handleOpenConsultation}
        onOpenPodcast={handleOpenPodcast}
      />

      <main className="flex-1 bg-[#06080e]">
        {/* 1. Hero (Dark Obsidian Canvas) */}
        <Hero 
          onOpenConsultation={handleOpenConsultation}
          onPlayFeaturedVideo={handlePlayFeaturedVideo}
          onOpenPodcast={handleOpenPodcast}
        />

        {/* 2. About Founder & Philosophy (Warm Cream Editorial) */}
        <AboutFounder onOpenConsultation={handleOpenConsultation} />

        {/* 3. YouTube Video Hub (HealthTravo Original Talks) */}
        <VideoShowcase 
          onSelectVideo={setSelectedVideo}
          onOpenConsultation={handleOpenConsultation}
          onOpenPodcast={handleOpenPodcast}
        />

        {/* 4. Accredited Hospital Network & Specialties */}
        <HospitalNetwork onOpenConsultation={handleOpenConsultation} />

        {/* 5. Strategic Healthcare Pillars (4 Cards matching Reference) */}
        <StrategicPillars onOpenConsultation={handleOpenConsultation} />

        {/* 6. 360° Patient Care Continuum (Interactive 3 Stages) */}
        <CareContinuum onOpenConsultation={handleOpenConsultation} />

        {/* 7. Patient Testimonials & Healing Stories */}
        <PatientTestimonials />

        {/* 8. Founder Core Promise Banner */}
        <FounderQuoteBanner />

        {/* 9. Bottom Executive CTA Banner */}
        <ConsultationCTA onOpenConsultation={handleOpenConsultation} />
      </main>

      {/* 10. Footer */}
      <Footer 
        onOpenConsultation={handleOpenConsultation}
        onOpenPodcast={handleOpenPodcast}
      />

      {/* Interactive Video Player Modal */}
      {selectedVideo && (
        <VideoModal 
          video={selectedVideo} 
          onClose={() => setSelectedVideo(null)} 
        />
      )}
    </div>
  );
}
