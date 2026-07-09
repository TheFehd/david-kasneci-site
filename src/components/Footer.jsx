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
  return (
    <footer className="footer">
      <div className="footer__inner">
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
