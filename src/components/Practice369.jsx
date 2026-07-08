import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/* The 3-6-9 practice, scroll-driven: the section pins while the day passes.
   Each line is revealed left-to-right — written, not faded in. */

const LINE = 'I am aligned with everything I desire.';

const PHASES = [
  { n: '3', when: 'Morning', note: 'Three times when you wake, before the day gets loud.', count: 3 },
  { n: '6', when: 'Afternoon', note: 'Six times in the middle of the day, when doubt usually shows up.', count: 6 },
  { n: '9', when: 'Night', note: 'Nine times before sleep. The last thought of the day is the one that keeps working.', count: 9 },
];

export default function Practice369() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const section = sectionRef.current;
    if (!section) return;
    if (reduce) { section.classList.add('practice--static'); return; }

    gsap.registerPlugin(ScrollTrigger);
    const phases = section.querySelectorAll('.practice__phase');
    const steps = section.querySelectorAll('.practice__steps span');
    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: section,
        start: 'top top',
        end: '+=280%',
        pin: true,
        scrub: 0.6,
      },
    });

    phases.forEach((phase, i) => {
      const lines = phase.querySelectorAll('.practice__line');
      if (i > 0) tl.fromTo(phase, { autoAlpha: 0 }, { autoAlpha: 1, duration: 0.35 });
      steps[i] && tl.set(steps[i], { color: '#f5f5f5' }, '<');
      tl.fromTo(
        lines,
        { autoAlpha: 0, clipPath: 'inset(-8% 100% -8% 0)' },
        { autoAlpha: 1, clipPath: 'inset(-8% 0% -8% 0)', duration: 0.4, stagger: 0.26, ease: 'power1.out' }
      );
      tl.to({}, { duration: 0.6 }); // hold
      if (i < phases.length - 1) tl.to(phase, { autoAlpha: 0, duration: 0.35 });
    });

    return () => {
      tl.scrollTrigger && tl.scrollTrigger.kill();
      tl.kill();
    };
  }, []);

  return (
    <section className="practice" id="practice" ref={sectionRef}>
      <div className="practice__pin">
        <span className="practice__label">The practice</span>
        <div className="practice__stagewrap">
          {PHASES.map((p, i) => (
            <div className={`practice__phase${i === 0 ? ' is-first' : ''}`} key={p.n}>
              <div className="practice__left">
                <span className="practice__num">{p.n}</span>
                <span className="practice__when">{p.when}</span>
                <p className="practice__note">{p.note}</p>
              </div>
              <div className="practice__lines" aria-label={`${LINE} — written ${p.count} times`}>
                {Array.from({ length: p.count }).map((_, j) => (
                  <span className="practice__line" key={j}>
                    <i>{String(j + 1).padStart(2, '0')}</i>
                    {LINE}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
        <div className="practice__steps" aria-hidden="true">
          <span>3</span><span>6</span><span>9</span>
        </div>
      </div>
    </section>
  );
}
