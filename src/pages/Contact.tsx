import { Github, Linkedin, Mail, ArrowUpRight } from 'lucide-react';
import Reveal from '../components/Reveal';
import { EMAIL, GITHUB, LINKEDIN } from '../components/Layout';

const LINKS = [
  { label: 'Email', value: EMAIL, href: `mailto:${EMAIL}`, Icon: Mail, external: false },
  { label: 'LinkedIn', value: 'in/seeron-sivashankar', href: LINKEDIN, Icon: Linkedin, external: true },
  { label: 'GitHub', value: 'github.com/seeron6', href: GITHUB, Icon: Github, external: true },
];

export default function Contact() {
  return (
    <div className="mx-auto max-w-3xl px-6 pt-10 pb-4 md:pt-20">
      <Reveal>
        <p className="label mb-5">Say hello</p>
        <h1 className="font-display text-fg" style={{ fontSize: 'clamp(2.4rem, 6vw, 4.6rem)', lineHeight: 1.02 }}>
          Let&apos;s build something.
        </h1>
        <p className="prose-serif mt-6 max-w-xl text-fg-dim">
          Always up for a good conversation, new projects, hackathon teams, or
          just to trade notes. The fastest way to reach me is email.
        </p>
      </Reveal>

      <div className="mt-14 flex flex-col">
        {LINKS.map(({ label, value, href, Icon, external }, i) => (
          <Reveal key={label} delay={i * 70}>
            <a
              href={href}
              target={external ? '_blank' : undefined}
              rel={external ? 'noreferrer' : undefined}
              className="group flex items-center justify-between border-b border-line py-6 transition-colors hover:border-fg-faint"
            >
              <div className="flex items-center gap-5">
                <Icon size={20} strokeWidth={1.5} className="text-fg-faint transition-colors group-hover:text-fg" />
                <div>
                  <p className="label mb-1">{label}</p>
                  <p className="font-display text-fg" style={{ fontSize: '1.4rem' }}>
                    {value}
                  </p>
                </div>
              </div>
              <ArrowUpRight
                size={22}
                className="text-fg-faint transition-all duration-300 group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-fg"
              />
            </a>
          </Reveal>
        ))}
      </div>
    </div>
  );
}
