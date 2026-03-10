import { motion, useScroll, useTransform, AnimatePresence } from 'motion/react';
import { ExternalLink, Code2, Calendar, Sparkles, Loader2, Network } from 'lucide-react';
import resumeData from '../data/resume.json';
import { TiltCard } from './TiltCard';
import { LaptopMockup } from './LaptopMockup';
import { useRef, useState } from 'react';
import { MagneticButton } from './MagneticButton';
import { GoogleGenAI } from '@google/genai';
import { SystemArchitecture } from './SystemArchitecture';

// Add some placeholder images based on the project titles
const projectImages = [
  "https://images.unsplash.com/photo-1540747913346-19e32dc3e97e?q=80&w=2000&auto=format&fit=crop", // Cricket
  "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=2000&auto=format&fit=crop", // Website builder
  "https://images.unsplash.com/photo-1555949963-ff9fe0c870eb?q=80&w=2000&auto=format&fit=crop"  // Proctor AI
];

const containerVariants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 30 },
  show: { 
    opacity: 1, 
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" as const }
  }
};

export function Projects() {
  const { projects } = resumeData;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const [explainingIndex, setExplainingIndex] = useState<number | null>(null);
  const [explanations, setExplanations] = useState<Record<number, string>>({});
  const [activeArchitecture, setActiveArchitecture] = useState<any | null>(null);

  const handleExplain = async (index: number, project: any) => {
    if (explanations[index]) return; // Already explained
    
    setExplainingIndex(index);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Explain this project in 2-3 short sentences. Project Name: ${project.title}. Details: ${project.bullets.join(' ')}. Tech stack: ${project.stack}`,
      });
      
      setExplanations(prev => ({ ...prev, [index]: response.text || "I couldn't generate an explanation." }));
    } catch (error: any) {
      console.error("Failed to explain project", error);
      setExplanations(prev => ({ ...prev, [index]: `Error: ${error.message || "Failed to generate explanation."}` }));
    } finally {
      setExplainingIndex(null);
    }
  };

  return (
    <section id="projects" ref={containerRef} className="py-24 px-6 relative z-10 perspective-[1000px]">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-5xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Featured Projects
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-slate-900 dark:from-white to-transparent rounded-full" />
        </motion.div>

        <motion.div 
          variants={containerVariants}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-50px" }}
          className="grid grid-cols-1 gap-16"
        >
          {projects.map((project, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              className={`flex flex-col ${index % 2 === 0 ? 'lg:flex-row' : 'lg:flex-row-reverse'} gap-8 items-center`}
            >
              <div className="w-full lg:w-1/2">
                <TiltCard className="w-full" glare={true}>
                  <LaptopMockup imageSrc={projectImages[index % projectImages.length]} alt={project.title} />
                </TiltCard>
              </div>

              <motion.div 
                whileHover={{ y: -5, scale: 1.01 }}
                transition={{ duration: 0.3 }}
                className="w-full lg:w-1/2 flex flex-col justify-center p-6 rounded-3xl bg-white/50 dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] hover:shadow-xl dark:hover:shadow-[0_15px_40px_rgba(0,0,0,0.3)]"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-12 h-12 rounded-xl bg-indigo-100 dark:bg-indigo-500/20 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shadow-sm">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div className="flex gap-2 flex-wrap justify-end">
                    {project.architecture && (
                      <MagneticButton 
                        onClick={() => setActiveArchitecture(project)}
                        className="flex items-center gap-2 px-4 py-2 rounded-full bg-emerald-50 dark:bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 text-sm font-medium hover:bg-emerald-100 dark:hover:bg-emerald-500/20 transition-colors"
                      >
                        <Network className="w-4 h-4" />
                        Architecture
                      </MagneticButton>
                    )}
                    <MagneticButton 
                      onClick={() => handleExplain(index, project)}
                      disabled={explainingIndex === index || !!explanations[index]}
                      className="flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-medium hover:bg-indigo-100 dark:hover:bg-indigo-500/20 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {explainingIndex === index ? (
                        <Loader2 className="w-4 h-4 animate-spin" />
                      ) : (
                        <Sparkles className="w-4 h-4" />
                      )}
                      {explanations[index] ? 'Explained' : 'Explain with AI'}
                    </MagneticButton>
                    <a href="#" className="text-slate-400 dark:text-white/50 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors p-2 rounded-full hover:bg-black/5 dark:hover:bg-white/10">
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  </div>
                </div>

                <h3 className="text-3xl font-bold text-slate-900 dark:text-white mb-2 tracking-tight">
                  {project.title}
                </h3>

                <div className="flex items-center gap-2 text-sm font-mono text-slate-500 dark:text-white/60 mb-6">
                  <Calendar className="w-4 h-4" />
                  {project.dates}
                </div>

                <AnimatePresence>
                  {explanations[index] && (
                    <motion.div
                      initial={{ opacity: 0, height: 0, marginBottom: 0 }}
                      animate={{ opacity: 1, height: 'auto', marginBottom: 24 }}
                      exit={{ opacity: 0, height: 0, marginBottom: 0 }}
                      className="overflow-hidden"
                    >
                      <div className="p-4 rounded-xl bg-indigo-50/50 dark:bg-indigo-500/5 border border-indigo-100 dark:border-indigo-500/10 text-sm text-indigo-900 dark:text-indigo-200 leading-relaxed">
                        <div className="flex items-center gap-2 mb-2 font-medium text-indigo-700 dark:text-indigo-300">
                          <Sparkles className="w-4 h-4" />
                          AI Explanation
                        </div>
                        {explanations[index]}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                <ul className="space-y-3 mb-8">
                  {project.bullets.map((bullet, i) => (
                    <li key={i} className="text-base text-slate-600 dark:text-white/70 leading-relaxed flex items-start gap-3">
                      <span className="mt-2 w-1.5 h-1.5 rounded-full bg-indigo-500 shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-black/5 dark:border-white/10">
                  {project.stack.split(',').map((tech, i) => (
                    <span key={i} className="px-3 py-1.5 text-xs font-mono font-medium rounded-lg bg-slate-100 dark:bg-white/5 text-slate-700 dark:text-white/80 border border-slate-200 dark:border-white/10 hover:bg-indigo-50 dark:hover:bg-indigo-500/10 hover:text-indigo-600 dark:hover:text-indigo-400 hover:border-indigo-200 dark:hover:border-indigo-500/30 transition-all cursor-default">
                      {tech.trim()}
                    </span>
                  ))}
                </div>
              </motion.div>
            </motion.div>
          ))}
        </motion.div>
      </motion.div>

      <AnimatePresence>
        {activeArchitecture && (
          <SystemArchitecture 
            isOpen={!!activeArchitecture} 
            onClose={() => setActiveArchitecture(null)} 
            project={activeArchitecture} 
          />
        )}
      </AnimatePresence>
    </section>
  );
}
