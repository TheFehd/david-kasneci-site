export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__rail">
          <img
            className="about__photo"
            src="/assets/369/coach/david-desk.jpg"
            alt="David Kasneci at his desk"
            loading="lazy"
          />
          <p className="about__meta reveal">David Kasneci<span>Author &middot; Publisher &middot; Mentor</span></p>
        </div>

        <div className="about__col">
          <span className="about__label reveal">The Work</span>
          <h2 className="about__lead reveal reveal--d1">
            Eight published works.<br />
            One publishing house.<br />
            <span>3,997 readers wrote back.</span>
          </h2>

          <div className="about__body reveal reveal--d2">
            <p>
              Project 369 began as one book about a simple discipline &mdash; write what you
              intend to become, three times in the morning, six in the afternoon, nine before
              sleep. Readers kept writing back with what changed. So it became a series, then
              Higher Mind Publishing, then meditations, journals and mentorship.
            </p>
            <p>
              The books hand you the method. The journals hold you to it. The deeper work is
              for the ones who finish the 33 days and want to keep going.
            </p>
          </div>

          <p className="about__framework reveal reveal--d3">
            Recalibrate your Frequency. Reconnect to Source. Create from Truth.
          </p>
        </div>
      </div>
    </section>
  );
}
