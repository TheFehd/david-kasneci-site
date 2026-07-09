import { useEffect, useState } from 'react';

const LINKS = [
  ['About', '#about'],
  ['Books', '#books'],
  ['Mentorship', '#mentorship'],
  ['Reviews', '#reviews'],
  ['Contact', 'https://369project.com/pages/contact'],
];

export default function Hero() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.documentElement.style.overflow = open ? 'hidden' : '';
    return () => { document.documentElement.style.overflow = ''; };
  }, [open]);

  return (
    <main className="hero" id="top">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__gradient" />

      <nav className="nav">
        <a className="nav__side" href="#about">About</a>
        <a className="nav__side" href="#books">Books</a>
        <a className="nav__side" href="#mentorship">Mentorship</a>
        <a className="nav__brand" href="#top">David Kasneci</a>
        <a className="nav__side" href="#reviews">Reviews</a>
        <a className="nav__side" href="https://369project.com/pages/contact">Contact</a>
      </nav>

      <button
        className={`nav__burger${open ? ' is-open' : ''}`}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        onClick={() => setOpen(!open)}
      >
        <i /><i />
      </button>

      <div className={`mobnav${open ? ' is-open' : ''}`} aria-hidden={!open}>
        <nav className="mobnav__links">
          {LINKS.map(([label, href], i) => (
            <a
              key={label}
              href={href}
              style={{ transitionDelay: open ? `${0.08 + i * 0.05}s` : '0s' }}
              onClick={() => setOpen(false)}
              {...(href.startsWith('http') ? { target: '_blank', rel: 'noreferrer' } : {})}
            >
              {label}
            </a>
          ))}
        </nav>
        <a
          className="mobnav__store"
          href="https://369project.com"
          target="_blank"
          rel="noreferrer"
          onClick={() => setOpen(false)}
        >
          Visit the store &rarr;
        </a>
      </div>

      <div className="hero__titleWrap">
        <h1 className="hero__title">David Kasneci</h1>
      </div>

      <div className="hero__subject" />

      <a className="hero__scroll" href="#about" aria-label="Scroll down">
        <svg viewBox="0 0 26 16" aria-hidden="true">
          <path d="M1 1 L13 13 L25 1" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </a>
    </main>
  );
}
