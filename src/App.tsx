import { ViewProvider, useView } from './components/ViewContext';
import Desk from './components/Desk';
import Scroll from './components/Scroll';
import BottomNav from './components/BottomNav';
import Overview from './components/Overview';

function ScrollWrapper() {
  const { view } = useView();
  const mode = view === 'overview' ? 'overview-mode' : 'focus-mode';
  return (
    <Scroll scrollKey={view}>
      <div className={mode} data-focused-section={view}>
        <Overview />
      </div>
    </Scroll>
  );
}

export default function App() {
  return (
    <ViewProvider>
      <Desk>
        <ScrollWrapper />
        <BottomNav />
      </Desk>
    </ViewProvider>
  );
}
