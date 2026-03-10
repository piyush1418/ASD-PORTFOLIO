import { motion } from 'motion/react';
import { Download, ChevronDown, Mail, Phone, Linkedin, Github, Link as LinkIcon } from 'lucide-react';
import resumeData from '../data/resume.json';
import { MagneticButton } from './MagneticButton';
import { MagneticElement } from './MagneticElement';
import { VisitorCounter } from './VisitorCounter';

export function Hero() {
  const { name, title, summary, email, phone, links } = resumeData.basics;

  const handleScrollToExperience = () => {
    document.getElementById('experience')?.scrollIntoView({ behavior: 'smooth' });
  };

  const handleDownloadResume = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(resumeData, null, 2));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href",     dataStr);
    downloadAnchorNode.setAttribute("download", "resume.json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <section id="hero" className="relative min-h-screen flex items-center justify-center px-6 pt-20 pb-12 overflow-hidden perspective-[1000px]">
      {/* Floating Background Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <motion.div
          animate={{ 
            rotate: [0, 5, 0],
            scale: [1, 1.1, 1]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[20%] left-[10%] w-64 h-64 bg-gradient-to-br from-indigo-500/10 dark:from-indigo-500/20 to-purple-500/10 dark:to-purple-500/20 rounded-full blur-3xl"
        />
        <motion.div
          animate={{ 
            rotate: [0, -10, 0],
            scale: [1, 1.2, 1]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[20%] right-[10%] w-80 h-80 bg-gradient-to-br from-blue-500/10 dark:from-blue-500/20 to-cyan-500/10 dark:to-cyan-500/20 rounded-full blur-3xl"
        />
      </div>

      <div className="max-w-5xl mx-auto w-full z-10 flex flex-col items-center text-center relative pointer-events-none">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mb-6 pointer-events-auto"
        >
          <span className="inline-block py-1 px-3 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/70 text-sm font-mono tracking-wider mb-6 shadow-sm dark:shadow-[0_0_15px_rgba(255,255,255,0.05)] backdrop-blur-md">
            AVAILABLE FOR OPPORTUNITIES IN DELHI NCR
          </span>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-br from-slate-900 via-slate-800 to-slate-500 dark:from-white dark:via-white/90 dark:to-white/30 mb-6 drop-shadow-sm dark:drop-shadow-2xl">
            {name}
          </h1>
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-medium text-slate-600 dark:text-white/60 mb-4 max-w-3xl mx-auto leading-tight drop-shadow-sm">
            {title}
          </h2>
          <p className="text-lg font-medium text-indigo-500 dark:text-indigo-400 mb-8 italic">
            "Build. Break. Learn. Repeat."
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap justify-center gap-4 mb-8 pointer-events-auto"
        >
          <MagneticElement strength={0.3}>
            <a href={`mailto:${email}`} className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-lg hover:bg-black/10 dark:hover:bg-white/10">
              <Mail className="w-4 h-4" />
              {email}
            </a>
          </MagneticElement>
          <MagneticElement strength={0.3}>
            <a href={`tel:${phone}`} className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-lg hover:bg-black/10 dark:hover:bg-white/10">
              <Phone className="w-4 h-4" />
              {phone.slice(0, -4)}XXXX
            </a>
          </MagneticElement>
          {links.map((link, i) => (
            <MagneticElement key={i} strength={0.3}>
              <a href={`https://${link}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-sm text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white transition-all hover:scale-105 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm dark:shadow-lg hover:bg-black/10 dark:hover:bg-white/10">
                {link.includes('linkedin') ? <Linkedin className="w-4 h-4" /> : link.includes('github') ? <Github className="w-4 h-4" /> : <LinkIcon className="w-4 h-4" />}
                {link.replace('www.', '')}
              </a>
            </MagneticElement>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4, ease: [0.22, 1, 0.36, 1] }}
          className="text-lg md:text-xl text-slate-600 dark:text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed drop-shadow-sm pointer-events-auto"
        >
          {summary}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-col sm:flex-row items-center gap-4 pointer-events-auto"
        >
          <MagneticButton
            onClick={handleScrollToExperience}
            className="px-8 py-4 rounded-full bg-slate-900 dark:bg-white text-white dark:text-black font-semibold tracking-wide hover:bg-slate-800 dark:hover:bg-white/90 transition-all flex items-center gap-2 group shadow-md dark:shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-lg dark:hover:shadow-[0_0_40px_rgba(255,255,255,0.5)] active:scale-95"
          >
            View Experience
            <ChevronDown className="w-4 h-4 group-hover:translate-y-1 transition-transform" />
          </MagneticButton>
          
          <MagneticButton
            onClick={handleDownloadResume}
            className="px-8 py-4 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-900 dark:text-white font-medium hover:bg-black/10 dark:hover:bg-white/10 transition-all flex items-center gap-2 group backdrop-blur-sm shadow-sm dark:shadow-none hover:shadow-md dark:hover:shadow-[0_0_20px_rgba(255,255,255,0.1)] active:scale-95"
          >
            <Download className="w-4 h-4 group-hover:-translate-y-1 transition-transform" />
            Download Resume
          </MagneticButton>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 1 }}
        className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-slate-400 dark:text-white/30 z-10"
      >
        <span className="text-xs font-mono uppercase tracking-widest">Scroll</span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        >
          <div className="w-[1px] h-12 bg-gradient-to-b from-slate-400 dark:from-white/30 to-transparent" />
        </motion.div>
      </motion.div>

      <VisitorCounter />
    </section>
  );
}
