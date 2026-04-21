import React from 'react';
import { motion } from 'motion/react';
import { DREAMS } from '../constants';

export default function Vision() {
  return (
    <div className="glass-card h-full">
      <div className="label">Skill Matrix & Vision</div>
      <div className="space-y-4 mb-8">
        {DREAMS.slice(0, 3).map((dream, idx) => (
          <div key={idx} className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/5">
            <span className="text-xl">{dream.icon}</span>
            <p className="text-[11px] font-medium leading-tight">{dream.text}</p>
          </div>
        ))}
      </div>
      
      <div className="space-y-4">
        {[
          { name: "HTML/CSS", level: 95 },
          { name: "JavaScript", level: 85 },
          { name: "Python", level: 75 },
          { name: "Problem Solving", level: 90 },
        ].map((skill) => (
          <div key={skill.name}>
            <div className="flex justify-between mb-1">
              <span className="text-[10px] font-bold uppercase opacity-50">{skill.name}</span>
            </div>
            <div className="h-1.5 bg-white/10 rounded-full overflow-hidden">
               <motion.div
                 initial={{ width: 0 }}
                 whileInView={{ width: `${skill.level}%` }}
                 className="h-full bg-[#7c3aed]"
               />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
