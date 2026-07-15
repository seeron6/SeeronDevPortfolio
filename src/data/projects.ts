import sage from '../assets/projects/sage.png';
import revenant from '../assets/projects/revenant.png';
import fortyNinth from '../assets/projects/49th.png';
import nanotrade from '../assets/projects/nanotrade.png';

export interface Project {
  id: string;
  sort_order?: number;
  title: string;
  award: string;
  date: string;
  tags: string[];
  image: string;
  summary: string;
  highlights: string[];
  link?: string;
}

/** Fallback / seed data. Live content is edited in the admin and stored in Neon. */
export const projects: Project[] = [
  {
    id: 'sage',
    title: 'Sage',
    award: 'Winner · Cloudinary Track, LA Hacks',
    date: 'Apr 2026',
    tags: ['Multi-Agent Systems', 'Cloudinary', 'Node.js', 'React'],
    image: sage,
    summary:
      'A multi-agent Socratic learning network that orchestrates complex reasoning through a decentralized node architecture.',
    highlights: [
      'Orchestrates complex reasoning tasks across a decentralized node architecture to build adaptive educational paths.',
      'Integrated Cloudinary for dynamic media optimization and delivery within the agentic workflow, with high-performance asset handling for multi-modal reasoning results.',
    ],
  },
  {
    id: 'revenant',
    title: 'Revenant',
    award: 'Winner · Most Efficient Memory, GenAI Genesis',
    date: 'Mar 2026',
    tags: ['FastAPI', 'Moorcheh AI', 'Tavus', 'ElevenLabs'],
    image: revenant,
    summary:
      'A human-reviewed knowledge promotion system that surfaces high-signal engineering patterns across a team.',
    highlights: [
      'Promotion Engine uses recursive semantic routing to extract high-signal engineering patterns and route candidates through a structured review step.',
      'Multi-namespace memory architecture ensures schema-consistent outputs when the AI avatar surfaces team-wide insights.',
      'Integrated Tavus AI and ElevenLabs for real-time voice mentorship.',
    ],
  },
  {
    id: '49th',
    title: '49th',
    award: 'Winner · 3rd Place + Google AI Track, Hack Canada',
    date: 'Mar 2026',
    tags: ['Gemini 2.5 Flash', 'Playwright', 'Claude Vision', 'Auth0'],
    image: fortyNinth,
    summary:
      'A WhatsApp-native AI assistant that turns messy conversation into structured newcomer roadmaps.',
    highlights: [
      'Built on Gemini 2.5 Flash to generate structured newcomer roadmaps from unstructured conversational input with persistent user context.',
      'Redesigned NanoClaw with Playwright + Claude Vision to autonomously extract and structure data from government websites into schema-conformant records.',
    ],
  },
  {
    id: 'nanotrade',
    title: 'NanoTrade ASIC',
    award: 'Winner · 3rd Place Overall, UofT IEEE Hackathon',
    date: 'Feb 2026',
    tags: ['Verilog', 'Sky130', 'TinyTapeout'],
    image: nanotrade,
    summary:
      'A hardware-native market surveillance engine that detects financial anomalies at the silicon level.',
    highlights: [
      'Detects price spikes and quote stuffing at the silicon level with 80ns detection latency.',
      'Telemetry pipeline processes raw exchange feeds with hardware-accelerated pattern matching to filter market noise before software-level analysis.',
    ],
  },
];
