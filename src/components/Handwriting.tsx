import { CSSProperties } from 'react';

type Props = {
  text: string;
  className?: string;
  duration?: number;
  delay?: number;
  showCaret?: boolean;
};

/**
 * Pure-CSS handwriting reveal — a left-to-right clip-path sweep over a
 * cursive font. Uses CSS keyframes (no React state) to be reliable.
 */
export default function Handwriting({
  text,
  className = '',
  duration = 2.4,
  delay = 0.15,
  showCaret = true,
}: Props) {
  const vars = {
    ['--dur' as any]: `${duration}s`,
    ['--del' as any]: `${delay}s`,
  } as CSSProperties;

  return (
    <span
      className={`relative inline-block whitespace-pre-wrap align-baseline ${className}`}
      style={{ lineHeight: 1.05 }}
    >
      {/* Faint guide */}
      <span aria-hidden className="block" style={{ color: 'rgba(42, 32, 24, 0.08)' }}>
        {text}
      </span>

      {/* Inked layer */}
      <span
        aria-hidden
        className="absolute inset-0 block hw-inked"
        style={{ color: 'inherit', ...vars }}
      >
        {text}
      </span>

      {/* The nib that rides the leading edge */}
      {showCaret && <span aria-hidden className="hw-nib" style={vars} />}

      <span className="sr-only">{text}</span>
    </span>
  );
}
