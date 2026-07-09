import { useEffect, useRef, useState } from 'react';
import MetallicPaint from './MetallicPaint.jsx';

const LINKS = [
  ['About', '/#about'],
  ['The Books', '/#books'],
  ['Reviews', '/#reviews'],
  ['1-1 Mentorship', '/mentorship'],
  ['Wealth Consciousness', '/wealth'],
  ['The Initiation', 'https://project369.com/initiationoffer-page'],
  ['Store', 'https://369project.com'],
  ['Blog', 'https://369project.com/blogs/manifestation-tips'],
  ['FAQ', 'https://369project.com/pages/faq'],
];

export default function Footer() {
  const ref = useRef(null);
  const [liquid, setLiquid] = useState(false);

  /* the metallic logo only exists (and animates) once the footer is
     actually on a capable desktop screen */
  useEffect(() => {
    const ok =
      window.matchMedia('(pointer: fine) and (min-width: 861px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!ok || !ref.current) return;
    const io = new IntersectionObserver(
      ([en]) => { if (en.isIntersecting) { setLiquid(true); io.disconnect(); } },
      { rootMargin: '200px' },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  return (
    <footer className="footer" ref={ref}>
      <div className="footer__inner">
        <div className="footer__logo" aria-label="Project 369">
          {liquid ? (
            <MetallicPaint
              imageSrc="/assets/369/logo-mark.png"
              speed={0.25}
              scale={2.4}
              liquid={0.6}
              refraction={0.012}
              brightness={1.9}
              contrast={0.55}
              tintColor="#e9e9e7"
              lightColor="#ffffff"
              darkColor="#000000"
            />
          ) : (
            <img src="/assets/369/logo-white.png" alt="" />
          )}
        </div>
        <div className="footer__brand">
          <span className="footer__name">David Kasneci</span>
          <span className="footer__house">Higher Mind Publishing</span>
        </div>
        <nav className="footer__links" aria-label="Footer">
          {LINKS.map(([label, href]) => (
            <a key={label} href={href} {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}>
              {label}
            </a>
          ))}
        </nav>
        <p className="footer__legal">
          &copy; 2026 David Kasneci &middot; Project 369&reg; &middot; All rights reserved.
        </p>
      </div>
    </footer>
  );
}
