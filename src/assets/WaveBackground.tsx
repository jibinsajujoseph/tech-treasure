import { useEffect, useState } from 'react';

interface WaveBackgroundProps {
  className?: string;
}

export default function WaveBackground({ className }: WaveBackgroundProps) {
  const [offset, setOffset] = useState(0);

  useEffect(() => {
    let frame: number;
    let start: number | null = null;

    const animate = (timestamp: number) => {
      if (!start) start = timestamp;
      const elapsed = timestamp - start;
      setOffset((elapsed * 0.02) % 200);
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(frame);
  }, []);

  return (
    <svg
      className={className}
      viewBox="0 0 1440 200"
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
      role="presentation"
      style={{ display: 'block', width: '100%', height: '100%' }}
    >
      <defs>
        <linearGradient id="waveGrad1" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5276" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#0e2f44" stopOpacity="0.9" />
        </linearGradient>
        <linearGradient id="waveGrad2" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#154360" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#0b2338" stopOpacity="0.7" />
        </linearGradient>
      </defs>

      {/* Wave layer 1 */}
      <path
        d={`M${-offset},120 Q${180 - offset},80 ${360 - offset},120 T${720 - offset},120 T${1080 - offset},120 T${1440 - offset},120 T${1800 - offset},120 V200 H${-offset} Z`}
        fill="url(#waveGrad1)"
      />

      {/* Wave layer 2 */}
      <path
        d={`M${-offset * 0.7},140 Q${200 - offset * 0.7},110 ${400 - offset * 0.7},145 T${800 - offset * 0.7},140 T${1200 - offset * 0.7},145 T${1600 - offset * 0.7},140 V200 H${-offset * 0.7} Z`}
        fill="url(#waveGrad2)"
      />

      {/* Wave layer 3 — foam */}
      <path
        d={`M${-offset * 1.2},155 Q${160 - offset * 1.2},140 ${320 - offset * 1.2},158 T${640 - offset * 1.2},155 T${960 - offset * 1.2},158 T${1280 - offset * 1.2},155 T${1600 - offset * 1.2},158 V200 H${-offset * 1.2} Z`}
        fill="#0e2f44"
        opacity="0.5"
      />
    </svg>
  );
}
