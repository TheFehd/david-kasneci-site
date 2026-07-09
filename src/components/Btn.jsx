/* Corner-bracket editorial button.
   Variants: default (brackets grow to a frame), solid (filled, brackets
   close in from outside), ghost (underline), sm. */

export default function Btn({ href, children, solid, ghost, sm, className = '', ...rest }) {
  const cls = ['btn', solid && 'btn--solid', ghost && 'btn--ghost', sm && 'btn--sm', className]
    .filter(Boolean)
    .join(' ');
  return (
    <a className={cls} href={href} {...rest}>
      <span className="btn__label">{children}</span>
    </a>
  );
}
