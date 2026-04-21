import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Mic, MicOff, Volume2, MessageSquare } from 'lucide-react';

declare global {
  interface Window {
    webkitSpeechRecognition: any;
    SpeechRecognition: any;
  }
}

export default function VoiceAssistant() {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [response, setResponse] = useState('');
  const recognitionRef = useRef<any>(null);

  useEffect(() => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    if (SpeechRecognition) {
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = false;
      recognitionRef.current.lang = 'en-US';

      recognitionRef.current.onresult = (event: any) => {
        const current = event.resultIndex;
        const resultTranscript = event.results[current][0].transcript;
        setTranscript(resultTranscript);
        processVoiceCommand(resultTranscript.toLowerCase());
        setIsListening(false);
      };

      recognitionRef.current.onend = () => {
        setIsListening(false);
      };
    }
  }, []);

  const handleMicClick = () => {
    if (isListening) {
      recognitionRef.current?.stop();
    } else {
      setTranscript('');
      setResponse('');
      recognitionRef.current?.start();
      setIsListening(true);
    }
  };

  const speak = (text: string) => {
    const utterance = new SpeechSynthesisUtterance(text);
    window.speechSynthesis.speak(utterance);
    setResponse(text);
  };

  const processVoiceCommand = (cmd: string) => {
    if (cmd.includes('about') || cmd.includes('reagan')) {
      speak("Reagan Smith is a Form 4 student at Vihiga High School and an aspiring Software Engineer from Mombasa.");
      document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.includes('memories') || cmd.includes('photos')) {
      speak("Sure, let's take a look at the memories gallery.");
      document.getElementById('memories')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.includes('music') || cmd.includes('songs')) {
      speak("Opening the Music Zone for you.");
      document.getElementById('music')?.scrollIntoView({ behavior: 'smooth' });
    } else if (cmd.includes('friends') || cmd.includes('girls')) {
      speak("Reagan's best friends are Duvey, Mitch, and Kayaan. They are his online family.");
      document.getElementById('gang')?.scrollIntoView({ behavior: 'smooth' });
    } else {
      speak("I'm Reagan's site assistant. Try asking me about Reagan, his friends, his memories, or the music zone.");
    }
  };

  return (
    <section className="py-24 px-6 relative bg-white/2">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-display font-bold mb-12">Talk to the <span className="text-[#7c3aed]">Site 🎤</span></h2>
        
        <div className="glass p-12 rounded-[3rem] relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-[#7c3aed] to-transparent"></div>
          
          <div className="flex flex-col items-center gap-8">
            <motion.div 
               animate={isListening ? { scale: [1, 1.2, 1] } : {}}
               transition={{ duration: 1, repeat: Infinity }}
               className="relative"
            >
              <button
                onClick={handleMicClick}
                className={`w-24 h-24 rounded-full flex items-center justify-center transition-all ${isListening ? 'bg-red-500 shadow-[0_0_30px_rgba(239,68,68,0.5)]' : 'bg-[#7c3aed] hover:bg-[#00d4ff]'}`}
              >
                {isListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
              </button>
              
              {isListening && (
                <div className="absolute -inset-4 border-2 border-[#7c3aed]/20 rounded-full animate-ping"></div>
              )}
            </motion.div>

            <div className="space-y-4 w-full">
              <div className="h-10">
                <AnimatePresence>
                  {transcript && (
                    <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="flex justify-center items-center gap-2 text-white/50">
                       <MessageSquare className="w-4 h-4" />
                       <span className="italic">"{transcript}"</span>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              <div className="min-h-[60px] flex items-center justify-center">
                <AnimatePresence>
                  {response && (
                    <motion.div 
                       initial={{ opacity: 0, scale: 0.9 }} 
                       animate={{ opacity: 1, scale: 1 }} 
                       className="bg-[#7c3aed]/10 border border-[#7c3aed]/20 px-8 py-4 rounded-2xl flex items-center gap-4 max-w-lg"
                    >
                       <Volume2 className="w-6 h-6 text-[#7c3aed] flex-shrink-0" />
                       <p className="text-lg font-medium text-white/90 text-left">{response}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>

            <div className="flex gap-2">
               {[1,2,3,4,5].map(i => (
                 <motion.div
                   key={i}
                   animate={isListening || response ? { height: [10, 40, 10] } : { height: 10 }}
                   transition={{ duration: 0.5, repeat: Infinity, delay: i * 0.1 }}
                   className="w-1 bg-[#00d4ff] rounded-full opacity-40"
                 />
               ))}
            </div>
          </div>
        </div>
        
        <p className="mt-8 text-white/30 text-sm uppercase tracking-widest">Try saying: "Tell me about Reagan"</p>
      </div>
    </section>
  );
}
