export default function Hero() {
  return (
    <main className="hero" id="top">
      <div className="hero__bg" />
      <div className="hero__overlay" />
      <div className="hero__gradient" />

      <nav className="nav">
        <a className="nav__side" href="#about">About</a>
        <a className="nav__side" href="#practice">Practice</a>
        <a className="nav__side" href="#books">Books</a>
        <a className="nav__brand" href="#top">David Kasneci</a>
        <a className="nav__side" href="#reviews">Reviews</a>
        <a className="nav__side" href="https://369project.com/pages/contact">Contact</a>
      </nav>

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
