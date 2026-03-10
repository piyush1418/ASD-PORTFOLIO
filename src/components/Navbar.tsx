import { motion } from 'motion/react';
import React, { useState, useEffect } from 'react';
import { cn } from '../lib/utils';
import { Briefcase, Trophy, Code2, Wrench, GraduationCap, Sun, Moon, Mail } from 'lucide-react';

const navItems = [
  { name: 'Experience', href: '#experience', icon: Briefcase },
  { name: 'Impact', href: '#achievements', icon: Trophy },
  { name: 'Projects', href: '#projects', icon: Code2 },
  { name: 'Skills', href: '#skills', icon: Wrench },
  { name: 'Education', href: '#education', icon: GraduationCap },
  { name: 'Contact', href: '#contact', icon: Mail },
];

interface NavbarProps {
  theme: 'dark' | 'light';
  toggleTheme: () => void;
}

export function Navbar({ theme, toggleTheme }: NavbarProps) {
  const [activeSection, setActiveSection] = useState('');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);

      const sections = navItems.map(item => item.href.substring(1));
      let current = '';

      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2) {
            current = section;
          }
        }
      }

      setActiveSection(current);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, delay: 1 }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled ? "py-4 bg-white/80 dark:bg-[#0a0a0f]/80 backdrop-blur-md border-b border-black/5 dark:border-white/5" : "py-6"
      )}
    >
      <div className="max-w-6xl mx-auto px-6 flex items-center justify-between">
        <a href="#hero" onClick={(e) => handleClick(e, '#hero')} className="text-xl font-black tracking-tighter text-slate-900 dark:text-white">
          PR
        </a>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-1 bg-black/5 dark:bg-white/[0.03] border border-black/10 dark:border-white/10 rounded-full p-1 backdrop-blur-md">
          {navItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              onClick={(e) => handleClick(e, item.href)}
              className={cn(
                "px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 relative",
                activeSection === item.href.substring(1)
                  ? "text-white dark:text-black"
                  : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white hover:bg-black/5 dark:hover:bg-white/5"
              )}
            >
              {activeSection === item.href.substring(1) && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full -z-10"
                  transition={{ type: "spring", stiffness: 300, damping: 30 }}
                />
              )}
              {item.name}
            </a>
          ))}
        </div>

        {/* Theme Toggle */}
        <button
          onClick={toggleTheme}
          className="p-2 rounded-full bg-black/5 dark:bg-white/5 border border-black/10 dark:border-white/10 text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white transition-colors backdrop-blur-md"
          aria-label="Toggle theme"
        >
          {theme === 'dark' ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
        </button>

        {/* Mobile Nav (Bottom) */}
        <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm bg-white/90 dark:bg-[#151520]/90 backdrop-blur-xl border border-black/10 dark:border-white/10 rounded-full p-2 flex items-center justify-between z-50 shadow-2xl">
          {navItems.map((item) => {
            const Icon = item.icon;
            return (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleClick(e, item.href)}
                className={cn(
                  "p-3 rounded-full text-xs font-medium transition-all duration-300 relative flex flex-1 items-center justify-center",
                  activeSection === item.href.substring(1)
                    ? "text-white dark:text-black"
                    : "text-slate-600 dark:text-white/60 hover:text-slate-900 dark:hover:text-white"
                )}
              >
                {activeSection === item.href.substring(1) && (
                  <motion.div
                    layoutId="activeNavMobile"
                    className="absolute inset-0 bg-slate-900 dark:bg-white rounded-full -z-10"
                    transition={{ type: "spring", stiffness: 300, damping: 30 }}
                  />
                )}
                <span className="sr-only">{item.name}</span>
                <Icon className="w-5 h-5" />
              </a>
            );
          })}
        </div>
      </div>
    </motion.nav>
  );
}
