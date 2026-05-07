import { ReactNode } from 'react';
import { useView, View } from './ViewContext';
import Handwriting from './Handwriting';

type Props = {
  id: View;
  chapter: string;
  title: string;
  children: ReactNode;
};

/**
 * A section that:
 *  - renders inline on the main scroll (when the global view is 'overview')
 *  - or zooms in to fill the parchment (when the global view === this id)
 *
 * Click the title to zoom in. While focused a back button appears so the
 * user can return to the overview.
 */
export default function DetailView({ id, chapter, title, children }: Props) {
  const { view, setView, back } = useView();
  const focused = view === id;

  return (
    <section
      id={id}
      className={`zoomable-section ${focused ? 'is-focused' : ''}`}
      data-section-id={id}
    >
      {focused && (
        <div className="mb-6 fade-up" style={{ animationDelay: '0.05s' }}>
          <button type="button" className="back-button" onClick={back}>
            <span aria-hidden>←</span>
            <span>back to the cover</span>
          </button>
        </div>
      )}

      <header className="text-center mb-8 md:mb-12">
        <div className="serif italic text-ink-faded smallcaps text-xs md:text-sm mb-2 fade-up" style={{ animationDelay: '0.1s' }}>
          {chapter}
        </div>
        <button
          type="button"
          className="zoomable-title"
          onClick={() => (focused ? back() : setView(id))}
          aria-label={focused ? `Close ${title}` : `Zoom into ${title}`}
        >
          <h2
            className="script text-ink"
            style={{
              fontSize: focused
                ? 'clamp(2.4rem, 5.5vw, 4.6rem)'
                : 'clamp(1.8rem, 3.6vw, 3rem)',
              lineHeight: 1.05,
              transition: 'font-size 0.5s cubic-bezier(0.65, 0, 0.35, 1)',
            }}
          >
            <Handwriting text={title} duration={1.6} delay={0.1} />
          </h2>
        </button>
      </header>

      <div className="zoomable-body">{children}</div>
    </section>
  );
}
