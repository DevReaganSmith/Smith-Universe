import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, X, Send, Bot } from 'lucide-react';
import { REAGAN_DETAILS } from '../constants';

export default function SiteBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ sender: 'bot' | 'user', text: string }[]>([
    { sender: 'bot', text: "Hi! I'm Reagan's assistant. Ask me anything about him or his site!" }
  ]);
  const [input, setInput] = useState('');

  const botResponses: Record<string, string> = {
    'who is reagan': `Reagan Smith is a Form 4 student at Vihiga High School and an aspiring Software Engineer from Mombasa, Kenya.`,
    'where is reagan from': `Reagan is originally from Bombolulu, Mombasa, Kenya.`,
    'friends': `Reagan has three close friends: Duvey, Mitch, and Kayaan.`,
    'school': `He attends Vihiga High School and is currently in Form 4.`,
    'instagram': `You can find Reagan on Instagram here: ${REAGAN_DETAILS.instagram}`,
    'whatsapp': `His WhatsApp is: +${REAGAN_DETAILS.whatsapp}`,
    'hobbies': `Reagan loves coding, software engineering, and the tech world in general.`,
    'smith ai': `SMITH AI is a premium intelligent assistant built by Reagan Smth using next-gen AI tech.`,
  };

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim();
    setMessages(prev => [...prev, { sender: 'user', text: userMsg }]);
    setInput('');

    setTimeout(() => {
      let reply = "Great question! Reagan's site is still learning. Try asking about his school, friends, or hobbies. 😄";
      const normalizedInput = userMsg.toLowerCase();
      
      for (const key in botResponses) {
        if (normalizedInput.includes(key)) {
          reply = botResponses[key];
          break;
        }
      }

      setMessages(prev => [...prev, { sender: 'bot', text: reply }]);
    }, 800);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-16 h-16 bg-[#7c3aed] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(124,58,237,0.5)] z-[60] hover:scale-110 active:scale-95 transition-all group"
      >
        <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 border-2 border-[#0a0a1a] rounded-full"></div>
        {isOpen ? <X className="w-8 h-8 text-white" /> : <MessageCircle className="w-8 h-8 text-white group-hover:scale-110 transition-transform" />}
      </button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-[350px] md:w-[400px] h-[500px] glass rounded-3xl z-[60] border-white/10 flex flex-col overflow-hidden shadow-2xl"
          >
            {/* Header */}
            <div className="p-5 bg-[#7c3aed] flex items-center gap-4">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center">
                 <Bot className="w-6 h-6 text-white" />
              </div>
              <div>
                 <h4 className="font-bold text-white leading-none">Site Bot</h4>
                 <p className="text-white/60 text-[10px] uppercase font-bold mt-1">Always Active</p>
              </div>
            </div>

            {/* Chat */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((m, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, x: m.sender === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div className={`max-w-[85%] p-3 px-4 rounded-2xl text-sm ${m.sender === 'user' ? 'bg-[#00d4ff] text-white rounded-tr-none' : 'bg-white/5 text-white/90 rounded-tl-none'}`}>
                    {m.text}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Input */}
            <div className="p-4 bg-white/2">
               <div className="flex bg-white/5 border border-white/10 rounded-2xl p-1 px-3">
                  <input
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                    placeholder="Ask something..."
                    className="flex-1 bg-transparent border-none outline-none py-3 text-sm text-white"
                  />
                  <button onClick={handleSend} className="p-2 text-[#00d4ff] hover:text-[#7c3aed] transition-colors"><Send className="w-5 h-5" /></button>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
