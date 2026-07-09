import { useEffect, useState } from 'react';

/* Mini product card, pinned — cover art, live rating proof, anchored price,
   one solid CTA. Slides in after the visitor has met the books. */

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
        if (books && window.scrollY > books.offsetTop + books.offsetHeight * 0.5) {
          setShow(true); /* latches — no slide-out churn while scrolling */
          window.removeEventListener('scroll', onScroll);
        }
        ticking = false;
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, [dismissed]);

  if (dismissed) return null;

  return (
    <aside className={`buybar${show ? ' is-in' : ''}`} aria-label="The Complete Manifestation Bundle">
      <img className="buybar__cover" src="/assets/369/universe.jpg" alt="" aria-hidden="true" />
      <div className="buybar__text">
        <span className="buybar__name">The Complete Bundle</span>
        <span className="buybar__proof" aria-label="Rated 4.9 by 3,997 verified readers">
          <span className="buybar__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
          4.9 &middot; 3,997 readers
        </span>
      </div>
      <div className="buybar__price" aria-label="From $33.33, regular $88.88">
        <b>$33.33</b>
        <s>$88.88</s>
      </div>
      <a className="buybar__btn" href={BUNDLE_URL} target="_blank" rel="noreferrer">
        <span className="buybar__btnLong">Get the bundle</span>
        <span className="buybar__btnShort">$33.33 &rarr;</span>
      </a>
      <button
        className="buybar__close"
        aria-label="Dismiss"
        onClick={() => { sessionStorage.setItem('p369barhide', '1'); setDismissed(true); }}
      >
        &times;
      </button>
    </aside>
  );
}
