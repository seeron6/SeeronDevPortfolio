import DetailView from './DetailView';
import InkText from './InkText';
import orthopopImg from '../assets/orthopop-landing-page-image.jpg';

const entries = [
  {
    company: 'Brainweber Inc.',
    role: 'Software Consultant',
    period: 'May 2024 to Aug 2024',
    body:
      `Engineered a generative-AI voice-chat feature for a web application, increasing user engagement by roughly 40%. Refined the database architecture on Supabase, optimized Python API endpoints to shave 15% off latency, and authored the technical specification for the team's first scalable AI integration.`,
    tech: ['Generative AI', 'React', 'Supabase', 'Python'],
    image: orthopopImg,
    link: 'https://orthopop.ai/',
    linkLabel: 'orthopop.ai',
  },
  {
    company: 'UCMAS',
    role: 'Technical Lead & Developer',
    period: 'May 2020 to Jun 2023',
    body:
      `Directed the technical infrastructure for a national mental-arithmetic competition with over 3,500 competitors. Built scoring automation that processed 4,000+ results in real time, and contributed to a record entry in the Cholan Book of World Records.`,
    tech: ['Web', 'Database', 'Automation'],
    stats: [
      { value: '4,000+', label: 'Results Tabulated' },
      { value: '3,500+', label: 'Competitors' },
    ],
  },
];

export default function Experience() {
  return (
    <DetailView id="experience" chapter="Chapter I" title="Where I’ve Worked">
      <div className="space-y-14 md:space-y-20">
        {entries.map((e, i) => (
          <article
            key={i}
            style={{ animationDelay: `${0.4 + i * 0.15}s` }}
            className="fade-up grid grid-cols-1 md:grid-cols-[1.5fr_1fr] gap-8 md:gap-12 items-start"
          >
            <div>
              <div className="flex items-baseline justify-between mb-1 flex-wrap gap-x-3">
                <h3 className="script-formal text-ink text-3xl md:text-4xl">{e.company}</h3>
                <span className="serif italic text-ink-faded text-sm md:text-base smallcaps">
                  {e.period}
                </span>
              </div>
              <div className="serif italic text-ink-faded text-base md:text-lg mb-5">
                {e.role}
              </div>
              <InkText className="serif text-ink-soft text-base md:text-lg leading-[1.8] mb-5">
                {e.body}
              </InkText>
              <div className="flex flex-wrap gap-2">
                {e.tech.map((t) => (
                  <span key={t}
                    className="serif italic text-ink-faded text-sm border-b border-ink-faded/40 px-1 pb-px">
                    {t}
                  </span>
                ))}
              </div>
            </div>

            <div>
              {e.image && (
                <a href={e.link} target="_blank" rel="noopener noreferrer"
                  className="block parchment-frame group"
                  style={{ transform: 'rotate(1.2deg)' }}>
                  <img src={e.image} alt={e.company} className="block w-full h-auto"
                    style={{ filter: 'sepia(0.2) contrast(1.02)' }} />
                  <div className="flex justify-between items-center mt-2 px-1 serif italic text-ink-faded text-xs md:text-sm">
                    <span>project preview</span>
                    <span className="underline decoration-dotted underline-offset-4">{e.linkLabel} ↗</span>
                  </div>
                </a>
              )}
              {e.stats && (
                <div className="parchment-frame text-center" style={{ transform: 'rotate(-1deg)' }}>
                  <div className="py-6 px-4">
                    {e.stats.map((s, j) => (
                      <div key={j}>
                        <div className="script text-ink text-5xl md:text-6xl leading-none">{s.value}</div>
                        <div className="serif italic text-ink-faded text-sm smallcaps mt-1">{s.label}</div>
                        {j < e.stats!.length - 1 && (
                          <div className="ink-divider my-4">
                            <span className="text-ink-faded">❦</span>
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </article>
        ))}
      </div>
    </DetailView>
  );
}
