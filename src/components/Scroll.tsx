import { ReactNode, useEffect, useRef } from 'react';

/**
 * The scroll. The user-provided scroll.jpg fills the viewport (object-fit:
 * cover). On portrait viewports the image rotates 90° so the scroll runs
 * vertically. Content sits inside the parchment area.
 */
export default function Scroll({
  children,
  scrollKey,
}: {
  children: ReactNode;
  scrollKey?: string | number;
}) {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) contentRef.current.scrollTop = 0;
  }, [scrollKey]);

  return (
    <div className="scene">
      <div className="scroll-frame">
        <img
          src="/scroll.jpg"
          alt=""
          aria-hidden
          className="scroll-bg-img"
          draggable={false}
        />
      </div>
      <div className="scroll-content" ref={contentRef}>
        {children}
      </div>
    </div>
  );
}
