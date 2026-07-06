export default function About() {
  return (
    <section className="about" id="about">
      <div className="about__inner">
        <div className="about__rail">
          <span className="about__label reveal">The Work</span>
          <p className="about__meta reveal reveal--d1">
            Mentor<br />Researcher<br />Author
          </p>
        </div>

        <div className="about__col">
          <h2 className="about__lead reveal">
            I help people close the distance between who they are and who they know they can become.
          </h2>

          <div className="about__body reveal reveal--d1">
            <p>
              For over a decade I've worked at the meeting point of human performance and inner
              transformation — with founders, athletes, creators and coaches who had already achieved
              and still felt a quiet distance between their outer results and their inner state.
            </p>
            <p>
              The work isn't more strategy. It's the subconscious programming and nervous-system
              patterns running underneath it — the layer most high performers never get to touch.
              That's the layer we work on together.
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
