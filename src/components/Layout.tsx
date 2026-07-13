import { useEffect, useState } from 'react';
import { Link, NavLink, Outlet } from 'react-router-dom';
import { Github, Linkedin, Mail } from 'lucide-react';

const NAV = [
  { to: '/', label: 'Journal', end: true },
  { to: '/projects', label: 'Projects', end: false },
  { to: '/experience', label: 'Experience', end: false },
  { to: '/about', label: 'About', end: false },
  { to: '/contact', label: 'Contact', end: false },
];

const EMAIL = 'seeron.sivashankar@mail.utoronto.ca';
const GITHUB = 'https://github.com/seeron6';
const LINKEDIN = 'https://linkedin.com/in/seeron-sivashankar';

function Header() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header
      className="sticky top-0 z-40 transition-all duration-500"
      style={{
        background: scrolled ? 'rgba(10,10,11,0.72)' : 'transparent',
        backdropFilter: scrolled ? 'blur(14px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--color-line-soft)' : '1px solid transparent',
      }}
    >
      <div
        className="mx-auto flex flex-col items-center gap-3 transition-all duration-500"
        style={{ padding: scrolled ? '14px 20px' : '30px 20px 20px' }}
      >
        <Link
          to="/"
          className="script leading-none text-fg transition-transform duration-500 hover:scale-[1.03]"
          style={{ fontSize: scrolled ? '1.9rem' : '2.5rem' }}
          aria-label="Home"
        >
          Seeron
        </Link>
        <nav className="flex flex-wrap items-center justify-center gap-x-7 gap-y-2">
          {NAV.map((item) => (
            <NavLink key={item.to} to={item.to} end={item.end}>
              {({ isActive }) => (
                <span className="nav-link" data-active={isActive}>
                  {item.label}
                </span>
              )}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
}

function Footer() {
  return (
    <footer className="mt-28 border-t border-line">
      <div className="mx-auto flex max-w-6xl flex-col items-center gap-6 px-6 py-14 text-center">
        <Link to="/" className="script text-3xl text-fg">
          Seeron
        </Link>
        <div className="flex items-center gap-5">
          <a
            href={GITHUB}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
            className="text-fg-faint transition-colors duration-300 hover:text-fg"
          >
            <Github size={19} strokeWidth={1.5} />
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
            className="text-fg-faint transition-colors duration-300 hover:text-fg"
          >
            <Linkedin size={19} strokeWidth={1.5} />
          </a>
          <a
            href={`mailto:${EMAIL}`}
            aria-label="Email"
            className="text-fg-faint transition-colors duration-300 hover:text-fg"
          >
            <Mail size={19} strokeWidth={1.5} />
          </a>
        </div>
        <p className="label" style={{ letterSpacing: '0.18em' }}>
          © {new Date().getFullYear()} Seeron Sivashankar
        </p>
      </div>
    </footer>
  );
}

export default function Layout() {
  return (
    <div className="grain min-h-screen">
      <Header />
      <main className="relative z-[2]">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export { EMAIL, GITHUB, LINKEDIN };
