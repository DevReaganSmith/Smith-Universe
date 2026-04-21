import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Search, Music } from 'lucide-react';
import { Song } from '../types';

export default function MusicZone() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Song[]>([]);
  const [loading, setLoading] = useState(false);

  const searchMusic = async () => {
    if (!query) return;
    setLoading(true);
    try {
      const response = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(query)}&media=music&limit=5`);
      const data = await response.json();
      setResults(data.results || []);
      
      const stats = JSON.parse(localStorage.getItem('smith_user_stats') || '{}');
      if (stats.name) {
        stats.musicPlayed = (stats.musicPlayed || 0) + 1;
        localStorage.setItem('smith_user_stats', JSON.stringify(stats));
      }
    } catch (error) {
      console.error('Music search failed:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card h-full">
      <div className="label">Music Zone 🎶</div>
      <div className="flex gap-2 mb-4">
        <input 
          type="text" 
          placeholder="Search iTunes..." 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && searchMusic()}
          className="flex-1 bg-white/5 border border-white/10 rounded-lg px-3 py-1.5 text-[11px] outline-none text-white focus:border-[#00d4ff] transition-all"
        />
        <button onClick={searchMusic} className="bg-[#00d4ff] p-1.5 rounded-lg active:scale-95 transition-all">
           <Search className="w-3.5 h-3.5 text-white" />
        </button>
      </div>

      <div className="flex-1 overflow-y-auto space-y-2 scrollbar-none pr-1">
        {results.map((song) => (
          <div key={song.trackId} className="flex items-center gap-3 bg-white/5 p-2 rounded-xl border border-white/5 group">
             <img src={song.artworkUrl100} className="w-8 h-8 rounded-lg object-cover" referrerPolicy="no-referrer" />
             <div className="flex-1 min-w-0">
                <p className="text-[10px] font-bold truncate text-white">{song.trackName}</p>
                <p className="text-[8px] opacity-50 truncate text-white">{song.artistName}</p>
             </div>
             <motion.a 
               href={song.previewUrl} 
               target="_blank"
               whileHover={{ scale: 1.1 }}
               className="p-1 px-2 bg-white/10 rounded-lg text-[8px] font-bold text-[#00d4ff]"
             >
                PLAY
             </motion.a>
          </div>
        ))}
        {results.length === 0 && !loading && (
           <div className="h-full flex flex-col items-center justify-center opacity-30 text-center py-4">
              <Music className="w-8 h-8 mb-2" />
              <p className="text-[8px] font-bold uppercase tracking-widest">Search Jams</p>
           </div>
        )}
        {loading && (
          <div className="flex justify-center p-4">
             <div className="w-4 h-4 border-2 border-[#00d4ff] border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
      </div>
    </div>
  );
}
