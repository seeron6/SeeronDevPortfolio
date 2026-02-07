import React, { useState, useEffect, useRef } from 'react';
import { motion, Variants, AnimatePresence } from 'motion/react';
import gsap from 'gsap';

// 1. IMPORT IMAGES DIRECTLY
// This ensures Vite processes them and gives them a valid URL
import ucmasImg from '../../assets/ucmassl_Tusgu.png';
import employmentImg from '../../assets/EmploymentRun.jpeg';
import medscopeImg from '../../assets/medscope.jpg';

const projects = [
  {
    title: "UCMAS Sri Lanka & TUSGU",
    subtitle: "Web Speech API & Supabase",
    src: ucmasImg,
    color: "#0066FF",
    desc: "Practice Web App with mental math engines.",
    link: "https://apps.apple.com/us/app/ucmas-sl-tusgu/id6757826021"
  },
  {
    title: "Employment Run",
    subtitle: "FPGA & Verilog Hardware",
    src: employmentImg,
    color: "#FF3366",
    desc: "Hardware-based game with collision detection logic.",
    link: "https://www.linkedin.com/posts/seeron-sivashankar_fpga-verilog-hardwareengineering-activity-7401361285122260992-pvg1?utm_source=share&utm_medium=member_desktop&rcm=ACoAADAU_qABIJMfIvMBqAj6xFJwhgomj5Ynj_c"
  },
  {
    title: "Medscope",
    subtitle: "OpenCV & Gemini API",
    src: medscopeImg,
    color: "#00CC99",
    desc: "Emergency response generator using Computer Vision.",
    link: "https://newhacks-2024.devpost.com/project-gallery?page=1"
  }
];

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
    
    // QuickTo for smooth performance
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
             <span className="font-mono text-xs opacity-50 hidden md:block">CLICK_TO_INITIALIZE</span>
          </div>

          <div className="projects flex flex-col w-full">
            {projects.map((project, index) => (
              <a 
                key={index}
                href={project.link}
                target="_blank"
                rel="noopener noreferrer"
                onMouseEnter={() => setModal({active: true, index})} 
                onMouseLeave={() => setModal({active: false, index})} 
                className="group w-full flex flex-col md:flex-row justify-between md:items-center py-12 border-t border-theme last:border-b hover:bg-secondary transition-colors cursor-none no-underline"
              >
                <div className="flex flex-col gap-2 transition-transform duration-300 group-hover:translate-x-4">
                    <h2 className="text-3xl md:text-5xl font-medium m-0 text-primary">{project.title}</h2>
                    <p className="font-mono text-sm text-accent">{project.subtitle}</p>
                </div>
                
                <div className="mt-4 md:mt-0 max-w-md text-secondary font-light text-sm md:text-right transition-transform duration-300 group-hover:-translate-x-4">
                    {project.desc}
                </div>
              </a>
            ))}
          </div>
      </div>

      {/* PORTAL MASK EFFECT - Image Preview */}
      <motion.div 
        ref={cursor}
        className="fixed top-0 left-0 w-[350px] h-[350px] rounded-full overflow-hidden pointer-events-none z-30 flex items-center justify-center mix-blend-normal border-2 border-accent bg-secondary shadow-2xl"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      >
        <div 
          style={{ transform: `translateY(${modal.index * -100}%)` }} 
          className="relative h-full w-full transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]"
        >
          {projects.map((project, index) => (
            <div className="h-full w-full flex items-center justify-center bg-secondary" key={`modal_${index}`}>
              <div className="relative w-full h-full">
                  {/* Overlay for aesthetic consistency */}
                  <div className="absolute inset-0 bg-accent/10 mix-blend-overlay z-10"></div>
                  
                  {/* DIRECT IMG TAG FOR RELIABILITY */}
                  <img 
                    src={project.src}
                    className="h-full w-full object-cover scale-110" 
                    alt={project.title}
                  />

                  {/* Scanline Grid Effect */}
                  <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI0IiBoZWlnaHQ9IjQiPgo8cmVjdCB3aWR0aD0iNCIgaGVpZ2h0PSI0IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMDUiLz4KPC9zdmc+')] z-20 opacity-30"></div>
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* INITIALIZE LABEL */}
      <motion.div 
        ref={cursorLabel}
        className="fixed top-0 left-0 w-24 h-24 rounded-full bg-accent text-white font-mono text-[10px] tracking-tighter flex items-center justify-center pointer-events-none z-40 shadow-[0_0_30px_rgba(255,140,0,0.4)]"
        variants={scaleAnimation}
        initial="initial"
        animate={modal.active ? "enter" : "closed"}
      >
        INITIALIZE
      </motion.div>
    </div>
  );
}