import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Code, Terminal, Layers } from 'lucide-react';

const skills = [
  { category: "Languages", items: ["C++", "C", "Verilog", "Python", "Java", "SQL", "JavaScript", "HTML/CSS"], icon: <Code size={20} /> },
  { category: "Frameworks", items: ["React", "Express.js", "Node.js", "Flask", "Junit", "PyTest", "TensorFlow", "PyTorch"], icon: <Layers size={20} /> },
  { category: "Developer Tools", items: ["Docker", "Git", "Jira", "AWS", "Google Cloud", "VS Code", "Quartus", "SolidWorks"], icon: <Terminal size={20} /> }
];

export default function Skills() {
  const container = useRef(null);
  
  return (
    <section id="skills" className="relative py-24 px-4 md:px-12 bg-primary text-primary transition-colors duration-500">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tighter">
          Technical <span className="text-accent">Arsenal</span>
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {skills.map((skill, index) => (
             <SkillCard key={index} skill={skill} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

const SkillCard = ({ skill, index }: { skill: any, index: number }) => {
  const ref = useRef<HTMLDivElement>(null);
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      whileHover={{ rotateX: 5, rotateY: 5, scale: 1.02 }}
      className="glass-panel p-8 rounded-xl relative overflow-hidden group perspective-1000 bg-secondary transition-colors duration-500"
      style={{ transformStyle: 'preserve-3d' }}
    >
      <div className="absolute top-0 right-0 p-4 opacity-20 group-hover:opacity-100 group-hover:text-accent transition-all duration-300">
        {skill.icon}
      </div>
      
      <h3 className="text-xl font-mono mb-6 text-accent flex items-center gap-2">
         <span className="w-2 h-2 bg-accent rounded-full inline-block" />
         {skill.category}
      </h3>
      
      <div className="flex flex-wrap gap-2">
        {skill.items.map((item: string, i: number) => (
          <span 
            key={i} 
            className="px-3 py-1 bg-primary/30 border border-theme rounded-sm text-sm font-mono hover:bg-accent/20 hover:border-accent/50 transition-colors cursor-default"
          >
            {item}
          </span>
        ))}
      </div>
      
      {/* Hover Glow Border Effect */}
      <div className="absolute inset-0 border border-accent opacity-0 group-hover:opacity-100 rounded-xl transition-opacity duration-300 pointer-events-none" />
    </motion.div>
  );
}
