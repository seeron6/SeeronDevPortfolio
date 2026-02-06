import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion'; // Ensure this matches your package: 'motion/react' or 'framer-motion'
import gsap from 'gsap';
import { ArrowDownRight } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { useTheme } from '../context/ThemeContext';

// IMPORTANT: This uses the asset provided by the user.
import heroImage from "../../assets/heroImage.png";

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const imageContainer = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();
  
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ['start start', 'end start'] // Changed to 'start start' for immediate reaction
  });

  // Adding physics-based smoothing to the scroll progress
  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // SPEED FIX: Increased range from 200 to 1200 for a faster, more dramatic scroll
  const xFirst = useTransform(smoothProgress, [0, 1], [0, -1200]);
  const xSecond = useTransform(smoothProgress, [0, 1], [0, 1200]);

  // Mouse Parallax Logic
  useEffect(() => {
    if (!imageContainer.current) return;
    
    const xTo = gsap.quickTo(imageContainer.current, "rotationY", { duration: 0.5, ease: "power3" });
    const yTo = gsap.quickTo(imageContainer.current, "rotationX", { duration: 0.5, ease: "power3" });

    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const { innerWidth, innerHeight } = window;

      const x = (clientX / innerWidth - 0.5) * 20; 
      const y = (clientY / innerHeight - 0.5) * -20; 

      xTo(x);
      yTo(y);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="relative h-screen overflow-hidden bg-primary text-primary flex flex-col justify-start items-center pt-35 pb-12 transition-colors duration-500" ref={container}>
      
      {/* Background Gradients ... */}
      
      {/* 2. Central Interactive Hero Image - Reduced mb-12 to mb-4 */}
      <div className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] perspective-1000 mb-4">
        <div 
            ref={imageContainer} 
            className="w-full h-full relative preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
        >
            <div className="absolute inset-[-20%] animate-[spin_10s_linear_infinite] pointer-events-none opacity-40">
                 <svg viewBox="0 0 100 100" className="w-full h-full fill-current text-primary">
                    <path id="circlePath" d="M 50, 50 m -37, 0 a 37,37 0 1,1 74,0 a 37,37 0 1,1 -74,0" fill="transparent" />
                    <text className="text-[6px] uppercase tracking-widest font-mono">
                        <textPath href="#circlePath" startOffset="0%">
                            • Software Consultant • Computer Engineering • Designer •
                        </textPath>
                    </text>
                 </svg>
            </div>

            <div className="relative w-full h-full rounded-full overflow-hidden border border-theme group">
                <div className="absolute inset-0 bg-accent mix-blend-color opacity-0 group-hover:opacity-20 transition-opacity duration-300"></div>
                <ImageWithFallback 
                  src={heroImage}
                  alt="Seeron Sivashankar"
                  className="w-full h-full object-cover scale-110 group-hover:scale-100 transition-transform duration-700"
                />
            </div>
        </div>
      </div>
      
      {/* Infinite Marquee - Fluid Typography */}
      <div className="absolute bottom-[20%] md:bottom-[15%] w-full pointer-events-none mix-blend-difference z-20">
        {/* Row 1 */}
        <div className="flex whitespace-nowrap overflow-visible"> 
            <motion.div 
              style={{ x: xFirst }} 
              className="flex whitespace-nowrap pl-10 md:pl-20" 
            >
              {/* SIZE FIX: Changed clamp from 12rem to 8rem so it's visible before scrolling */}
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter pr-20 text-white/90">
                Seeron Sivashankar - Software Engineer
              </h1>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter pr-20 text-white/90">
                Seeron Sivashankar - Software Engineer
              </h1>
            </motion.div>
        </div>

        {/* Row 2 */}
        <div className="flex whitespace-nowrap overflow-visible mt-6 md:mt-8">
            <motion.div 
              style={{ x: xSecond }} 
              className="flex whitespace-nowrap"
            >
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter text-white/50 pr-20">
                  U of T — Computer Engineering
              </h1>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter text-white/50 pr-20">
                  U of T — Computer Engineering
              </h1>
            </motion.div>
        </div>
      </div>

      <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-end gap-2 font-mono text-xs text-accent">
         <ArrowDownRight className="w-6 h-6 stroke-1 animate-bounce" />
         <span>SCROLL_TO_INITIALIZE</span>
      </div>
    </div>
  );
}