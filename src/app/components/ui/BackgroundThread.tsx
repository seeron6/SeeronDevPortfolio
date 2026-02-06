import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useTheme } from '../../context/ThemeContext';

gsap.registerPlugin(ScrollTrigger);

export default function BackgroundThread() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const { theme } = useTheme();

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let width = window.innerWidth;
    let height = window.innerHeight;

    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
    };
    
    window.addEventListener('resize', resize);
    resize();

    // Wave parameters
    const waves = [
      { amplitude: 50, frequency: 0.01, speed: 0.02, offset: 0, color: theme === 'dark' ? 'rgba(255, 140, 0, 0.1)' : 'rgba(212, 175, 55, 0.1)' },
      { amplitude: 30, frequency: 0.02, speed: 0.01, offset: 100, color: theme === 'dark' ? 'rgba(255, 255, 255, 0.03)' : 'rgba(0, 0, 0, 0.03)' },
      { amplitude: 70, frequency: 0.005, speed: 0.015, offset: 200, color: theme === 'dark' ? 'rgba(0, 102, 255, 0.05)' : 'rgba(100, 100, 100, 0.05)' }
    ];

    let time = 0;
    let scrollY = 0;

    // Connect scroll to wave intensity/phase
    const scrollTrigger = ScrollTrigger.create({
      trigger: "body",
      start: "top top",
      end: "bottom bottom",
      onUpdate: (self) => {
        scrollY = self.progress * 1000;
      }
    });

    const animate = () => {
      ctx.clearRect(0, 0, width, height);
      
      time += 0.005;

      waves.forEach(wave => {
        ctx.beginPath();
        ctx.moveTo(0, height / 2);

        for (let x = 0; x < width; x++) {
          const y = height / 2 + 
            Math.sin(x * wave.frequency + time + wave.offset) * wave.amplitude + 
            Math.sin(x * 0.002 + scrollY * 0.001) * 20; // Scroll influence
            
          ctx.lineTo(x, y);
        }

        ctx.lineTo(width, height);
        ctx.lineTo(0, height);
        ctx.fillStyle = wave.color;
        ctx.fill();
      });

      requestAnimationFrame(animate);
    };

    const animationId = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationId);
      scrollTrigger.kill();
    };
  }, [theme]);

  return (
    <canvas 
      ref={canvasRef} 
      className="fixed top-0 left-0 w-full h-full pointer-events-none z-[-1]"
    />
  );
}
