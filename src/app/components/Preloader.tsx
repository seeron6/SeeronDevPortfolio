import React, { useEffect, useState } from 'react';
import { motion } from 'motion/react';

const bootSequence = [
  "Initializing_UofT_Eng_Core.sys...",
  "Loading_Modules...",
  "Mounting_Seeron_Sivashankar.exe...",
  "Checking_Life: Alive",
  "Verifying_Bitstream...",
  "Establishing_Secure_Connection...",
  "System_Ready."
];

export default function Preloader() {
  const [textIndex, setTextIndex] = useState(0);
  const [progress, setProgress] = useState(0);
  const [complete, setComplete] = useState(false);

  useEffect(() => {
    // Text typing simulation
    if (textIndex < bootSequence.length) {
      const timeout = setTimeout(() => {
        setTextIndex(prev => prev + 1);
      }, 400); // Speed of line appearance
      return () => clearTimeout(timeout);
    }
  }, [textIndex]);

  useEffect(() => {
    // Progress bar simulation
    const interval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval);
          setTimeout(() => setComplete(true), 500);
          return 100;
        }
        return prev + Math.random() * 5;
      });
    }, 100);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div 
      initial={{ y: 0 }}
      animate={{ y: complete ? "-100%" : 0 }}
      transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
      className="fixed inset-0 z-[999] bg-[#121212] text-white font-mono p-8 md:p-16 flex flex-col justify-end"
    >
      <div className="w-full max-w-2xl">
        <div className="mb-8 h-48 overflow-hidden flex flex-col justify-end">
          {bootSequence.slice(0, textIndex).map((line, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              className="text-sm md:text-base text-[#FF8C00]/80 mb-1"
            >
              <span className="text-white mr-2">{`>`}</span>
              {line}
            </motion.div>
          ))}
          <div className="animate-pulse w-3 h-5 bg-[#FF8C00] mt-1" />
        </div>

        <div className="w-full h-1 bg-[#1c1d20] relative overflow-hidden">
          <motion.div 
            className="absolute top-0 left-0 h-full bg-[#FF8C00]"
            style={{ width: `${progress}%` }}
          />
        </div>
        <div className="flex justify-between text-xs mt-2 text-gray-500 uppercase tracking-widest">
          <span>Boot Sequence</span>
          <span>{Math.floor(progress)}%</span>
        </div>
      </div>
    </motion.div>
  );
}
