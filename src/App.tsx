import { Routes, Route, Link } from 'react-router-dom';
import Layout from './components/Layout';
import ScrollToTop from './components/ScrollToTop';
import Home from './pages/Home';
import JournalPost from './pages/JournalPost';
import Projects from './pages/Projects';
import Gallery from './pages/Gallery';
import Experience from './pages/Experience';
import About from './pages/About';
import Contact from './pages/Contact';
import Admin from './pages/Admin';

function NotFound() {
  return (
    <div className="mx-auto max-w-3xl px-6 py-28 text-center">
      <p className="script text-fg-faint" style={{ fontSize: '4rem' }}>
        404
      </p>
      <h1 className="font-display mt-2 text-fg" style={{ fontSize: '2rem' }}>
        This page wandered off.
      </h1>
      <Link to="/" className="btn mt-8">
        Back to journal
      </Link>
    </div>
  );
}

export default function App() {
  return (
    <>
      <ScrollToTop />
      <Routes>
        <Route element={<Layout />}>
          <Route path="/" element={<Home />} />
          <Route path="/journal/:id" element={<JournalPost />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/gallery" element={<Gallery />} />
          <Route path="/experience" element={<Experience />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/admin" element={<Admin />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </>
  );
}
