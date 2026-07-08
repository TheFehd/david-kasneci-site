import SplitWords from './SplitWords.jsx';

/* Closing call — 21st.dev AnimatedMarqueeHero pattern, rebuilt for this site:
   centered pitch over an infinite film-strip of David's real photos, covers
   and reader shots. Pure CSS marquee, monochrome grade. */

const IMAGES = [
  ['/assets/369/coach/biz.jpg', 'David on a call at his desk'],
  ['/assets/369/planner.jpg', 'The Manifestation Planner'],
  ['/assets/369/coach/love.jpg', 'David and his wife walking their dog'],
  ['/assets/369/universe.jpg', 'The Key to the Universe'],
  ['/assets/369/coach/heal.jpg', 'David in his garden'],
  ['/assets/369/reviews/rev06.jpg', 'A reader\u2019s photo of the books'],
  ['/assets/369/coach/health.jpg', 'David and his wife cooking'],
  ['/assets/369/wealth.jpg', 'The Key to Abundance'],
  ['/assets/369/coach/spirit.jpg', 'David in prayer'],
  ['/assets/369/reviews/rev13.jpg', 'A reader\u2019s planner'],
  ['/assets/369/coach/path.jpg', 'David in the library'],
  ['/assets/369/bliss.jpg', 'The Key to Enlightenment'],
];

export default function FinalCall() {
  return (
    <section className="fcall" id="apply">
      <div className="fcall__inner">
        <span className="fcall__tag reveal">One client at a time &middot; by application</span>
        <h2 className="fcall__title reveal reveal-w reveal--d1">
          <SplitWords text="Some chapters you don't write alone." />
        </h2>
        <p className="fcall__desc reveal reveal--d2">
          Six areas of work &mdash; business, love, healing, health, spirit, direction.
          The same six David rebuilt in his own life before he coached anyone through them.
          He takes a handful of people at a time, and every one of them starts the same way:
          a written application and an honest conversation.
        </p>
        <a
          className="fcall__btn reveal reveal--d3"
          href="https://project369.com/1-1-coaching"
          target="_blank"
          rel="noreferrer"
        >
          Apply for 1&ndash;1 mentorship
        </a>
      </div>

      <div className="fcall__marquee" aria-hidden="true">
        <div className="fcall__track">
          {[...IMAGES, ...IMAGES].map(([src, alt], i) => (
            <img src={src} alt={alt} loading="lazy" key={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
