import { useEffect, useRef } from 'react';
import Btn from './Btn.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Work 1-1 — pinned chapter deck. The section takes over the scroll and
   snaps through the six areas, each with David's real photo from the
   coaching page. Static stacked layout on mobile / reduced motion. */

const PILLARS = [
  {
    img: '/assets/369/coach/biz.jpg',
    alt: 'David on a call at his desk',
    title: 'Business & Entrepreneurship',
    hook: '8 figures generated · 10-figure startups',
    lead: 'I help entrepreneurs scale by aligning energetically — not by working harder.',
    points: [
      'Recalibrate your frequency and release abundance blocks',
      'Align your financial mission with your spiritual purpose',
      'Teams, systems, funnels, conversions and media buying',
    ],
    bestFor: 'Coaches, consultants, founders and agency owners stuck at their current level.',
  },
  {
    img: '/assets/369/coach/love.jpg',
    alt: 'David and his wife walking their dog in the sun',
    title: 'Relationship Healing & Fulfillment',
    hook: 'Married to my soulmate',
    lead: 'After marrying my soulmate, I help others heal, attract, and thrive in love.',
    points: [
      'Heal trauma bonds, abandonment wounds and attachment cycles',
      'Balance masculine and feminine energies for lasting harmony',
      'Authentic communication that fosters safety and growth',
    ],
    bestFor: 'Divorced men and women, guarded high-achievers, repeating relationship patterns.',
  },
  {
    img: '/assets/369/coach/heal.jpg',
    alt: 'David in his garden with his dog',
    title: 'Healing Past Wounds & Trauma',
    hook: 'Healed myself — then my family',
    lead: 'Raised around abuse and neglect, I healed myself first — then guided my own family through the same transformation.',
    points: [
      'Identity-level healing and nervous-system regulation',
      'Break generational cycles; release addiction, guilt, shame, grief',
      'Integrate suppressed parts of the self and return to wholeness',
    ],
    bestFor: 'High-functioning people who have done therapy, retreats, everything — and still feel stuck.',
  },
  {
    img: '/assets/369/coach/health.jpg',
    alt: 'David and his wife cooking at home',
    title: 'Physical Health & Performance',
    hook: '80 lbs released',
    lead: 'Obese at 14 and addicted to food, I lost over 80 lbs by releasing the misalignment underneath.',
    points: [
      'A sustainable, nourishing lifestyle — not a restrictive diet',
      'Fasting, breathwork, hormones and circadian rhythm',
      'Superconscious flow states for maximum performance',
    ],
    bestFor: 'High-achievers facing burnout, chronic fatigue, obesity or autoimmune conditions.',
  },
  {
    img: '/assets/369/coach/spirit.jpg',
    alt: 'David in prayer, eyes closed',
    title: 'Spiritual Clarity & Connection',
    hook: 'Truth, not belief',
    lead: 'This is not about belief. It is about truth — living from Source instead of fear, scarcity and lack.',
    points: [
      'Balance your energy centers; access superconscious awareness',
      'Transcend fear, shame and scarcity locked in the lower chakras',
      'Activate the Infinite Creator within and manifest authentically',
    ],
    bestFor: 'Awakened individuals lost in concepts, ready to embody real truth.',
  },
  {
    img: '/assets/369/coach/path.jpg',
    alt: 'David thinking at his desk in the library',
    title: 'Direction & Purpose',
    hook: 'Best-selling author by listening',
    lead: 'I stayed in a life that was not mine — until I followed my truth and watched the path unfold.',
    points: [
      'Clarify your soul’s mission and highest contribution',
      'Follow intuitive guidance without fear or doubt',
      'Break free from external expectations and self-sabotage',
    ],
    bestFor: 'Career changers and anyone navigating midlife uncertainty.',
  },
];

export default function Pillars() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const narrow = window.matchMedia('(max-width: 860px)').matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduce || narrow) { section.classList.add('pillars--static'); return; }

    gsap.registerPlugin(ScrollTrigger);
    const phases = section.querySelectorAll('.pv__phase');
    const fill = section.querySelector('.pv__railFill');
    const dots = section.querySelectorAll('.pv__dot');
    const n = phases.length;

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${n * 90}%`,
        pin: true,
        scrub: 0.5,
        snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.7 }, ease: 'power2.inOut' },
      },
    });

    tl.addLabel('p0');
    dots[0] && tl.set(dots[0], { backgroundColor: '#f5f5f5' }, 'p0');
    for (let i = 1; i < n; i++) {
      tl.to(phases[i - 1].querySelector('.pv__text'), { autoAlpha: 0, y: -34, duration: 0.42, ease: 'power2.in' });
      tl.to(phases[i - 1].querySelector('.pv__imgwrap'), { autoAlpha: 0, scale: 1.05, duration: 0.42, ease: 'power2.in' }, '<');
      tl.fromTo(phases[i].querySelector('.pv__imgwrap'), { autoAlpha: 0, scale: 1.08 }, { autoAlpha: 1, scale: 1, duration: 0.5, ease: 'power2.out' });
      tl.fromTo(phases[i].querySelector('.pv__text'), { autoAlpha: 0, y: 40 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<0.06');
      tl.set(phases[i], { zIndex: 2 }, '<');
      dots[i] && tl.set(dots[i], { backgroundColor: '#f5f5f5' }, '<');
      tl.to(fill, { height: `${(i / (n - 1)) * 100}%`, duration: 0.5, ease: 'none' }, '<');
      tl.addLabel(`p${i}`);
      tl.to({}, { duration: 0.35 }); // breathing room at each stop
    }

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="pillars" id="mentorship" ref={sectionRef}>
      <div className="pillars__pin">
        <div className="pillars__chrome">
          <span className="pillars__label">Work 1&ndash;1</span>
          <Btn sm href="https://project369.com/1-1-coaching" target="_blank" rel="noreferrer">
            Apply for 1&ndash;1
          </Btn>
        </div>

        <div className="pv">
          <div className="pv__rail" aria-hidden="true">
            <span className="pv__railFill" />
            {PILLARS.map((p, i) => <i className="pv__dot" key={i} />)}
          </div>

          <div className="pv__stage">
            {PILLARS.map((p, i) => (
              <article className={`pv__phase${i === 0 ? ' is-lead' : ''}`} key={p.title}>
                <div className="pv__imgwrap">
                  <img src={p.img} alt={p.alt} loading={i === 0 ? 'eager' : 'lazy'} />
                  <span className="pv__imgnum" aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
                </div>
                <div className="pv__text">
                  <span className="pv__count">{String(i + 1).padStart(2, '0')} / 06</span>
                  <h3 className="pv__title">{p.title}</h3>
                  <span className="pv__hook">{p.hook}</span>
                  <p className="pv__lead">{p.lead}</p>
                  <ul className="pv__points">
                    {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  <p className="pv__best"><span>Best for</span> {p.bestFor}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
