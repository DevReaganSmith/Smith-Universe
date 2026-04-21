import React, { useState, useRef, useEffect } from 'react';
import { Send, Bot } from 'lucide-react';
import { chatWithSmithAI } from '../services/geminiService';

export default function SmithAI() {
  const [messages, setMessages] = useState<{ role: 'user' | 'model', content: string }[]>([
    { role: 'model', content: "How can I help you today, Reagan?" }
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', content: userMsg }]);
    setLoading(true);

    const history = messages.map(m => ({
      role: m.role,
      parts: [{ text: m.content }]
    }));

    try {
      const response = await chatWithSmithAI(userMsg, history);
      setMessages(prev => [...prev, { role: 'model', content: response }]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card h-full bg-[#7c3aed]/10 border-[#7c3aed]/20 min-h-[300px]">
      <div className="flex justify-between items-center mb-4">
        <div className="label text-[#7c3aed]">SMITH AI ⚡</div>
        <div className="flex gap-2 items-center">
           <div className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></div>
           <span className="text-[10px] font-bold opacity-50 uppercase tracking-widest text-[#7c3aed]">Live</span>
        </div>
      </div>

      <div className="flex-1 overflow-hidden flex flex-col gap-3">
        <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-3 pr-2 scrollbar-thin">
           {messages.map((m, idx) => (
             <div key={idx} className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-[90%] px-4 py-2 rounded-2xl text-[11px] font-medium leading-relaxed ${m.role === 'user' ? 'bg-[#7c3aed] text-white' : 'bg-black/40 text-white/80'}`}>
                   {m.content}
                </div>
             </div>
           ))}
           {loading && (
             <div className="flex justify-start">
                <div className="bg-black/40 px-4 py-2 rounded-2xl flex gap-1">
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce"></div>
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.2s]"></div>
                   <div className="w-1.5 h-1.5 bg-white/40 rounded-full animate-bounce [animation-delay:0.4s]"></div>
                </div>
             </div>
           )}
        </div>

        <div className="flex gap-2 p-1 bg-black/40 border border-white/10 rounded-xl mt-auto">
           <input
             type="text"
             value={input}
             onChange={(e) => setInput(e.target.value)}
             onKeyPress={(e) => e.key === 'Enter' && handleSend()}
             placeholder="Message SMITH AI..."
             className="flex-1 bg-transparent px-3 py-2 outline-none text-xs font-medium text-white"
           />
           <button onClick={handleSend} className="p-2 bg-[#7c3aed] rounded-lg hover:scale-105 active:scale-95 transition-all">
              <Send className="w-3.5 h-3.5 text-white" />
           </button>
        </div>
      </div>
    </div>
  );
}
