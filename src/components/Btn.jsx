import { Link } from 'react-router-dom';

/* Shiny-label pill button. `href` renders an <a>, `to` a router Link. */
export default function Btn({ href, to, children, solid, ghost, sm, className = '', ...rest }) {
  const cls = ['btn', solid && 'btn--solid', ghost && 'btn--ghost', sm && 'btn--sm', className]
    .filter(Boolean)
    .join(' ');
  const label = <span className="btn__label">{children}</span>;
  if (to) return <Link className={cls} to={to} {...rest}>{label}</Link>;
  return <a className={cls} href={href} {...rest}>{label}</a>;
}
