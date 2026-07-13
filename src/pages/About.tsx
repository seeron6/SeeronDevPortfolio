import { Link } from 'react-router-dom';
import { FileText, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import portrait from '../assets/formalflick.jpg';

const SKILLS: { group: string; items: string }[] = [
  { group: 'Languages', items: 'Python · TypeScript · JavaScript · SQL · Swift · Java · C · C++ · Verilog' },
  { group: 'Frameworks', items: 'Next.js · React · FastAPI · Node.js · Django · tRPC · Three.js · GSAP' },
  { group: 'AI & Agents', items: 'Claude API · OpenAI Agents SDK · Gemini API · LangChain · LlamaIndex · Anthropic MCP · ElevenLabs · Tavus · Cloudinary' },
  { group: 'Tools', items: 'Git · Docker · PostgreSQL · Supabase · Redis · Vercel · AWS · Playwright · ASIC/FPGA' },
];

export default function About() {
  return (
    <div className="mx-auto max-w-4xl px-6 pt-10 pb-4 md:pt-16">
      <div className="grid grid-cols-1 gap-12 md:grid-cols-[1fr_1.3fr] md:items-start">
        <Reveal>
          <img
            src={portrait}
            alt="Seeron Sivashankar"
            className="w-full border border-line-soft"
            style={{ aspectRatio: '4 / 5', objectFit: 'cover' }}
          />
        </Reveal>

        <Reveal delay={90}>
          <p className="label mb-5">About</p>
          <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.4rem)', lineHeight: 1.05 }}>
            Seeron Sivashankar
          </h1>
          <div className="prose-serif mt-6">
            <p>
              I&apos;m a Computer Engineering student at the University of Toronto
              (BASc + PEY Co-op, 2024–2028) and a builder at heart — most at home
              somewhere between AI systems, hardware, and shipping products fast.
            </p>
            <p>
              I currently work as a Forward Development Engineer at SciMynd, where I
              design evaluation pipelines and structured data systems for AI outputs.
              On weekends I build at hackathons — and lately I&apos;ve been lucky
              enough to keep winning them. Next up: the Y Combinator Startup School
              Founder Program in San Francisco.
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <a href="/resume.pdf" target="_blank" rel="noreferrer" className="btn btn-solid">
              <FileText size={15} /> Résumé
            </a>
            <Link to="/contact" className="btn">
              Get in touch <ArrowUpRight size={15} />
            </Link>
          </div>
        </Reveal>
      </div>

      {/* Skills */}
      <Reveal>
        <div className="mt-20">
          <hr className="rule" />
          <div className="grid grid-cols-1 gap-8 pt-12 sm:grid-cols-2">
            {SKILLS.map((s) => (
              <div key={s.group}>
                <p className="label mb-3">{s.group}</p>
                <p className="text-fg-dim" style={{ lineHeight: 1.7 }}>
                  {s.items}
                </p>
              </div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
