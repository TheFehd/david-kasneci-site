import { useEffect, useState } from 'react';

/* Slim buy bar — slides in once the visitor has seen the books,
   stays out of the way, dismissible. */

const BUNDLE_URL = 'https://369project.com/products/the-ultimate-manifestation-bundle';

export default function StickyBar() {
  const [show, setShow] = useState(false);
  const [dismissed, setDismissed] = useState(() => sessionStorage.getItem('p369barhide') === '1');

  useEffect(() => {
    if (dismissed) return;
    let ticking = false;
    const onScroll = () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const books = document.getElementById('books');
        setShow(books ? window.scrollY > books.offsetTop + books.offsetHeight * 0.5 : false);
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <div className={`buybar${show ? ' is-in' : ''}`} role="complementary" aria-label="Get the collection">
      <img className="buybar__icon" src="/assets/369/icons/books.jpg" alt="" />
      <div className="buybar__text">
        <span className="buybar__name">The Manifestation Bundle</span>
        <span className="buybar__sub">All three keys &middot; from $33.33 &middot; free US shipping over $50</span>
      </div>
      <a className="buybar__btn" href={BUNDLE_URL} target="_blank" rel="noreferrer">Get the bundle</a>
      <button
        className="buybar__close"
        aria-label="Dismiss"
        onClick={() => { sessionStorage.setItem('p369barhide', '1'); setDismissed(true); }}
      >
        &times;
      </button>
    </div>
  );
}
