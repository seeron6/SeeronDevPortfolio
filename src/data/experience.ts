export interface Role {
  id?: string;
  sort_order?: number;
  company: string;
  team?: string;
  title: string;
  period: string;
  location: string;
  points: string[];
}

/** Fallback / seed data. Live content is edited in the admin and stored in Neon. */
export const experience: Role[] = [
  {
    company: 'SciMynd',
    team: 'via Brainweber Inc.',
    title: 'Founding Software Engineer',
    period: 'Mar 2025 – Present',
    location: 'Remote',
    points: [
      'One of the core developers of SciMynd Studio and Dashboards, pushing 30+ features and actively contributing to Studio development.',
      'Designed evaluation pipelines for AI-generated outputs, reducing output rejection rates by defining structured annotation schemas adopted across distributed review teams.',
      'Represented the company as an exhibitor at the AI4 Conference in Las Vegas, engaging 12,000+ attendees, researchers, and enterprise stakeholders.',
    ],
  },
  {
    company: 'OrthoPop',
    team: 'via Brainweber Inc.',
    title: 'Software Engineer',
    period: 'Oct 2024 – Mar 2025',
    location: 'Remote',
    points: [
      'Shipped a real-time Voice Chat AI feature with conversation threading and confidence-based routing; built the escalation layer that filtered low-confidence responses before user exposure.',
      'Developed structured usability and safety evaluation workflows to measure AI output quality, producing annotated test datasets that informed iterative model improvements.',
      'Defined data schemas and testing protocols so AI-generated clinical content met structured output standards for production deployment.',
    ],
  },
  {
    company: 'UCMAS Canada & Sri Lanka',
    title: 'Software Developer & Technical Lead',
    period: 'Jun 2020 – Nov 2025',
    location: 'Toronto, ON / Colombo, Sri Lanka',
    points: [
      'Managed and validated structured scoring pipelines processing 7,500+ competition results across national and international events, enforcing data integrity and auditability at scale.',
      'Designed a resource management system for 200+ assets with structured access controls, automated reminders, and human-verified approval workflows.',
      'Launched a companion application that reached 2,000+ downloads within its first five months.',
    ],
  },
];
