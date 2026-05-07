import { motion, LayoutGroup } from 'framer-motion';
import { useView, VIEWS } from './ViewContext';

export default function BottomNav() {
  const { view, setView } = useView();

  return (
    <nav className="nav-pill nav-in" aria-label="Section navigation">
      <LayoutGroup id="nav">
        {VIEWS.map((v) => {
          const active = view === v.id;
          const Icon = v.Icon;
          return (
            <button
              key={v.id}
              type="button"
              onClick={() => setView(v.id)}
              className={`nav-item ${active ? 'nav-item-active' : ''}`}
              aria-current={active ? 'page' : undefined}
              aria-label={v.label}
              title={v.label}
            >
              {active && (
                <motion.span
                  layoutId="nav-indicator"
                  className="nav-item-indicator"
                  transition={{ type: 'spring', stiffness: 320, damping: 30 }}
                />
              )}
              <Icon className="nav-icon" strokeWidth={1.6} />
            </button>
          );
        })}
      </LayoutGroup>
    </nav>
  );
}
