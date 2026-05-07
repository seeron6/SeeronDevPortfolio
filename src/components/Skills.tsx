import DetailView from './DetailView';

const groups = [
  { label: 'Languages',  items: ['C++', 'C', 'Verilog', 'Python', 'Java', 'SQL', 'JavaScript', 'HTML / CSS'] },
  { label: 'Frameworks', items: ['React', 'Express', 'Node', 'Flask', 'JUnit', 'PyTest', 'TensorFlow', 'PyTorch'] },
  { label: 'Tools',      items: ['Docker', 'Git', 'Jira', 'AWS', 'Google Cloud', 'VS Code', 'Quartus', 'SolidWorks'] },
];

export default function Skills() {
  return (
    <DetailView id="skills" chapter="Chapter III" title="The Tools at Hand">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10 md:gap-14">
        {groups.map((g, i) => (
          <div
            key={g.label}
            style={{ animationDelay: `${0.4 + i * 0.12}s` }}
            className="fade-up text-center md:text-left"
          >
            <div className="script-formal text-ink text-2xl md:text-3xl mb-4">{g.label}</div>
            <ul className="space-y-2 serif italic text-ink-soft text-base md:text-lg">
              {g.items.map((item) => (
                <li key={item} className="flex items-baseline gap-3 justify-center md:justify-start">
                  <span className="text-ink-faded text-xs">✦</span>
                  {item}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </DetailView>
  );
}
