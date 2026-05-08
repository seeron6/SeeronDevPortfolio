import { Linkedin, Github, Instagram } from 'lucide-react';
import Handwriting from './Handwriting';
import heroImage from '../assets/heroImage.jpg';

/**
 * Hero block — only shown on the overview (when no section is focused).
 * Title, intro, photo, and contact links.
 */
export default function Hero() {
  return (
    <header className="hero-block max-w-3xl mx-auto pb-2">
      <div className="flex justify-between items-baseline serif italic text-ink-faded text-xs md:text-sm mb-6 fade-up" style={{ animationDelay: '0.1s' }}>
        <span className="smallcaps">Toronto, Canada</span>
        <span className="smallcaps">Vol. I · MMXXVI</span>
      </div>

      <h1 className="script text-ink" style={{ fontSize: 'clamp(2.4rem, 6vw, 5rem)', lineHeight: 1.0 }}>
        <Handwriting text="The Story of" duration={1.4} delay={0.15} />
      </h1>
      <h1 className="script text-ink mt-1 mb-5" style={{ fontSize: 'clamp(2.8rem, 7.5vw, 6rem)', lineHeight: 1.0 }}>
        <Handwriting text="Seeron Sivashankar" duration={2.2} delay={1.1} />
      </h1>

      <div className="ink-divider serif italic text-base mb-6 max-w-md fade-up" style={{ animationDelay: '3.3s' }}>
        <span>·</span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[1.4fr_1fr] gap-6 md:gap-10 items-start">
        <div className="fade-up" style={{ animationDelay: '3.5s' }}>
          <p className="serif text-ink-soft text-sm md:text-base leading-[1.7] mb-5">
            A computer engineering student at the University of Toronto, a
            software consultant, and an incurable tinkerer. What follows is
            not a résumé but a story of the things I have built, the people
            who have shaped me, and the small details I cannot stop noticing.
          </p>

          <div className="serif italic text-ink-faded smallcaps text-[10px] md:text-xs mb-2">
            to write back
          </div>
          <div className="flex flex-col gap-1">
            <a
              href="mailto:seeron.sivashankar@mail.utoronto.ca"
              className="script-formal text-ink hover:text-wax transition-colors text-base md:text-lg underline decoration-dotted underline-offset-[6px] decoration-ink-faded w-fit break-all"
            >
              seeron.sivashankar@mail.utoronto.ca
            </a>
            <a
              href="tel:+16472824910"
              className="serif italic text-ink-soft text-sm md:text-base hover:text-wax transition-colors w-fit"
            >
              +1 (647) 282-4910
            </a>
          </div>
          <div className="flex flex-wrap items-center gap-x-5 gap-y-3 mt-4">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="serif italic smallcaps tracking-[0.18em] text-sm text-ink hover:text-wax transition-colors underline decoration-dotted underline-offset-[6px] decoration-ink-faded"
            >
              Résumé ↗
            </a>
            <span className="text-ink-faded/40">·</span>
            <a
              href="https://www.linkedin.com/in/seeron-sivashankar/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              title="LinkedIn"
              className="social-icon text-ink-soft hover:text-wax transition-all"
            >
              <Linkedin strokeWidth={1.6} />
            </a>
            <a
              href="https://github.com/seeron6"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub"
              title="GitHub"
              className="social-icon text-ink-soft hover:text-wax transition-all"
            >
              <Github strokeWidth={1.6} />
            </a>
            <a
              href="https://www.instagram.com/seeronsiva"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Instagram"
              title="Instagram"
              className="social-icon text-ink-soft hover:text-wax transition-all"
            >
              <Instagram strokeWidth={1.6} />
            </a>
          </div>
        </div>

        <div className="parchment-frame mx-auto settle-in" style={{ maxWidth: '220px', animationDelay: '2.4s' }}>
          <img src={heroImage} alt="Seeron"
            className="block w-full h-auto"
            style={{ filter: 'sepia(0.18) contrast(1.02)' }} />
          <div className="text-center serif italic text-ink-faded mt-2 mb-1 text-[11px] md:text-xs">
            the author
          </div>
        </div>
      </div>
    </header>
  );
}
