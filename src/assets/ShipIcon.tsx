interface ShipIconProps {
  className?: string;
  sinkLevel?: number; // 0 (fully afloat) to 6 (fully sunk)
}

export default function ShipIcon({ className, sinkLevel = 0 }: ShipIconProps) {
  const sinkOffset = sinkLevel * 8; // how far the ship sinks
  const waterRise = Math.min(sinkLevel * 10, 55);

  return (
    <svg
      className={className}
      viewBox="0 0 200 160"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Pirate ship — ${6 - sinkLevel} health remaining`}
    >
      {/* Sky gradient */}
      <defs>
        <linearGradient id="skyGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#0b1628" />
          <stop offset="100%" stopColor="#1a3a5c" />
        </linearGradient>
        <linearGradient id="waterGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#1a5276" />
          <stop offset="100%" stopColor="#0e2f44" />
        </linearGradient>
      </defs>

      {/* Background */}
      <rect width="200" height="160" fill="url(#skyGrad)" rx="8" />

      {/* Stars */}
      <circle cx="20" cy="15" r="1" fill="#ffd700" opacity="0.6" />
      <circle cx="55" cy="25" r="1.2" fill="#ffd700" opacity="0.5" />
      <circle cx="150" cy="10" r="1" fill="#ffd700" opacity="0.7" />
      <circle cx="175" cy="30" r="0.8" fill="#ffd700" opacity="0.5" />
      <circle cx="130" cy="20" r="1.1" fill="#ffd700" opacity="0.4" />

      {/* Ship group — sinks as health decreases */}
      <g
        style={{
          transform: `translateY(${sinkOffset}px)`,
          transition: 'transform 0.6s ease-in-out',
        }}
      >
        {/* Mast */}
        <rect x="96" y="30" width="4" height="75" fill="#5C3317" rx="1" />

        {/* Crow's nest */}
        <rect x="88" y="26" width="20" height="6" fill="#5C3317" rx="2" />

        {/* Main sail */}
        <polygon points="100,35 100,75 140,55" fill="#f5f0e1" opacity="0.9" />

        {/* Skull on sail */}
        <circle cx="116" cy="55" r="5" fill="none" stroke="#333" strokeWidth="1" />
        <line x1="116" y1="60" x2="116" y2="63" stroke="#333" strokeWidth="1" />
        <line x1="112" y1="61" x2="120" y2="61" stroke="#333" strokeWidth="1" />

        {/* Flag */}
        <polygon points="98,28 98,18 80,23" fill="#1a1a1a" />
        {/* Skull on flag */}
        <circle cx="88" cy="22" r="2.5" fill="#f5f0e1" />

        {/* Hull */}
        <path
          d="M50,105 Q55,85 70,85 L130,85 Q145,85 150,105 Z"
          fill="#5C3317"
        />
        <path
          d="M55,95 Q60,88 70,88 L130,88 Q140,88 145,95"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="1.5"
        />

        {/* Cannons */}
        <rect x="60" y="92" width="8" height="3" fill="#333" rx="1" />
        <rect x="80" y="92" width="8" height="3" fill="#333" rx="1" />
        <rect x="110" y="92" width="8" height="3" fill="#333" rx="1" />
        <rect x="130" y="92" width="8" height="3" fill="#333" rx="1" />
      </g>

      {/* Water — rises as ship sinks */}
      <path
        d={`M0,${110 - waterRise} Q25,${105 - waterRise} 50,${110 - waterRise} T100,${110 - waterRise} T150,${110 - waterRise} T200,${110 - waterRise} V160 H0 Z`}
        fill="url(#waterGrad)"
        opacity="0.85"
        style={{ transition: 'all 0.6s ease-in-out' }}
      />
      <path
        d={`M0,${116 - waterRise} Q30,${112 - waterRise} 60,${118 - waterRise} T120,${116 - waterRise} T180,${118 - waterRise} T200,${116 - waterRise} V160 H0 Z`}
        fill="#0e2f44"
        opacity="0.6"
        style={{ transition: 'all 0.6s ease-in-out' }}
      />
    </svg>
  );
}
