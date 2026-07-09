import { Link } from 'react-router-dom';

/* Pill button with a text-roll hover: the label slides up and its twin
   rolls in from below. `href` renders an <a>, `to` a router Link. */

export default function Btn({ href, to, children, solid, ghost, sm, className = '', ...rest }) {
  const cls = ['btn', solid && 'btn--solid', ghost && 'btn--ghost', sm && 'btn--sm', className]
    .filter(Boolean)
    .join(' ');
  const label = (
    <span className="btn__label">
      <span className="btn__t btn__t--a">{children}</span>
      <span className="btn__t btn__t--b" aria-hidden="true">{children}</span>
    </span>
  );
  if (to) return <Link className={cls} to={to} {...rest}>{label}</Link>;
  return <a className={cls} href={href} {...rest}>{label}</a>;
}
