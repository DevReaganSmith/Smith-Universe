import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Send } from 'lucide-react';
import { FRIENDS } from '../constants';

export default function Friendship() {
  return (
    <div className="glass-card h-full">
      <div className="label">The Circle 💜</div>
      <div className="space-y-4">
        {FRIENDS.map((friend) => (
          <div key={friend.name} className="flex items-center gap-3">
             <img src={friend.photo} alt={friend.name} className="w-12 h-12 rounded-full border border-white/20 object-cover" referrerPolicy="no-referrer" />
             <div className="overflow-hidden">
                <p className="text-sm font-bold truncate">{friend.name}</p>
                <p className="text-[10px] opacity-50 truncate">Distance means nothing 🌍</p>
             </div>
          </div>
        ))}
      </div>
      <div className="mt-auto pt-6 text-[10px] text-center opacity-40 font-display italic">
        "Friendship didn't start with a hallway — it started with words on a screen."
      </div>
    </div>
  );
}
