import React from 'react';
import { motion } from 'motion/react';
import { REAGAN_DETAILS } from '../constants';

export default function About() {
  return (
    <section id="about" className="py-24 px-6 relative overflow-hidden">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-5xl font-display font-bold mb-8">Who is <span className="text-[#00d4ff]">Reagan Smith?</span></h2>
          <div className="space-y-6 text-lg text-white/80 leading-relaxed font-sans">
            <p>
              Reagan Smith is a God-fearing, hardworking, and intellectually driven young man from the coastal city of Mombasa, Kenya.
              From a young age, Reagan has displayed a remarkable hunger for knowledge, particularly in the world of technology and software engineering.
            </p>
            <p>
              His passion for coding was ignited right after completing his KCPE, a pivotal moment that set him on a path of discipline, curiosity, and relentless self-improvement.
            </p>
            <p>
              Currently in {REAGAN_DETAILS.level} at {REAGAN_DETAILS.school}, Reagan balances academics with his growing software engineering skills, proving that ambition has no age limit.
            </p>
            <p>
              He is loyal, creative, deeply empathetic, and carries a rare combination of technical brilliance and human warmth. 
              He has a brother named Veek, who he holds close, and a circle of true friends who have shaped his world.
            </p>
            <p>
              Reagan believes in building — not just software, but relationships, futures, and legacies.
            </p>
          </div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 mt-20">
          <div>
            <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-widest text-[#7c3aed]">Skills & Interests</h3>
            <div className="space-y-6">
              {REAGAN_DETAILS.skills.map((skill) => (
                <div key={skill.name}>
                  <div className="flex justify-between mb-2">
                    <span className="font-medium text-sm">{skill.name}</span>
                    <span className="text-[#00d4ff] text-sm">{skill.level}%</span>
                  </div>
                  <div className="h-2 bg-white/10 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      whileInView={{ width: `${skill.level}%` }}
                      viewport={{ once: true }}
                      transition={{ duration: 1, delay: 0.2 }}
                      className="h-full bg-gradient-to-r from-[#00d4ff] to-[#7c3aed]"
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h3 className="text-2xl font-display font-bold mb-8 uppercase tracking-widest text-[#00d4ff]">Journey Timeline</h3>
            <div className="space-y-8 relative before:absolute before:left-2 before:top-2 before:bottom-2 before:w-0.5 before:bg-white/10">
              {[
                { title: "KCPE Completed", desc: "The start of the journey" },
                { title: "Passion Ignited", desc: "First lines of code written" },
                { title: "Vihiga High School", desc: "Academic and tech balance" },
                { title: "Software Engineering", desc: "Deep dive into complex tech" },
                { title: "Future Developer", desc: "Building the digital world" }
              ].map((step, idx) => (
                <div key={idx} className="relative pl-8 group">
                  <div className="absolute left-0 top-1.5 w-4 h-4 bg-[#7c3aed] rounded-full border-4 border-[#0a0a1a] group-hover:scale-125 transition-transform"></div>
                  <h4 className="font-bold text-[#00d4ff]">{step.title}</h4>
                  <p className="text-sm text-white/50">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
