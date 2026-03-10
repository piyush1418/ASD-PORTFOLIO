import { motion, useScroll, useTransform } from 'motion/react';
import { Github, Code2, Globe2 } from 'lucide-react';
import { useRef } from 'react';
import { VisitorGlobe } from './VisitorGlobe';

export function GithubStats() {
  const githubUsername = 'piyush1418';
  const leetcodeUsername = 'Piyush1817';

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  return (
    <section id="github" ref={containerRef} className="py-24 px-6 relative z-10 perspective-[1000px]">
      <motion.div 
        style={{ y, opacity }}
        className="max-w-6xl mx-auto"
      >
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center md:text-left flex items-center gap-4"
        >
          <Code2 className="w-10 h-10 text-slate-900 dark:text-white" />
          <div>
            <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-slate-900 dark:text-white mb-2">
              Developer Stats
            </h2>
            <div className="h-1 w-20 bg-gradient-to-r from-slate-900 dark:from-white to-transparent rounded-full" />
          </div>
        </motion.div>

        <div className="space-y-16">
          {/* Tech Stack */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white/90 mb-6 flex items-center gap-2">
              💻 Tech Stack
            </h3>
            
            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-white/80 mb-4 flex items-center gap-2">
                  👨‍💻 Programming Languages
                </h4>
                <div className="flex flex-wrap gap-3">
                  <img src="https://img.shields.io/badge/C-00599C?style=for-the-badge&logo=c&logoColor=white" alt="C" />
                  <img src="https://img.shields.io/badge/C++-00599C?style=for-the-badge&logo=cpp&logoColor=white" alt="C++" />
                  <img src="https://img.shields.io/badge/Python-3776AB?style=for-the-badge&logo=python&logoColor=white" alt="Python" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-white/80 mb-4 flex items-center gap-2">
                  🌐 Web Development
                </h4>
                <div className="flex flex-wrap gap-3">
                  <img src="https://img.shields.io/badge/HTML5-E34F26?style=for-the-badge&logo=html5&logoColor=white" alt="HTML5" />
                  <img src="https://img.shields.io/badge/CSS3-1572B6?style=for-the-badge&logo=css3&logoColor=white" alt="CSS3" />
                  <img src="https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=yellow" alt="JavaScript" />
                  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React" />
                  <img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="Node.js" />
                  <img src="https://img.shields.io/badge/Express.js-404D59?style=for-the-badge" alt="Express.js" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-white/80 mb-4 flex items-center gap-2">
                  🗄️ Databases
                </h4>
                <div className="flex flex-wrap gap-3">
                  <img src="https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white" alt="MySQL" />
                  <img src="https://img.shields.io/badge/Postgres-316192?style=for-the-badge&logo=postgresql&logoColor=white" alt="PostgreSQL" />
                  <img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" />
                </div>
              </div>

              <div>
                <h4 className="text-lg font-medium text-slate-700 dark:text-white/80 mb-4 flex items-center gap-2">
                  📊 Data Science & ML
                </h4>
                <div className="flex flex-wrap gap-3">
                  <img src="https://img.shields.io/badge/Pandas-150458?style=for-the-badge&logo=pandas" alt="Pandas" />
                  <img src="https://img.shields.io/badge/NumPy-013243?style=for-the-badge&logo=numpy" alt="NumPy" />
                  <img src="https://img.shields.io/badge/PyTorch-E34A86?style=for-the-badge&logo=pytorch&logoColor=white" alt="PyTorch" />
                  <img src="https://img.shields.io/badge/Scikit--Learn-F7931E?style=for-the-badge&logo=scikit-learn" alt="Scikit-Learn" />
                </div>
              </div>
            </div>
          </div>

          {/* GitHub Stats */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white/90 mb-6 flex items-center gap-2">
              <Github className="w-6 h-6" /> GitHub Activity
            </h3>
            <div className="flex justify-center mb-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 shadow-xl max-w-2xl w-full"
              >
                <div className="bg-white dark:bg-[#1a1b27] rounded-xl p-4 h-full flex items-center justify-center overflow-hidden">
                  <img 
                    src={`https://github-readme-streak-stats.herokuapp.com/?user=${githubUsername}&theme=tokyonight&v=${Date.now()}`} 
                    alt="GitHub Streak" 
                    className="w-full max-w-md"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </motion.div>
            </div>
            
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.6 }}
              className="p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 shadow-xl"
            >
              <div className="bg-white dark:bg-[#1a1b27] rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://github-readme-activity-graph.vercel.app/graph?username=${githubUsername}&theme=tokyo-night&v=${Date.now()}`} 
                  alt="GitHub Activity Graph" 
                  className="w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* LeetCode Stats */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white/90 mb-6 flex items-center gap-2">
              <Code2 className="w-6 h-6" /> LeetCode Progress
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 shadow-xl max-w-3xl mx-auto"
            >
              <div className="bg-white dark:bg-[#282828] rounded-xl p-4 flex items-center justify-center overflow-hidden">
                <img 
                  src={`https://leetcard.jacoblin.cool/${leetcodeUsername}?theme=dark&font=Poppins&ext=heatmap&v=${Date.now()}`} 
                  alt="LeetCode Heatmap" 
                  className="w-full"
                  referrerPolicy="no-referrer"
                />
              </div>
            </motion.div>
          </div>

          {/* Global Reach */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-800 dark:text-white/90 mb-6 flex items-center gap-2">
              <Globe2 className="w-6 h-6" /> Global Reach
            </h3>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="p-1 rounded-2xl bg-gradient-to-br from-slate-200 to-slate-100 dark:from-white/10 dark:to-white/5 shadow-xl w-full"
            >
              <div className="bg-white dark:bg-[#0a0a0f] rounded-xl overflow-hidden h-[500px] relative">
                <div className="absolute top-4 left-4 z-10 bg-white/80 dark:bg-black/50 backdrop-blur-md px-4 py-2 rounded-full border border-black/10 dark:border-white/10">
                  <p className="text-sm font-medium text-slate-800 dark:text-white/80">
                    Live Visitor Map
                  </p>
                </div>
                <VisitorGlobe />
              </div>
            </motion.div>
          </div>

        </div>
      </motion.div>
    </section>
  );
}
