import { useEffect, useState } from 'react';
import Ferrofluid from './Ferrofluid.jsx';
import Starfield from './Starfield.jsx';

/* Site background: react-bits Ferrofluid (dark metal with an emerald glint,
   30fps, DPR 1) on capable desktops; the static starfield everywhere else. */

export default function Background() {
  const [mode, setMode] = useState('static');

  useEffect(() => {
    const ok =
      window.matchMedia('(pointer: fine) and (min-width: 861px)').matches &&
      !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    setMode(ok ? 'fluid' : 'static');
  }, []);

  if (mode === 'fluid') {
    return (
      <div className="bgfx" aria-hidden="true">
        <Ferrofluid
          colors={['#0c0c0d', '#1d1d20', '#2e2e33', '#3d3d42']}
          dpr={1}
          mouseForce={0.9}
        />
      </div>
    );
  }
  return <Starfield />;
}
