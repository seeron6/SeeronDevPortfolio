import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants } from 'motion/react';
import gsap from 'gsap';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Project Images
const projects = [
  {
    title: "TUSGU",
    subtitle: "Web Speech API & Supabase",
    src: "https://images.unsplash.com/photo-1581279413370-08c4b00e5651?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjeWJlcnB1bmslMjBzZXJ2ZXIlMjByb29tJTIwYWJzdHJhY3R8ZW58MXx8fHwxNzcwMzI1MzcxfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#0066FF",
    desc: "Practice Web App with mental math engines."
  },
  {
    title: "Employment Run",
    subtitle: "FPGA & Verilog Hardware",
    src: "https://images.unsplash.com/photo-1597862624292-45748390b00e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGUEdBJTIwY2lyY3VpdCUyMGJvYXJkJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzA0MDUzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#FF3366",
    desc: "Hardware-based game with collision detection logic."
  },
  {
    title: "Medscope",
    subtitle: "OpenCV & Gemini API",
    src: "https://images.unsplash.com/photo-1766299892683-d50398e31823?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtZWRpY2FsJTIwdGVjaG5vbG9neSUyMGVtZXJnZW5jeSUyMGRldmljZXxlbnwxfHx8fDE3NzA0MDQzOTR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    color: "#00CC99",
    desc: "Emergency response generator using Computer Vision."
  }
];

// Fixed Variants with explicit type to allow cubic-bezier arrays
const scaleAnimation: Variants = {
  initial: { scale: 0, x: "-50%", y: "-50%" },
  enter: { 
    scale: 1, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.76, 0, 0.24, 1] } 
  },
  closed: { 
    scale: 0, 
    x: "-50%", 
    y: "-50%", 
    transition: { duration: 0.4, ease: [0.32, 0, 0.67, 0] } 
  }
};

export default function Work() {
  const [modal, setModal] = useState({ active: false, index: 0 });
  const cursor = useRef<HTMLDivElement>(null);
  const cursorLabel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!cursor.current || !cursorLabel.current) return;
    
    const moveContainerX = gsap.quickTo(cursor.current, "left", {duration: 0.8, ease: "power3"});
    const moveContainerY = gsap.quickTo(cursor.current, "top", {duration: 0.8, ease: "power3"});
    const moveLabelX = gsap.quickTo(cursorLabel.current, "left", {duration: 0.45, ease: "power3"});
    const moveLabelY = gsap.quickTo(cursorLabel.current, "top", {duration: 0.45, ease: "power3"});

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      moveContainerX(clientX);
      moveContainerY(clientY);
      moveLabelX(clientX);
      moveLabelY(clientY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div id="projects" className="relative z-10 bg-primary text-primary py-24 border-t border-theme transition-colors duration-500">
      <div className="max-w-7xl mx-auto px-8 md:px-12">
          <div className="flex justify-between items-end mb-24">
             <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
                Engineering <span className="text-accent">Archive</span>
             </h2>
             <span className="font-mono text-xs opacity-50 hidden md:block">SCROLL_TO_INSPECT</span>
          </div>

          <div className="projects flex flex-col w-full">
            {projects.map((project, index) => {
              return (
                <div 
                  key={index}
                  onMouseEnter={() => setModal({active: true, index})} 
                  onMouseLeave={() => setModal({active: false, index})} 
                  className="group w-full flex flex-col md:flex-row justify-between md:items-center py-12 border-t border-theme last:border-b hover:bg-secondary transition-colors cursor-none"
                >
                  <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-4">
                      <h2 className="text-3xl md:text-5xl font-medium m-0">{project.title}</h2>
                      <p className="font-mono text-sm text-accent">{project.subtitle}</p>
                  </div>
                  
                  <div className="mt-4 md:mt-0 max-w-md text-secondary font-light text-sm md:text-right transition-transform duration-300 group-hover:-translate-x-4">
                      {project.desc}
                  </div>
                </div>
              )
            })}
          </div>
      </div>

      {/* Portal Mask Effect - Circular Reveal */}
      <motion.div 
        ref={cursor}
        /* Fixed Tailwind Conflict: Replaced 'hidden md:flex' with logic-based display */
        className={`fixed top-0 left-0 w-[350px] h-[350px] rounded-full overflow-hidden pointer-events-none z-30 items-center justify-center -translate-x-1/2 -translate-y-1/2 mix-blend-normal border-2 border-accent ${modal.active ? 'md:flex' : 'hidden'}`}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      >
        <div style={{top: `${modal.index * -100}%`}} className="relative h-full w-full transition-[top] duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
          {projects.map((project, index) => {
            return (
            <div className="h-full w-full flex items-center justify-center bg-secondary" key={`modal_${index}`}>
              <div className="relative w-full h-full">
                  <div className="absolute inset-0 bg-accent/20 mix-blend-overlay z-10"></div>
                  <ImageWithFallback 
                    src={project.src}
                    width={350}
                    height={350}
                    className="h-full w-full object-cover scale-125" 
                    alt="image"
                  />
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] z-20"></div>
              </div>
            </div>
            )
          })}
        </div>
      </motion.div>

      <motion.div 
        ref={cursorLabel}
        /* Fixed Tailwind Conflict: Replaced 'hidden md:flex' with logic-based display */
        className={`fixed top-0 left-0 w-20 h-20 rounded-full bg-accent text-white font-mono text-xs items-center justify-center pointer-events-none z-40 -translate-x-1/2 -translate-y-1/2 shadow-[0_0_20px_rgba(255,140,0,0.5)] ${modal.active ? 'md:flex' : 'hidden'}`}
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      >
        INITIALIZE
      </motion.div>
    </div>
  );
}