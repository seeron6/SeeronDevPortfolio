import { experience } from '../data/experience';
import Reveal from '../components/Reveal';

export default function Experience() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-4 md:pt-16">
      <Reveal>
        <p className="label mb-5">Where I&apos;ve worked</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.02 }}>
          Experience.
        </h1>
      </Reveal>

      <div className="mt-16">
        {experience.map((role, i) => (
          <Reveal key={role.company} delay={i * 60}>
            <div
              className="relative pb-14 pl-8"
              style={{ borderLeft: '1px solid var(--color-line)' }}
            >
              <span
                className="absolute left-0 top-1.5 h-2.5 w-2.5 -translate-x-[5px] rounded-full"
                style={{ background: 'var(--color-accent)' }}
              />
              <p className="label" style={{ letterSpacing: '0.16em' }}>
                {role.period} · {role.location}
              </p>
              <h2 className="font-display mt-2 text-fg" style={{ fontSize: '1.9rem', lineHeight: 1.15 }}>
                {role.title}
              </h2>
              <p className="mt-1 text-fg-dim">
                {role.company}
                {role.team ? <span className="text-fg-faint"> · {role.team}</span> : null}
              </p>
              <ul className="mt-5 flex flex-col gap-3">
                {role.points.map((p, j) => (
                  <li key={j} className="flex gap-3 text-fg-dim" style={{ lineHeight: 1.65 }}>
                    <span style={{ color: 'var(--color-accent)' }}>—</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
