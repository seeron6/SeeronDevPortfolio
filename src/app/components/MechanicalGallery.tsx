import React, { useRef, useState, useEffect } from 'react';
import { motion, AnimatePresence, useAnimation } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// --- ASSETS ---
// (Keeping your imports as they were)
import img1 from '@/assets/compressed/UniDay1.jpg'; 
import img2 from '@/assets/compressed/nephew_neice.jpg';
import img3 from '@/assets/compressed/feelinfreshforprom.jpg';
import img4 from '@/assets/compressed/monkeyseemonkeydo.jpg';
import img5 from '@/assets/compressed/FROSH!!.jpg';
import img6 from '@/assets/compressed/mariobaker.jpg';
import img7 from '@/assets/compressed/theywantedtoknowificanmodel.jpg';
import img8 from '@/assets/compressed/gym.jpg';
import img9 from '@/assets/compressed/careernight.jpg';
import img10 from '@/assets/compressed/lilbro.jpg';
import img11 from '@/assets/compressed/lilsisgrad.jpg';
import img12 from '@/assets/compressed/weddingszn.jpg';
import img13 from '@/assets/compressed/Dontmesswiththesivashankars.jpg';
import img14 from '@/assets/compressed/lookincute.jpg';
import img15 from '@/assets/compressed/what_we_lookin_for.jpg'; 
import img16 from '@/assets/compressed/cuzzo.jpg';
import img17 from '@/assets/compressed/Mr.President.jpg';
import img18 from '@/assets/compressed/💍.jpg'; 
import img19 from '@/assets/compressed/concert.jpg';
import img20 from '@/assets/compressed/opencv_verilog.jpg';
import img21 from '@/assets/compressed/formalflick.jpg';
import img22 from '@/assets/compressed/TheFam.jpg';
import img23 from '@/assets/compressed/grandpa.jpg';
import img24 from '@/assets/compressed/grandma.jpg';
import s1 from '@/assets/compressed/thai_pongal.jpg';
import s3 from '@/assets/compressed/aanin.jpg';
import s4 from '@/assets/compressed/go_train.jpg';
import s5 from '@/assets/compressed/by_the_rouge.jpg'; 
import s20 from '@/assets/compressed/where_it_started.jpg';
import s18 from '@/assets/compressed/firstphoto.jpg';
import s15 from '@/assets/compressed/you_hard_at_work_and_me_hard.jpg';
import s19 from '@/assets/compressed/im_in_love_but_she_dont_know.jpg';
import n1 from '@/assets/compressed/middle_of_the_dance_floor.jpg';
import n2 from '@/assets/compressed/urlockedin.jpg';
import n3 from '@/assets/compressed/meinlove.jpg';
import n4 from '@/assets/compressed/ur_pretty.jpg';
import n5 from '@/assets/compressed/we_look_hot.jpg';
import n6 from '@/assets/compressed/hot_and_nonchalant.jpg';
import n7 from '@/assets/compressed/ugotmyheart.jpg';
import n8 from '@/assets/compressed/Wetufffff.jpg';
import n9 from '@/assets/compressed/pjparty.jpg';

interface GalleryItem {
  src: any;
  desc: string;
  isTrigger?: boolean;
}

interface GalleryCardProps {
  item: GalleryItem;
  onTrigger?: () => void;
  isSecret?: boolean;
}

const galleryItems: GalleryItem[] = [
  { src: img1, desc: "Uni Day 1s" },
  { src: img2, desc: "Nephew and Niece" },
  { src: img3, desc: "Feelin' Fresh for Prom" },
  { src: img4, desc: "Monkey See, Monkey Do" },
  { src: img5, desc: "FROSH!!" },
  { src: img6, desc: "Mario Baker era" },
  { src: img7, desc: "Model Status" },
  { src: img8, desc: "Gym Flicks" },
  { src: img9, desc: "Career Night" },
  { src: img10, desc: "Lil Bro" },
  { src: img11, desc: "Lil Sis Grad" },
  { src: img12, desc: "Wedding Szn" },
  { src: img13, desc: "Sivashankars" },
  { src: img14, desc: "Lookin Cute" },
  { src: img22, desc: "The Fam" },
  { src: img16, desc: "Cuzzo" },
  { src: img15, desc: "What we looking for?" },
  { src: img18, desc: "Locked in", isTrigger: true },
  { src: img19, desc: "First Concert" },
  { src: img21, desc: "Formal Flick" },
  { src: img20, desc: "OpenCV Project" },
  { src: img17, desc: "Mr. President" },
  { src: img23, desc: "Grandpa" },
  { src: img24, desc: "Grandma" }
];

const secretGalleryItems: GalleryItem[] = [
  { src: img18, desc: "Thangam/rani/wifey/baby/my everything ❤️" },
  { src: s20, desc: "Where it started" },
  { src: s18, desc: "First Photo" },
  { src: n2, desc: "UR LOCKED IN" },
  { src: n7, desc: "U got my heart" },
  { src: n8, desc: "We tufffff" },
  { src: s3, desc: "Aanin" },
  { src: n1, desc: "Middle of the dance floor" },
  { src: n3, desc: "Me in love" },
  { src: n4, desc: "Ur pretty" },
  { src: n5, desc: "We look hot" },
  { src: n6, desc: "Hot and nonchalant" },
  { src: n9, desc: "PJ Party" },
  { src: s1, desc: "Thai Pongal" },
  { src: s4, desc: "GO Train" },
  { src: s5, desc: "By the Rouge" },
  { src: s15, desc: "Hard at work" },
  { src: s19, desc: "In love but she don't know" },
  { src: img21, desc: "Formal Flick extras" },
];

export default function MechanicalGallery() {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startSecretSequence = () => {
    setIsAnimating(true);
    // The delay here matches the "zoom" animation of the card
    setTimeout(() => {
      setIsSecretMode(true);
      setIsAnimating(false);
      window.scrollTo(0, 0);
    }, 2000);
  };

  return (
    <div className={`min-h-screen transition-colors duration-1000 ${isSecretMode ? 'bg-black' : 'bg-primary'}`}>
      
      {/* PUBLIC GALLERY */}
      {!isSecretMode && (
        <section className="max-w-7xl mx-auto px-6 py-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h2 className="text-5xl md:text-7xl font-light tracking-tighter mb-16 text-primary">
              Photo <span className="text-accent/80">Gallery</span>
            </h2>
          </motion.div>

          <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
            <Masonry gutter="32px">
              {galleryItems.map((item, i) => (
                <GalleryCard
                  key={i}
                  item={item}
                  onTrigger={item.isTrigger ? startSecretSequence : undefined}
                />
              ))}
            </Masonry>
          </ResponsiveMasonry>
        </section>
      )}

      {/* SECRET GALLERY */}
      <AnimatePresence mode="wait">
        {isSecretMode && (
          <motion.section
            key="secret-gallery"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1 }}
            className="max-w-7xl mx-auto px-6 py-24"
          >
            <div className="text-center mb-20">
              <motion.span 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-pink-500 uppercase tracking-[0.4em] text-xs font-bold"
              >
                Access Granted
              </motion.span>
              <h2 className="text-5xl md:text-8xl font-extralight tracking-tighter text-white mt-4">
                Our <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">Story</span>
              </h2>
            </div>

            <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
              <Masonry gutter="32px">
                {secretGalleryItems.map((item, i) => (
                  <GalleryCard key={i} item={item} isSecret />
                ))}
              </Masonry>
            </ResponsiveMasonry>

            <div className="flex justify-center mt-32 pb-20">
              <button
                onClick={() => setIsSecretMode(false)}
                className="px-12 py-5 rounded-full border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-all backdrop-blur-md tracking-widest text-sm uppercase"
              >
                Return to your BF Website
              </button>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* FULLSCREEN FLASH / OVERLAY */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-100 bg-white pointer-events-none mix-blend-difference"
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function GalleryCard({ item, onTrigger, isSecret }: GalleryCardProps) {
  const [isHolding, setIsHolding] = useState(false);
  const controls = useAnimation();
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const startHold = () => {
    if (!onTrigger) return;
    setIsHolding(true);
    
    // Intense vibration effect
    controls.start({
      x: [0, -1, 1, -1, 1, 0],
      transition: { duration: 0.1, repeat: Infinity }
    });

    timerRef.current = setTimeout(() => {
      onTrigger();
      setIsHolding(false);
    }, 2000);
  };

  const cancelHold = () => {
    setIsHolding(false);
    controls.stop();
    controls.set({ x: 0 });
    if (timerRef.current) clearTimeout(timerRef.current);
  };

  return (
    <motion.div
      animate={controls}
      className="relative group"
      onMouseDown={startHold}
      onMouseUp={cancelHold}
      onMouseLeave={cancelHold}
      onTouchStart={startHold}
      onTouchEnd={cancelHold}
    >
      {/* THE PREMIUM GLOW: Multiple layers for depth */}
      <AnimatePresence>
        {isHolding && (
          <>
            {/* Outer Soft Glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1.2 }}
              exit={{ opacity: 0 }}
              className="absolute -inset-4 z-0 bg-purple-600/30 blur-2xl rounded-full"
            />
            {/* Inner Intense Beam */}
            <motion.div
              initial={{ rotate: 0 }}
              animate={{ rotate: 360 }}
              transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              className="absolute -inset-1 z-0 bg-linear-to-r from-purple-500 via-pink-500 to-purple-500 blur-md rounded-2xl"
            />
          </>
        )}
      </AnimatePresence>

      {/* CARD BODY */}
      <motion.div
        animate={isHolding ? { 
          scale: 0.95,
          filter: "brightness(1.2) contrast(1.1)",
        } : { 
          scale: 1,
          filter: "brightness(1) contrast(1)",
        }}
        className={`relative z-10 rounded-2xl overflow-hidden border transition-all duration-500 ${
          isSecret ? 'border-white/10 bg-zinc-900' : 'border-theme bg-secondary'
        }`}
      >
        <img
          src={item.src}
          alt={item.desc}
          className="w-full h-auto block grayscale-20 group-hover:grayscale-0 transition-all duration-700 group-hover:scale-105"
        />

        {/* ELEGANT OVERLAY */}
        <div className="absolute inset-0 bg-linear-to-t from-black/90 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col justify-end p-6">
          <p className="text-white text-sm font-light tracking-wide leading-relaxed">
            {item.isTrigger && !isHolding ? "..." : item.desc}
          </p>
          
          {isHolding && (
            <div className="w-full bg-white/20 h-px mt-4 overflow-hidden">
              <motion.div 
                initial={{ x: '-100%' }}
                animate={{ x: '0%' }}
                transition={{ duration: 2, ease: "linear" }}
                className="w-full h-full bg-linear-to-r from-purple-400 to-pink-500"
              />
            </div>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
}