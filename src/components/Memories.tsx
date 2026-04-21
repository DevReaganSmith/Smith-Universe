import React from 'react';
import { motion } from 'motion/react';

const memoriesData = [
  { name: "Reagan", img: "https://i.ibb.co/FkzJTFfn/7c0f91c24aca.jpg" },
  { name: "Duvey", img: "https://i.ibb.co/PGRJg7Nr/9f871f651f8a.jpg" },
  { name: "Mitch", img: "https://i.ibb.co/zHx3c2ZG/a5fe6ae71924.jpg" },
  { name: "Kayaan", img: "https://i.ibb.co/jkMDmThz/926442463559.jpg" },
  // Duplicate for seamless loop
  { name: "Reagan", img: "https://i.ibb.co/FkzJTFfn/7c0f91c24aca.jpg" },
  { name: "Duvey", img: "https://i.ibb.co/PGRJg7Nr/9f871f651f8a.jpg" },
  { name: "Mitch", img: "https://i.ibb.co/zHx3c2ZG/a5fe6ae71924.jpg" },
  { name: "Kayaan", img: "https://i.ibb.co/jkMDmThz/926442463559.jpg" },
];

export default function Memories() {
  return (
    <div className="glass-card h-full overflow-hidden p-0 relative">
      <div className="p-6 pb-0">
        <div className="label">Memories & Friends 🫂</div>
      </div>
      
      <div className="flex-1 overflow-x-auto overflow-y-hidden flex gap-4 p-6 scrollbar-none">
        {memoriesData.slice(0, 4).map((item, idx) => (
          <div key={idx} className="relative flex-shrink-0 w-32 h-40 group">
             <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent z-10 rounded-2xl"></div>
             <img src={item.img} className="w-full h-full object-cover rounded-2xl border border-white/10" referrerPolicy="no-referrer" />
             <div className="absolute bottom-3 left-3 z-20">
                <p className="text-[10px] font-bold text-white uppercase">{item.name}</p>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
