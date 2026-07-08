/* Editorial split-button — label + corner arrow, invert on hover.
   Variants: default (outline), solid (filled), ghost (text-only), sm. */

export default function Btn({ href, children, solid, ghost, sm, className = '', ...rest }) {
  const cls = ['btn', solid && 'btn--solid', ghost && 'btn--ghost', sm && 'btn--sm', className]
    .filter(Boolean)
    .join(' ');
  return (
    <a className={cls} href={href} {...rest}>
      <span className="btn__label">{children}</span>
      {!ghost && (
        <span className="btn__mark" aria-hidden="true">
          <svg viewBox="0 0 24 24" fill="none">
            <path
              d="M7 17L17 7M17 7H9.5M17 7V14.5"
              stroke="currentColor"
              strokeWidth="1.75"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      )}
    </a>
  );
}
