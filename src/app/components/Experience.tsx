import React, { useRef } from 'react';
import { motion } from 'motion/react';
import { Briefcase } from 'lucide-react';

const experiences = [
  {
    company: "Brainweber Inc",
    role: "Software Consultant",
    period: "May 2024 – Aug 2024",
    tech: ["Gen AI", "React", "Supabase", "Python"],
    points: [
      "Engineered a generative AI-powered voice chat feature for a web app, increasing user engagement by 40%.",
      "Refined database architecture using Supabase for scalable data management.",
      "Optimized API endpoints in Python to reduce latency by 15%.",
      "Designed technical specifications for scalable AI integration."
    ]
  },
  {
    company: "UCMAS",
    role: "Technical Lead & Developer",
    period: "May 2020 – June 2023",
    tech: ["Web Development", "Database Management", "Automation"],
    points: [
      "Directed the technical infrastructure for a national competition with 3500+ competitors.",
      "Automated scoring systems handling 4000+ results in real-time.",
      "Contributed to achieving a Cholan Book of World Records title for the event."
    ],
    stats: { results: 4000, competitors: 3500 }
  }
];

export default function Experience() {
  return (
    <section id="experience" className="py-24 px-4 md:px-12 bg-primary text-primary relative overflow-hidden transition-colors duration-500">
      
      <div className="max-w-5xl mx-auto relative z-10">
        <h2 className="text-4xl md:text-6xl font-light mb-16 tracking-tighter">
          Professional <span className="text-accent">Experience</span>
        </h2>

        <div className="relative border-l border-theme ml-4 md:ml-0 pl-8 md:pl-12 space-y-24">
          {experiences.map((exp, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[41px] md:-left-[57px] top-2 w-5 h-5 bg-primary border border-accent rounded-full group-hover:bg-accent transition-colors duration-300 z-10">
                <div className="absolute inset-0 bg-accent opacity-50 blur-md rounded-full group-hover:animate-ping" />
              </div>

              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                   <h3 className="text-3xl font-medium tracking-tight group-hover:text-accent transition-colors">{exp.company}</h3>
                   <p className="text-xl text-secondary font-light">{exp.role}</p>
                </div>
                <span className="font-mono text-xs md:text-sm text-secondary border border-theme px-3 py-1 rounded-full mt-2 md:mt-0 bg-secondary">{exp.period}</span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 <div className="md:col-span-2 space-y-4">
                    <ul className="space-y-3 font-light text-secondary">
                      {exp.points.map((point, i) => (
                        <li key={i} className="flex gap-3">
                          <span className="text-accent mt-1.5 text-xs">◆</span>
                          {point}
                        </li>
                      ))}
                    </ul>
                    <div className="flex gap-2 flex-wrap pt-4">
                       {exp.tech.map(t => (
                          <span key={t} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded">{t}</span>
                       ))}
                    </div>
                 </div>

                 {/* Dynamic Stats for UCMAS */}
                 {exp.stats && (
                    <div className="glass-panel p-6 rounded-lg flex flex-col justify-center items-center gap-4 text-center transform group-hover:scale-105 transition-transform bg-secondary">
                       <div>
                          <div className="text-3xl font-bold text-accent">{exp.stats.results}+</div>
                          <div className="text-xs text-secondary uppercase tracking-widest">Results Processed</div>
                       </div>
                       <div className="w-full h-[1px] bg-theme opacity-20" />
                       <div>
                          <div className="text-3xl font-bold text-accent">{exp.stats.competitors}+</div>
                          <div className="text-xs text-secondary uppercase tracking-widest">Competitors</div>
                       </div>
                    </div>
                 )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
