import DetailView from './DetailView';
import InkText from './InkText';

import sageImg       from '../assets/projects/sage.png';
import nanotradeImg  from '../assets/projects/nanotrade.png';
import revenantImg   from '../assets/projects/revenant.png';
import fortyninthImg from '../assets/projects/49th.png';
import praesidiaImg  from '../assets/projects/praesidia.png';
import sidequestImg  from '../assets/projects/sidequest.png';
import ucmasImg      from '../assets/ucmassl_Tusgu.jpg';
import employmentImg from '../assets/EmploymentRun.jpg';
import medscopeImg   from '../assets/medscope.jpg';

type Project = {
  n: string;
  title: string;
  medium: string;
  award?: string;
  badge?: string;
  body: string;
  image: string;
  link: string;
  rotate: number;
};

/* Order: hackathon winners first, then other devpost work, then existing
   personal/work projects, with Medscope as the closing entry. */
const projects: Project[] = [
  {
    n: 'I',
    title: 'Sage',
    medium: 'Next.js · FastAPI · Groq',
    award: 'LA Hacks 2026 — Cloudinary Company Challenge',
    body: `An AI tutoring platform that bridges teachers and students with adaptive, multimodal lessons grounded in your own curriculum — voice support, multiple explanation modes, and interactive content rendered with KaTeX, Mermaid, and React Three Fiber.`,
    image: sageImg,
    link: 'https://devpost.com/software/sage-yvlpqb',
    rotate: -1.5,
  },
  {
    n: 'II',
    title: 'NanoTrade',
    medium: 'Verilog · Skywater 130nm ASIC',
    award: 'UofT IC Hackathon — 3rd Place',
    body: `An application-specific integrated circuit that detects financial market crashes in 80 nanoseconds, monitoring multiple anomaly types in parallel. Implemented in Verilog on Skywater 130nm via Tiny Tapeout.`,
    image: nanotradeImg,
    link: 'https://devpost.com/software/nanotrade',
    rotate: 1.2,
  },
  {
    n: 'III',
    title: 'Revenant',
    medium: 'AI memory · pgvector · RAG',
    award: 'GenAI Genesis 2026 — Best AI Application (Memory)',
    body: `An AI system that captures the work habits of senior engineers and makes that institutional knowledge available to new hires through a personalized avatar. Built on FastAPI, PostgreSQL with pgvector, Moorcheh AI memory, and ElevenLabs.`,
    image: revenantImg,
    link: 'https://devpost.com/software/revenent',
    rotate: -0.8,
  },
  {
    n: 'IV',
    title: '49th',
    medium: 'WhatsApp · Claude · Playwright',
    award: 'Hack Canada 2026 — 3rd Overall · Google "Build with AI"',
    body: `An end-to-end AI settlement assistant that helps newcomers to Canada navigate forms, taxes, and SIN applications via WhatsApp — multilingual, voice-first, with Playwright agents handling the paperwork.`,
    image: fortyninthImg,
    link: 'https://devpost.com/software/hack-canada-2026',
    rotate: 1.5,
  },
  {
    n: 'V',
    title: 'Praesidia',
    medium: 'AI compliance · Electron · Claude',
    body: `An AI governance platform that detects compliance violations in developer workflows in real time and delivers personalized video interventions through an Electron overlay. Stack: Claude, K2-Think, Tavus, Resend, Node, React, Django, Supabase.`,
    image: praesidiaImg,
    link: 'https://devpost.com/software/praesidia',
    rotate: -1,
  },
  {
    n: 'VI',
    title: 'SideQuest',
    medium: 'iOS · SwiftUI · Gemini',
    body: `A native iOS travel app that generates discovery-focused routes — scenic detours, cultural stops, AI voice guides, and gamified challenges. Built with SwiftUI, Gemini AI, ElevenLabs, Google Maps, Supabase, and Solana for NFT badges.`,
    image: sidequestImg,
    link: 'https://devpost.com/software/sidequest-0iysgt',
    rotate: 1.2,
  },
  {
    n: 'VII',
    title: 'UCMAS Sri Lanka & TUSGU',
    medium: 'Web Speech API · Supabase',
    badge: '1,000+ active users',
    body: `A practice web-app for mental arithmetic, built for the same community I once competed in. Real-time scoring, voice prompts, and a cloud-synced record of every session.`,
    image: ucmasImg,
    link: 'https://apps.apple.com/us/app/ucmas-sl-tusgu/id6757826021',
    rotate: -1.5,
  },
  {
    n: 'VIII',
    title: 'Employment Run',
    medium: 'FPGA · Verilog',
    body: `A small hardware game written for an Altera DE1 — collision detection, sprite logic, and a soundtrack of beeps. The kind of project where the joy is in the wires.`,
    image: employmentImg,
    link: 'https://www.linkedin.com/posts/seeron-sivashankar_fpga-verilog-hardwareengineering-activity-7401361285122260992-pvg1',
    rotate: 1.2,
  },
  {
    n: 'IX',
    title: 'Medscope',
    medium: 'OpenCV · Gemini',
    body: `An emergency-response generator built at NewHacks 2024. Computer vision identifies the situation; a language model drafts a calm, useful first response.`,
    image: medscopeImg,
    link: 'https://newhacks-2024.devpost.com/project-gallery?page=1',
    rotate: -0.8,
  },
];

export default function Projects() {
  return (
    <DetailView id="projects" chapter="Chapter II" title="Project Blocks">
      <div className="space-y-14 md:space-y-20">
        {projects.map((p, i) => (
          <a
            key={i}
            href={p.link}
            target="_blank"
            rel="noopener noreferrer"
            style={{ animationDelay: `${0.4 + i * 0.08}s` }}
            className={`fade-up grid grid-cols-1 md:grid-cols-[1fr_1.2fr] gap-6 md:gap-12 items-center group no-underline ${
              i % 2 === 1 ? 'md:[direction:rtl]' : ''
            }`}
          >
            <div
              className="parchment-frame transition-transform duration-700 group-hover:scale-[1.015]"
              style={{ transform: `rotate(${p.rotate}deg)`, direction: 'ltr' }}
            >
              <img
                src={p.image}
                alt={p.title}
                className="block w-full h-auto aspect-[4/3] object-cover"
                style={{ filter: 'sepia(0.12) contrast(1.02)' }}
              />
              <div className="flex justify-between items-center mt-2 px-1 serif italic text-ink-faded text-xs md:text-sm">
                <span>— project {p.n.toLowerCase()} —</span>
                <span className="underline decoration-dotted underline-offset-4">view ↗</span>
              </div>
            </div>

            <div style={{ direction: 'ltr' }}>
              <div className="script text-ink-faded text-6xl md:text-7xl leading-none mb-1 select-none">
                {p.n}
              </div>
              <h3 className="serif italic font-medium text-ink text-2xl md:text-3xl leading-tight mb-1">
                {p.title}
              </h3>
              <div className="serif italic text-ink-faded smallcaps text-xs md:text-sm mb-3">
                — {p.medium} —
              </div>

              {p.award && (
                <div
                  className="inline-block serif italic text-[11px] md:text-xs px-3 py-1 mb-4"
                  style={{
                    color: '#7a2418',
                    border: '1px solid rgba(155, 58, 42, 0.4)',
                    background: 'rgba(155, 58, 42, 0.08)',
                    borderRadius: '2px',
                    letterSpacing: '0.06em',
                  }}
                >
                  ★ {p.award}
                </div>
              )}

              {p.badge && (
                <div className="inline-block serif italic text-xs md:text-sm text-ink-soft mb-4 px-2 py-0.5 border-b border-ink-faded/40">
                  {p.badge}
                </div>
              )}

              <InkText className="serif text-ink-soft text-base md:text-lg leading-[1.7]">
                {p.body}
              </InkText>
            </div>
          </a>
        ))}
      </div>
    </DetailView>
  );
}
