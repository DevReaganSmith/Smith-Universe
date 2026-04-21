import React from 'react';
import { motion } from 'motion/react';
import { Instagram, Send } from 'lucide-react';
import { REAGAN_DETAILS, FRIENDS } from '../constants';

export default function Connect() {
  return (
    <div className="glass-card h-full">
      <div className="label">Let's Connect</div>
      <div className="flex justify-around items-center flex-1">
        <motion.a
          href={`https://wa.me/${REAGAN_DETAILS.whatsapp}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="text-center"
        >
          <div className="w-10 h-10 bg-[#25D366] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
             <Send className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">WhatsApp</span>
        </motion.a>

        <motion.a
          href={REAGAN_DETAILS.instagram}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          className="text-center"
        >
          <div className="w-10 h-10 bg-gradient-to-tr from-[#f09433] via-[#dc2743] to-[#bc1888] rounded-full flex items-center justify-center mx-auto mb-2 shadow-lg">
             <Instagram className="w-5 h-5 text-white" />
          </div>
          <span className="text-[10px] font-bold opacity-50 uppercase tracking-tighter">Instagram</span>
        </motion.a>
      </div>
    </div>
  );
}
