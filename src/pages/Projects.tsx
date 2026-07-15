import { useEffect, useState } from 'react';
import { X } from 'lucide-react';
import { getProjects, type Project } from '../lib/projects';
import Reveal from '../components/Reveal';

function Bullet() {
  return (
    <span
      aria-hidden
      className="mt-2.5 h-px w-3 shrink-0"
      style={{ background: 'var(--color-accent)' }}
    />
  );
}

export default function Projects() {
  const [projects, setProjects] = useState<Project[] | null>(null);
  const [active, setActive] = useState<Project | null>(null);

  useEffect(() => {
    let alive = true;
    getProjects()
      .then((p) => alive && setProjects(p))
      .catch(() => alive && setProjects([]));
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
        <p className="label mb-5">Selected Work</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.02 }}>
          Projects &amp; wins.
        </h1>
        <p className="prose-serif mt-6 max-w-2xl text-fg-dim">
          Hackathon builds and side projects. Most shipped in a weekend, several
          walked away with a trophy.
        </p>
      </Reveal>

      {projects === null ? (
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="animate-pulse border border-line-soft bg-surface" style={{ aspectRatio: '3 / 2' }} />
          ))}
        </div>
      ) : (
        <div className="mt-14 grid grid-cols-1 gap-3 sm:grid-cols-2">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={(i % 2) * 90}>
              <button className="card group w-full text-left" onClick={() => setActive(project)}>
                <div className="card-media">
                  {project.image ? (
                    <img src={project.image} alt={project.title} loading="lazy" />
                  ) : (
                    <div className="img-placeholder">S</div>
                  )}
                </div>
                <div className="card-caption">
                  <h3 className="card-title">{project.title}</h3>
                  <p className="card-date">{project.award}</p>
                </div>
              </button>
            </Reveal>
          ))}
        </div>
      )}

      {active && <ProjectModal project={active} onClose={() => setActive(null)} />}
    </div>
  );
}

function ProjectModal({ project, onClose }: { project: Project; onClose: () => void }) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto p-4 sm:p-8"
      style={{ background: 'rgba(6,6,7,0.82)', backdropFilter: 'blur(6px)' }}
      onClick={onClose}
    >
      <div
        className="relative my-6 w-full max-w-2xl border border-line bg-bg-soft"
        style={{ animation: 'modalIn 0.4s cubic-bezier(0.16,1,0.3,1) both' }}
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          aria-label="Close"
          className="absolute right-4 top-4 z-10 flex h-9 w-9 items-center justify-center rounded-full border border-line bg-bg-soft text-fg-dim transition-colors hover:text-fg"
        >
          <X size={17} />
        </button>
        {project.image && (
          <div className="aspect-[3/2] w-full overflow-hidden border-b border-line">
            <img src={project.image} alt={project.title} className="h-full w-full object-cover" />
          </div>
        )}
        <div className="p-7 sm:p-9">
          <p className="label mb-3" style={{ color: 'var(--color-accent)' }}>
            {project.award}
            {project.date ? ` · ${project.date}` : ''}
          </p>
          <h2 className="font-display text-fg" style={{ fontSize: 'clamp(1.9rem, 4vw, 2.8rem)', lineHeight: 1.05 }}>
            {project.title}
          </h2>
          {project.summary && <p className="prose-serif mt-4">{project.summary}</p>}
          {project.highlights.length > 0 && (
            <ul className="mt-6 flex flex-col gap-3">
              {project.highlights.map((h, i) => (
                <li key={i} className="flex gap-3 text-fg-dim" style={{ lineHeight: 1.6 }}>
                  <Bullet />
                  <span>{h}</span>
                </li>
              ))}
            </ul>
          )}
          {project.tags.length > 0 && (
            <div className="mt-7 flex flex-wrap gap-2">
              {project.tags.map((t) => (
                <span
                  key={t}
                  className="rounded-full border border-line px-3 py-1 text-xs text-fg-dim"
                  style={{ letterSpacing: '0.06em' }}
                >
                  {t}
                </span>
              ))}
            </div>
          )}
          {project.link && (
            <a href={project.link} target="_blank" rel="noreferrer" className="btn mt-7">
              Visit project
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
