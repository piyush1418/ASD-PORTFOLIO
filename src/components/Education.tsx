import { motion, useScroll, useTransform } from 'motion/react';
import { GraduationCap, Award, BookOpen, Trophy } from 'lucide-react';
import resumeData from '../data/resume.json';
import { useRef } from 'react';

export function Education() {
  const { education, certifications, awards } = resumeData;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="education" ref={containerRef} className="py-24 px-6 relative z-10 perspective-[1000px]">
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
            Education & Certifications
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-slate-900 dark:from-white to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Education Column */}
          <div className="space-y-8">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white/90 mb-8 flex items-center gap-3">
              <GraduationCap className="w-6 h-6 text-slate-500 dark:text-white/50" />
              Academic Background
            </h3>
            
            <div className="relative before:absolute before:inset-0 before:ml-1 before:-translate-x-px before:h-full before:w-0.5 before:bg-gradient-to-b before:from-black/20 dark:before:from-white/20 before:to-transparent space-y-8">
              {education.map((edu, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="relative pl-8"
                >
                  <div className="absolute left-[-3px] top-2 w-2.5 h-2.5 rounded-full bg-slate-400 dark:bg-white/50 shadow-sm dark:shadow-[0_0_10px_rgba(255,255,255,0.5)] z-10" />
                  
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white/90 mb-1">{edu.degree}</h4>
                  <p className="text-slate-600 dark:text-white/60 font-medium mb-2">{edu.institution}</p>
                  
                  <div className="flex flex-wrap items-center gap-4 text-xs font-mono text-slate-500 dark:text-white/40">
                    {edu.dates && <span>{edu.dates}</span>}
                    {edu.score && <span className="px-2 py-1 rounded bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10">{edu.score}</span>}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Certifications & Awards Column */}
          <div className="space-y-12">
            <div>
              <h3 className="text-2xl font-bold text-slate-900 dark:text-white/90 mb-8 flex items-center gap-3">
                <Award className="w-6 h-6 text-slate-500 dark:text-white/50" />
                Certifications
              </h3>
              
              <div className="space-y-4">
                {certifications.map((cert, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors shadow-sm dark:shadow-none"
                  >
                    <BookOpen className="w-5 h-5 text-slate-400 dark:text-white/40 shrink-0 mt-0.5" />
                    <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">{cert}</p>
                  </motion.div>
                ))}
              </div>
            </div>

            {awards && awards.length > 0 && (
              <div>
                <h3 className="text-2xl font-bold text-slate-900 dark:text-white/90 mb-8 flex items-center gap-3">
                  <Trophy className="w-6 h-6 text-slate-500 dark:text-white/50" />
                  Awards
                </h3>
                
                <div className="space-y-4">
                  {awards.map((award, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: 20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-50px" }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="flex items-start gap-4 p-4 rounded-2xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 hover:bg-slate-50 dark:hover:bg-white/[0.04] transition-colors shadow-sm dark:shadow-none"
                    >
                      <Trophy className="w-5 h-5 text-slate-400 dark:text-white/40 shrink-0 mt-0.5" />
                      <p className="text-sm text-slate-600 dark:text-white/70 leading-relaxed">{award}</p>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
