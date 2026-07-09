import CountUp from './CountUp.jsx';
import Btn from './Btn.jsx';
import BlurText from './BlurText.jsx';

/* Verified reviews — every entry below is a real verified purchase scraped from
   the Project 369 store (Loox widget on 369project.com). Photos are the
   customers' own review photos. */

const STATS = { total: '3,997', avg: '4.9', fiveStar: 3689, breakdown: [
  [5, 3689], [4, 257], [3, 43], [2, 8], [1, 0],
]};

const PULL = {
  name: 'Linda D.',
  date: 'Jan 2026',
  product: 'Soul Work Journal',
  quote:
    'I had no job — I have a job. I had $10,000 of debt on credit cards — all paid for. I needed a new blue car — I got my new blue car. I stopped drinking 14 months ago. I could write a book about the positive changes since I started reading the Project 369 books.',
};

const VIDEO = {
  src: '/assets/369/reviews/video_tattianna.mp4',
  poster: '/assets/369/reviews/video_tattianna_poster.jpg',
  name: 'Tattianna T.',
  date: 'Feb 2026',
  product: 'Manifestation Bundle',
  quote:
    "I've always been grateful for Project 369. Very excited they upgraded the experience — with additions added to each book.",
};

const REVIEWS = [
  {
    photo: '/assets/369/reviews/rev04.jpg',
    name: 'Angela J.',
    date: 'Aug 2025',
    product: 'The Key to the Universe',
    watch: 'https://369project.com/products/369-manifestation-journal',
    quote:
      "I'm an atheist. I'm a skeptic. I read the book and everything made sense to me — I realized quickly I was able to create my future. I waited about a year to give this review, to see.",
  },
  {
    photo: '/assets/369/reviews/rev05.jpg',
    name: 'David B.',
    date: 'Aug 2025',
    product: 'The Key to the Universe',
    quote:
      'This book has really helped me fine-tune my powers of attraction through the 369 exercises. It has never been easier to create from my true desires.',
  },
  {
    photo: '/assets/369/reviews/rev00.jpg',
    name: 'Colleen W.',
    date: 'Jun 2026',
    product: 'The Prayer Journal',
    quote:
      'This book is deeply profound — I find myself without words to explain it. Project 369 was the catalyst and has set me on a life-changing course since.',
  },
  {
    photo: '/assets/369/reviews/rev09.jpg',
    name: 'Jose H.',
    date: 'Mar 2025',
    product: 'Meditation Bundle',
    watch: 'https://369project.com/products/the-complete-meditation-bundle-3-bonus-meditations',
    quote:
      'To say the Project 369 books have totally changed my life would be a massive understatement. I have brain injuries on both sides of my head — anxiety, depression. This did so much more than help.',
  },
  {
    photo: '/assets/369/reviews/rev11.jpg',
    name: 'Paul H.',
    date: 'Feb 2025',
    product: 'The Key to the Universe',
    quote:
      "I was skeptical at the start, but the daily practice really focused my mind. I needed a car with a poor credit rating — the broker who called me had 369 in the company name. Then they said yes.",
  },
  {
    photo: '/assets/369/reviews/rev06.jpg',
    name: 'Sherri C.',
    date: 'May 2025',
    product: 'Manifestation Bundle',
    quote:
      'I am on my third set of books. They came into my life during the most difficult situation I had ever faced. Using these journals daily, I have completely changed my life — I manifested my dream home.',
  },
  {
    photo: '/assets/369/reviews/rev12.jpg',
    name: 'Nancy C.',
    date: 'Sep 2024',
    product: 'The Key to Abundance',
    quote:
      "Started reading and journaling immediately. Easy to read and understand — you read, then journal your manifestations and visualizations daily. These books are going to expedite my dreams.",
  },
  {
    photo: '/assets/369/reviews/rev10.jpg',
    name: 'Byron H.',
    date: 'Mar 2025',
    product: 'Manifestation Planner',
    quote:
      "Dave came across as very down to earth. I've been working the program for about 4 months now, and it truly has been a paradigm shift for me.",
  },
  {
    photo: '/assets/369/reviews/rev13.jpg',
    name: 'Brigitte H.',
    date: 'Aug 2024',
    product: 'Scripture Edition',
    quote:
      'Divinely inspired, no doubt. David, your book teaches me by illuminating connections. I have quickly come to adore it.',
  },
  {
    photo: '/assets/369/reviews/rev03.jpg',
    name: 'Liz J.',
    date: 'Oct 2025',
    product: 'Scripture Edition',
    quote:
      'Project 369 gave me the language to articulate what I had always felt but could not express. Not just inspiration — a clear procedure to actually transform my thinking.',
  },
];

function Stars() {
  return (
    <span className="rw__stars" aria-label="5 out of 5 stars">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} aria-hidden="true"><use href="#star" /></svg>
      ))}
    </span>
  );
}

function Verified() {
  return (
    <span className="rw__verified">
      <svg viewBox="0 0 24 24" aria-hidden="true">
        <path d="M12 2l2.4 2.4 3.4-.5 1 3.3 3 1.7-1.3 3.1 1.3 3.1-3 1.7-1 3.3-3.4-.5L12 22l-2.4-2.4-3.4.5-1-3.3-3-1.7L3.5 12 2.2 8.9l3-1.7 1-3.3 3.4.5z" fill="currentColor" opacity=".28"/>
        <path d="M8.5 12.2l2.3 2.3 4.7-4.8" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
      Verified buyer
    </span>
  );
}

export default function Proof() {
  return (
    <section className="proof" id="reviews">
      <div className="proof__inner">
        <div className="proof__head">
          <span className="proof__label reveal">Verified reviews</span>
          <h2 className="proof__title"><BlurText text="3,997 readers wrote back." step={0.07} /></h2>
          <p className="proof__subnote reveal reveal--d2">
            Every review below is a verified purchase from the Project&nbsp;369 store,
            photographed by the reader who wrote it.
          </p>
        </div>

        {/* rating summary — the store's real breakdown */}
        <div className="rsum reveal">
          <div className="rsum__score">
            <CountUp className="rsum__avg" value={4.9} decimals={1} duration={1.6} />
            <Stars />
            <span className="rsum__count">
              <CountUp value={3997} duration={2} /> verified reviews
            </span>
          </div>
          <div className="rsum__bars" role="img" aria-label="Rating breakdown: 3,689 five star, 257 four star, 43 three star, 8 two star, 0 one star reviews">
            {STATS.breakdown.map(([star, n]) => (
              <div className="rsum__row" key={star}>
                <span className="rsum__star">{star}&#9733;</span>
                <span className="rsum__bar"><i style={{ width: `${Math.max((n / STATS.fiveStar) * 100, n ? 1.5 : 0)}%` }} /></span>
                <span className="rsum__n"><CountUp value={n} duration={1.6} /></span>
              </div>
            ))}
          </div>
        </div>

        {/* the one story that says everything */}
        <figure className="pullq reveal">
          <blockquote className="pullq__quote">
            <p>&ldquo;{PULL.quote}&rdquo;</p>
            <figcaption className="pullq__cap">
              <Stars />
              <span className="pullq__who">{PULL.name} &middot; {PULL.product} &middot; {PULL.date}</span>
              <Verified />
            </figcaption>
          </blockquote>
        </figure>

        {/* photo + video review wall */}
        <div className="rwall">
          <article className="rw reveal" key="video">
            <div className="rw__imgwrap">
              <video
                src={VIDEO.src}
                poster={VIDEO.poster}
                muted
                loop
                autoPlay
                playsInline
                preload="metadata"
                aria-label={`${VIDEO.name}'s video review of the ${VIDEO.product}`}
              />
              <span className="rw__vbadge">Video review</span>
            </div>
            <div className="rw__body">
              <Stars />
              <p className="rw__quote">&ldquo;{VIDEO.quote}&rdquo;</p>
              <div className="rw__meta">
                <span className="rw__name">{VIDEO.name}</span>
                <Verified />
              </div>
              <span className="rw__product">{VIDEO.product} &middot; {VIDEO.date}</span>
            </div>
          </article>

          {REVIEWS.map((r) => (
            <article className="rw reveal" key={r.name + r.date}>
              <div className="rw__imgwrap">
                <img src={r.photo} alt={`${r.name}'s photo of ${r.product}`} loading="lazy" />
              </div>
              <div className="rw__body">
                <Stars />
                <p className="rw__quote">&ldquo;{r.quote}&rdquo;</p>
                <div className="rw__meta">
                  <span className="rw__name">{r.name}</span>
                  <Verified />
                </div>
                <span className="rw__product">{r.product} &middot; {r.date}</span>
                {r.watch && (
                  <a className="rw__watch" href={r.watch} target="_blank" rel="noreferrer">
                    Watch their video review on the store &rarr;
                  </a>
                )}
              </div>
            </article>
          ))}
        </div>

        <div className="proof__cta reveal">
          <Btn href="https://369project.com/collections/project-369-books" target="_blank" rel="noreferrer">
            Read all 3,997 reviews
          </Btn>
          <p className="proof__note">Reviews collected and verified by Loox on 369project.com &mdash; shown as posted.</p>
        </div>
      </div>
    </section>
  );
}
