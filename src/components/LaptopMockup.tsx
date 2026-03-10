import { motion } from 'motion/react';
import { useState } from 'react';

interface LaptopMockupProps {
  imageSrc: string;
  alt: string;
}

export function LaptopMockup({ imageSrc, alt }: LaptopMockupProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative w-full max-w-md mx-auto aspect-[16/10] perspective-[1500px] cursor-pointer group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      {/* Laptop Base */}
      <motion.div 
        className="absolute bottom-0 left-0 w-full h-[10%] bg-slate-300 dark:bg-slate-800 rounded-b-xl rounded-t-sm shadow-2xl origin-bottom preserve-3d"
        initial={{ rotateX: 60 }}
        animate={{ rotateX: isOpen ? 20 : 60 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Trackpad */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-1/4 h-1/2 bg-slate-400/30 dark:bg-slate-900/30 rounded-sm" />
        {/* Keyboard area */}
        <div className="absolute top-[10%] left-[10%] w-[80%] h-[30%] bg-slate-400/20 dark:bg-slate-900/20 rounded-sm" />
      </motion.div>

      {/* Laptop Screen (Lid) */}
      <motion.div 
        className="absolute bottom-[10%] left-0 w-full h-[90%] bg-slate-900 rounded-t-xl border-[8px] border-slate-800 origin-bottom preserve-3d overflow-hidden flex items-center justify-center shadow-xl"
        initial={{ rotateX: -90 }}
        animate={{ rotateX: isOpen ? -10 : -90 }}
        transition={{ type: 'spring', stiffness: 100, damping: 20 }}
      >
        {/* Screen Content */}
        <div className="w-full h-full bg-black relative">
          <img 
            src={imageSrc} 
            alt={alt} 
            className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-500"
            referrerPolicy="no-referrer"
          />
          {/* Screen Glare */}
          <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-white/20 pointer-events-none" />
        </div>
      </motion.div>
    </div>
  );
}
