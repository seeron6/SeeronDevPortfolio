import React, { useRef, useState, useEffect } from 'react'; // Added useState and useEffect
import { motion, AnimatePresence } from 'motion/react';     // Added AnimatePresence
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// Asset Imports - Using relative paths to ensure Vite finds them
import img1 from '../../assets/UniDay1.png'; 
import img2 from '../../assets/nephew_neice.png';
import img3 from '../../assets/feelinfreshforprom.jpg';
import img4 from '../../assets/monkeyseemonkeydo.jpg';
import img5 from '../../assets/FROSH!!.png';
import img6 from '../../assets/mariobaker.png';
import img7 from '../../assets/theywantedtoknowificanmodel.jpg';
import img8 from '../../assets/gym.png';
import img9 from '../../assets/careernight.png';
import img10 from '../../assets/lilbro.png';
import img11 from '../../assets/lilsisgrad.jpg';
import img12 from '../../assets/weddingszn.jpg';
import img13 from '../../assets/Dontmesswiththesivashankars.jpg';
import img14 from '../../assets/lookincute.png';
import img15 from '../../assets/what_we_lookin_for 2.png';
import img16 from '../../assets/cuzzo.png';
import img17 from '../../assets/Mr.President.jpg';
import img18 from '../../assets/💍.jpeg';
import img19 from '../../assets/concert.jpg';
import img20 from '../../assets/opencv_verilog.png';
import img21 from '../../assets/formalflick.png';
import img22 from '../../assets/TheFam.jpg';
import img23 from '../../assets/grandpa.jpg';
import img24 from '../../assets/grandma.jpg';



const galleryItems = [
  { src: img1, desc: "Uni Day 1s" },
  { src: img2, desc: "Nephew and Niece" },
  { src: img3, desc: "Feelin' Fresh for Prom" },
  { src: img4, desc: "Monkey See, Monkey Do" },
  { src: img5, desc: "FROSH!!" },
  { src: img6, desc: "Call themselves Mario Baker or smth (weirdos)" },
  { src: img7, desc: "They wanted to know if I can model" },
  { src: img8, desc: "GYMMMM" },
  { src: img9, desc: "Got me smilin' at Career Night" },
  { src: img10, desc: "Lil Bro" },
  { src: img11, desc: "Lil Sis Graduation" },
  { src: img12, desc: "Wedding Szn" },
  { src: img13, desc: "Don't mess with the Sivashankars" },
  { src: img14, desc: "Feelin' Cute" },
  { src: img22, desc: "The Fam" },
  { src: img16, desc: "Don't let cuzzo find this pic" },
  { src: img15, desc: "What we lookin' for again?" },
  { src: img18, desc: "💍" },
  { src: img19, desc: "First Concert" },
  { src: img21, desc: "Formal Flick" },
  { src: img20, desc: "OpenCV + Verilog project with DUNDURAA" },
  { src: img17, desc: "Mr. President" },
  { src: img23, desc: "Grandpa & ME" },
  { src: img24, desc: "Grandma & ME" }
];

export default function MechanicalGallery() {
  const skipRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Logic to show button only when the gallery section is in view
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show button if we are looking at the gallery, 
        // but hide it if we've reached the very bottom skipRef
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const scrollToNextSection = () => {
    skipRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <section ref={sectionRef} className="relative py-24 bg-primary text-primary border-t border-theme overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 md:px-12">
        
        <div className="flex justify-between items-end mb-16">
          <h2 className="text-4xl md:text-6xl font-light tracking-tighter">
            Photo <span className="text-accent">Gallery</span>
          </h2>
          {/* Desktop header button removed to avoid redundancy */}
        </div>

        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {galleryItems.map((item, i) => (
              <GalleryCard key={i} item={item} />
            ))}
          </Masonry>
        </ResponsiveMasonry>

        {/* Floating Skip Button */}
        <AnimatePresence>
          {isVisible && (
            <motion.div 
              initial={{ y: 100, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              exit={{ y: 100, opacity: 0, x: "-50%" }}
              className="fixed bottom-12 left-1/2 z-[60]"
            >
              <button 
                onClick={scrollToNextSection}
                className="bg-secondary/80 backdrop-blur-md text-accent border border-accent/30 px-8 py-4 rounded-full shadow-2xl hover:bg-accent hover:text-white hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Skip to Bottom</span>
                <motion.span 
                  animate={{ y: [0, 4, 0] }} 
                  transition={{ repeat: Infinity, duration: 1.5 }}
                >
                  ↓
                </motion.span>
              </button>
            </motion.div>
          )}
        </AnimatePresence>

        <div className="mt-24 flex flex-col items-center gap-6">
           <div className="group flex flex-col items-center gap-4 transition-opacity">
             <span className="text-sm font-mono uppercase tracking-[0.4em] text-accent/60">End of Gallery</span>
           </div>
        </div>
      </div>
      
      {/* Anchor for skipping */}
      <div ref={skipRef} className="h-4" />
    </section>
  );
}

function GalleryCard({ item }: { item: { src: string; desc: string } }) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      whileHover={{ 
        scale: 1.02, 
        y: -5,
      }}
      className="relative group cursor-none overflow-hidden rounded-2xl border border-theme bg-secondary transition-all duration-500"
    >
      <img 
        src={item.src} 
        alt={item.desc} 
        loading="lazy"
        className="w-full h-auto object-cover transition-all duration-700 ease-in-out group-hover:scale-110 group-hover:blur-[2px]" 
      />

      {/* Liquid Glass Overlay */}
      <div className="absolute inset-0 flex items-center justify-center p-4 opacity-0 group-hover:opacity-100 transition-all duration-500">
        <div className="absolute inset-0 bg-black/40 backdrop-blur-[8px] transition-opacity duration-500" />
        
        <div className="relative z-10 w-full transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
          <div className="mx-auto max-w-[80%] bg-white/10 backdrop-blur-xl border border-white/20 p-6 rounded-2xl shadow-2xl text-center">
            <p className="text-white text-sm md:text-base font-light tracking-wide leading-relaxed italic">
              "{item.desc}"
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}