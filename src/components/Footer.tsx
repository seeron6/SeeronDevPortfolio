import DetailView from './DetailView';
import InkText from './InkText';

const links = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/seeron-sivashankar/' },
  { label: 'GitHub', href: 'https://github.com/seeron6' },
  { label: 'Instagram', href: 'https://www.instagram.com/seeronsiva' },
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

        <div className="flex justify-center gap-8 md:gap-12 mb-16">
          {links.map((l) => (
            <a
              key={l.label}
              href={l.href}
              target="_blank"
              rel="noopener noreferrer"
              className="serif italic text-ink-soft text-base md:text-lg hover:text-wax transition-colors smallcaps"
            >
              {l.label}
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
