/* The high-ticket doorway — full-bleed cinematic panel for the Initiation
   program and the 1-1 mentorship on project369.com. */

import SplitWords from './SplitWords.jsx';
import Btn from './Btn.jsx';

export default function Initiation() {
  return (
    <section className="init" id="initiation">
      <div className="init__bg" aria-hidden="true" />
      <div className="init__overlay" aria-hidden="true" />
      <div className="init__inner">
        <span className="init__label reveal">After the 33 days</span>
        <h2 className="init__title reveal reveal-w reveal--d1">
          <SplitWords text="The Initiation" delay={0.15} step={0.12} />
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
