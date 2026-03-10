import { motion, useScroll, useTransform } from 'motion/react';
import { useState, useRef } from 'react';
import { ChevronDown, ChevronUp, MapPin, Calendar, Briefcase } from 'lucide-react';
import resumeData from '../data/resume.json';

export function Experience() {
  const { experience } = resumeData;
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const toggleExpand = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <section id="experience" className="py-24 px-6 relative z-10" ref={containerRef}>
      <div className="max-w-4xl mx-auto perspective-[1200px]">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left"
        >
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Experience
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-slate-900 dark:from-white to-transparent rounded-full" />
        </motion.div>

        <div className="space-y-12 relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-indigo-500/20 dark:before:via-indigo-500/50 before:to-transparent">
          {experience.map((job, index) => {
            // Calculate individual card rotation based on scroll
            const cardYProgress = useTransform(
              scrollYProgress,
              [Math.max(0, (index - 1) / experience.length), Math.min(1, (index + 2) / experience.length)],
              [1, -1]
            );
            
            const rotateX = useTransform(cardYProgress, [-1, 0, 1], [15, 0, -15]);
            const scale = useTransform(cardYProgress, [-1, 0, 1], [0.8, 1, 0.8]);
            const opacity = useTransform(cardYProgress, [-1, 0, 1], [0.3, 1, 0.3]);

            return (
              <motion.div
                key={index}
                style={{ rotateX, scale, opacity, transformStyle: "preserve-3d" }}
                className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-full border border-indigo-500/30 dark:border-indigo-500/50 bg-white dark:bg-[#0a0a0f] text-indigo-500 dark:text-indigo-400 group-hover:text-white group-hover:bg-indigo-500 transition-all duration-500 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow-[0_0_15px_rgba(99,102,241,0.2)] group-hover:shadow-[0_0_25px_rgba(99,102,241,0.5)] group-hover:scale-125 z-10" style={{ transform: "translateZ(50px)" }}>
                  <Briefcase className="w-4 h-4" />
                </div>

                <motion.div 
                  whileHover={{ scale: 1.05, translateZ: 30 }}
                  className="w-[calc(100%-4rem)] md:w-[calc(50%-3rem)] p-6 rounded-2xl bg-white/80 dark:bg-white/[0.03] border border-black/5 dark:border-white/10 backdrop-blur-xl hover:bg-white dark:hover:bg-white/[0.05] transition-all duration-500 cursor-pointer shadow-xl dark:shadow-[0_10px_30px_rgba(0,0,0,0.5)] hover:shadow-2xl dark:hover:shadow-[0_20px_40px_rgba(99,102,241,0.15)]" 
                  onClick={() => toggleExpand(index)}
                  style={{ transformStyle: "preserve-3d" }}
                >
                  <div className="flex flex-col gap-2" style={{ transform: "translateZ(20px)" }}>
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-xl font-bold text-slate-900 dark:text-white/90 drop-shadow-sm">{job.role}</h3>
                        <p className="text-indigo-600 dark:text-indigo-400 font-semibold">{job.company}</p>
                      </div>
                      <button className="text-slate-400 dark:text-white/30 hover:text-indigo-500 dark:hover:text-indigo-400 transition-colors p-2 bg-black/5 dark:bg-white/5 rounded-full hover:bg-black/10 dark:hover:bg-white/10">
                        {expandedIndex === index ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
                      </button>
                    </div>
                    
                    <div className="flex flex-wrap gap-3 text-xs font-mono text-slate-500 dark:text-white/40 mt-2">
                      <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                        <Calendar className="w-3 h-3" />
                        {job.dates}
                      </div>
                      {job.location && (
                        <div className="flex items-center gap-1 bg-black/5 dark:bg-white/5 px-2 py-1 rounded-md">
                          <MapPin className="w-3 h-3" />
                          {job.location}
                        </div>
                      )}
                    </div>
                  </div>

                  <motion.div
                    initial={false}
                    animate={{ height: expandedIndex === index ? 'auto' : 0, opacity: expandedIndex === index ? 1 : 0 }}
                    transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                    className="overflow-hidden"
                  >
                    <div className="pt-6 mt-4 border-t border-black/5 dark:border-white/10" style={{ transform: "translateZ(10px)" }}>
                      <ul className="space-y-3">
                        {job.bullets.map((bullet, i) => (
                          <li key={i} className="text-sm text-slate-600 dark:text-white/70 leading-relaxed flex items-start gap-3">
                            <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-indigo-500/50 shrink-0 shadow-[0_0_8px_rgba(99,102,241,0.5)]" />
                            {bullet}
                          </li>
                        ))}
                      </ul>
                      {job.tools && (
                        <div className="mt-6 flex flex-wrap gap-2">
                          {job.tools.split(',').map((tool, i) => (
                            <span key={i} className="px-3 py-1 text-xs font-mono rounded-full bg-indigo-500/10 dark:bg-indigo-500/20 border border-indigo-500/20 dark:border-indigo-500/30 text-indigo-700 dark:text-indigo-300 backdrop-blur-sm hover:bg-indigo-500/20 dark:hover:bg-indigo-500/40 transition-colors">
                              {tool.trim()}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
