import Hero from './Hero';
import Experience from './Experience';
import Projects from './Projects';
import Skills from './Skills';
import Favourites from './Favourites';
import LifeRecap from './LifeRecap';
import Footer from './Footer';
import { useView } from './ViewContext';

const ChapterBreak = ({ label }: { label: string }) => (
  <div className="ink-divider serif italic text-ink-faded text-[11px] md:text-xs my-10 md:my-14 max-w-3xl mx-auto">
    <span style={{ fontSize: '1.2rem' }}>❦</span>
    <span className="smallcaps">{label}</span>
    <span style={{ fontSize: '1.2rem' }}>❦</span>
  </div>
);

/**
 * The single, scrolling Overview. Hero + every section's full content, all
 * laid out on the parchment. Each section header is clickable and zooms
 * to fill the parchment when activated.
 *
 * When a section is focused via the global view state, the other sections
 * are visually hidden (CSS handles this via the .focus-mode class on the
 * scroll-content container).
 */
export default function Overview() {
  const { view } = useView();
  const isOverview = view === 'overview';

  return (
    <div>
      {isOverview && <Hero />}
      {isOverview && <ChapterBreak label="contents" />}

      <Experience />
      {isOverview && <ChapterBreak label="•" />}
      <Projects />
      {isOverview && <ChapterBreak label="•" />}
      <Skills />
      {isOverview && <ChapterBreak label="•" />}
      <Favourites />
      {isOverview && <ChapterBreak label="•" />}
      <LifeRecap />
      {isOverview && <ChapterBreak label="•" />}
      <Footer />
    </div>
  );
}
