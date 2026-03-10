import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Terminal, X } from 'lucide-react';

export function EasterEgg() {
  const [showTerminal, setShowTerminal] = useState(false);
  const [inputSequence, setInputSequence] = useState('');
  const secretCode = 'hello';

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (showTerminal) return;

      setInputSequence(prev => {
        const newSequence = (prev + e.key).slice(-secretCode.length);
        if (newSequence.toLowerCase() === secretCode) {
          setShowTerminal(true);
          return '';
        }
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [showTerminal]);

  return (
    <AnimatePresence>
      {showTerminal && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm p-4"
        >
          <div className="w-full max-w-2xl bg-[#0a0a0f] border border-white/20 rounded-lg shadow-2xl overflow-hidden font-mono text-green-400">
            <div className="flex items-center justify-between px-4 py-2 bg-white/5 border-b border-white/10">
              <div className="flex items-center gap-2 text-white/50 text-sm">
                <Terminal className="w-4 h-4" />
                <span>guest@piyush-portfolio:~</span>
              </div>
              <button onClick={() => setShowTerminal(false)} className="text-white/50 hover:text-white">
                <X className="w-4 h-4" />
              </button>
            </div>
            <div className="p-6 h-64 overflow-y-auto">
              <p className="mb-2">Welcome to the hidden terminal.</p>
              <p className="mb-2">Initializing connection...</p>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 1 }}
              >
                <p className="mb-2 text-blue-400">Connection established.</p>
                <p className="mb-4 text-white">"The only way to do great work is to love what you do." - Steve Jobs</p>
                <p className="mb-2">You found the easter egg! Have a great day.</p>
              </motion.div>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 1, 0] }}
                transition={{ repeat: Infinity, duration: 1 }}
                className="inline-block w-2 h-4 bg-green-400 mt-4"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
