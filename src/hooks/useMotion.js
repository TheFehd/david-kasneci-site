import { useEffect } from 'react';
import Lenis from 'lenis';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

/**
 * Motion layer: Lenis momentum scroll synced to GSAP's ticker (ready for parallax/pin),
 * plus IntersectionObserver-driven reveals (robust — content always resolves visible).
 * Respects prefers-reduced-motion.
 */
export function useMotion() {
  useEffect(() => {
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduce) return; // CSS already reveals everything

    const reveals = document.querySelectorAll('.reveal');

    let io;
    if ('IntersectionObserver' in window) {
      io = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('is-visible');
              io.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.15, rootMargin: '0px 0px -8% 0px' },
      );
      reveals.forEach((el) => io.observe(el));
    } else {
      reveals.forEach((el) => el.classList.add('is-visible'));
    }

    gsap.registerPlugin(ScrollTrigger);
    /* native scroll on touch devices — smoothing there fights the OS physics.
       CSS scroll-behavior handles anchor glides there (see index.css). */
    if (window.matchMedia('(pointer: coarse)').matches) return;
    const lenis = new Lenis({ duration: 0.85, smoothWheel: true });

    /* anchor links glide instead of jumping */
    const onAnchorClick = (e) => {
      const a = e.target.closest('a[href^="#"]');
      if (!a || a.getAttribute('href').length < 2) return;
      const target = document.querySelector(a.getAttribute('href'));
      if (!target) return;
      e.preventDefault();
      lenis.scrollTo(target, {
        duration: 1.4,
        easing: (t) => 1 - Math.pow(1 - t, 4),
      });
    };
    document.addEventListener('click', onAnchorClick);
    lenis.on('scroll', ScrollTrigger.update);
    const raf = (time) => lenis.raf(time * 1000);
    gsap.ticker.add(raf);
    gsap.ticker.lagSmoothing(0);

    return () => {
      if (io) io.disconnect();
      document.removeEventListener('click', onAnchorClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    };
  }, []);
}
