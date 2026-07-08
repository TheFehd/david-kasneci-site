/* Ecosystem marquee — David's projects, scrolling under the hero like a ventures strip */

const PROJECTS = [
  { icon: 'books', name: 'Project 369', desc: 'The book series' },
  { icon: 'publishing', name: 'Higher Mind Publishing', desc: 'The house' },
  { icon: 'initiation', name: 'The Initiation', desc: 'Flagship program' },
  { icon: 'mentorship', name: '1–1 Mentorship', desc: 'Private work' },
  { icon: 'meditations', name: 'Guided Meditations', desc: 'Audio practice' },
  { icon: 'prayer', name: 'The Prayer Journal', desc: '33-day journey' },
  { icon: 'soulwork', name: 'Soul Work', desc: 'The Key to Wholeness' },
  { icon: 'planner', name: 'Manifestation Planner', desc: 'Daily 3·6·9' },
];

function Row({ hidden }) {
  return (
    <div className="marquee__row" aria-hidden={hidden || undefined}>
      {PROJECTS.map((p) => (
        <span className="marquee__item" key={p.icon}>
          <img src={`/assets/369/icons/${p.icon}.jpg`} alt="" loading="lazy" />
          <span className="marquee__text">
            <span className="marquee__name">{p.name}</span>
            <span className="marquee__desc">{p.desc}</span>
          </span>
        </span>
      ))}
    </div>
  );
}

export default function ProjectsMarquee() {
  return (
    <section className="marquee" aria-label="David's projects">
      <div className="marquee__track">
        <Row />
        <Row hidden />
      </div>
    </section>
  );
}
