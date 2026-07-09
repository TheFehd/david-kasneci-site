import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText as GSAPSplitText } from 'gsap/SplitText';

gsap.registerPlugin(ScrollTrigger, GSAPSplitText);

/* react-bits SplitText — chars rise in with a springy stagger when the
   element scrolls into view. Vendored without @gsap/react; cleanup is
   scoped to this element's trigger only. */

export default function SplitTextRB({
  text,
  className = '',
  delay = 40,
  duration = 0.9,
  ease = 'power3.out',
  from = { opacity: 0, y: 44 },
  to = { opacity: 1, y: 0 },
  tag: Tag = 'span',
  fancy,
}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let split;
    let tween;
    const run = () => {
      split = new GSAPSplitText(el, { type: 'words,chars', wordsClass: 'stx__w', charsClass: 'stx__c' });
      gsap.set(el, { visibility: 'visible' });
      tween = gsap.fromTo(split.chars, from, {
        ...to,
        duration,
        ease,
        stagger: delay / 1000,
        scrollTrigger: { trigger: el, start: 'top 88%', once: true },
      });
    };
    if (document.fonts.status === 'loaded') run();
    else document.fonts.ready.then(() => { if (ref.current) run(); });

    return () => {
      tween && tween.scrollTrigger && tween.scrollTrigger.kill();
      tween && tween.kill();
      split && split.revert();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, fancy]);

  return (
    <Tag ref={ref} className={`stx ${className}`} style={{ visibility: 'hidden' }}>
      {text}{fancy && <> <i className="fx">{fancy}</i></>}
    </Tag>
  );
}
