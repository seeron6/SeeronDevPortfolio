import React, { useEffect, useState } from 'react';
import Lenis from 'lenis';
import { AnimatePresence } from 'motion/react';
import Header from './components/Header';
import Hero from './components/Hero';
import Experience from './components/Experience';
import Work from './components/Work';
import Skills from './components/Skills';
import Footer from './components/Footer';
import Preloader from './components/Preloader';
import Lifestyle from './components/Lifestyle';
import MechanicalGallery from './components/MechanicalGallery';
import BackgroundThread from './components/ui/BackgroundThread';
import { ThemeProvider } from './context/ThemeContext';

export default function App() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const lenis = new Lenis();

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Simulate boot time
    const timer = setTimeout(() => {
      setIsLoading(false);
      window.scrollTo(0, 0);
    }, 4500); 

    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeProvider>
        <div className="font-sans antialiased bg-primary text-primary min-h-screen selection:bg-accent selection:text-white relative transition-colors duration-500">
          <div className="scanlines"></div>
          <div className="noise"></div>
          {/* <div className="grid-mesh"></div> Replaced by BackgroundThread */}
          <BackgroundThread />

          <AnimatePresence mode='wait'>
            {isLoading && <Preloader />}
          </AnimatePresence>

          {!isLoading && (
            <>
              <Header />
              <main>
                <Hero />
                <Experience />
                <Work />
                <Skills />
                <Lifestyle />
                <MechanicalGallery />
              </main>
              <Footer />
            </>
          )}
        </div>
    </ThemeProvider>
  );
}
