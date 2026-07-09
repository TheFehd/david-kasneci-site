import { useEffect, useRef, useState } from 'react';
import Btn from './Btn.jsx';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* Work 1-1 — full-bleed pinned chapters. Each area IS the page for a beat:
   edge-to-edge photo, scrim, content low-left, thin progress line up top.
   Snaps chapter to chapter. Stacked full-width blocks on mobile / reduced
   motion — same design, no pin. */

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

/* split a title into word > char spans for the clip-reveal (SplitText style) */
function splitChars(el) {
  const words = el.textContent.split(' ');
  el.textContent = '';
  const chars = [];
  words.forEach((w, wi) => {
    const word = document.createElement('span');
    word.className = 'pv__word';
    for (const ch of w) {
      const c = document.createElement('span');
      c.className = 'pv__char';
      c.textContent = ch;
      word.appendChild(c);
      chars.push(c);
    }
    el.appendChild(word);
    if (wi < words.length - 1) el.appendChild(document.createTextNode(' '));
  });
  return chars;
}

const isStatic = () =>
  window.matchMedia('(max-width: 860px)').matches ||
  window.matchMedia('(prefers-reduced-motion: reduce)').matches;

export default function Pillars() {
  const sectionRef = useRef(null);
  const [staticMode, setStaticMode] = useState(isStatic);

  /* re-evaluate when the breakpoint flips (rotation, window resize) */
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 860px)');
    const onChange = () => setStaticMode(isStatic());
    mq.addEventListener('change', onChange);
    return () => mq.removeEventListener('change', onChange);
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    if (staticMode) {
      /* mobile / reduced motion: chapters still perform — chars rise and
         content staggers in as each phase scrolls into view */
      section.classList.add('pillars--static');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const phases = section.querySelectorAll('.pv__phase');
      phases.forEach((ph) => {
        const title = ph.querySelector('.pv__title');
        const chars = splitChars(title);
        chars.forEach((c, i) => { c.style.transitionDelay = `${0.08 + i * 0.016}s`; });
        ph.querySelectorAll('.pv__hook, .pv__lead, .pv__points li, .pv__best')
          .forEach((el, i) => { el.style.transitionDelay = `${0.25 + i * 0.055}s`; });
      });
      if (reduce) {
        phases.forEach((ph) => ph.classList.add('is-in'));
        return;
      }
      const io = new IntersectionObserver(
        (entries) => entries.forEach((en) => {
          if (en.isIntersecting) { en.target.classList.add('is-in'); io.unobserve(en.target); }
        }),
        { threshold: 0.3 },
      );
      phases.forEach((ph) => io.observe(ph));
      return () => io.disconnect();
    }
    section.classList.remove('pillars--static');

    gsap.registerPlugin(ScrollTrigger);
    const phases = section.querySelectorAll('.pv__phase');
    const fill = section.querySelector('.pv__progress i');
    const n = phases.length;
    const charsOf = [...phases].map((ph) => splitChars(ph.querySelector('.pv__title')));

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: `+=${n * 85}%`,
        pin: true,
        scrub: 0.5,
        snap: { snapTo: 'labels', duration: { min: 0.25, max: 0.65 }, ease: 'power2.inOut' },
        onEnter: () => {
          /* first chapter title rises when the takeover begins */
          gsap.fromTo(charsOf[0], { yPercent: 105 }, {
            yPercent: 0, duration: 0.7, stagger: 0.018, ease: 'power3.out', overwrite: true,
          });
        },
      },
    });

    tl.addLabel('p0');
    for (let i = 1; i < n; i++) {
      tl.to(phases[i - 1].querySelector('.pv__content'), { autoAlpha: 0, y: -40, duration: 0.4, ease: 'power2.in' });
      tl.to(phases[i - 1], { autoAlpha: 0, duration: 0.45, ease: 'none' }, '<0.1');
      tl.set(phases[i], { zIndex: 2 });
      tl.fromTo(phases[i], { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.45, ease: 'none' }, '<');
      tl.fromTo(phases[i].querySelector('.pv__media img'), { scale: 1.08 }, { scale: 1, duration: 0.6, ease: 'power2.out' }, '<');
      tl.fromTo(phases[i].querySelector('.pv__content'), { autoAlpha: 0, y: 46 }, { autoAlpha: 1, y: 0, duration: 0.5, ease: 'power2.out' }, '<0.08');
      tl.fromTo(charsOf[i], { yPercent: 105 }, { yPercent: 0, duration: 0.4, stagger: 0.014, ease: 'power3.out' }, '<0.05');
      tl.to(fill, { scaleX: (i + 1) / n, duration: 0.5, ease: 'none' }, '<');
      tl.addLabel(`p${i}`);
      tl.to({}, { duration: 0.3 });
    }

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, [staticMode]);

  return (
    <section className="pillars" id="mentorship" ref={sectionRef}>
      <div className="pillars__pin">
        {PILLARS.map((p, i) => (
          <article className={`pv__phase${i === 0 ? ' is-lead' : ''}`} key={p.title}>
            <div className="pv__media" aria-hidden={i === 0 ? undefined : 'true'}>
              <img src={p.img} alt={p.alt} loading={i === 0 ? 'eager' : 'lazy'} />
            </div>
            <div className="pv__scrim" aria-hidden="true" />
            <div className="pv__content">
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

        <div className="pv__chrome" aria-hidden="false">
          <span className="pv__progress"><i /></span>
          <span className="pillars__label">Work 1&ndash;1</span>
          <div className="pv__apply">
            <Btn sm href="https://project369.com/1-1-coaching" target="_blank" rel="noreferrer">
              Apply for 1&ndash;1
            </Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
