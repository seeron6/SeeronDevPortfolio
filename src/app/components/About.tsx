import React, { useRef } from 'react';
import { useScroll, motion, useTransform } from 'motion/react';

const phrase = "Helping brands to stand out in the digital era. Together we will set the new status quo. No nonsense, always on the cutting edge.";

export default function About() {
  const container = useRef(null);
  const { scrollYProgress } = useScroll({
    target: container,
    offset: ["start 0.9", "start 0.25"]
  });

  const words = phrase.split(" ");

  return (
    <div ref={container} className="flex justify-center items-center py-24 md:py-48 px-8 md:px-32 bg-[#f1f1f1] text-[#1c1d20]">
      <p className="text-[2rem] md:text-[3.5rem] leading-[1.1] md:leading-[1.1] font-medium flex flex-wrap gap-x-3 max-w-5xl">
        {words.map((word, i) => {
          const start = i / words.length;
          const end = start + (1 / words.length);
          return <Word key={i} range={[start, end]} progress={scrollYProgress}>{word}</Word>
        })}
      </p>
    </div>
  );
}

const Word = ({ children, range, progress }: { children: string, range: [number, number], progress: any }) => {
  const opacity = useTransform(progress, range, [0.1, 1]);
  return (
    <span className="relative">
      <span className="absolute opacity-[0.1]">{children}</span>
      <motion.span style={{ opacity }}>{children}</motion.span>
    </span>
  );
}
