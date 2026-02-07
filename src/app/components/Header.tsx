import React, { useState, useEffect } from 'react';
import Magnetic from './ui/Magnetic';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme, ThemeSwitch } from '../context/ThemeContext';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const { theme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      // Threshold of 100px before showing the floating burger
      setShowBurger(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <>
      {/* 1. DESKTOP HEADER TOGGLE 
          Hides when scrolling OR when the sidebar is active to keep UI clean */}
      <div className={`fixed top-10 right-48 z-[100] transition-all duration-300 hidden md:block 
        ${(showBurger || isActive) ? 'opacity-0 pointer-events-none scale-90' : 'opacity-100 scale-100'}`}>
        <Magnetic>
          <ThemeSwitch />
        </Magnetic>
      </div>

      {/* 2. THE MAIN HEADER */}
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50">
        
        {/* LOGO AREA - Explicit colors, no blend modes */}
        <div className="flex flex-col font-mono text-xs md:text-sm tracking-wider uppercase">
          <span className="text-secondary opacity-80">Seeron</span>
          <span className="font-bold text-accent">Sivashankar</span>
        </div>
        
        {/* NAV AREA - Hidden when scrolled/burger active */}
        <nav className={`hidden md:flex items-center gap-12 pr-64 transition-opacity duration-300 ${showBurger ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}>
          {navItems.map((item) => (
            <Magnetic key={item}>
              <a 
                href={`#${item.toLowerCase()}`} 
                className={`font-mono text-xs tracking-widest transition-all duration-300 
                  ${theme === 'light' ? 'text-black' : 'text-white'} 
                  hover:!text-accent hover:scale-110`}
              >
                {`<${item}/>`}
              </a>
            </Magnetic>
          ))}
        </nav>
      </header>

      {/* 3. FLOATING BURGER & DYNAMIC SWITCH */}
      <div className="fixed top-8 right-8 z-[70] flex flex-col gap-4 items-center">
        <Magnetic>
          <button 
            onClick={() => setIsActive(!isActive)} 
            className={`w-16 h-16 rounded-full bg-secondary border border-theme text-primary flex items-center justify-center transition-all duration-500 shadow-xl 
              ${showBurger || isActive ? 'scale-100' : 'scale-0'}`}
          >
            <div className={`relative transition-all duration-500 ${isActive ? 'rotate-45' : ''}`}>
               <div className="flex flex-col gap-1.5">
                  <div className="w-6 h-[1px] bg-current" />
                  <div className="w-6 h-[1px] bg-current" />
               </div>
            </div>
          </button>
        </Magnetic>

        <AnimatePresence>
          {/* Show the switch below burger ONLY if we have scrolled down AND sidebar is closed */}
          {(showBurger && !isActive) && (
            <motion.div 
              initial={{ opacity: 0, scale: 0, y: -20 }}
              animate={{ opacity: 1, scale: 0.75, y: 0 }}
              exit={{ opacity: 0, scale: 0, y: -20 }}
              className="origin-center"
            >
              <ThemeSwitch />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* 4. SIDE NAVIGATION MENU */}
      <AnimatePresence mode="wait">
        {isActive && (
          <>
            {/* Backdrop Overlay */}
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsActive(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-30"
            />

            <motion.div 
              initial={{ x: '100%' }} 
              animate={{ x: '0%' }} 
              exit={{ x: '100%' }} 
              transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }} 
              className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-secondary border-l border-theme z-40 p-12 flex flex-col justify-between text-primary shadow-[-20px_0_50px_rgba(0,0,0,0.1)]"
            >


               {/* Navigation Links */}
               <div className="flex flex-col gap-6 md:gap-8">
                  <p className="text-[10px] font-mono uppercase tracking-[0.4em] text-secondary opacity-50 mb-4 border-b border-theme pb-2">Navigation</p>
                  {['Home', ...navItems].map((item, i) => (
                    <motion.div
                      key={item}
                      initial={{ x: 80, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.1 + (i * 0.1) }}
                    >
                      <Magnetic>
                        <a 
                          href={`#${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`} 
                          onClick={() => setIsActive(false)} 
                          className="text-5xl md:text-7xl font-light hover:text-accent transition-colors duration-300 block"
                        >
                          {item}
                        </a>
                      </Magnetic>
                    </motion.div>
                  ))}
               </div>

               {/* Sidebar Footer */}
               <div className="flex flex-col gap-4">
                  <div className="w-full h-px bg-theme opacity-20" />
                  <div className="flex justify-between font-mono text-[10px] uppercase tracking-widest opacity-50">
                    <span>© 2026</span>
                    <span>Seeron Sivashankar</span>
                  </div>
               </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}