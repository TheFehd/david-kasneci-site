import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHead from './PageHead.jsx';
import Btn from './Btn.jsx';
import BlurText from './BlurText.jsx';
import SplitTextRB from './SplitTextRB.jsx';
import DeviceScroll from './DeviceScroll.jsx';
import GrowthChart from './GrowthChart.jsx';

gsap.registerPlugin(ScrollTrigger);

/* /wealth — the Wealth Consciousness mastermind, full sales page.
   Every image is David's real funnel asset; every claim is from his
   funnel; every CTA goes to the real checkout. */

const ENROLL = 'https://project369.com/wealth-consciousness-page';

/* animated line icons — each card's mark draws itself */
const CARD_ICONS = {
  pulse: <path pathLength="100" d="M2 12h4l3-8 4 16 3-8h6" />,
  shield: <><path pathLength="100" d="M12 3l7 3v5c0 4.5-3 7.5-7 9-4-1.5-7-4.5-7-9V6l7-3Z" /><path pathLength="100" d="M9 12l2 2 4-4" /></>,
  target: <><circle pathLength="100" cx="12" cy="12" r="8" /><circle pathLength="100" cx="12" cy="12" r="4.2" /><circle cx="12" cy="12" r="1.2" fill="currentColor" stroke="none" /></>,
  trend: <path pathLength="100" d="M3 17l5.5-5.5 4 4L21 7m0 0h-5.5M21 7v5.5" />,
  loop: <path pathLength="100" d="M6 12c0-1.7 1.3-3 3-3 2.5 0 4.5 6 7 6 1.7 0 3-1.3 3-3s-1.3-3-3-3c-2.5 0-4.5 6-7 6-1.7 0-3-1.3-3-3Z" transform="translate(-1 0) scale(1.08)" />,
};

const TIMELINE = [
  { n: '7', icon: 'pulse', label: 'Within 7 days', points: [
    'You stop sabotaging income opportunities',
    'You stop reacting emotionally to uncertainty',
    'You make clean, high-quality decisions from abundance, not fear',
  ]},
  { n: '10', icon: 'shield', label: 'Within 10 days', points: [
    'Confidence replaces second-guessing',
    'The mental noise around what, when and how dissolves',
    'Momentum arrives without fear or doubt',
  ]},
  { n: '14', icon: 'target', label: 'Within 14 days', points: [
    'You know exactly how to increase income and success',
    'Decisions come from clarity instead of survival',
    'Scattered becomes fully aligned',
  ]},
  { n: '30', icon: 'trend', label: 'Within 30 days', points: [
    'Alignment has increased your income and success',
    'Action is consistent and inspired — without burnout',
    'You think profitably, and life starts reflecting it',
  ]},
  { n: '∞', icon: 'loop', label: 'Ongoing', points: [
    'Aligned action without procrastination',
    'Stable confidence regardless of circumstances',
    'Success feels grounded, supported and repeatable',
  ]},
];

/* the real six phases — names and promises from David's own course tiles */
const PHASES = [
  { img: '/assets/369/wealth/ph1.jpg', name: 'Foundation',
    promise: 'Activate wealth consciousness & your creator identity',
    points: [
      'Money stops feeling threatening to your system',
      'Fear, doubt and urgency leave your decisions',
      'A stable base where wealth can actually hold',
    ]},
  { img: '/assets/369/wealth/ph2.jpg', name: 'Creative Genius',
    promise: 'Access your superconscious mind daily & attract aligned opportunities',
    points: [
      'The hidden psychology of creating, selling and receiving',
      'Scattered ideas become structured opportunities',
      'Authentic ideas arrive instead of being forced',
    ]},
  { img: '/assets/369/wealth/ph3.jpg', name: 'Healing & Clearing',
    promise: 'Dissolve success blocks & heal limiting scarcity around money',
    points: [
      'Release patterns tied to money, worth and visibility',
      'The blocks that sabotage breakthroughs, dissolved',
      'Momentum continues instead of resetting',
    ]},
  { img: '/assets/369/wealth/ph4.jpg', name: 'Inspired Action',
    promise: 'Master effortless inspired action & align with high-income skills',
    points: [
      'Clarity becomes consistent, aligned action',
      'Procrastination, avoidance and burnout eliminated',
      'Execution habits that compound',
    ]},
  { img: '/assets/369/wealth/ph5.jpg', name: 'Systems & Scale',
    promise: 'Build wealth systems that scale on autopilot',
    points: [
      'Simple structures that increase income',
      'David’s own templates — no chaos, no guesswork',
      'Exact AI workflows, handed to you',
    ]},
  { img: '/assets/369/wealth/ph6.jpg', name: 'Integration & Path Selection',
    promise: 'Choose your path & create your roadmap to $10k, $100k, $1M or $10M',
    points: [
      'Your next level of income, made explicit',
      'One direction to go all in on',
      'A roadmap that feels grounded and sustainable',
    ]},
];

/* real verified purchases from the Project 369 store — money stories */
const STORIES = [
  { photo: '/assets/369/reviews/rev06.jpg', name: 'Sherri C.', product: 'Manifestation Bundle',
    quote: 'They came into my life during the most difficult situation I had ever faced. Using these journals daily, I have completely changed my life — I manifested my dream home.' },
  { photo: '/assets/369/reviews/rev11.jpg', name: 'Paul H.', product: 'The Key to the Universe',
    quote: 'I was skeptical at the start, but the daily practice really focused my mind. I needed a car with a poor credit rating — the broker who called me had 369 in the company name. Then they said yes.' },
  { photo: '/assets/369/reviews/rev12.jpg', name: 'Nancy C.', product: 'The Key to Abundance',
    quote: 'Easy to read and understand — you read, then journal your manifestations and visualizations daily. These books are going to expedite my dreams.' },
];

const STACK = [
  ['The six-phase curriculum', 'video trainings + workbooks, structured across 30 days'],
  ['The entire Initiation Masterclass', 'included in full'],
  ['One year of live weekly calls', 'with David, every week'],
  ['Community of powerful creators', 'you don’t do this alone'],
  ['Boxset of physical workbooks', 'shipped to you'],
  ['Marketing systems & templates', 'David’s own, plus exact AI workflows'],
  ['Subconscious audios', '+ bonus resources'],
];

const PLANS = [
  { id: 'once', label: 'One payment', price: '$1,997', per: 'once', note: 'Next price raise: $4,997' },
  { id: '3x', label: '3 months', price: '$693', per: '/ month × 3', note: '$2,079 total · via split-it' },
  { id: '6x', label: '6 months', price: '$369', per: '/ month × 6', note: '$2,214 total · via split-it' },
];

const FAQ = [
  { q: 'What exactly is Wealth Consciousness?',
    a: 'A 30-day activation: six phases of video trainings and workbooks, one year of live weekly calls with David, a community of creators, and his own systems and templates. It’s a guided, outcome-focused container — not a content library you push through alone.' },
  { q: 'How much time does it take?',
    a: 'The container is designed to prevent collapse, not add pressure: a short daily practice, the phase you’re in, and one live call a week. The six phases are structured across the 30 days; the calls and community continue for a full year.' },
  { q: 'Is there a payment plan?',
    a: 'Yes — $693 × 3 months or $369 × 6 months through split-it financing at checkout, or one payment of $1,997.' },
  { q: 'What happens after the 30 days?',
    a: 'The live weekly calls with David and the community continue for one year. The outcomes are built to be ongoing: aligned action without procrastination, stable confidence, and success that feels grounded and repeatable.' },
  { q: 'Who is this for?',
    a: 'Entrepreneurs, coaches, creators and high-achievers who want to raise their income and success baseline — especially if you’ve done the strategy work and still feel the ceiling. The work targets the layer underneath: identity, nervous system, and alignment.' },
];

function Faq() {
  const [open, setOpen] = useState(0);
  return (
    <div className="wfaq__list">
      {FAQ.map((f, i) => (
        <div className={`wfaq__item${open === i ? ' is-open' : ''}`} key={f.q}>
          <button className="wfaq__q" aria-expanded={open === i} onClick={() => setOpen(open === i ? -1 : i)}>
            <span>{f.q}</span>
            <i aria-hidden="true" />
          </button>
          <div className="wfaq__a"><div className="wfaq__aInner"><p>{f.a}</p></div></div>
        </div>
      ))}
    </div>
  );
}

export default function WealthPage() {
  const stackRef = useRef(null);
  const [plan, setPlan] = useState('once');
  const active = PLANS.find((p) => p.id === plan);

  /* scroll-stack: cards pile up; each settles back as the next arrives */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = stackRef.current ? [...stackRef.current.querySelectorAll('.wstack__card')] : [];
    const triggers = [];
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const tw = gsap.to(card, {
        scale: 0.965,
        ease: 'none',
        scrollTrigger: { trigger: cards[i + 1], start: 'top 85%', end: 'top 30%', scrub: true },
      });
      tw.scrollTrigger && triggers.push(tw.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className="wpage">
      <PageHead href={ENROLL} cta="Enroll now" />

      {/* ---- hero: product-forward split ---- */}
      <section className="whero">
        <div className="whero__copy">
          <span className="subhero__label reveal">Mastermind &middot; 30-day activation</span>
          <h1 className="whero__title">
            <SplitTextRB text="Wealth" fancy="Consciousness." delay={30} />
          </h1>
          <p className="whero__lead reveal reveal--d1">
            Manifest stable, scalable income in 30 days &mdash; without stress, pressure or
            burnout. The same work people have paid David over <b>$100,000</b> for privately,
            structured into six phases with him in the room every week.
          </p>
          <div className="whero__ctas reveal reveal--d2">
            <Btn solid href={ENROLL} target="_blank" rel="noreferrer">Start the 30-day activation</Btn>
            <span className="whero__price"><b>$1,997</b> today &middot; next raise $4,997</span>
          </div>
          <div className="whero__proof reveal reveal--d3">
            <span className="whero__stars" aria-hidden="true">&#9733;&#9733;&#9733;&#9733;&#9733;</span>
            4.9 from 3,997 verified reviews across Project&nbsp;369
          </div>
        </div>
        <figure className="whero__visual reveal reveal--d2" aria-hidden="true">
          <img src="/assets/369/wealth/ph1.jpg" alt="" loading="eager" />
          <figcaption>Phase 1 &middot; Foundation</figcaption>
        </figure>
      </section>

      {/* ---- money stories: real verified purchases ---- */}
      <section className="wproof">
        <div className="tml__head">
          <span className="pillars__label reveal">Verified by readers</span>
          <h2 className="tml__title"><BlurText text="This work already pays *rent." step={0.06} /></h2>
        </div>
        <blockquote className="wproof__pull reveal">
          &ldquo;I had no job &mdash; I have a job. I had $10,000 of debt on credit cards &mdash;
          all paid for. I needed a new blue car &mdash; I got my new blue car.&rdquo;
          <footer>Linda D. &middot; Verified buyer &middot; Soul Work Journal</footer>
        </blockquote>
        <div className="wproof__grid">
          {STORIES.map((s, i) => (
            <figure className={`wproof__card reveal reveal--d${i + 1}`} key={s.name}>
              <img src={s.photo} alt={`${s.name}'s review photo`} loading="lazy" />
              <blockquote>&ldquo;{s.quote}&rdquo;</blockquote>
              <figcaption>
                <b>{s.name}</b>
                <span>Verified buyer &middot; {s.product}</span>
              </figcaption>
            </figure>
          ))}
        </div>
        <p className="wproof__note reveal">
          Reviews from the Project 369 books &mdash; the same method this mastermind installs, guided live.
        </p>
      </section>

      {/* ---- week by week (approved scroll stack) ---- */}
      <section className="wstack" ref={stackRef}>
        <div className="tml__head">
          <span className="pillars__label reveal">What to expect</span>
          <h2 className="tml__title"><BlurText text="Week by week, it *compounds." step={0.06} /></h2>
        </div>
        <div className="wstack__cards">
          {TIMELINE.map((t, i) => (
            <article className="wstack__card" style={{ top: `calc(13vh + ${i * 16}px)` }} key={t.label}>
              <div className="wstack__head">
                <span className="wstack__n">{t.n}</span>
                <h3>{t.label}</h3>
                <svg className="wstack__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {CARD_ICONS[t.icon]}
                </svg>
              </div>
              <div className="wstack__body">
                <ul>{t.points.map((p) => <li key={p}>{p}</li>)}</ul>
              </div>
            </article>
          ))}
        </div>
      </section>

      <DeviceScroll
        eyebrow="Inside the mastermind"
        title={<>Every phase, on every <i className="fx">screen.</i></>}
        sub="Video trainings, workbooks, live calls and systems — the full activation, wherever you are."
        img="/assets/369/wealth/stack.jpg"
        alt="The Wealth Consciousness course on desktops, laptops, tablets and phones"
      />

      {/* ---- curriculum: the real course tiles, alternating rows ---- */}
      <section className="crm">
        <div className="tml__head">
          <span className="pillars__label reveal">The curriculum</span>
          <h2 className="tml__title"><BlurText text="Six phases. One *direction." step={0.06} /></h2>
        </div>
        {PHASES.map((ph, i) => (
          <article className={`crm__row${i % 2 ? ' crm__row--flip' : ''}`} key={ph.name}>
            <figure className="crm__media reveal">
              <img src={ph.img} alt={`Phase ${i + 1}: ${ph.name} — course preview`} loading="lazy" />
            </figure>
            <div className="crm__body">
              <span className="crm__num reveal">Phase {String(i + 1).padStart(2, '0')}</span>
              <h3 className="crm__name reveal reveal--d1">{ph.name}</h3>
              <p className="crm__promise reveal reveal--d1">{ph.promise}</p>
              <ul className="crm__points reveal reveal--d2">
                {ph.points.map((p) => <li key={p}>{p}</li>)}
              </ul>
            </div>
          </article>
        ))}
      </section>

      <GrowthChart />

      {/* ---- offer: product + interactive price ---- */}
      <section className="offer2" id="enroll">
        <div className="tml__head">
          <span className="pillars__label reveal">Everything you get</span>
          <h2 className="tml__title"><BlurText text="One container. All *in." step={0.07} /></h2>
        </div>
        <div className="offer2__grid">
          <div className="offer2__left reveal">
            <img className="offer2__product" src="/assets/369/wealth/stack.jpg" alt="Everything included in Wealth Consciousness" loading="lazy" />
            <ul className="offer2__stack">
              {STACK.map(([t, d]) => (
                <li key={t}><b>{t}</b><span>{d}</span></li>
              ))}
            </ul>
          </div>
          <aside className="offer2__card reveal reveal--d1">
            <div className="offer2__plans" role="tablist" aria-label="Payment plan">
              {PLANS.map((p) => (
                <button
                  key={p.id}
                  role="tab"
                  aria-selected={plan === p.id}
                  className={`offer2__plan${plan === p.id ? ' is-on' : ''}`}
                  onClick={() => setPlan(p.id)}
                >
                  {p.label}
                </button>
              ))}
            </div>
            <div className="offer2__price">
              <b className="greentext">{active.price}</b>
              <span>{active.per}</span>
            </div>
            <p className="offer2__note">{active.note}</p>
            <Btn solid href={ENROLL} target="_blank" rel="noreferrer">Join Wealth Consciousness</Btn>
            <p className="offer2__fine">Limited spots &middot; checkout on project369.com</p>
            <div className="offer__isnt">
              <div>
                <h4>This is</h4>
                <ul><li>A guided container</li><li>Outcome-focused</li><li>Supportive and stabilizing</li><li>Designed to prevent collapse</li></ul>
              </div>
              <div>
                <h4>This is not</h4>
                <ul><li>A content-heavy course</li><li>Hustle-based</li><li>Pressure-driven</li><li>Something you push through</li></ul>
              </div>
            </div>
          </aside>
        </div>
      </section>

      {/* ---- founder note ---- */}
      <section className="wfounder">
        <figure className="wfounder__photo reveal">
          <img src="/assets/369/coach/path.jpg" alt="David Kasneci" loading="lazy" />
        </figure>
        <div className="wfounder__note reveal reveal--d1">
          <span className="pillars__label">From David</span>
          <p>
            &ldquo;I was fully booked doing this work privately &mdash; people have paid over
            $100,000 for it. Wealth Consciousness is that same work, structured so you can move
            through it in 30 days, with me in the room every week. It isn&rsquo;t hustle.
            It&rsquo;s alignment &mdash; the difference between forcing income and
            <em> holding</em> it.&rdquo;
          </p>
          <span className="wfounder__sig fx">David Kasneci</span>
        </div>
      </section>

      {/* ---- faq ---- */}
      <section className="wfaq">
        <div className="tml__head">
          <span className="pillars__label reveal">Questions</span>
          <h2 className="tml__title"><BlurText text="Asked before *enrolling." step={0.06} /></h2>
        </div>
        <Faq />
      </section>

      {/* ---- final call ---- */}
      <section className="init">
        <div className="init__bg" aria-hidden="true" />
        <div className="init__overlay" aria-hidden="true" />
        <div className="init__inner">
          <span className="init__label reveal">Your chance</span>
          <h2 className="init__title"><BlurText text="Think profitably. *Live it." step={0.09} /></h2>
          <p className="init__body reveal reveal--d2">
            Limited spots, and the price raises soon. Stabilize your nervous system, clarify
            your aligned income path, and build momentum that lasts.
          </p>
          <div className="init__ctas reveal reveal--d3">
            <Btn solid href={ENROLL} target="_blank" rel="noreferrer">Enroll today</Btn>
          </div>
        </div>
      </section>
    </div>
  );
}
