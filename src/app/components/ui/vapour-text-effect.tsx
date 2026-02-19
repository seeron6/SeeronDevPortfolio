import { useEffect, useRef } from 'react';
interface VaporizeTextCycleProps {
  texts: string[];
  font?: {
    fontSize?: string;
    fontWeight?: number | string;
    fontFamily?: string;
  };
  color?: string;
  spread?: number;
  density?: number;
  animation?: {
    vaporizeDuration?: number;
    fadeInDuration?: number;
    waitDuration?: number;
  };
}

class Particle {
  x: number;
  y: number;
  originX: number;
  originY: number;
  color: string;
  size: number;
  vx: number;
  vy: number;
  force: number;
  angle: number;
  distance: number;
  friction: number;
  ease: number;

  constructor(x: number, y: number, color: string) {
    this.x = Math.random() * x;
    this.y = Math.random() * y;
    this.originX = x;
    this.originY = y;
    this.color = color;
    this.size = 1.2;
    this.vx = 0;
    this.vy = 0;
    this.force = 0;
    this.angle = 0;
    this.distance = 0;
    this.friction = 0.95;
    this.ease = 0.1;
  }

  update(isVaporizing: boolean, spread: number) {
    if (isVaporizing) {
      // Create the "smoke rising" effect
      this.vx += (Math.random() - 0.5) * spread;
      this.vy -= Math.random() * (spread * 0.5);
      this.x += this.vx;
      this.y += this.vy;
    } else {
      // Pull particles back to original position
      this.vx = (this.originX - this.x) * this.ease;
      this.vy = (this.originY - this.y) * this.ease;
      this.x += this.vx;
      this.y += this.vy;
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.fillStyle = this.color;
    ctx.fillRect(this.x, this.y, this.size, this.size);
  }
}

export default function VaporizeTextCycle({
  texts,
  font = { fontSize: "16px", fontWeight: 400, fontFamily: "Inter, sans-serif" },
  color = "rgba(255, 255, 255, 0.8)",
  spread = 2,
  density = 6,
  animation = { vaporizeDuration: 2, fadeInDuration: 1, waitDuration: 5 }
}: VaporizeTextCycleProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const particles = useRef<Particle[]>([]);
  const textIndex = useRef(0);
  const phase = useRef<'assembling' | 'waiting' | 'vaporizing'>('assembling');
  const phaseStartTime = useRef(Date.now());

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d', { willReadFrequently: true });
    if (!ctx) return;

    const initParticles = (text: string) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.fillStyle = "white";
      ctx.font = `${font.fontWeight} ${font.fontSize} ${font.fontFamily}`;
      ctx.textAlign = "left";
      ctx.textBaseline = "middle";

      // Wrap text logic to prevent canvas overflow
      const maxWidth = canvas.width - 20;
      const words = text.split(' ');
      let line = '';
      let yOffset = canvas.height / 2;
      
      for (let n = 0; n < words.length; n++) {
        let testLine = line + words[n] + ' ';
        if (ctx.measureText(testLine).width > maxWidth && n > 0) {
          ctx.fillText(line, 0, yOffset);
          line = words[n] + ' ';
          yOffset += 20;
        } else {
          line = testLine;
        }
      }
      ctx.fillText(line, 0, yOffset);

      const pixels = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
      particles.current = [];

      // Sample pixels based on density
      for (let y = 0; y < canvas.height; y += density) {
        for (let x = 0; x < canvas.width; x += density) {
          const index = (y * canvas.width + x) * 4;
          if (pixels[index + 3] > 128) {
            particles.current.push(new Particle(x, y, color));
          }
        }
      }
    };

    const animate = () => {
      const now = Date.now();
      const elapsed = (now - phaseStartTime.current) / 1000;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const isVaporizing = phase.current === 'vaporizing';

      particles.current.forEach(p => {
        p.update(isVaporizing, spread);
        p.draw(ctx);
      });

      // Phase Management
      if (phase.current === 'assembling' && elapsed > animation.fadeInDuration!) {
        phase.current = 'waiting';
        phaseStartTime.current = now;
      } else if (phase.current === 'waiting' && elapsed > animation.waitDuration!) {
        phase.current = 'vaporizing';
        phaseStartTime.current = now;
      } else if (phase.current === 'vaporizing' && elapsed > animation.vaporizeDuration!) {
        textIndex.current = (textIndex.current + 1) % texts.length;
        initParticles(texts[textIndex.current]);
        phase.current = 'assembling';
        phaseStartTime.current = now;
      }

      requestAnimationFrame(animate);
    };

    // Set canvas dimensions
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
      initParticles(texts[textIndex.current]);
    };

    window.addEventListener('resize', resize);
    resize();
    animate();

    return () => window.removeEventListener('resize', resize);
  }, [texts, font, color, spread, density, animation]);

  return (
    <canvas 
      ref={canvasRef} 
      className="w-full h-full block"
      style={{ filter: 'blur(0.4px)' }} // Adds a slight gas/vapour feel
    />
  );
}