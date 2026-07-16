interface IslandIconProps {
  className?: string;
  completed?: boolean;
  active?: boolean;
  index?: number;
}

export default function IslandIcon({ className, completed = false, active = false, index = 0 }: IslandIconProps) {
  const palmColors = completed ? '#2ecc71' : active ? '#27ae60' : '#555';
  const sandColor = completed ? '#f0c040' : active ? '#D4AF37' : '#666';
  const flagColor = completed ? '#D4AF37' : '#999';
  const labels = ["Merchant's Bay", "Coder's Cay", "Stormy Seas", "Machine Isle", "Treasure Cove"];

  return (
    <svg
      className={className}
      viewBox="0 0 80 80"
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`Island ${index + 1}: ${labels[index] ?? ''} — ${completed ? 'completed' : active ? 'current' : 'locked'}`}
    >
      {/* Water */}
      <ellipse cx="40" cy="62" rx="36" ry="8" fill={active ? '#1a5276' : '#1a3a5c'} opacity="0.5" />

      {/* Sand island */}
      <ellipse cx="40" cy="55" rx="28" ry="10" fill={sandColor} />

      {/* Palm tree trunk */}
      <path d="M40,52 Q38,35 42,20" stroke="#5C3317" strokeWidth="3" fill="none" strokeLinecap="round" />

      {/* Palm leaves */}
      <path d="M42,22 Q55,15 60,25" stroke={palmColors} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M42,22 Q35,10 22,18" stroke={palmColors} strokeWidth="2.5" fill="none" strokeLinecap="round" />
      <path d="M42,22 Q50,8 45,5" stroke={palmColors} strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Flag/Marker */}
      {completed && (
        <>
          <line x1="55" y1="35" x2="55" y2="50" stroke="#5C3317" strokeWidth="1.5" />
          <polygon points="55,35 55,43 65,39" fill={flagColor} />
          <text x="58" y="41" fontSize="5" fill="#333" fontWeight="bold">✓</text>
        </>
      )}

      {active && !completed && (
        <circle cx="40" cy="48" r="4" fill="#D4AF37" opacity="0.8">
          <animate attributeName="opacity" values="0.5;1;0.5" dur="1.5s" repeatCount="indefinite" />
        </circle>
      )}
    </svg>
  );
}
