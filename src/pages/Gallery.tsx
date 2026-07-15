import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getGalleryItems, type GalleryItem } from '../lib/gallery';
import Reveal from '../components/Reveal';

export default function Gallery() {
  const [items, setItems] = useState<GalleryItem[] | null>(null);
  const [active, setActive] = useState<GalleryItem | null>(null);

  useEffect(() => {
    let alive = true;
    getGalleryItems()
      .then((g) => alive && setItems(g))
      .catch(() => alive && setItems([]));
    return () => {
      alive = false;
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setActive(null);
    window.addEventListener('keydown', onKey);
    document.body.style.overflow = active ? 'hidden' : '';
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [active]);

  return (
    <div className="mx-auto max-w-6xl px-6 pt-10 pb-4 md:pt-16">
      <Reveal>
        <p className="label mb-5">In Frame</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.02 }}>
          Gallery.
        </h1>
        <p className="prose-serif mt-6 max-w-2xl text-fg-dim">
          A collection of moments, people, places, and the occasional good fit.
        </p>
      </Reveal>

      {items === null ? (
        <MasonrySkeleton />
      ) : items.length === 0 ? (
        <p className="prose-serif py-20 text-center text-fg-faint">
          No photos yet, check back soon.
        </p>
      ) : (
        // Masonry: photos flow at their natural aspect ratio (portrait + landscape).
        <div className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3">
          {items.map((item, i) => (
            <Reveal key={item.id} as="div" delay={(i % 3) * 70} className="mb-3 break-inside-avoid">
              <button
                onClick={() => setActive(item)}
                className="group relative block w-full overflow-hidden border border-line-soft bg-surface"
              >
                <img
                  src={item.image}
                  alt={item.title || 'Gallery photo'}
                  loading="lazy"
                  className="block h-auto w-full align-top transition-transform duration-700 group-hover:scale-[1.04]"
                  style={{ filter: 'saturate(0.95) brightness(0.96)' }}
                />
                {item.title && (
                  <>
                    <div
                      className="pointer-events-none absolute inset-x-0 bottom-0 h-1/2"
                      style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
                    />
                    <div className="card-caption pointer-events-none">
                      <h3 className="card-title">{item.title}</h3>
                    </div>
                  </>
                )}
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active && (
        <div
          className="fixed inset-0 z-50 flex flex-col items-center justify-center gap-4 p-4 sm:p-8"
          style={{ background: 'rgba(6,6,7,0.9)', backdropFilter: 'blur(6px)' }}
          onClick={() => setActive(null)}
        >
          <button
            aria-label="Close"
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-dim transition-colors hover:text-fg"
            onClick={() => setActive(null)}
          >
            <X size={18} />
          </button>
          <img
            src={active.image}
            alt={active.title || 'Gallery photo'}
            className="max-h-[82vh] max-w-full border border-line-soft object-contain"
            style={{ animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
            onClick={(e) => e.stopPropagation()}
          />
          {active.title && <p className="label text-center">{active.title}</p>}
        </div>
      )}
    </div>
  );
}

function MasonrySkeleton() {
  const heights = [220, 300, 260, 340, 240, 300];
  return (
    <div className="mt-14 columns-1 gap-3 sm:columns-2 lg:columns-3">
      {heights.map((h, i) => (
        <div
          key={i}
          className="mb-3 animate-pulse border border-line-soft bg-surface"
          style={{ height: h }}
        />
      ))}
    </div>
  );
}
