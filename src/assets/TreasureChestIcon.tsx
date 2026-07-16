interface TreasureChestIconProps {
  className?: string;
  isOpen?: boolean;
}

export default function TreasureChestIcon({ className, isOpen = false }: TreasureChestIconProps) {
  return (
    <svg
      className={className}
      viewBox="0 0 120 100"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Treasure chest"
    >
      <defs>
        <linearGradient id="chestGrad" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#8B5E3C" />
          <stop offset="100%" stopColor="#5C3317" />
        </linearGradient>
        <radialGradient id="goldGlow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
          <stop offset="70%" stopColor="#D4AF37" stopOpacity="0.5" />
          <stop offset="100%" stopColor="#B8860B" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Gold glow when open */}
      {isOpen && (
        <ellipse cx="60" cy="40" rx="40" ry="25" fill="url(#goldGlow)" opacity="0.8">
          <animate
            attributeName="opacity"
            values="0.6;1;0.6"
            dur="2s"
            repeatCount="indefinite"
          />
        </ellipse>
      )}

      {/* Chest lid */}
      <g
        style={{
          transformOrigin: '60px 55px',
          transform: isOpen ? 'rotateX(50deg) translateY(-20px)' : 'rotateX(0deg)',
          transition: 'transform 0.5s ease-out',
        }}
      >
        <path
          d="M15,55 Q15,35 60,35 Q105,35 105,55 Z"
          fill="url(#chestGrad)"
          stroke="#3a1f00"
          strokeWidth="1.5"
        />
        {/* Lid bands */}
        <path
          d="M25,52 Q25,40 60,40 Q95,40 95,52"
          fill="none"
          stroke="#D4AF37"
          strokeWidth="2"
        />
      </g>

      {/* Chest body */}
      <rect
        x="15"
        y="55"
        width="90"
        height="35"
        fill="url(#chestGrad)"
        stroke="#3a1f00"
        strokeWidth="1.5"
        rx="3"
      />

      {/* Horizontal bands */}
      <line x1="15" y1="65" x2="105" y2="65" stroke="#D4AF37" strokeWidth="2" />
      <line x1="15" y1="80" x2="105" y2="80" stroke="#D4AF37" strokeWidth="2" />

      {/* Lock plate */}
      <rect x="50" y="56" width="20" height="16" fill="#D4AF37" rx="3" />
      <circle cx="60" cy="64" r="3" fill="#3a1f00" />

      {/* Vertical bands */}
      <line x1="35" y1="55" x2="35" y2="90" stroke="#D4AF37" strokeWidth="1.5" />
      <line x1="85" y1="55" x2="85" y2="90" stroke="#D4AF37" strokeWidth="1.5" />

      {/* Gold coins peeking out when open */}
      {isOpen && (
        <>
          <circle cx="45" cy="52" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
          <circle cx="58" cy="48" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
          <circle cx="72" cy="50" r="5" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
          <circle cx="52" cy="44" r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
          <circle cx="67" cy="43" r="4" fill="#FFD700" stroke="#B8860B" strokeWidth="1" />
        </>
      )}
    </svg>
  );
}
