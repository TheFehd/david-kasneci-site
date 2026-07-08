export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__rail">
          <span className="about__label reveal">The Work</span>
          <p className="about__meta reveal reveal--d1">
            Author<br />Publisher<br />Mentor
          </p>
          <dl className="about__facts reveal reveal--d2">
            <div><dt>8</dt><dd>Published works</dd></div>
            <div><dt>3,997</dt><dd>Verified reviews</dd></div>
            <div><dt>4.9</dt><dd>Average rating</dd></div>
          </dl>
        </div>

        <div className="about__col">
          <h2 className="about__lead reveal">
            I don&rsquo;t sell motivation. I publish a practice &mdash; and the practice works on paper.
          </h2>

          <div className="about__body reveal reveal--d1">
            <p>
              Project 369 started as one book about a simple discipline: write what you intend to
              become &mdash; three times in the morning, six times in the afternoon, nine times
              before sleep. It grew into a book series, a publishing house, guided meditations,
              a 33-day prayer journal and a mentorship &mdash; because readers kept writing back
              with what changed.
            </p>
            <p>
              Nothing here asks for belief up front. The books hand you the method and the
              reasoning behind it; the journals and planner hold you to it; the deeper work
              &mdash; the Initiation, the one-to-one mentorship &mdash; is for the people who
              finish the 33 days and want to go further. Start with a pen. Everything else
              is optional.
            </p>
          </div>

          <p className="about__framework reveal reveal--d2">
            Recalibrate your <em>Frequency</em>. Reconnect to <em>Source</em>. Create from <em>Truth</em>.
          </p>
        </div>
      </div>
    </section>
  );
}
