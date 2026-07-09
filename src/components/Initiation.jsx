/* The high-ticket doorway — full-bleed cinematic panel for the Initiation
   program and the 1-1 mentorship on project369.com. Live Prism light
   (react-bits, monochrome-graded, offscreen-suspended) over the night sky
   on desktop; the still sky on phones. */

import { useEffect, useState } from 'react';
import Prism from './Prism.jsx';
import BlurText from './BlurText.jsx';
import Btn from './Btn.jsx';

export default function Initiation() {
  const [live, setLive] = useState(false);

  useEffect(() => {
    const ok =
      window.matchMedia('(pointer: fine) and (min-width: 861px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setLive(ok);
  }, []);

  return (
    <section className="init" id="initiation">
      <div className="init__bg" aria-hidden="true" />
      {live && (
        <div className="init__prism" aria-hidden="true">
          <Prism
            animationType="rotate"
            timeScale={0.25}
            height={3.4}
            baseWidth={5.2}
            scale={3.1}
            glow={1.1}
            bloom={1}
            noise={0.18}
            saturation={0.12}
            hueShift={0}
            suspendWhenOffscreen
            transparent
          />
        </div>
      )}
      <div className="init__overlay" aria-hidden="true" />
      <div className="init__inner">
        <span className="init__label reveal">After the 33 days</span>
        <h2 className="init__title">
          <BlurText text="The Initiation" step={0.14} delay={0.1} />
        </h2>
        <p className="init__body reveal reveal--d2">
          The books hand you the practice. The Initiation is for the people who finish it
          and want to go deeper &mdash; guided work with David on the layer underneath the
          writing: frequency, source, truth.
        </p>
        <div className="init__ctas reveal reveal--d3">
          <Btn solid href="https://project369.com/initiationoffer-page" target="_blank" rel="noreferrer">
            Request your invitation
          </Btn>
          <a className="init__alt" href="https://project369.com/1-1-coaching" target="_blank" rel="noreferrer">
            Or apply for 1&ndash;1 mentorship &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
