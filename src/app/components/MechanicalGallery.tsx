import React, { useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";

// --- ASSET IMPORTS (Standard Gallery) ---
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

// --- ASSET IMPORTS (Secret Gallery) ---
import s1 from '../../assets/thai_pongal.jpeg';
import s2 from '../../assets/kisseyface.jpg';
import s3 from '../../assets/aanin.jpeg';
import s4 from '../../assets/go_train.JPG';
import s5 from '../../assets/by_the _rouge.JPG';
import s6 from '../../assets/goated_pool_partner.JPG';
import s7 from '../../assets/sunlight.jpeg';
import s8 from '../../assets/or_maybe_im_getting_yelled_at.jpeg';
import s9 from '../../assets/i_think_she_proud_of_me.jpeg';
import s10 from '../../assets/chill_on_da_couch.jpeg';
import s11 from '../../assets/hiphoptamizha.jpeg';
import s12 from '../../assets/yourfrosh.JPG';
import s13 from '../../assets/confess_da_love.JPG';
import s14 from '../../assets/camp_call.PNG';
import s15 from '../../assets/you_hard_at_work_and_me_hard.PNG';
import s16 from '../../assets/ahhhhh.JPG';
import s17 from '../../assets/first_time_just_us.jpeg';
import s18 from '../../assets/firstphoto.jpeg';
import s19 from '../../assets/im_in_love_but_she_dont_know.JPG';
import s20 from '../../assets/where_it_started.JPG';

// --- DATA STRUCTURES ---
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
  { src: img18, desc: "Locked in", isTrigger: true }, 
  { src: img19, desc: "First Concert" },
  { src: img21, desc: "Formal Flick" },
  { src: img20, desc: "OpenCV + Verilog project with DUNDURAA" },
  { src: img17, desc: "Mr. President" },
  { src: img23, desc: "Grandpa & ME" },
  { src: img24, desc: "Grandma & ME" }
];

const secretGalleryItems = [
  { src: img18, desc: "Thangam/rani/wifey/baby/my everything ❤️" },
  { src: s20, desc: "Where it started" },
  { src: s18, desc: "First Photo" },
  { src: s19, desc: "I'm in love but she don't know" },
  { src: s1, desc: "Thai Pongal" },
  { src: s2, desc: "Kissey Face" },
  { src: s3, desc: "Aanin" },
  { src: s4, desc: "GO Train" },
  { src: s5, desc: "By the Rouge" },
  { src: s6, desc: "Goated Pool Partner" },
  { src: s7, desc: "Sunlight" },
  { src: s8, desc: "Or maybe I'm getting yelled at" },
  { src: s9, desc: "I think she proud of me" },
  { src: s10, desc: "Chill on da couch" },
  { src: s11, desc: "Hiphoptamizha" },
  { src: s12, desc: "Your Frosh" },
  { src: s13, desc: "Confess da love" },
  { src: s14, desc: "Camp Call" },
  { src: s15, desc: "You hard at work and me hard" },
  { src: s16, desc: "Ahhhhh" },
  { src: s17, desc: "First time just us" },
  { src: img21, desc: "Why's there an extra character" },
];

export default function MechanicalGallery() {
  const [isSecretMode, setIsSecretMode] = useState(false);
  const [isAnimating, setIsAnimating] = useState(false);

  const startSecretSequence = () => {
    setIsAnimating(true);
    
    // Switch content during the black-out/zoom phase
    setTimeout(() => {
      setIsSecretMode(true);
    }, 3000);

    // End overlay animation
    setTimeout(() => {
      setIsAnimating(false);
    }, 5500);
  };

  const handleExit = () => {
    setIsSecretMode(false);
  };

  return (
    <section className="relative py-24 bg-primary text-primary min-h-screen border-t border-theme">
      
      {/* MAIN GALLERY */}
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-16">
          Photo <span className="text-accent">Gallery</span>
        </h2>
        
        <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
          <Masonry gutter="24px">
            {galleryItems.map((item, i) => (
              <GalleryCard 
                key={`reg-${i}`} 
                item={item} 
                onTrigger={item.isTrigger ? startSecretSequence : undefined} 
              />
            ))}
          </Masonry>
        </ResponsiveMasonry>
      </div>

      {/* SECRET OVERLAY */}
      <AnimatePresence>
        {isSecretMode && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-primary overflow-y-auto pt-24 pb-32"
          >
            <div className="max-w-7xl mx-auto px-6">
              <h2 className="text-4xl md:text-6xl font-light tracking-tighter mb-16 text-center">
                Our <span className="text-accent">Story</span>
              </h2>
              
              <ResponsiveMasonry columnsCountBreakPoints={{ 350: 1, 750: 2, 900: 3 }}>
                <Masonry gutter="24px">
                  {secretGalleryItems.map((item, i) => (
                    <GalleryCard key={`sec-${i}`} item={item} />
                  ))}
                </Masonry>
              </ResponsiveMasonry>
            </div>

            <motion.div 
              initial={{ y: 50, opacity: 0, x: "-50%" }}
              animate={{ y: 0, opacity: 1, x: "-50%" }}
              className="fixed bottom-12 left-1/2 z-[90]"
            >
              <button 
                onClick={handleExit}
                className="bg-secondary/90 backdrop-blur-xl text-accent border border-accent/30 px-10 py-4 rounded-full shadow-2xl hover:scale-105 transition-all flex items-center gap-3"
              >
                <span className="text-[10px] font-mono uppercase tracking-[0.3em]">Exit Story</span>
                <span>🏠</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* PORTAL ANIMATION */}
      <AnimatePresence>
        {isAnimating && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black flex flex-col items-center justify-center overflow-hidden"
          >
            <motion.h2 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 1, 1, 0], scale: [0.8, 1, 1.1, 1.2] }}
              transition={{ duration: 3, times: [0, 0.2, 0.8, 1] }}
              className="text-white text-4xl md:text-7xl font-bold tracking-[0.6em] uppercase absolute"
            >
              LOCKED IN
            </motion.h2>

            <motion.div
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: [0, 1, 250], opacity: [0, 1, 1] }}
              transition={{ 
                duration: 4, 
                delay: 1.5, 
                times: [0, 0.3, 1],
                ease: [0.7, 0, 0.3, 1] 
              }}
              className="relative flex items-center justify-center"
            >
              <svg width="150" height="150" viewBox="0 0 24 24" fill="white">
                <path d="M12 1a5 5 0 0 0-5 5v4H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8a2 2 0 0 0-2-2h-1V6a5 5 0 0 0-5-5zm-3 5a3 3 0 0 1 6 0v4H9V6z" />
                <path d="M12 16.5s-.4-.4-.8-.4c-.5 0-.9.4-.9 1 0 .8 1.7 1.8 1.7 1.8s1.7-1 1.7-1.8c0-.6-.4-1-.9-1-.4 0-.8.4-.8.4z" fill="red" />
              </svg>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function GalleryCard({ item, onTrigger }) {
  const [holdProgress, setHoldProgress] = useState(0);
  const timerRef = useRef(null);

  const startHold = () => {
    if (!onTrigger) return;
    const startTime = Date.now();
    timerRef.current = setInterval(() => {
      const p = Math.min(((Date.now() - startTime) / 3000) * 100, 100); // Set to 3 seconds for easier trigger
      setHoldProgress(p);
      if (p >= 100) {
        clearInterval(timerRef.current);
        onTrigger();
        setHoldProgress(0);
      }
    }, 50);
  };

  const endHold = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setHoldProgress(0);
  };

  return (
    <motion.div 
      className="relative rounded-2xl overflow-hidden border border-theme bg-secondary group select-none cursor-crosshair"
      onMouseDown={startHold} onMouseUp={endHold} onMouseLeave={endHold}
      onTouchStart={startHold} onTouchEnd={endHold}
    >
      {holdProgress > 0 && (
        <div 
          className="absolute top-0 left-0 h-1.5 bg-accent z-[60]" 
          style={{ width: `${holdProgress}%`, transition: 'width 0.1s linear' }} 
        />
      )}
      <img src={item.src} alt="" className="w-full h-auto block transition-all duration-700 group-hover:scale-105" />
      <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-all duration-500 flex flex-col items-center justify-center p-6 text-center backdrop-blur-[2px]">
        <p className="text-white font-light italic text-sm">"{item.desc}"</p>
        {onTrigger && (
          <span className="mt-4 text-accent text-[10px] tracking-[0.2em] font-mono animate-pulse uppercase">
            {holdProgress > 0 ? 'Unlocking...' : '...'}
          </span>
        )}
      </div>
    </motion.div>
  );
}