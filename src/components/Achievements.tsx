import { motion, useScroll, useTransform } from 'motion/react';
import { TrendingUp, Zap, Award, Sparkles } from 'lucide-react';
import resumeData from '../data/resume.json';
import { useRef } from 'react';

const icons = [TrendingUp, Zap, Award];
const metrics = ["100K+", "40%", "30+"];
const metricLabels = ["Rows Processed", "Time Saved", "Digital Badges"];
const gradients = [
  "from-blue-500 to-cyan-400",
  "from-emerald-500 to-teal-400",
  "from-purple-500 to-pink-400"
];

export function Achievements() {
  const { achievements } = resumeData;
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="achievements" ref={containerRef} className="py-24 px-6 relative z-10 perspective-[1000px]">
      <motion.div style={{ y, opacity }} className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 dark:bg-indigo-500/10 text-indigo-600 dark:text-indigo-400 text-sm font-semibold mb-6 border border-indigo-100 dark:border-indigo-500/20 shadow-sm">
            <Sparkles className="w-4 h-4" />
            Measurable Impact
          </div>
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-4">
            Key Achievements
          </h2>
          <p className="text-slate-600 dark:text-white/60 max-w-2xl mx-auto text-lg">
            Delivering concrete results through data-driven solutions and continuous learning.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {achievements.map((item, index) => {
            const Icon = icons[index % icons.length];
            const gradient = gradients[index % gradients.length];
            const metric = metrics[index % metrics.length];
            const label = metricLabels[index % metricLabels.length];

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                whileHover={{ y: -8 }}
                className="group relative h-full"
              >
                {/* Glow effect behind card */}
                <div className={`absolute inset-0 bg-gradient-to-br ${gradient} opacity-0 group-hover:opacity-15 blur-2xl transition-opacity duration-500 rounded-3xl`} />
                
                <div className="relative h-full p-8 rounded-3xl bg-white dark:bg-[#11111a] border border-slate-200 dark:border-white/10 overflow-hidden shadow-lg dark:shadow-none hover:shadow-xl dark:hover:shadow-[0_10px_40px_rgba(0,0,0,0.5)] transition-all duration-500 flex flex-col">
                  
                  {/* Top Accent Line */}
                  <div className={`absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r ${gradient} opacity-70 group-hover:opacity-100 transition-opacity`} />

                  <div className="flex justify-between items-start mb-8">
                    <div className={`w-14 h-14 rounded-2xl flex items-center justify-center bg-gradient-to-br ${gradient} text-white shadow-md transform group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500`}>
                      <Icon className="w-7 h-7" />
                    </div>
                    <div className="text-right">
                      <div className={`text-4xl font-black bg-clip-text text-transparent bg-gradient-to-br ${gradient} drop-shadow-sm`}>
                        {metric}
                      </div>
                      <div className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mt-1">
                        {label}
                      </div>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-3 tracking-tight group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                    {item.title}
                  </h3>
                  
                  <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm flex-grow">
                    {item.context}
                  </p>
                  
                  {/* Decorative background pattern */}
                  <div className="absolute -bottom-24 -right-24 w-48 h-48 bg-gradient-to-br from-slate-100 to-transparent dark:from-white/5 dark:to-transparent rounded-full blur-2xl group-hover:scale-150 transition-transform duration-700 ease-out" />
                </div>
              </motion.div>
            );
          })}
        </div>
      </motion.div>
    </section>
  );
}
