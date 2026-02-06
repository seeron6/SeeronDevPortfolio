import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'motion/react';
import Magnetic from './ui/Magnetic';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const container = useRef(null);
  const { theme } = useTheme();

  return (
    <div 
      id="contact"
      className="relative h-[800px] md:h-[100vh]" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className="relative h-[calc(100vh+800px)] -top-[100vh]">
        <div className="h-[800px] sticky top-[calc(100vh-800px)] md:top-0">
          <div ref={container} className="bg-secondary text-primary h-full w-full flex flex-col justify-between p-8 md:p-24 relative overflow-hidden transition-colors duration-500">
             
             {/* Background Grid Mesh */}
             <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none"></div>

             <div className="flex flex-col gap-8 md:gap-0 md:flex-row justify-between items-start md:items-end z-10">
                <div className="flex flex-col">
                   <h2 className="text-[10vw] leading-[0.8] tracking-tighter uppercase font-medium">LET'S BUILD</h2>
                   <h2 className="text-[10vw] leading-[0.8] tracking-tighter uppercase font-medium text-accent opacity-50">THE FUTURE</h2>
                </div>
                
                <Magnetic>
                   <div className="w-32 h-32 md:w-48 md:h-48 bg-primary border border-accent rounded-full text-primary flex items-center justify-center absolute md:relative right-8 bottom-32 md:right-0 md:bottom-0 cursor-pointer overflow-hidden group shadow-[0_0_30px_rgba(255,140,0,0.2)]">
                      <div className="relative z-10 font-mono text-sm group-hover:text-white transition-colors">INITIATE</div>
                      <div className="absolute inset-0 bg-accent scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full ease-[cubic-bezier(0.76,0,0.24,1)]" />
                   </div>
                </Magnetic>
             </div>

             <div className="flex flex-col md:flex-row gap-8 justify-between items-start md:items-end w-full border-t border-theme pt-8 z-10 font-mono text-xs md:text-sm">
                <div className="flex flex-col gap-4">
                   <Magnetic><button className="border border-theme rounded-sm px-6 py-3 hover:bg-accent hover:text-white transition-colors uppercase tracking-wider bg-primary text-primary">seeron.sivashankar@mail.utoronto.ca</button></Magnetic>
                   <Magnetic><button className="border border-theme rounded-sm px-6 py-3 hover:bg-accent hover:text-white transition-colors uppercase tracking-wider bg-primary text-primary">+1 (647) 282-4910
                     </button></Magnetic>
                </div>
                <div className="flex gap-16">
                   <div className="flex flex-col gap-4">
                      <span className="opacity-50 uppercase mb-2">Socials</span>
                      <Magnetic><a href="#" className="hover:text-accent transition-colors">LINKEDIN</a></Magnetic>
                      <Magnetic><a href="#" className="hover:text-accent transition-colors">GITHUB</a></Magnetic>
                      <Magnetic><a href="#" className="hover:text-accent transition-colors">INSTAGRAM</a></Magnetic>
                   </div>
                   <div className="flex flex-col gap-4">
                      <span className="opacity-50 uppercase mb-2">System Status</span>
                      <p className="flex items-center gap-2"><span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> ONLINE</p>
                      <p>V.1.0.17</p>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </div>
    </div>
  );
}
