import { useEffect, useRef, useState } from 'react';

type Props = {
  children: string;
  className?: string;
  /** ms between characters */
  charDelay?: number;
  /** ms before reveal starts after the element scrolls into view */
  startDelay?: number;
};

/**
 * Laser-writing reveal — characters appear one at a time with a glowing
 * red laser cursor that rides the writing tip. Recently-revealed
 * characters retain a brief warm glow that fades to ink as the laser
 * moves on.
 *
 * The animation only starts when the element scrolls into the viewport,
 * so the user actually sees the laser draw rather than arriving to text
 * that already finished writing itself elsewhere on the page.
 */
export default function InkText({
  children,
  className = '',
  charDelay = 26,
  startDelay = 60,
}: Props) {
  const text = children;
  const ref = useRef<HTMLParagraphElement | null>(null);
  const [count, setCount] = useState(0);
  const [armed, setArmed] = useState(false);

  // Wait until the paragraph scrolls into view (or is already in view at
  // mount) before kicking off the writing animation.
  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Already in viewport? Arm immediately.
    const r = el.getBoundingClientRect();
    if (r.top < window.innerHeight && r.bottom > 0) {
      setArmed(true);
      return;
    }

    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setArmed(true);
          obs.disconnect();
        }
      },
      { rootMargin: '0px 0px -10% 0px' }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    if (!armed) return;
    let cancelled = false;
    const timer = setTimeout(() => {
      const tick = () => {
        if (cancelled) return;
        setCount((c) => {
          const next = c + 1;
          if (next < text.length) setTimeout(tick, charDelay);
          return next;
        });
      };
      tick();
    }, startDelay);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [armed, text, charDelay, startDelay]);

  // The "recent glow" tail — the most recently revealed N characters get
  // the warm wax-red colour, fading to ink behind the laser.
  const RECENT_TAIL = 5;

  return (
    <p ref={ref} className={`laser-text ${className}`} aria-label={text}>
      {[...text].map((ch, i) => {
        const lit = i < count;
        const isCursor = lit && i === count - 1 && count < text.length;
        const recent = lit && count - i <= RECENT_TAIL && count < text.length;

        if (ch === ' ') {
          return (
            <span
              key={i}
              aria-hidden="true"
              className={`laser-char ${lit ? 'lit' : ''}`}
            >
              {' '}
            </span>
          );
        }
        return (
          <span
            key={i}
            aria-hidden="true"
            className={[
              'laser-char',
              lit ? 'lit' : '',
              recent ? 'recent' : '',
              isCursor ? 'cursor' : '',
            ].filter(Boolean).join(' ')}
          >
            {ch}
          </span>
        );
      })}
    </p>
  );
}
