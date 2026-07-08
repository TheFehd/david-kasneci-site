/* Iman-style projects wall — clean typographic wordmarks, no tiles, no icons.
   Each mark is pure type with its own treatment, linking to the real property. */

function Triq() {
  return (
    <svg className="pw__triq" viewBox="0 0 100 100" aria-hidden="true">
      <g fill="none" stroke="currentColor" strokeWidth="6">
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" />
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(120 50 54)" />
        <path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(240 50 54)" />
      </g>
    </svg>
  );
}

const MARKS = [
  {
    key: 'p369',
    href: 'https://369project.com/collections/project-369-books',
    label: 'Project 369 — the book series',
    el: <span className="pw__m pw__m--p369">PR<Triq />JECT&nbsp;369</span>,
  },
  {
    key: 'soulwork',
    href: 'https://369project.com/products/project-369-the-key-to-wholeness-soul-work-journal',
    label: 'Soul Work — the Key to Wholeness journal',
    el: <span className="pw__m pw__m--soul">SOUL&nbsp;WORK</span>,
  },
  {
    key: 'mentorship',
    href: 'https://project369.com/1-1-coaching',
    label: '1-1 mentorship with David',
    el: (
      <span className="pw__m pw__m--m11">
        <b>1:1</b>MENTORSHIP
      </span>
    ),
  },
  {
    key: 'initiation',
    href: 'https://project369.com/initiationoffer-page',
    label: 'The Initiation — flagship program',
    el: <span className="pw__m pw__m--init">The&nbsp;Initiation</span>,
  },
  {
    key: 'higher',
    href: 'https://369project.com',
    label: 'Higher Mind Publishing',
    el: (
      <span className="pw__m pw__m--house">
        HIGHER&nbsp;MIND<i>PUBLISHING</i>
      </span>
    ),
  },
  {
    key: 'meditations',
    href: 'https://369project.com/pages/meditations',
    label: 'Guided meditations',
    el: <span className="pw__m pw__m--med">MEDITATIONS</span>,
  },
  {
    key: 'prayer',
    href: 'https://369project.com/products/the-prayer-journal-a-33-day-journey-into-the-kingdom-within',
    label: 'The Prayer Journal — 33-day alignment journey',
    el: <span className="pw__m pw__m--prayer">The Prayer Journal</span>,
  },
  {
    key: 'planner',
    href: 'https://369project.com/products/project-369-manifestation-planner',
    label: 'The Manifestation Planner',
    el: (
      <span className="pw__m pw__m--plan">
        <em>369</em>PLANNER
      </span>
    ),
  },
];

export default function ProjectsWall() {
  return (
    <section className="pwall" aria-label="David's projects">
      <span className="pwall__label reveal">Projects</span>
      <div className="pwall__grid">
        {MARKS.map((m, i) => (
          <a
            key={m.key}
            className={`pwall__item reveal reveal--d${(i % 4) + 1}`}
            href={m.href}
            target="_blank"
            rel="noreferrer"
            aria-label={m.label}
          >
            {m.el}
          </a>
        ))}
      </div>
    </section>
  );
}
