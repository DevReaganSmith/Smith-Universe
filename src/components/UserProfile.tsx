import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X, Trophy, Clock, Search, Palette, MessageSquare, Music } from 'lucide-react';
import { UserStats } from '../types';

export default function UserProfile({ stats, onClose }: { stats: UserStats | null, onClose: () => void }) {
  if (!stats) return null;

  const activities = [
    { label: 'Messages Sent', value: stats.messagesSent, icon: MessageSquare, max: 100, color: 'bg-blue-500' },
    { label: 'Time Spent (min)', value: stats.timeSpent, icon: Clock, max: 60, color: 'bg-purple-500' },
    { label: 'Music Played', value: stats.musicPlayed, icon: Music, max: 50, color: 'bg-green-500' },
    { label: 'Images Created', value: stats.imagesCreated, icon: Palette, max: 20, color: 'bg-orange-500' },
  ];

  const quotes = [
    "Your future is waiting. Go build it.",
    "Dream big. Start small. Code hard.",
    "The digital world is your canvas.",
    "Ambition has no age limit. Shine on.",
  ];

  const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-6 bg-black/80 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="glass w-full max-w-2xl rounded-[3rem] border-white/10 overflow-hidden shadow-2xl relative"
      >
        <button onClick={onClose} className="absolute top-8 right-8 p-3 hover:bg-white/10 rounded-full transition-colors z-10">
           <X />
        </button>

        <div className="p-12">
           <div className="flex flex-col md:flex-row items-center gap-8 mb-12">
              <div className="w-32 h-32 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-[2.5rem] flex items-center justify-center text-6xl shadow-[0_0_40px_rgba(0,212,255,0.3)]">
                 {stats.avatar}
              </div>
              <div className="text-center md:text-left">
                 <h3 className="text-4xl font-display font-bold mb-2">{stats.name}</h3>
                 <p className="text-white/50 italic">Citizen of Reagan's World</p>
                 <div className="flex gap-2 justify-center md:justify-start mt-4">
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase border border-white/10">Active Member</span>
                    <span className="px-3 py-1 bg-white/5 rounded-full text-[10px] font-bold uppercase border border-white/10">{stats.sectionsVisited.length} Sections Explored</span>
                 </div>
              </div>
           </div>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12">
              {activities.map(act => (
                <div key={act.label} className="glass p-5 rounded-2xl border-white/5">
                   <div className="flex justify-between items-center mb-4">
                      <div className="flex items-center gap-3">
                         <div className={`p-2 rounded-lg ${act.color}/20 text-${act.color.split('-')[1]}-500`}>
                            <act.icon className="w-4 h-4" />
                         </div>
                         <span className="text-sm font-bold text-white/70">{act.label}</span>
                      </div>
                      <span className="text-lg font-bold text-white">{act.value}</span>
                   </div>
                   <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${Math.min((act.value / act.max) * 100, 100)}%` }}
                        className={`h-full ${act.color}`}
                      />
                   </div>
                </div>
              ))}
           </div>

           <div className="p-8 bg-[#7c3aed]/10 rounded-3xl border border-[#7c3aed]/20 relative overflow-hidden">
              <Trophy className="absolute -bottom-4 -right-4 w-24 h-24 text-[#7c3aed]/20" />
              <p className="text-xs uppercase font-bold tracking-widest text-[#7c3aed] mb-2">Universe Motivation</p>
              <p className="text-xl font-display italic leading-relaxed">"{randomQuote}"</p>
           </div>
        </div>
      </motion.div>
    </div>
  );
}
