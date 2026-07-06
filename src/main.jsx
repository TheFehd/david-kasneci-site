import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';

// No StrictMode: avoids double-initialising Lenis/GSAP in dev.
createRoot(document.getElementById('root')).render(<App />);
