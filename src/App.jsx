import Hero from './components/Hero.jsx';
import About from './components/About.jsx';
import Proof from './components/Proof.jsx';
import { useMotion } from './hooks/useMotion.js';

export default function App() {
  useMotion();
  return (
    <>
      <Hero />
      <About />
      <Proof />

      {/* single reusable star glyph for the testimonial ratings */}
      <svg width="0" height="0" style={{ position: 'absolute' }} aria-hidden="true">
        <symbol id="star" viewBox="0 0 24 24">
          <path d="M12 .587l3.668 7.431 8.2 1.192-5.934 5.784 1.401 8.169L12 18.896l-7.335 3.857 1.401-8.169L.132 9.21l8.2-1.192z" />
        </symbol>
      </svg>
    </>
  );
}
