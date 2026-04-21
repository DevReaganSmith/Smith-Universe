import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'motion/react';
import { Download, Upload, Type, Palette, Scissors, Trash2 } from 'lucide-react';

export default function ImageEditor() {
  const [activeTab, setActiveTab] = useState<'create' | 'edit'>('create');
  const [text, setText] = useState('Smith Universe');
  const [fontSize, setFontSize] = useState(40);
  const [textColor, setTextColor] = useState('#ffffff');
  const [bgColor, setBgColor] = useState('linear-gradient(45deg, #00d4ff, #7c3aed)');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [filters, setFilters] = useState({
    brightness: 100,
    contrast: 100,
    grayscale: 0,
    blur: 0,
    sepia: 0,
    invert: 0
  });

  const canvasRef = useRef<HTMLCanvasElement>(null);
  const editCanvasRef = useRef<HTMLCanvasElement>(null);

  const drawCreateCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Background
    if (bgColor.startsWith('linear')) {
      const grad = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
      grad.addColorStop(0, '#00d4ff');
      grad.addColorStop(1, '#7c3aed');
      ctx.fillStyle = grad;
    } else {
      ctx.fillStyle = bgColor;
    }
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Text
    ctx.fillStyle = textColor;
    ctx.font = `bold ${fontSize}px Poppins`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText(text, canvas.width / 2, canvas.height / 2);
  };

  const drawEditCanvas = () => {
    const canvas = editCanvasRef.current;
    if (!canvas || !uploadedImage) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.crossOrigin = "anonymous";
    img.src = uploadedImage;
    img.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.filter = `brightness(${filters.brightness}%) contrast(${filters.contrast}%) grayscale(${filters.grayscale}%) blur(${filters.blur}px) sepia(${filters.sepia}%) invert(${filters.invert}%)`;
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
      
      // Overlay text if any
      ctx.filter = 'none';
      ctx.fillStyle = textColor;
      ctx.font = `bold ${fontSize / 2}px Poppins`;
      ctx.textAlign = 'center';
      ctx.fillText(text, canvas.width / 2, canvas.height - 30);
    };
  };

  useEffect(() => {
    if (activeTab === 'create') drawCreateCanvas();
    else if (uploadedImage) drawEditCanvas();
  }, [text, fontSize, textColor, bgColor, activeTab, filters, uploadedImage]);

  const handleDownload = (ref: React.RefObject<HTMLCanvasElement>) => {
    const link = document.createElement('a');
    link.download = 'reagan-smith-creation.png';
    link.href = ref.current?.toDataURL() || '';
    link.click();

    // Track stat
    const stats = JSON.parse(localStorage.getItem('smith_user_stats') || '{}');
    if (stats.name) {
      stats.imagesCreated = (stats.imagesCreated || 0) + 1;
      localStorage.setItem('smith_user_stats', JSON.stringify(stats));
    }
  };

  const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadedImage(ev.target?.result as string);
      reader.readAsDataURL(file);
    }
  };

  return (
    <section id="creative" className="py-24 px-6 relative">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-4">Create & Edit <span className="text-[#f59e0b]">Images 🎨</span></h2>
          <div className="flex bg-white/5 p-1 rounded-2xl w-fit mx-auto border border-white/5">
             <button onClick={() => setActiveTab('create')} className={`px-8 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'create' ? 'bg-[#7c3aed] text-white' : 'text-white/50 hover:text-white'}`}>CREATE</button>
             <button onClick={() => setActiveTab('edit')} className={`px-8 py-3 rounded-xl transition-all font-bold text-sm ${activeTab === 'edit' ? 'bg-[#7c3aed] text-white' : 'text-white/50 hover:text-white'}`}>EDIT</button>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Controls */}
          <div className="glass p-8 rounded-3xl space-y-8">
            {activeTab === 'create' ? (
              <>
                 <div>
                   <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">Design Message</label>
                   <input type="text" value={text} onChange={(e) => setText(e.target.value)} className="w-full bg-white/5 border border-white/10 p-4 rounded-xl outline-none focus:border-[#00d4ff]" />
                 </div>
                 <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">Text Color</label>
                      <input type="color" value={textColor} onChange={(e) => setTextColor(e.target.value)} className="w-full h-12 bg-transparent border-none cursor-pointer" />
                    </div>
                    <div>
                      <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">Font Size ({fontSize}px)</label>
                      <input type="range" min="10" max="100" value={fontSize} onChange={(e) => setFontSize(parseInt(e.target.value))} className="w-full accent-[#00d4ff]" />
                    </div>
                 </div>
                 <div>
                    <label className="text-xs font-bold uppercase tracking-widest text-white/50 mb-3 block">Background Style</label>
                    <div className="flex gap-4">
                       <button onClick={() => setBgColor('linear-gradient(45deg, #00d4ff, #7c3aed)')} className="w-12 h-12 rounded-lg bg-gradient-to-br from-[#00d4ff] to-[#7c3aed] border-2 border-white/20"></button>
                       <button onClick={() => setBgColor('#0a0a1a')} className="w-12 h-12 rounded-lg bg-[#0a0a1a] border-2 border-white/20"></button>
                       <button onClick={() => setBgColor('#f59e0b')} className="w-12 h-12 rounded-lg bg-[#f59e0b] border-2 border-white/20"></button>
                       <button onClick={() => setBgColor('#7c3aed')} className="w-12 h-12 rounded-lg bg-[#7c3aed] border-2 border-white/20"></button>
                    </div>
                 </div>
              </>
            ) : (
              <>
                 <div className="space-y-6">
                    <label className="w-full h-32 border-2 border-dashed border-white/10 rounded-2xl flex flex-col items-center justify-center cursor-pointer hover:border-[#00d4ff] transition-all bg-white/2">
                       <Upload className="w-8 h-8 mb-2 text-[#00d4ff]" />
                       <span className="text-xs font-bold text-white/50">UPLOAD IMAGE TO EDIT</span>
                       <input type="file" className="hidden" accept="image/*" onChange={handleUpload} />
                    </label>

                    {uploadedImage && (
                       <div className="grid grid-cols-2 gap-6">
                          {Object.keys(filters).map((filter) => (
                             <div key={filter}>
                                <label className="text-[10px] font-bold uppercase text-white/40 mb-1 block">{filter}</label>
                                <input 
                                  type="range" 
                                  min={filter === 'brightness' || filter === 'contrast' ? "0" : "0"} 
                                  max={filter === 'brightness' || filter === 'contrast' ? "200" : "100"} 
                                  value={filters[filter as keyof typeof filters]} 
                                  onChange={(e) => setFilters({...filters, [filter]: parseInt(e.target.value)})}
                                  className="w-full accent-[#7c3aed]"
                                />
                             </div>
                          ))}
                       </div>
                    )}
                 </div>
              </>
            )}

            <button 
              onClick={() => handleDownload(activeTab === 'create' ? canvasRef : editCanvasRef)}
              className="w-full flex items-center justify-center gap-3 bg-gradient-to-r from-[#00d4ff] to-[#7c3aed] py-4 rounded-xl font-bold uppercase tracking-widest hover:shadow-[0_0_20px_rgba(0,212,255,0.5)] transition-all"
            >
              <Download className="w-5 h-5" /> Download Result
            </button>
          </div>

          {/* Preview */}
          <div className="glass p-4 rounded-3xl border-white/5 aspect-square flex items-center justify-center bg-black/20 overflow-hidden">
             {activeTab === 'create' ? (
                <canvas ref={canvasRef} width="600" height="600" className="w-full h-full rounded-2xl shadow-2xl" />
             ) : (
                <div className="w-full h-full flex items-center justify-center relative">
                   {uploadedImage ? (
                      <canvas ref={editCanvasRef} width="600" height="600" className="w-full h-full object-contain rounded-2xl" />
                   ) : (
                      <div className="text-center">
                         <Scissors className="w-16 h-16 mx-auto mb-4 text-white/10" />
                         <p className="text-white/30 italic">Upload an image to start editing...</p>
                      </div>
                   )}
                </div>
             )}
          </div>
        </div>
      </div>
    </section>
  );
}
