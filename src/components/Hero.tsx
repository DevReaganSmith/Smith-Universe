import React, { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { ChevronDown, MapPin, Calendar } from 'lucide-react';
import { REAGAN_DETAILS } from '../constants';

const subtitles = [
  "Software Engineer in the Making",
  "Form 4 Student",
  "Coder",
  "Dreamer",
  "Kenyan 🇰🇪"
];

export default function Hero() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % subtitles.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="glass-card h-full justify-center p-8">
      <div className="flex items-center gap-6 mb-6">
        <motion.img
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          src={REAGAN_DETAILS.photo}
          alt={REAGAN_DETAILS.name}
          className="avatar-ring"
          referrerPolicy="no-referrer"
        />
        <div>
          <div className="label">Personal Portfolio</div>
          <h1 className="text-3xl font-display font-bold m-0">
            {REAGAN_DETAILS.name} <span className="neon-text">👋</span>
          </h1>
          <p className="text-sm opacity-80 mt-1">{subtitles[index]}</p>
          <div className="badge">Born {REAGAN_DETAILS.born} | Mombasa 🇰🇪</div>
        </div>
      </div>
      
      <p className="text-sm leading-relaxed opacity-90 font-sans">
        God-fearing, hardworking, and intellectually driven young man from Bombolulu. 
        Passion ignited post-KCPE. Currently shaping the future at Vihiga High.
      </p>
    </div>
  );
}
