/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useEffect } from 'react';
import { Splash } from './components/Splash';
import { AnimatedBackground } from './components/AnimatedBackground';
import { Hero } from './components/Hero';
import { Experience } from './components/Experience';
import { Achievements } from './components/Achievements';
import { Projects } from './components/Projects';
import { Skills } from './components/Skills';
import { Education } from './components/Education';
import { Contact } from './components/Contact';
import { Navbar } from './components/Navbar';
import { GithubStats } from './components/GithubStats';
import { ChatAssistant } from './components/ChatAssistant';
import { EasterEgg } from './components/EasterEgg';

export default function App() {
  const [showSplash, setShowSplash] = useState(true);
  const [theme, setTheme] = useState<'dark' | 'light'>('dark');

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#0a0a0f] dark:text-white selection:bg-black/10 dark:selection:bg-white/20 font-sans antialiased overflow-x-hidden transition-colors duration-500">
      <EasterEgg />
      {showSplash ? (
        <Splash onComplete={() => setShowSplash(false)} />
      ) : (
        <>
          <AnimatedBackground theme={theme} />
          <Navbar theme={theme} toggleTheme={toggleTheme} />
          <main className="relative z-10">
            <Hero />
            <Achievements />
            <Experience />
            <Projects />
            <GithubStats />
            <Skills />
            <Education />
            <Contact />
          </main>
          <ChatAssistant />
        </>
      )}
    </div>
  );
}
