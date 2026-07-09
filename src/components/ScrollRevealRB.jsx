import { useEffect, useMemo, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

/* react-bits ScrollReveal — the paragraph un-blurs and brightens word by
   word, driven by scroll position. Vendored with SCOPED cleanup (the
   original killed every ScrollTrigger on the page). */

export default function ScrollRevealRB({
  children,
  enableBlur = true,
  baseOpacity = 0.12,
  baseRotation = 2.5,
  blurStrength = 3.5,
  className = '',
}) {
  const ref = useRef(null);

  const words = useMemo(() => {
    const text = typeof children === 'string' ? children : '';
    return text.split(/(\s+)/).map((w, i) =>
      w.match(/^\s+$/) ? w : <span className="srv__w" key={i}>{w}</span>,
    );
  }, [children]);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const triggers = [];
    const track = (tween) => { tween.scrollTrigger && triggers.push(tween.scrollTrigger); return tween; };

    track(gsap.fromTo(el,
      { transformOrigin: '0% 50%', rotate: baseRotation },
      { rotate: 0, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top bottom', end: 'bottom 60%', scrub: true } },
    ));
    const wordEls = el.querySelectorAll('.srv__w');
    track(gsap.fromTo(wordEls,
      { opacity: baseOpacity, willChange: 'opacity' },
      { opacity: 1, stagger: 0.05, ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true } },
    ));
    if (enableBlur) {
      track(gsap.fromTo(wordEls,
        { filter: `blur(${blurStrength}px)` },
        { filter: 'blur(0px)', stagger: 0.05, ease: 'none',
          scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 55%', scrub: true } },
      ));
    }
    return () => triggers.forEach((t) => t.kill());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [children]);

  return <p ref={ref} className={`srv ${className}`}>{words}</p>;
}
