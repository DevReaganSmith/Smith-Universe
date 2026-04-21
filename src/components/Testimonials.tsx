import React from 'react';
import { motion } from 'motion/react';
import { TESTIMONIALS } from '../constants';

export default function Testimonials() {
  return (
    <div className="glass-card h-full bg-white/[0.02]">
      <div className="label">Testimonials 💬</div>
      <div className="flex-1 flex items-center overflow-hidden">
        <div className="animate-pulse space-y-4">
           <p className="text-[11px] font-display italic opacity-80 leading-relaxed">
             "Reagan's dedication to coding at his age is honestly admirable. Watch this guy rise."
           </p>
           <p className="text-[11px] font-display italic opacity-40 leading-relaxed hidden md:block">
             "Incredibly hardworking and faith-driven. A real inspiration."
           </p>
        </div>
      </div>
      <div className="text-right text-[9px] font-bold uppercase tracking-widest opacity-40 mt-4">
        — The World Circle
      </div>
    </div>
  );
}
