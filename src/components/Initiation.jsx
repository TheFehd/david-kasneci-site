/* The high-ticket doorway — full-bleed cinematic panel for the Initiation
   program and the 1-1 mentorship on project369.com. */

export default function Initiation() {
  return (
    <section className="init" id="initiation">
      <div className="init__bg" aria-hidden="true" />
      <div className="init__overlay" aria-hidden="true" />
      <div className="init__inner">
        <span className="init__label reveal">After the 33 days</span>
        <h2 className="init__title reveal reveal--d1">The Initiation</h2>
        <p className="init__body reveal reveal--d2">
          The books hand you the practice. The Initiation is for the people who finish it
          and want to go deeper &mdash; guided work with David on the layer underneath the
          writing: frequency, source, truth.
        </p>
        <div className="init__ctas reveal reveal--d3">
          <a className="init__btn" href="https://project369.com/initiationoffer-page" target="_blank" rel="noreferrer">
            Request your invitation
          </a>
          <a className="init__alt" href="https://project369.com/1-1-coaching" target="_blank" rel="noreferrer">
            Or apply for 1&ndash;1 mentorship &rarr;
          </a>
        </div>
      </div>
    </section>
  );
}
