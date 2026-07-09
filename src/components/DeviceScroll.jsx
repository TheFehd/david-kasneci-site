import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'motion/react';

/* Aceternity "Container Scroll" — the screen tilts up from 3D as you
   scroll, carrying David's real course mockup from the funnel. */

export default function DeviceScroll({ eyebrow, title, sub, img, alt }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref });

  const rotateX = useTransform(scrollYProgress, [0, 1], [20, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1.04, 1]);
  const headY = useTransform(scrollYProgress, [0, 1], [0, -90]);

  return (
    <section className="dscroll" ref={ref}>
      <div className="dscroll__persp">
        <motion.div className="dscroll__head" style={{ y: headY }}>
          <span className="pillars__label reveal">{eyebrow}</span>
          <h2 className="dscroll__title">{title}</h2>
          {sub && <p className="dscroll__sub">{sub}</p>}
        </motion.div>
        <motion.div className="dscroll__card" style={{ rotateX, scale }}>
          <div className="dscroll__screen">
            <img src={img} alt={alt} loading="lazy" />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
