import React from 'react';
import { motion } from 'motion/react';
// Assuming the image is in your assets folder
import orthopopImg from '../../assets/orthopop-landing-page-image.png';

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
    ],
    image: orthopopImg,
    link: "https://orthopop.ai/"
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

        <div className="relative border-l border-theme ml-4 md:ml-0 pl-8 md:pl-12 space-y-16">
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

              {/* Header: Company & Period */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
                <div>
                   <h3 className="text-3xl font-medium tracking-tight group-hover:text-accent transition-colors">{exp.company}</h3>
                   <p className="text-xl text-secondary font-light">{exp.role}</p>
                </div>
                <span className="font-mono text-xs md:text-sm text-secondary border border-theme px-3 py-1 rounded-full mt-2 md:mt-0 bg-secondary shadow-sm">
                  {exp.period}
                </span>
              </div>

              {/* Content Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                 {/* Left Column: Points & Tech */}
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
                          <span key={t} className="text-xs font-mono text-accent bg-accent/10 px-2 py-1 rounded border border-accent/20">
                            {t}
                          </span>
                       ))}
                    </div>
                 </div>

                 {/* Right Column: Visual Component (Stats or Image) */}
                 <div className="flex flex-col justify-center">
                    {/* Project Image Preview for Brainweber */}
                    {exp.image && (
                      <a 
                        href={exp.link} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="relative block glass-panel p-2 rounded-xl overflow-hidden group/img transform hover:scale-[1.03] transition-all duration-500 bg-secondary border border-theme shadow-lg"
                      >
                        <div className="relative aspect-[4/3] rounded-lg overflow-hidden bg-primary/50">
                          <img 
                            src={exp.image} 
                            alt={`${exp.company} project preview`} 
                            className="w-full h-full object-cover grayscale-[30%] group-hover/img:grayscale-0 transition-all duration-700"
                          />
                          {/* Visit Overlay */}
                          <div className="absolute inset-0 bg-accent/10 opacity-0 group-hover/img:opacity-100 flex items-center justify-center transition-all duration-300">
                             <div className="bg-black/60 backdrop-blur-md px-4 py-2 rounded-full border border-white/20 transform translate-y-2 group-hover/img:translate-y-0 transition-transform">
                                <span className="text-white text-[10px] font-mono tracking-widest uppercase">Visit Site ↗</span>
                             </div>
                          </div>
                        </div>
                        <div className="mt-2 px-1 flex justify-between items-center">
                           <span className="text-[9px] font-mono text-secondary opacity-60 uppercase tracking-tighter">Project Preview</span>
                           <span className="text-[9px] font-mono text-accent">orthopop.ai</span>
                        </div>
                      </a>
                    )}

                    {/* Stats Component for UCMAS */}
                    {exp.stats && (
                      <div className="glass-panel p-6 rounded-xl flex flex-col justify-center items-center gap-4 text-center transform hover:scale-[1.03] transition-all duration-500 bg-secondary border border-theme shadow-lg">
                         <div>
                            <div className="text-4xl font-bold text-accent">{exp.stats.results}+</div>
                            <div className="text-[10px] text-secondary uppercase tracking-[0.2em] mt-1">Results Processed</div>
                         </div>
                         <div className="w-full h-[1px] bg-theme opacity-10" />
                         <div>
                            <div className="text-4xl font-bold text-accent">{exp.stats.competitors}+</div>
                            <div className="text-[10px] text-secondary uppercase tracking-[0.2em] mt-1">Competitors</div>
                         </div>
                      </div>
                    )}
                 </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}