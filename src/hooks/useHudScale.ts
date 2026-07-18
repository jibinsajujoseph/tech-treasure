import { useState, useEffect } from 'react';

const REF_WIDTH = 1440;
const REF_HEIGHT = 810;
const MIN_SCALE = 0.50;
const MAX_SCALE = 2.0;

function computeScale(): number {
  const w = window.innerWidth;
  const h = window.innerHeight;
  const raw = Math.min(w / REF_WIDTH, h / REF_HEIGHT);
  return Math.min(MAX_SCALE, Math.max(MIN_SCALE, raw));
}

export function useHudScale(): number {
  const [scale, setScale] = useState(computeScale);

  useEffect(() => {
    let rafId: number;

    const handleResize = () => {
      cancelAnimationFrame(rafId);
      rafId = requestAnimationFrame(() => {
        setScale(computeScale());
      });
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return scale;
}
