import { useState, useRef } from 'react';

/* Work 1-1 — the six areas from project369.com/1-1-coaching, distilled.
   One-open accordion with a cursor spotlight on the rows. */

const PILLARS = [
  {
    title: 'Business & Entrepreneurship',
    hook: '8 figures generated · 10-figure startups',
    lead:
      'After generating 8 figures and investing in 10-figure startups, I help entrepreneurs scale by aligning energetically — not by working harder.',
    points: [
      'Recalibrate your frequency and release abundance blocks',
      'Align your financial mission with your spiritual purpose',
      'Teams, systems, funnels, conversions and media buying',
    ],
    bestFor: 'Coaches, consultants, founders and agency owners stuck at their current level.',
  },
  {
    title: 'Relationship Healing & Fulfillment',
    hook: 'Married to my soulmate',
    lead:
      'After marrying my soulmate and learning to grow through authentic connection, I help others heal, attract, and thrive in love.',
    points: [
      'Heal trauma bonds, abandonment wounds and attachment cycles',
      'Balance masculine and feminine energies for lasting harmony',
      'Authentic communication that fosters safety and growth',
    ],
    bestFor: 'Divorced men and women, guarded high-achievers, repeating relationship patterns.',
  },
  {
    title: 'Healing Past Wounds & Trauma',
    hook: 'Healed myself — then my family',
    lead:
      'Raised in a household where abuse and neglect were the norm, I healed myself first — then guided many others, including my own family, through the same transformation.',
    points: [
      'Identity-level healing and nervous-system regulation',
      'Break generational cycles; release addiction, guilt, shame, grief',
      'Integrate suppressed parts of the self and return to wholeness',
    ],
    bestFor: 'High-functioning people who have done therapy, retreats, everything — and still feel stuck.',
  },
  {
    title: 'Physical Health & Performance',
    hook: '80 lbs released',
    lead:
      'Obese at 14 and addicted to food, I lost over 80 lbs by releasing the misalignment underneath — then rebuilt my body and vitality from the inside.',
    points: [
      'A sustainable, nourishing lifestyle — not a restrictive diet',
      'Fasting, breathwork, hormones and circadian rhythm',
      'Superconscious flow states for maximum performance',
    ],
    bestFor: 'High-achievers facing burnout, chronic fatigue, obesity or autoimmune conditions.',
  },
  {
    title: 'Spiritual Clarity & Connection',
    hook: 'Truth, not belief',
    lead:
      'This is not about belief. It is about truth — living from Source instead of the fear, scarcity and lack the ego runs on.',
    points: [
      'Balance your energy centers; access superconscious awareness',
      'Transcend fear, shame and scarcity locked in the lower chakras',
      'Activate the Infinite Creator within and manifest authentically',
    ],
    bestFor: 'Awakened individuals lost in concepts, ready to embody real truth.',
  },
  {
    title: 'Direction & Purpose',
    hook: 'Best-selling author by listening',
    lead:
      'I once stayed in a life that was not mine — until I followed my truth and watched the path unfold: best-selling author, entrepreneur, mentor.',
    points: [
      'Clarify your soul’s mission and highest contribution',
      'Follow intuitive guidance without fear or doubt',
      'Break free from external expectations and self-sabotage',
    ],
    bestFor: 'Career changers and anyone navigating midlife uncertainty.',
  },
];

export default function Pillars() {
  const [open, setOpen] = useState(0);
  const listRef = useRef(null);

  const spot = (e) => {
    const row = e.currentTarget;
    const r = row.getBoundingClientRect();
    row.style.setProperty('--sx', `${e.clientX - r.left}px`);
    row.style.setProperty('--sy', `${e.clientY - r.top}px`);
  };

  return (
    <section className="pillars" id="mentorship">
      <div className="pillars__inner">
        <div className="pillars__head">
          <span className="pillars__label reveal">Work 1&ndash;1</span>
          <h2 className="pillars__title reveal reveal--d1">Six areas. One alignment.</h2>
          <p className="pillars__sub reveal reveal--d2">
            Private mentorship with David &mdash; where the practice meets your business,
            your body, your relationships and your purpose.
          </p>
        </div>

        <div className="pillars__list reveal" ref={listRef}>
          {PILLARS.map((p, i) => {
            const isOpen = open === i;
            return (
              <div className={`pil${isOpen ? ' is-open' : ''}`} key={p.title} onMouseMove={spot}>
                <button
                  className="pil__head"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span className="pil__num">{String(i + 1).padStart(2, '0')}</span>
                  <span className="pil__name">{p.title}</span>
                  <span className="pil__hook">{p.hook}</span>
                  <span className="pil__x" aria-hidden="true" />
                </button>
                <div className="pil__body">
                  <div className="pil__bodyInner">
                    <div className="pil__cols">
                      <p className="pil__lead">{p.lead}</p>
                      <div>
                        <ul className="pil__points">
                          {p.points.map((pt) => <li key={pt}>{pt}</li>)}
                        </ul>
                        <p className="pil__best"><span>Best for</span> {p.bestFor}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="pillars__cta reveal">
          <a className="pillars__btn" href="https://project369.com/1-1-coaching" target="_blank" rel="noreferrer">
            Apply for 1&ndash;1 mentorship
          </a>
          <span className="pillars__note">By application &middot; limited seats</span>
        </div>
      </div>
    </section>
  );
}
