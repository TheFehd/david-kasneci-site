import { Link } from 'react-router-dom';
import Btn from './Btn.jsx';

/* Slim fixed header for sub-pages: way back home + the page's one action. */
export default function PageHead({ href, cta }) {
  return (
    <header className="phead">
      <Link className="phead__back" to="/">&larr;&nbsp; David Kasneci</Link>
      <Btn sm href={href} target="_blank" rel="noreferrer">{cta}</Btn>
    </header>
  );
}
