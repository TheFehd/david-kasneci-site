import { Routes, Route, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Hero from './components/Hero.jsx';
import ProjectsWall from './components/ProjectsWall.jsx';
import About from './components/About.jsx';
import Books369 from './components/Books369.jsx';
import FinalCall from './components/FinalCall.jsx';
import Background from './components/Background.jsx';
import Pillars from './components/Pillars.jsx';
import Initiation from './components/Initiation.jsx';
import Proof from './components/Proof.jsx';
import StickyBar from './components/StickyBar.jsx';
import Footer from './components/Footer.jsx';
import GradualBlur from './components/GradualBlur.jsx';
import MentorshipPage from './components/MentorshipPage.jsx';
import WealthPage from './components/WealthPage.jsx';
import Btn from './components/Btn.jsx';
import { useMotion } from './hooks/useMotion.js';

const META = {
  '/': ['David Kasneci — Author of Project 369',
    'Author of the Project 369 book series and founder of Higher Mind Publishing. 8 published works, 3,997 verified reviews, 4.9 average.'],
  '/mentorship': ['Work 1–1 with David Kasneci — Private Mentorship',
    'A minimum three-month private mentorship container. Business, relationships, healing, health, spirit and direction — by application.'],
  '/wealth': ['Wealth Consciousness — 30-Day Mastermind · David Kasneci',
    'Manifest stable, scalable income in 30 days. Six phases, live weekly calls, systems and templates. $1,997 today.'],
};

function NotFound() {
  return (
    <section className="nf">
      <span className="nf__code fx">404</span>
      <h1 className="nf__title">This page hasn&rsquo;t been written yet.</h1>
      <Btn solid to="/">Back to the beginning</Btn>
    </section>
  );
}

function Home() {
  return (
    <>
      <Hero />
      <ProjectsWall />
      <Books369 />
      <About />
      <Pillars />
      <Initiation />
      <Proof />
      <FinalCall />
      <StickyBar />
    </>
  );
}

export default function App() {
  const { pathname } = useLocation();
  useMotion(pathname);

  useEffect(() => {
    window.scrollTo(0, 0);
    const [title, desc] = META[pathname] || META['/'];
    document.title = title;
    const m = document.querySelector('meta[name="description"]');
    if (m) m.setAttribute('content', desc);
  }, [pathname]);

  return (
    <>
      <a className="skiplink" href="#books">Skip to content</a>
      <Background />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/mentorship" element={<MentorshipPage />} />
        <Route path="/wealth" element={<WealthPage />} />
        <Route path="*" element={<NotFound />} />
      </Routes>
      <Footer />
      <GradualBlur />

      {/* single reusable star glyph for the testimonial ratings */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="star" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 18.896l-7.335 3.857 1.401-8.169L.132 9.21l8.2-1.192z" />
        </symbol>
      </svg>
    </>
  );
}
