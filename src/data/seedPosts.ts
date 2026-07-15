import type { Post } from '../lib/posts';

import sage from '../assets/projects/sage.png';
import revenant from '../assets/projects/revenant.png';
import fortyNinth from '../assets/projects/49th.png';
import nanotrade from '../assets/projects/nanotrade.png';
import ai4 from '../assets/EmploymentRun.jpg';
import yc from '../assets/lockedin.jpg';

/**
 * Seed journal entries, shown until Supabase is connected (and as a graceful
 * fallback if it's ever unreachable). Once the admin adds real posts these are
 * no longer used. Newest first.
 */
export const seedPosts: Post[] = [
  {
    id: 'yc-startup-school',
    date: '2026-07-01',
    title: 'Heading to Y Combinator Startup School',
    description:
      'Accepted into the YC Startup School Founder Program in San Francisco. Spending the next stretch turning a rough idea into something people can actually use, talking to users, shipping fast, and learning what it really takes to build a company from zero.',
    images: [yc],
  },
  {
    id: 'la-hacks-sage',
    date: '2026-04-15',
    title: 'Won the Cloudinary Track at LA Hacks',
    description:
      'Built Sage, a multi-agent Socratic learning network that orchestrates complex reasoning across a decentralized node architecture to generate adaptive educational paths. We wired Cloudinary in for dynamic media optimization across the agentic workflow and took home the Cloudinary track.',
    images: [sage],
  },
  {
    id: 'genai-genesis-revenant',
    date: '2026-03-22',
    title: 'Most Efficient Memory, GenAI Genesis',
    description:
      'Revenant is a human-reviewed knowledge promotion system: a Promotion Engine using recursive semantic routing pulls high-signal engineering patterns out of the noise and routes them through a structured review step. A multi-namespace memory architecture keeps the AI avatar\'s answers schema-consistent, with Tavus + ElevenLabs for real-time voice mentorship.',
    images: [revenant],
  },
  {
    id: 'hack-canada-49th',
    date: '2026-03-08',
    title: '3rd Place + Google AI Track at Hack Canada',
    description:
      'Shipped 49th, a WhatsApp-native AI assistant built on Gemini 2.5 Flash that turns messy conversational input into structured newcomer roadmaps with persistent context. Also rebuilt NanoClaw with Playwright + Claude Vision to autonomously extract structured data from government websites.',
    images: [fortyNinth],
  },
  {
    id: 'ieee-nanotrade',
    date: '2026-02-16',
    title: 'Silicon-level market surveillance, 3rd Overall',
    description:
      'NanoTrade ASIC: a hardware-native market surveillance engine written in Verilog that detects financial anomalies, price spikes, quote stuffing, at the silicon level with 80ns detection latency. Built a telemetry pipeline with hardware-accelerated pattern matching to filter market noise before any software ever sees it.',
    images: [nanotrade],
  },
  {
    id: 'ai4-vegas',
    date: '2025-08-12',
    title: 'Exhibiting at AI4 in Las Vegas',
    description:
      'Represented SciMynd as an exhibitor at the AI4 Conference in Las Vegas, demoing our product to 12,000+ attendees, researchers, and enterprise stakeholders. Three days of nonstop conversations about evaluation pipelines and structured data generation for AI systems.',
    images: [ai4],
  },
];
