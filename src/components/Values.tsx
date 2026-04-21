import React from 'react';
import { motion } from 'motion/react';
import { Heart, Laptop, BookOpen, Globe, UserCheck, Rocket, Target, HandHeart } from 'lucide-react';

const values = [
  { icon: Heart, title: "God-Fearing", desc: "Faith is his foundation.", color: "text-red-500" },
  { icon: Laptop, title: "Tech Enthusiast", desc: "Code is his language of creation.", color: "text-blue-500" },
  { icon: BookOpen, title: "Hardworking", desc: "Burning midnight oil for tomorrow's dreams.", color: "text-yellow-500" },
  { icon: Globe, title: "Proud Kenyan", desc: "Mombasa raised, world-bound.", color: "text-green-500" },
  { icon: UserCheck, title: "Loyal Friend", desc: "Friendship to Reagan is forever.", color: "text-purple-500" },
  { icon: Rocket, title: "Visionary", desc: "He sees the future in every line of code.", color: "text-orange-500" },
  { icon: Target, title: "Goal-Oriented", desc: "Born to build, destined to lead.", color: "text-[#00d4ff]" },
  { icon: HandHeart, title: "Kind-hearted", desc: "His warmth is his greatest gift.", color: "text-pink-500" },
];

export default function Values() {
  return (
    <section className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Reagan's <span className="text-[#7c3aed]">Values & Character</span></h2>
          <div className="w-24 h-1 bg-[#00d4ff] mx-auto rounded-full"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {values.map((val, idx) => (
            <motion.div
              key={val.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              whileHover={{ y: -5 }}
              className="glass p-8 rounded-2xl border-white/5 hover:border-[#00d4ff]/30 transition-all group"
            >
              <div className={`mb-6 p-3 rounded-xl bg-white/5 inline-block ${val.color}`}>
                <val.icon className="w-8 h-8 group-hover:scale-110 transition-transform" />
              </div>
              <h3 className="text-xl font-bold mb-2">{val.title}</h3>
              <p className="text-white/60 text-sm leading-relaxed">{val.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
