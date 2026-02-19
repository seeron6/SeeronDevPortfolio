import React, { useRef, useState, FormEvent, ChangeEvent } from 'react';
import { motion } from 'motion/react';
import Magnetic from './ui/Magnetic';
import { useTheme } from '../context/ThemeContext';

export default function Footer() {
  const container = useRef<HTMLDivElement>(null);
  const { theme } = useTheme();

  // --- Form Logic ---
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<'idle' | 'loading' | 'success'>('idle');
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const SCRIPT_URL = "https://script.google.com/macros/s/AKfycbzzLdxjO4fKePRIc1ZPd3a3AkrKx7s2wpnW-oOt6QY7-95ltSB6C5vjHYNkDoQXy2tL/exec";

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus('loading');
    try {
      await fetch(SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors',
        body: JSON.stringify(formData),
      });
      setStatus('success');
      setTimeout(() => {
        setIsOpen(false);
        setStatus('idle');
        setFormData({ name: '', email: '', message: '' });
      }, 2000);
    } catch (err) {
      console.error(err);
      setStatus('idle');
      alert("Transmission failed. Please try again.");
    }
  };

  return (
    <div 
      id="contact"
      className="relative min-h-screen" 
      style={{clipPath: "polygon(0% 0, 100% 0%, 100% 100%, 0 100%)"}}
    >
      <div className="relative h-full">
        {/* Changed justify-between to justify-center and added gap-16 to pull content together */}
        <div ref={container} className="bg-secondary text-primary min-h-screen w-full flex flex-col justify-center gap-12 md:gap-24 p-6 md:p-24 relative overflow-hidden transition-colors duration-500">
             
             <div className="absolute inset-0 grid-mesh opacity-20 pointer-events-none"></div>

             {/* Top Section: Headers and Action Button */}
             <div className="flex flex-col md:flex-row justify-between items-start md:items-end z-10">
                <div className="flex flex-col">
                   <h2 className="text-[12vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase font-medium">LET'S BUILD</h2>
                   <h2 className="text-[12vw] md:text-[10vw] leading-[0.8] tracking-tighter uppercase font-medium text-accent opacity-50">THE FUTURE</h2>
                </div>
                
                <Magnetic>
                   <div 
                    onClick={() => setIsOpen(true)}
                    // Removed absolute positioning so it stays near the text on mobile
                    className="w-28 h-28 md:w-48 md:h-48 bg-primary border border-accent rounded-full text-primary flex items-center justify-center cursor-pointer overflow-hidden group shadow-[0_0_30px_rgba(255,140,0,0.2)] mt-8 md:mt-0"
                   >
                      <div className="relative z-10 font-mono text-xs md:text-sm group-hover:text-white transition-colors">INITIATE</div>
                      <div className="absolute inset-0 bg-accent scale-0 group-hover:scale-150 transition-transform duration-700 rounded-full ease-[cubic-bezier(0.76,0,0.24,1)]" />
                   </div>
                </Magnetic>
             </div>

             {/* Modal / Contact Form */}
             {isOpen && (
               <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
                 <div className="bg-secondary border border-theme w-full max-w-lg p-6 md:p-8 rounded-sm shadow-2xl relative">
                   <button onClick={() => setIsOpen(false)} className="absolute top-4 right-4 text-accent font-mono text-xs hover:underline">[ CLOSE ]</button>

                   {status === 'success' ? (
                     <div className="text-center py-10 font-mono text-accent uppercase">Transmission Successful</div>
                   ) : (
                     <form onSubmit={handleSubmit} className="flex flex-col gap-6 font-mono">
                       <h3 className="text-accent text-lg uppercase mb-2">Secure Inquiry</h3>
                       <input 
                        required
                        type="text" 
                        placeholder="NAME"
                        className="bg-transparent border-b border-theme p-2 outline-none focus:border-accent text-sm uppercase text-primary"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, name: e.target.value})}
                       />
                       <input 
                        required
                        type="email" 
                        placeholder="EMAIL"
                        className="bg-transparent border-b border-theme p-2 outline-none focus:border-accent text-sm uppercase text-primary"
                        onChange={(e: ChangeEvent<HTMLInputElement>) => setFormData({...formData, email: e.target.value})}
                       />
                       <textarea 
                        required
                        placeholder="MESSAGE"
                        rows={4}
                        className="bg-transparent border border-theme p-3 outline-none focus:border-accent text-sm resize-none text-primary"
                        onChange={(e: ChangeEvent<HTMLTextAreaElement>) => setFormData({...formData, message: e.target.value})}
                       />
                       <button type="submit" className="bg-accent text-white py-3 uppercase text-sm font-bold hover:opacity-90 transition-opacity">
                        {status === 'loading' ? 'Transmitting...' : 'Execute Submission'}
                       </button>
                     </form>
                   )}
                 </div>
               </div>
             )}

             {/* Bottom Section: Contact Details and Socials */}
             <div className="flex flex-col md:flex-row gap-12 justify-between items-start md:items-end w-full border-t border-theme pt-8 z-10 font-mono text-xs md:text-sm">
                <div className="flex flex-col gap-4 w-full md:w-auto">
                   <Magnetic>
                    <a href="mailto:seeron.sivashankar@mail.utoronto.ca" className="block text-center md:text-left border border-theme rounded-sm px-6 py-3 hover:bg-accent hover:text-white transition-colors uppercase tracking-wider bg-primary text-primary">
                      seeron.sivashankar@mail.utoronto.ca
                    </a>
                   </Magnetic>
                   <Magnetic>
                    <a href="tel:+16472824910" className="block text-center md:text-left border border-theme rounded-sm px-6 py-3 hover:bg-accent hover:text-white transition-colors uppercase tracking-wider bg-primary text-primary">
                      +1 (647) 282-4910
                    </a>
                   </Magnetic>
                </div>

                <div className="flex gap-12 md:gap-16 w-full md:w-auto justify-between md:justify-end">
                   <div className="flex flex-col gap-3">
                      <span className="opacity-50 uppercase mb-2">Socials</span>
                      <Magnetic>
                        <a href="https://www.linkedin.com/in/seeron-sivashankar/" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">LINKEDIN</a>
                      </Magnetic>
                      <Magnetic>
                        <a href="https://github.com/seeron6" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">GITHUB</a>
                      </Magnetic>
                      <Magnetic>
                        <a href="https://www.instagram.com/seeronsiva?igsh=MWZ1a3dpMHB5NGUyZA%3D%3D&utm_source=qr" target="_blank" rel="noopener noreferrer" className="hover:text-accent transition-colors">INSTAGRAM</a>
                      </Magnetic>
                   </div>
                   <div className="flex flex-col gap-3">
                      <span className="opacity-50 uppercase mb-2">System Status</span>
                      <p className="flex items-center gap-2">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span> 
                        ONLINE
                      </p>
                      <p className="opacity-50">V.1.0.17</p>
                   </div>
                </div>
             </div>
          </div>
      </div>
    </div>
  );
}