import { Fragment } from 'react';
import ShinyText from './ShinyText.jsx';

const STATS = [
  ['300+', 'Private clients'],
  ['4.9', 'Average rating'],
  ['12', 'Years of practice'],
];

const TESTIMONIALS = [
  { initials: 'MT', name: 'Marcus Thorne', role: 'Founder', quote: 'Working with David shifted my perspective from mere survival to profound legacy. The depth of inquiry was unlike any boardroom session.' },
  { initials: 'EM', name: 'Elena Moretti', role: 'Pro Athlete', quote: 'David understands the psychology of performance at a spiritual level. He helped me find the silence needed to excel under pressure.' },
  { initials: 'JV', name: 'Julian Vane', role: 'Creator', quote: "He doesn't just coach; he excavates. The creative blocks I carried for years were dismantled through quiet, rigorous conversation." },
  { initials: 'SJ', name: 'Sarah Jenkins', role: 'Coach', quote: "Even for someone in my profession, David's approach is unique. He operates in the space where intellect meets the soul." },
  { initials: 'DC', name: 'David Chen', role: 'Entrepreneur', quote: 'Our work transcended business metrics. I reclaimed my sense of self while scaling my most ambitious venture yet.' },
  { initials: 'AS', name: 'Aria Sokolov', role: 'Artist', quote: "A mentorship that feels like a masterpiece in progress. David's ability to mirror your own truth back to you is startling." },
];

function Stars() {
  return (
    <div className="tcard__stars" aria-label="5 out of 5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i}>
          <use href="#star" />
        </svg>
      ))}
    </div>
  );
}

export default function Proof() {
  return (
    <section className="proof" id="proof">
      <div className="proof__inner">
        <div className="proof__head">
          <span className="proof__label reveal">Proof</span>
          <h2 className="proof__title reveal reveal--d1">Quiet work. Loud transformations.</h2>
        </div>

        <div className="proof__stats reveal reveal--d1">
          {STATS.map(([num, cap], i) => (
            <Fragment key={cap}>
              {i > 0 && <span className="proof__rule" aria-hidden="true" />}
              <div className="proof__stat">
                <span className="proof__num">{num}</span>
                <span className="proof__cap">{cap}</span>
              </div>
            </Fragment>
          ))}
        </div>

        <div className="proof__grid">
          {TESTIMONIALS.map((t) => (
            <figure className="tcard reveal" key={t.initials}>
              <div className="tcard__head">
                <div className="tcard__avatar" aria-hidden="true">{t.initials}</div>
                <div>
                  <p className="tcard__name">{t.name}</p>
                  <p className="tcard__role">{t.role}</p>
                </div>
              </div>
              <Stars />
              <blockquote className="tcard__quote">{t.quote}</blockquote>
            </figure>
          ))}
        </div>

        <div className="proof__cta reveal reveal--d1">
          <a className="proof__btn" href="#apply"><ShinyText text="Request an invitation" /></a>
          <p className="proof__note">Only a few private spots open each season.</p>
        </div>
      </div>
    </section>
  );
}
