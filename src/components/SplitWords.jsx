/* Word-by-word blur reveal for headings. The parent carries
   `reveal reveal-w`; each word transitions in with its own delay once
   the IntersectionObserver marks the parent `.is-visible`. */

export default function SplitWords({ text, delay = 0.1, step = 0.055 }) {
  return text.split(' ').map((word, i) => (
    <span
      className="wsplit"
      key={i}
      style={{ transitionDelay: `${(delay + i * step).toFixed(3)}s` }}
    >
      {word}
      {i < text.split(' ').length - 1 ? '\u00A0' : ''}
    </span>
  ));
}
