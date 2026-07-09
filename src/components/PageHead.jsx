import { Link } from 'react-router-dom';
import Btn from './Btn.jsx';

/* Slim fixed header for sub-pages: way back home + the page's one action. */
export default function PageHead({ href, cta }) {
  return (
    <header className="phead">
      <Link className="phead__back" to="/">
        <svg className="nav__mark" viewBox="0 0 100 100" aria-hidden="true"><g fill="none" stroke="currentColor" strokeWidth="7"><path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" /><path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(120 50 54)" /><path d="M50 54 A40 40 0 0 1 50 14 A40 40 0 0 1 50 54 Z" transform="rotate(240 50 54)" /></g></svg>
        David Kasneci
      </Link>
      <Btn sm href={href} target="_blank" rel="noreferrer">{cta}</Btn>
    </header>
  );
}
