import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Users, Send, Home, User as UserIcon, LogOut } from 'lucide-react';
import { ChatMessage, UserStats } from '../types';

export default function ChatRoom({ onProfileClick, userStats }: { onProfileClick: () => void, userStats: UserStats | null }) {
  const [name, setName] = useState('');
  const [isJoined, setIsJoined] = useState(false);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [members, setMembers] = useState<string[]>(['Reagan', 'Duvey', 'Mitch', 'Kayaan']);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Load local messages
    const saved = localStorage.getItem('smith_chat_messages');
    if (saved) setMessages(JSON.parse(saved));

    // Simulate other people talking every now and then
    const interval = setInterval(() => {
      if (isJoined && Math.random() > 0.7) {
        const bots = ['Duvey', 'Mitch', 'Kayaan'];
        const bot = bots[Math.floor(Math.random() * bots.length)];
        const texts = [
          "Yo! How's everyone doing?",
          "Reagan's site is looking fire 🔥",
          "Mombasa is so hot today 🌊",
          "Anyone else learning JS?",
          "Check out the new music I added!"
        ];
        simulateBotMessage(bot, texts[Math.floor(Math.random() * texts.length)]);
      }
    }, 10000);

    return () => clearInterval(interval);
  }, [isJoined]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const simulateBotMessage = (sender: string, text: string) => {
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender,
      text,
      timestamp: Date.now()
    };
    setMessages(prev => {
      const updated = [...prev, newMsg].slice(-50);
      localStorage.setItem('smith_chat_messages', JSON.stringify(updated));
      return updated;
    });
  };

  const handleJoin = () => {
    if (!name.trim()) return;
    setIsJoined(true);
    setMembers(prev => [...new Set([...prev, name.trim()])]);
    simulateBotMessage('System', `👋 ${name.trim()} has entered the chat!`);
    
    // Track stats
    const stats: UserStats = JSON.parse(localStorage.getItem('smith_user_stats') || JSON.stringify({
       name: name.trim(),
       avatar: '👤',
       messagesSent: 0,
       timeSpent: 0,
       sectionsVisited: [],
       musicPlayed: 0,
       imagesCreated: 0
    }));
    stats.name = name.trim();
    localStorage.setItem('smith_user_stats', JSON.stringify(stats));
  };

  const handleSend = () => {
    if (!input.trim()) return;
    const newMsg: ChatMessage = {
      id: Math.random().toString(36).substr(2, 9),
      sender: name,
      text: input.trim(),
      timestamp: Date.now(),
      isMe: true
    };
    const updated = [...messages, newMsg].slice(-50);
    setMessages(updated);
    localStorage.setItem('smith_chat_messages', JSON.stringify(updated));
    setInput('');

    // Update stats
    const stats = JSON.parse(localStorage.getItem('smith_user_stats') || '{}');
    if (stats.name) {
      stats.messagesSent = (stats.messagesSent || 0) + 1;
      localStorage.setItem('smith_user_stats', JSON.stringify(stats));
    }
  };

  return (
    <section id="hangout" className="py-24 px-6 relative bg-gradient-to-t from-[#0a0a1a] to-white/5">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-wrap justify-between items-center mb-12 gap-6">
          <div>
             <h2 className="text-4xl md:text-5xl font-display font-bold">The Hangout <span className="text-[#00d4ff]">Room 🏠</span></h2>
             <div className="flex items-center gap-2 mt-4 text-green-500 font-bold uppercase tracking-widest text-xs">
                <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                {members.length} People Online
             </div>
          </div>
          {isJoined && (
            <div className="flex gap-4">
               <button onClick={onProfileClick} className="flex items-center gap-2 glass px-6 py-3 rounded-xl hover:bg-white/10 transition-all font-bold text-sm">
                  <UserIcon className="w-5 h-5 text-[#00d4ff]" /> MY PROFILE
               </button>
               <button onClick={() => setIsJoined(false)} className="flex items-center gap-2 glass px-6 py-3 rounded-xl hover:bg-red-500/20 text-red-500 transition-all font-bold text-sm">
                  <LogOut className="w-5 h-5" /> LEAVE
               </button>
            </div>
          )}
        </div>

        {!isJoined ? (
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass p-12 rounded-[2.5rem] border-white/5 text-center max-w-xl mx-auto"
          >
             <Home className="w-20 h-20 text-[#00d4ff] mx-auto mb-8 opacity-20" />
             <h3 className="text-2xl font-bold mb-4">Enter Your Name</h3>
             <p className="text-white/50 mb-8 leading-relaxed italic">No email. No password. Just your name to join the global hangout of Reagan's universe.</p>
             <div className="space-y-4">
                <input
                  type="text"
                  placeholder="Enter your name here..."
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleJoin()}
                  className="w-full bg-white/5 border border-white/10 p-5 rounded-2xl outline-none focus:border-[#7c3aed] text-center text-xl font-display"
                />
                <button 
                  onClick={handleJoin}
                  className="w-full bg-[#7c3aed] text-white py-5 rounded-2xl font-bold uppercase tracking-widest hover:bg-[#00d4ff] hover:shadow-[0_0_30px_rgba(0,212,255,0.3)] transition-all"
                >
                  Join the Session
                </button>
             </div>
          </motion.div>
        ) : (
          <div className="glass h-[700px] rounded-[2.5rem] border-white/10 flex flex-col md:flex-row overflow-hidden">
             {/* Sidebar */}
             <div className="w-full md:w-64 bg-black/40 border-b md:border-b-0 md:border-r border-white/5 p-6 overflow-y-auto">
                <h4 className="text-xs font-bold uppercase tracking-[0.2em] text-white/30 mb-6 flex items-center gap-2">
                   <Users className="w-4 h-4" /> Member List
                </h4>
                <div className="space-y-4">
                   {members.map(m => (
                     <div key={m} className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] rounded-lg text-[10px] flex items-center justify-center font-bold">
                           {m[0].toUpperCase()}
                        </div>
                        <span className={`text-sm font-medium ${m === name ? 'text-[#00d4ff]' : 'text-white/70'}`}>
                           {m} {m === name && '(You)'}
                        </span>
                     </div>
                   ))}
                </div>
             </div>

             {/* Main Chat */}
             <div className="flex-1 flex flex-col h-full overflow-hidden">
                <div ref={scrollRef} className="flex-1 p-6 space-y-6 overflow-y-auto bg-black/20">
                   {messages.map((m, idx) => (
                     <div key={m.id} className={`flex ${m.sender === 'System' ? 'justify-center' : (m.sender === name ? 'justify-end' : 'justify-start')}`}>
                        <div className={`flex flex-col ${m.sender === name ? 'items-end' : 'items-start'} max-w-[80%]`}>
                           {m.sender !== 'System' && m.sender !== name && (
                             <span className="text-[10px] font-bold uppercase text-white/30 mb-1 ml-2">{m.sender}</span>
                           )}
                           <div className={`px-5 py-3 rounded-2xl text-sm ${
                             m.sender === 'System' ? 'bg-white/5 text-white/40 italic text-xs' : 
                             (m.sender === name ? 'bg-[#7c3aed] text-white rounded-tr-none' : 'bg-white/10 text-white rounded-tl-none')
                           }`}>
                             {m.text}
                           </div>
                           {m.sender !== 'System' && (
                             <span className="text-[9px] text-white/20 mt-1">{new Date(m.timestamp).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                           )}
                        </div>
                     </div>
                   ))}
                </div>

                {/* Input */}
                <div className="p-6 border-t border-white/5">
                   <div className="flex gap-4 p-1 bg-white/5 border border-white/10 rounded-2xl">
                      <input
                        type="text"
                        value={input}
                        onChange={(e) => setInput(e.target.value)}
                        onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Say something cool..."
                        className="flex-1 bg-transparent px-4 py-3 outline-none text-white font-medium"
                      />
                      <button 
                        onClick={handleSend}
                        className="w-12 h-12 bg-[#00d4ff] rounded-xl flex items-center justify-center hover:bg-[#7c3aed] transition-all"
                      >
                         <Send className="w-5 h-5 text-white" />
                      </button>
                   </div>
                </div>
             </div>
          </div>
        )}
      </div>
    </section>
  );
}
