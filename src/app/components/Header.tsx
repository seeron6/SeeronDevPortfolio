import React, { useState, useEffect } from 'react';
import Magnetic from './ui/Magnetic';
import { AnimatePresence, motion } from 'motion/react';
import { useTheme } from '../context/ThemeContext';
import { Sun, Moon } from 'lucide-react';

export default function Header() {
  const [isActive, setIsActive] = useState(false);
  const [showBurger, setShowBurger] = useState(false);
  const { theme, toggleTheme } = useTheme();

  useEffect(() => {
    const handleScroll = () => {
      setShowBurger(window.scrollY > 100);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems = ['Experience', 'Projects', 'Skills', 'Contact'];

  return (
    <>
      <header className="fixed top-0 left-0 w-full p-8 md:p-12 flex justify-between items-center z-50 mix-blend-difference text-white">
        <div className="flex flex-col font-mono text-xs md:text-sm tracking-wider group cursor-pointer z-50">
          <span className="opacity-50 group-hover:opacity-100 transition-opacity">SEERON</span>
          <span className="font-bold text-accent group-hover:text-white transition-colors">SIVASHANKAR</span>
        </div>
        
        {/* Desktop Nav - Offset to avoid overlap with menu button if it appears */}
        <nav className={`hidden md:flex items-center gap-12 pr-24 ${showBurger ? 'opacity-0 pointer-events-none' : 'opacity-100'} transition-opacity duration-300`}>
          {navItems.map((item) => (
            <Magnetic key={item}>
              <a href={`#${item.toLowerCase()}`} className="text-white hover:text-accent transition-colors relative font-mono text-xs uppercase tracking-widest group">
                {`<${item}/>`}
              </a>
            </Magnetic>
          ))}
          
          <Magnetic>
             <button onClick={toggleTheme} className="p-2 hover:text-accent transition-colors">
                {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
             </button>
          </Magnetic>
        </nav>
      </header>

      {/* Floating Buttons Container */}
      <div className="fixed top-8 right-8 z-50 flex flex-col gap-4 items-center">
        {/* Menu Button */}
        <Magnetic>
          <button 
            onClick={() => setIsActive(!isActive)} 
            className={`w-16 h-16 rounded-full bg-secondary border border-theme text-primary flex items-center justify-center cursor-pointer transition-all duration-500 hover:border-accent ${showBurger || isActive ? 'scale-100' : 'scale-0 md:scale-0 scale-100'}`}
          >
            <div className={`relative w-full h-full flex items-center justify-center transition-all duration-500 ${isActive ? 'rotate-45' : ''}`}>
               <div className="flex flex-col gap-1.5 items-center">
                  <div className={`w-6 h-[1px] bg-current transition-all duration-300 ${isActive ? 'rotate-90 translate-y-[2px]' : ''}`} />
                  <div className={`w-6 h-[1px] bg-current transition-all duration-300 ${isActive ? '-rotate-0 -translate-y-[5px]' : ''}`} />
               </div>
            </div>
          </button>
        </Magnetic>

        {/* Theme Toggle (Mobile/Scrolled) */}
        {(showBurger || isActive) && (
            <Magnetic>
                <button 
                    onClick={toggleTheme}
                    className="w-12 h-12 rounded-full bg-secondary border border-theme text-primary flex items-center justify-center cursor-pointer hover:border-accent transition-all duration-300"
                >
                    {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                </button>
            </Magnetic>
        )}
      </div>

      <AnimatePresence mode="wait">
        {isActive && (
          <motion.div 
            initial={{ x: '100%' }}
            animate={{ x: '0%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 right-0 h-screen w-full md:w-[500px] bg-secondary border-l border-theme z-40 p-12 md:p-24 flex flex-col justify-center text-primary shadow-2xl"
          >
             <div className="flex flex-col gap-8">
                {['Home', ...navItems].map((item, i) => (
                   <Magnetic key={item}>
                      <a 
                        href={`#${item.toLowerCase() === 'home' ? '' : item.toLowerCase()}`}
                        onClick={() => setIsActive(false)}
                        className="text-4xl md:text-6xl font-light hover:text-accent transition-colors tracking-tighter"
                      >
                         {item}
                      </a>
                   </Magnetic>
                ))}
             </div>
             
             <div className="mt-24 pt-8 border-t border-theme font-mono text-xs opacity-50 flex flex-col gap-4">
                <p>CONNECT_VIA</p>
                <div className="flex gap-8">
                   <a href="#" className="hover:text-accent transition-colors">LINKEDIN</a>
                   <a href="#" className="hover:text-accent transition-colors">GITHUB</a>
                   <a href="#" className="hover:text-accent transition-colors">MAIL</a>
                </div>
             </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
