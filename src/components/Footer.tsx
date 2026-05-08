import { Linkedin, Github, Instagram, type LucideIcon } from 'lucide-react';
import DetailView from './DetailView';
import InkText from './InkText';

const links: { label: string; href: string; Icon: LucideIcon }[] = [
  { label: 'LinkedIn',  href: 'https://www.linkedin.com/in/seeron-sivashankar/', Icon: Linkedin  },
  { label: 'GitHub',    href: 'https://github.com/seeron6',                       Icon: Github    },
  { label: 'Instagram', href: 'https://www.instagram.com/seeronsiva',             Icon: Instagram },
];

export default function Footer() {
  return (
    <DetailView id="contact" chapter="Chapter VI" title="A Letter, in Closing">
      <div className="max-w-3xl mx-auto text-center">
        <InkText
          className="serif text-ink-soft text-lg md:text-xl leading-[1.9] mb-10"
          wordDelay={0.05}
        >
          {`Thank you for reading. If any of this resonated, whether it's a project you'd like to talk about, a problem you're trying to solve, or simply a hello, I would love to hear from you.`}
        </InkText>

        <div className="flex flex-col items-center gap-6 mb-12">
          <a
            href="mailto:seeron.sivashankar@mail.utoronto.ca"
            className="script-formal text-ink text-2xl md:text-3xl underline decoration-dotted underline-offset-[8px] decoration-ink-faded hover:text-wax transition-colors"
          >
            seeron.sivashankar@mail.utoronto.ca
          </a>
          <a
            href="tel:+16472824910"
            className="serif italic text-ink-faded text-base md:text-lg"
          >
            +1 (647) 282-4910
          </a>
        </div>

        <div className="ink-divider serif italic text-ink-faded my-8 max-w-md mx-auto">
          <span>elsewhere</span>
        </div>

        <div className="flex justify-center items-center gap-6 md:gap-8 mb-16">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={l.label}
              title={l.label}
              className="social-icon social-icon-lg text-ink-soft hover:text-wax transition-all"
            >
              <l.Icon strokeWidth={1.5} />
            </a>
          ))}
        </div>

        <div className="flex flex-col items-center gap-3">
          <div className="wax-seal">S</div>
          <div className="serif italic text-ink-faded text-sm smallcaps mt-2">
            sealed with care, MMXXVI
          </div>
        </div>
      </div>
    </DetailView>
  );
}
