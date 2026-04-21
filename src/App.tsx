/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { AnimatePresence } from 'motion/react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Values from './components/Values';
import Memories from './components/Memories';
import Friendship from './components/Friendship';
import Testimonials from './components/Testimonials';
import Vision from './components/Vision';
import MusicZone from './components/MusicZone';
import ImageEditor from './components/ImageEditor';
import VoiceAssistant from './components/VoiceAssistant';
import SmithAI from './components/SmithAI';
import SiteBot from './components/SiteBot';
import ChatRoom from './components/ChatRoom';
import UserProfile from './components/UserProfile';
import Connect from './components/Connect';
import Footer from './components/Footer';
import { UserStats } from './types';

export default function App() {
  const [showProfile, setShowProfile] = useState(false);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [scale, setScale] = useState(1);

  // Scaling logic to fit desktop layout on mobile
  useEffect(() => {
    const handleResize = () => {
      const desktopWidth = 1240; // Base width for bento grid
      if (window.innerWidth < desktopWidth) {
        setScale(window.innerWidth / desktopWidth);
      } else {
        setScale(1);
      }
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Initialize stats if name exists
  useEffect(() => {
    const checkStats = () => {
      const stats = localStorage.getItem('smith_user_stats');
      if (stats) {
        const parsed = JSON.parse(stats);
        setUserStats(parsed);
      }
    };
    checkStats();
    
    // Polling slightly for stats updates from other components
    const interval = setInterval(checkStats, 2000);
    return () => clearInterval(interval);
  }, []);

  // Track time spent
  useEffect(() => {
    const timer = setInterval(() => {
       const stats = localStorage.getItem('smith_user_stats');
       if (stats) {
         const parsed = JSON.parse(stats);
         parsed.timeSpent = (parsed.timeSpent || 0) + 1;
         localStorage.setItem('smith_user_stats', JSON.stringify(parsed));
         setUserStats(parsed);
       }
    }, 60000); // Every minute
    return () => clearInterval(timer);
  }, []);

  // Section Tracking
  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const stats = localStorage.getItem('smith_user_stats');
          if (stats) {
            const parsed = JSON.parse(stats);
            const section = entry.target.id || 'Hero';
            if (!parsed.sectionsVisited?.includes(section)) {
              parsed.sectionsVisited = [...(parsed.sectionsVisited || []), section];
              localStorage.setItem('smith_user_stats', JSON.stringify(parsed));
              setUserStats(parsed);
            }
          }
        }
      });
    }, { threshold: 0.5 });

    document.querySelectorAll('section').forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, [userStats?.name]);

  return (
    <div className="min-h-screen font-sans selection:bg-[#7c3aed] selection:text-white bg-[#0a0a1a] overflow-x-hidden relative">
      <Navbar />
      
      {/* Centered Scaling Container */}
      <div 
        className="relative overflow-visible"
        style={{ 
          transform: `scale(${scale})`, 
          transformOrigin: 'top center',
          width: '1240px',
          position: 'absolute',
          left: '50%',
          marginLeft: '-620px', // Exactly half of 1240px
          transition: 'transform 0.3s ease'
        }}
      >
        <main className="pt-24 pb-12">
          {/* Forced Grid - No Col Stacking */}
          <div className="bento-grid grid-cols-4 w-full">
            
            {/* Hero Section (2x2) */}
            <div className="hero-cell col-span-2 row-span-2 overflow-hidden rounded-3xl">
              <Hero />
            </div>

            {/* About/Stats (1x1) */}
            <div className="stats-cell col-span-1 rounded-3xl">
              <div className="glass-card h-full justify-center text-center">
                <div className="label">Vihiga High</div>
                <div className="text-3xl font-bold font-display">Form 4</div>
                <div className="label mt-4">Engineering Path</div>
                <div className="text-[#00d4ff] font-bold">Active 🚀</div>
              </div>
            </div>

            {/* Skills (1x2) */}
            <div className="skills-cell col-span-1 row-span-2 overflow-hidden rounded-3xl">
              <Vision />
            </div>

            {/* Values (1x1) */}
            <div className="stats-cell col-span-1 rounded-3xl">
               <div className="glass-card h-full">
                  <div className="label">Values</div>
                  <div className="text-sm space-y-2 font-medium opacity-80">
                    <p>🙏 Faith First</p>
                    <p>📚 Hardworking</p>
                    <p>🌍 Proud Kenyan</p>
                    <p>❤️ Kind-hearted</p>
                  </div>
               </div>
            </div>

            {/* Friends Circle (1x2) */}
            <div className="friends-cell col-span-1 row-span-2 overflow-hidden rounded-3xl">
              <Friendship />
            </div>

            {/* SMITH AI (2x1) */}
            <div className="ai-cell col-span-2 rounded-3xl overflow-hidden">
              <SmithAI />
            </div>

            {/* Memories (2x1) */}
            <div className="memories-cell col-span-2 rounded-3xl overflow-hidden">
               <Memories />
            </div>

            {/* Music Zone (1x1) */}
            <div className="music-cell col-span-1 rounded-3xl overflow-hidden">
              <MusicZone />
            </div>

            {/* Connect (1x1) */}
            <div className="connect-cell col-span-1 rounded-3xl overflow-hidden">
              <Connect />
            </div>

            {/* Testimonials (2x1) */}
            <div className="col-span-2 rounded-3xl overflow-hidden">
              <Testimonials />
            </div>

            {/* Voice Assistant (1x1) */}
            <div className="col-span-1 rounded-3xl overflow-hidden">
              <VoiceAssistant />
            </div>

            {/* Hangout (4x2) */}
            <div className="col-span-4 rounded-3xl overflow-hidden mt-8">
              <ChatRoom onProfileClick={() => setShowProfile(true)} userStats={userStats} />
            </div>

             {/* Creative Tools (4x2) */}
             <div className="col-span-4 rounded-3xl overflow-hidden mt-8">
              <ImageEditor />
            </div>

          </div>
        </main>

        <Footer />
      </div>
      
      {/* Floating Elements */}
      <SiteBot />
      <AnimatePresence>
        {showProfile && userStats && (
          <UserProfile stats={userStats} onClose={() => setShowProfile(false)} />
        )}
      </AnimatePresence>
    </div>
  );
}
