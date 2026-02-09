import React, { useRef, useEffect } from 'react';
import { useScroll, useTransform, motion, useSpring } from 'framer-motion';
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
    offset: ['start start', 'end start']
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

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
      
      {/* 1. Background Gradients/Effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/20 rounded-full blur-[120px]" />
      </div>
      
      {/* 2. Central Interactive Hero Image */}
      <div className="relative z-10 w-[300px] h-[300px] md:w-[400px] md:h-[400px] perspective-1000 mb-4">
        <div 
            ref={imageContainer} 
            className="w-full h-full relative preserve-3d"
            style={{ transformStyle: 'preserve-3d' }}
        >
            {/* Rotating SVG Text Border */}
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

            {/* Image Container - This contains ONLY one image now */}
            <div className="relative w-full h-full rounded-full overflow-hidden border border-theme group bg-transparent">
                {/* Hover Tint Overlay */}
                <div className="absolute inset-0 bg-accent mix-blend-color opacity-0 group-hover:opacity-20 transition-opacity duration-300 z-10"></div>
                
                {/* The Hero Image: object-contain shows the whole PNG, group-hover zooms it */}
                <ImageWithFallback 
                  src={heroImage}
                  alt="Seeron Sivashankar"
                  className="w-full h-full object-contain scale-100 group-hover:scale-110 transition-transform duration-700 ease-out"
                />
            </div>
        </div>
      </div>
      
      {/* 3. Infinite Marquee */}
      <div className="absolute bottom-[20%] md:bottom-[15%] w-full pointer-events-none mix-blend-difference z-20">
        <div className="flex whitespace-nowrap overflow-visible"> 
            <motion.div style={{ x: xFirst }} className="flex whitespace-nowrap pl-10 md:pl-20">
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter pr-20 text-white/90">
                Seeron Sivashankar - Software Engineer
              </h1>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter pr-20 text-white/90">
                Seeron Sivashankar - Software Engineer
              </h1>
            </motion.div>
        </div>

        <div className="flex whitespace-nowrap overflow-visible mt-6 md:mt-8">
            <motion.div style={{ x: xSecond }} className="flex whitespace-nowrap">
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter text-white/50 pr-20">
                  U of T — Computer Engineering
              </h1>
              <h1 className="text-[clamp(3.5rem,9vw,8rem)] leading-[0.8] font-medium tracking-tighter text-white/50 pr-20">
                  U of T — Computer Engineering
              </h1>
            </motion.div>
        </div>
      </div>

      {/* 4. Scroll Indicator */}
      <div className="absolute bottom-12 right-8 md:right-12 flex flex-col items-end gap-2 font-mono text-xs text-accent">
         <ArrowDownRight className="w-6 h-6 stroke-1 animate-bounce" />
         <span>SCROLL_TO_INITIALIZE</span>
      </div>
    </div>
  );
}