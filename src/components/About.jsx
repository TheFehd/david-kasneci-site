import CountUp from './CountUp.jsx';
import Btn from './Btn.jsx';
import Galaxy from './Galaxy.jsx';
import SplitWords from './SplitWords.jsx';

/* The Work — David's publishing house + proof stack.
   Galaxy background (react-bits), swappable photo card, stat strip. */

export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__bg" aria-hidden="true">
        <Galaxy
          className="about__galaxy"
          density={0.85}
          glowIntensity={0.28}
          saturation={0}
          hueShift={0}
          twinkleIntensity={0.35}
          starSpeed={0.45}
          speed={0.55}
          rotationSpeed={0.06}
          mouseInteraction
        />
        <div className="about__veil" />
      </div>

      <div className="about__inner">
        <figure className="about__rail reveal">
          <div className="about__frame">
            <img
              className="about__photo"
              src="/assets/369/coach/david-desk.jpg"
              alt="David Kasneci — photo updating"
              loading="lazy"
            />
            <span className="about__frameCap">Photo updating</span>
          </div>
          <figcaption className="about__meta">
            David Kasneci
            <span>Author &middot; Publisher &middot; Mentor</span>
          </figcaption>
        </figure>

        <div className="about__col">
          <span className="about__label reveal">The Work</span>

          <ul className="about__stats reveal reveal--d1" aria-label="Publishing stats">
            <li>
              <CountUp className="about__statN" value={8} duration={1.4} />
              <span className="about__statL">Published works</span>
            </li>
            <li>
              <CountUp className="about__statN" value={1} duration={1.2} />
              <span className="about__statL">Publishing house</span>
            </li>
            <li>
              <CountUp className="about__statN" value={3997} duration={2.4} />
              <span className="about__statL">Readers wrote back</span>
            </li>
          </ul>

          <h2 className="about__lead reveal reveal-w reveal--d2">
            <SplitWords
              text="One pen. Eight books. A house built from what readers sent back."
              delay={0.12}
              step={0.045}
            />
          </h2>

          <div className="about__body reveal reveal--d3">
            <p>
              Project 369 didn&rsquo;t start as a brand exercise. It started as one discipline
              on paper &mdash; write what you intend to become, then hold yourself to it.
              People didn&rsquo;t just finish the books. They mailed photos of their journals,
              recorded videos from their kitchens, wrote about debt cleared and marriages healed.
            </p>
            <p>
              Higher Mind Publishing grew out of that. The Initiation and the 1&ndash;1 work exist
              for the readers who finish the 33 days and want someone in the room with them.
            </p>
          </div>

          <div className="about__cta reveal reveal--d3">
            <Btn href="#reviews">Read what they wrote</Btn>
            <Btn ghost href="#mentorship">Work 1-on-1 with David</Btn>
          </div>
        </div>
      </div>
    </section>
  );
}
