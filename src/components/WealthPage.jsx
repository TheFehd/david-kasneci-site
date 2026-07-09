import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import PageHead from './PageHead.jsx';
import Btn from './Btn.jsx';
import BlurText from './BlurText.jsx';
import SplitTextRB from './SplitTextRB.jsx';
import DeviceScroll from './DeviceScroll.jsx';
import GrowthChart from './GrowthChart.jsx';

gsap.registerPlugin(ScrollTrigger);

/* /wealth — the Wealth Consciousness mastermind funnel, rebuilt in the
   site's language. Copy distilled from project369.com/wealth-consciousness-page;
   enroll CTAs go to the real checkout funnel. */

const ENROLL = 'https://project369.com/wealth-consciousness-page';

const TIMELINE = [
  { n: '7', label: 'Within 7 days', points: [
    'You stop sabotaging income opportunities',
    'You stop reacting emotionally to uncertainty',
    'You make clean, high-quality decisions from abundance, not fear',
  ]},
  { n: '10', label: 'Within 10 days', points: [
    'Confidence replaces second-guessing',
    'The mental noise around what, when and how dissolves',
    'Momentum arrives without fear or doubt',
  ]},
  { n: '14', label: 'Within 14 days', points: [
    'You know exactly how to increase income and success',
    'Decisions come from clarity instead of survival',
    'Scattered becomes fully aligned',
  ]},
  { n: '30', label: 'Within 30 days', points: [
    'Alignment has increased your income and success',
    'Action is consistent and inspired — without burnout',
    'You think profitably, and life starts reflecting it',
  ]},
  { n: '∞', label: 'Ongoing', points: [
    'Aligned action without procrastination',
    'Stable confidence regardless of circumstances',
    'Success feels grounded, supported and repeatable',
  ]},
];

const ICONS = {
  layers: <path d="M12 3 3 8l9 5 9-5-9-5Zm-9 9 9 5 9-5M3 16.5l9 5 9-5" />,
  spark: <path d="M12 2v5M12 17v5M2 12h5M17 12h5M5 5l3.5 3.5M15.5 15.5 19 19M19 5l-3.5 3.5M8.5 15.5 5 19" />,
  heart: <path d="M12 21C7 16.5 3 13 3 8.8 3 6 5.2 4 7.6 4c1.7 0 3.3.9 4.4 2.4C13.1 4.9 14.7 4 16.4 4 18.8 4 21 6 21 8.8c0 4.2-4 7.7-9 12.2Zm-8-9h4l2-3 3 5 2-3h6" />,
  bolt: <path d="M13 2 4 14h6l-1 8 9-12h-6l1-8Z" />,
  grid: <path d="M4 5h16M4 12h16M4 19h16M8 5v14M16 5v14" />,
  compass: <path d="M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20Zm4-14-2.5 6L8 16l2.5-6L16 8Z" />,
};

const PHASES = [
  { name: 'Foundation', icon: 'layers', points: [
    'Money stops feeling threatening to your system',
    'Fear, doubt and urgency leave your decisions',
    'A stable foundation where wealth can actually hold',
  ]},
  { name: 'Creative Genius', icon: 'spark', points: [
    'Attract authentic ideas and opportunities',
    'The hidden psychology of creating, selling and receiving',
    'Scattered ideas become structured opportunities',
  ]},
  { name: 'Healing & Clearing', icon: 'heart', points: [
    'Dissolve the subconscious blocks that sabotage breakthroughs',
    'Release patterns tied to money, worth and visibility',
    'Momentum continues instead of resetting',
  ]},
  { name: 'Inspired Action', icon: 'bolt', points: [
    'Clarity becomes consistent, aligned action',
    'Procrastination, avoidance and burnout eliminated',
    'Execution habits that compound',
  ]},
  { name: 'Systems & Scale', icon: 'grid', points: [
    'Simple structures that increase income',
    'David’s own templates — no chaos, no guesswork',
    'Exact AI workflows, handed to you',
  ]},
  { name: 'Integration & Path Selection', icon: 'compass', points: [
    'Your next level of income, made explicit',
    'One direction to go all in on',
    'A roadmap that feels grounded and sustainable',
  ]},
];

const STACK = [
  'The six-phase Wealth Consciousness curriculum',
  'The entire Initiation Masterclass',
  'One year of live weekly calls with David',
  'Community of powerful creators',
  'Boxset of physical workbooks',
  'Marketing systems, templates and AI workflows',
  'Subconscious audios + bonus resources',
];

const IS = ['A guided container', 'Outcome-focused', 'Supportive and stabilizing', 'Designed to prevent collapse'];
const ISNOT = ['A content-heavy course', 'Hustle-based', 'Pressure-driven', 'Something you push through'];

export default function WealthPage() {
  const stackRef = useRef(null);

  /* scroll-stack: cards pile up; each one settles back and dims as the
     next slides over it (react-bits ScrollStack, sticky + scoped scrub) */
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const cards = stackRef.current ? [...stackRef.current.querySelectorAll('.wstack__card')] : [];
    const triggers = [];
    cards.forEach((card, i) => {
      if (i === cards.length - 1) return;
      const tw = gsap.to(card, {
        scale: 0.94,
        filter: 'brightness(0.6)',
        ease: 'none',
        scrollTrigger: {
          trigger: cards[i + 1],
          start: 'top 85%',
          end: 'top 30%',
          scrub: true,
        },
      });
      tw.scrollTrigger && triggers.push(tw.scrollTrigger);
    });
    return () => triggers.forEach((t) => t.kill());
  }, []);

  return (
    <div className="wpage">
      <PageHead href={ENROLL} cta="Enroll now" />

      <section className="subhero subhero--center">
        <div className="subhero__inner">
          <span className="subhero__label reveal">Mastermind &middot; 30-day activation</span>
          <h1 className="subhero__title">
            <SplitTextRB text="Wealth" fancy="Consciousness." delay={30} />
          </h1>
          <p className="subhero__body reveal reveal--d1">
            Manifest stable, scalable income in 30 days &mdash; without stress, pressure
            or burnout. The same work people have paid David over $100,000 for in private,
            structured into six phases.
          </p>
          <div className="subhero__ctas reveal reveal--d2">
            <Btn solid href={ENROLL} target="_blank" rel="noreferrer">Start the 30-day activation</Btn>
            <span className="subhero__note">$1,997 today &middot; next price raise $4,997</span>
          </div>
        </div>
      </section>

      <section className="wstack" ref={stackRef}>
        <div className="tml__head">
          <span className="pillars__label reveal">What to expect</span>
          <h2 className="tml__title"><BlurText text="Week by week, it *compounds." step={0.06} /></h2>
        </div>
        <div className="wstack__cards">
          {TIMELINE.map((t, i) => (
            <article className="wstack__card" style={{ top: `calc(13vh + ${i * 16}px)` }} key={t.label}>
              <span className="wstack__n">{t.n}</span>
              <div className="wstack__body">
                <h3>{t.label}</h3>
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

      <section className="phx">
        <div className="tml__head">
          <span className="pillars__label reveal">The curriculum</span>
          <h2 className="tml__title"><BlurText text="Six phases. One *direction." step={0.06} /></h2>
        </div>
        <div className="phx__grid">
          {PHASES.map((ph, i) => (
            <article className={`phx__card reveal reveal--d${(i % 3) + 1}`} key={ph.name}>
              <span className="phx__top">
                <svg className="phx__icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  {ICONS[ph.icon]}
                </svg>
                <span className="phx__num">Phase {String(i + 1).padStart(2, '0')}</span>
              </span>
              <h3>{ph.name}</h3>
              <ul>{ph.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </article>
          ))}
        </div>
      </section>

      <GrowthChart />

      <section className="offer">
        <div className="offer__panel reveal">
          <span className="pillars__label">Everything you get</span>
          <ul className="offer__stack">
            {STACK.map((s) => <li key={s}>{s}</li>)}
          </ul>
          <div className="offer__price">
            <b className="greentext">$1,997</b>
            <s>$4,997</s>
            <span>next price raise</span>
          </div>
          <p className="offer__plans">Payment plans: $693 &times; 3 months &middot; $369 &times; 6 months</p>
          <Btn solid href={ENROLL} target="_blank" rel="noreferrer">Join Wealth Consciousness</Btn>
          <div className="offer__isnt">
            <div>
              <h4>This is</h4>
              <ul>{IS.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
            <div>
              <h4>This is not</h4>
              <ul>{ISNOT.map((s) => <li key={s}>{s}</li>)}</ul>
            </div>
          </div>
        </div>
      </section>

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
