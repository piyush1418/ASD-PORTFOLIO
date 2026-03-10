import { motion } from 'motion/react';
import { useEffect, useState } from 'react';

export function Splash({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 1500;
    const interval = 30;
    const steps = duration / interval;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress((currentStep / steps) * 100);

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 300);
      }
    }, interval);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-slate-50 dark:bg-[#0a0a0f] text-slate-900 dark:text-white perspective-[1000px]"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, scale: 1.1 }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="relative flex flex-col items-center">
        
        {/* 3D Rotating Cube */}
        <div className="w-32 h-32 mb-16 relative" style={{ transformStyle: 'preserve-3d' }}>
          <motion.div
            className="w-full h-full absolute"
            animate={{
              rotateX: [0, 360],
              rotateY: [0, 360],
            }}
            transition={{
              duration: 3,
              ease: "linear",
              repeat: Infinity,
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* Front */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm flex items-center justify-center" style={{ transform: 'translateZ(64px)' }}>
              <span className="text-2xl font-black text-slate-900/50 dark:text-white/50">PR</span>
            </div>
            {/* Back */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm" style={{ transform: 'rotateY(180deg) translateZ(64px)' }} />
            {/* Right */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm" style={{ transform: 'rotateY(90deg) translateZ(64px)' }} />
            {/* Left */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm" style={{ transform: 'rotateY(-90deg) translateZ(64px)' }} />
            {/* Top */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm" style={{ transform: 'rotateX(90deg) translateZ(64px)' }} />
            {/* Bottom */}
            <div className="absolute inset-0 border-2 border-slate-900/20 dark:border-white/20 bg-slate-900/5 dark:bg-white/5 backdrop-blur-sm" style={{ transform: 'rotateX(-90deg) translateZ(64px)' }} />
          </motion.div>
        </div>
        
        <div className="w-64 h-1 bg-black/10 dark:bg-white/10 rounded-full overflow-hidden relative">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.1 }}
          />
        </div>
        
        <motion.div
          className="mt-6 text-xs font-mono text-slate-500 dark:text-white/40 uppercase tracking-widest flex items-center gap-2"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <span>System Initialization</span>
          <span className="w-8 text-right">{Math.round(progress)}%</span>
        </motion.div>
      </div>
    </motion.div>
  );
}
