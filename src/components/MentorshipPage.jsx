import PageHead from './PageHead.jsx';
import Btn from './Btn.jsx';
import BlurText from './BlurText.jsx';
import SplitTextRB from './SplitTextRB.jsx';
import ScrollRevealRB from './ScrollRevealRB.jsx';
import Pillars from './Pillars.jsx';

/* /mentorship — the 1-1 coaching funnel, rebuilt in the site's language.
   All copy distilled from project369.com/1-1-coaching. Apply CTAs go to
   the real application funnel. */

const APPLY = 'https://project369.com/1-1-coaching';

export default function MentorshipPage() {
  return (
    <>
      <PageHead href={APPLY} cta="Apply now" />

      <section className="subhero">
        <div className="subhero__inner">
          <span className="subhero__label reveal">Private 1&ndash;1 &middot; by application</span>
          <h1 className="subhero__title">
            <SplitTextRB text="Work with David," fancy="one to one." delay={28} />
          </h1>
          <p className="subhero__framework reveal reveal--d1">
            Recalibrate your <em>Frequency</em>. Reconnect to <em>Source</em>. Create from <em>Truth</em>.
          </p>
          <p className="subhero__body reveal reveal--d2">
            &ldquo;For the past few years I&rsquo;ve been fully booked &mdash; building my
            businesses and doing deep, soul-level work with individuals one on one. Right now
            I have space for a few committed people who are truly ready to shift and rise into
            their next level.&rdquo;
          </p>
          <div className="subhero__ctas reveal reveal--d3">
            <Btn solid href={APPLY} target="_blank" rel="noreferrer">Apply now</Btn>
            <span className="subhero__note">Minimum three months &middot; only a few spots open</span>
          </div>
        </div>
        <figure className="subhero__media reveal reveal--d2">
          <img src="/assets/369/coach/david-desk.jpg" alt="David Kasneci at his desk" />
        </figure>
      </section>

      <section className="mtruth">
        <p className="mtruth__who reveal">
          For spiritual seekers, athletes, entrepreneurs, creators, coaches and founders
          who have done the inner and the outer work &mdash; and still feel stuck.
        </p>
        <ScrollRevealRB className="mtruth__quote">
          “It’s not because you’re broken. Underneath all the hard work there’s subconscious programming still running the show — patterns buried in the nervous system, quietly repelling what you desire. That’s the layer we work on. Not surface level: energy, frequency and identity, rebuilt from Authentic Truth.”
        </ScrollRevealRB>
      </section>

      <Pillars applyExternal />

      <section className="init">
        <div className="init__bg" aria-hidden="true" />
        <div className="init__overlay" aria-hidden="true" />
        <div className="init__inner">
          <span className="init__label reveal">The invitation</span>
          <h2 className="init__title">
            <BlurText text="If something in you feels *the *call." step={0.09} />
          </h2>
          <p className="init__body reveal reveal--d2">
            This container is intimate, deep, and not for everyone. If your soul is nodding
            in recognition &mdash; apply, and we&rsquo;ll see if we&rsquo;re aligned to walk
            this path together.
          </p>
          <div className="init__ctas reveal reveal--d3">
            <Btn solid href={APPLY} target="_blank" rel="noreferrer">Begin your application</Btn>
          </div>
        </div>
      </section>
    </>
  );
}
