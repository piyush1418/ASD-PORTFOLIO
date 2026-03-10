import { motion, useScroll, useTransform } from 'motion/react';
import resumeData from '../data/resume.json';
import { TiltCard } from './TiltCard';
import { SkillsSphere } from './SkillsSphere';
import { useRef } from 'react';

const slugs = [
  'typescript',
  'javascript',
  'react',
  'html5',
  'css3',
  'nodedotjs',
  'express',
  'nextdotjs',
  'prisma',
  'amazonaws',
  'postgresql',
  'firebase',
  'nginx',
  'vercel',
  'docker',
  'git',
  'github',
  'gitlab',
  'visualstudiocode',
  'figma',
  'framer',
  'tailwindcss',
  'python',
  'cplusplus',
  'java',
  'linux',
];

export function Skills() {
  const { skills } = resumeData;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="skills" ref={containerRef} className="py-24 px-6 relative z-10 bg-gradient-to-b from-transparent via-black/[0.02] dark:via-white/[0.02] to-transparent perspective-[1000px]">
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
            Technical Arsenal
          </h2>
          <div className="h-1 w-20 bg-gradient-to-r from-slate-900 dark:from-white to-transparent rounded-full" />
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1"
          >
            <SkillsSphere slugs={slugs} />
          </motion.div>

          <div className="order-1 lg:order-2 grid grid-cols-1 sm:grid-cols-2 gap-6">
            {skills.map((skillGroup, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <TiltCard className="h-full" glare={true}>
                  <div className="p-6 rounded-3xl bg-white dark:bg-white/[0.02] border border-black/5 dark:border-white/5 backdrop-blur-md h-full shadow-lg dark:shadow-[0_10px_30px_rgba(0,0,0,0.2)] flex flex-col">
                    <h3 className="text-lg font-bold text-slate-900 dark:text-white/90 mb-4 tracking-tight drop-shadow-sm dark:drop-shadow-md" style={{ transform: "translateZ(20px)" }}>
                      {skillGroup.group}
                    </h3>
                    
                    <div className="flex flex-wrap gap-2" style={{ transform: "translateZ(30px)" }}>
                      {skillGroup.items.map((skill, i) => (
                        <motion.span
                          key={i}
                          whileHover={{ scale: 1.1, backgroundColor: "rgba(15,23,42,0.05)", y: -2 }}
                          className="px-3 py-1.5 text-xs font-medium rounded-xl bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-700 dark:text-white/80 transition-all cursor-default shadow-sm dark:shadow-[0_4px_10px_rgba(0,0,0,0.2)] hover:shadow-md dark:hover:shadow-[0_8px_20px_rgba(255,255,255,0.1)] backdrop-blur-sm dark:hover:bg-white/10"
                        >
                          {skill}
                        </motion.span>
                      ))}
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
