import React from 'react';
import { motion } from 'motion/react';
import { Sparkle } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="py-20 px-6 relative overflow-hidden bg-white/2 border-t border-white/5">
      <div className="max-w-6xl mx-auto flex flex-col items-center">
        <div className="relative mb-12">
           <div className="absolute inset-0 blur-3xl bg-purple-500/20 opacity-50"></div>
           <div className="text-4xl md:text-5xl font-display font-bold tracking-tighter relative group">
              RS <span className="text-[#00d4ff]">⚡</span>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="absolute -top-4 -right-4 text-[#f59e0b] opacity-40 group-hover:opacity-100 transition-opacity"
              >
                <Sparkle />
              </motion.div>
           </div>
        </div>

        <div className="text-center space-y-4">
           <p className="text-xl md:text-2xl font-display italic text-transparent bg-clip-text bg-gradient-to-r from-white via-white/50 to-white animate-pulse">
              Built with Passion, Code, and Dreams.
           </p>
           <p className="text-sm font-bold uppercase tracking-[0.5em] text-white/30">
              © 2026 Reagan Smith • Personal Universe
           </p>
        </div>

        <div className="mt-16 flex gap-8">
           {[1,2,3].map(i => (
             <motion.div
               key={i}
               animate={{ y: [0, -10, 0], opacity: [0.2, 0.5, 0.2] }}
               transition={{ duration: 3, repeat: Infinity, delay: i * 0.5 }}
               className="w-1.5 h-1.5 bg-[#00d4ff] rounded-full"
             />
           ))}
        </div>
      </div>
    </footer>
  );
}
