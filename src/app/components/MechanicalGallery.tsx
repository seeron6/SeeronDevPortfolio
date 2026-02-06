import React from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

// Data
const galleryItems = [
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1562758778-e5638b5b6607?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb2JvdGljcyUyMGNvbXBldGl0aW9uJTIwc3R1ZGVudHN8ZW58MXx8fHwxNzcwMzc1NTkzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "UCMAS Competition",
    desc: "Managing 4000+ results at national competitions."
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1597862624292-45748390b00e?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxGUEdBJTIwY2lyY3VpdCUyMGJvYXJkJTIwY2xvc2UlMjB1cHxlbnwxfHx8fDE3NzA0MDUzMjZ8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "FPGA Logic",
    desc: "Verilog hardware logic on DE1-SoC FPGA."
  },
  {
    type: "photo",
    src: "https://images.unsplash.com/photo-1766766464419-ea9d60543aee?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjcm93ZCUyMGF0JTIwdGVjaG5vbG9neSUyMGV2ZW50fGVufDF8fHx8MTc3MDQwNTMyNnww&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
    title: "Tech Lead",
    desc: "Leading technical infrastructure for large-scale events."
  }
];

export default function MechanicalGallery() {
  return (
    <section className="py-24 px-4 md:px-12 bg-primary text-primary border-t border-theme">
       <div className="max-w-7xl mx-auto">
          <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tighter">
             Mechanical <span className="text-accent">Gallery</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
             {galleryItems.map((item, i) => (
                <FlipCard key={i} item={item} index={i} />
             ))}
          </div>
       </div>
    </section>
  );
}

function FlipCard({ item, index }: { item: any, index: number }) {
   return (
      <div className="h-[400px] w-full perspective-1000 group cursor-pointer">
         <motion.div 
            className="relative w-full h-full duration-700 transition-all preserve-3d group-hover:rotate-y-180"
            style={{ transformStyle: 'preserve-3d' }}
         >
            {/* Front */}
            <div className="absolute inset-0 w-full h-full backface-hidden bg-secondary border border-theme rounded-xl overflow-hidden">
               <ImageWithFallback 
                  src={item.src} 
                  alt={item.title} 
                  className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" 
               />
               <div className="absolute bottom-0 left-0 p-4 w-full bg-gradient-to-t from-black/90 to-transparent">
                  <span className="font-mono text-xs text-accent uppercase tracking-widest">{item.title}</span>
               </div>
            </div>

            {/* Back */}
            <div 
               className="absolute inset-0 w-full h-full backface-hidden bg-secondary border border-accent rounded-xl flex flex-col justify-center items-center p-8 text-center rotate-y-180"
               style={{ transform: 'rotateY(180deg)' }}
            >
               <h3 className="text-2xl font-bold mb-4 text-accent">{item.title}</h3>
               <p className="font-mono text-sm text-secondary leading-relaxed">
                  {item.desc}
               </p>
               <div className="mt-8 w-12 h-12 rounded-full border border-accent flex items-center justify-center animate-spin-slow">
                  <span className="text-xs">⚙️</span>
               </div>
            </div>
         </motion.div>
      </div>
   );
}
