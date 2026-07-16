import './HintButton.css';

interface HintButtonProps {
  onClick: () => void;
  disabled: boolean;
  active?: boolean;
}

export default function HintButton({ onClick, disabled, active = false }: HintButtonProps) {
  return (
    <button
      className={`hint-button ${active ? 'hint-button--active' : ''}`}
      onClick={onClick}
      disabled={disabled}
      aria-label={active ? 'Hide hint' : 'Show hint'}
      title="Toggle clue (free, no penalty)"
    >
      <svg viewBox="0 0 24 24" width="18" height="18" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="10" />
        <path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3" />
        <line x1="12" y1="17" x2="12.01" y2="17" />
      </svg>
      <span>{active ? 'Hide Clue' : 'Show Clue'}</span>
    </button>
  );
}
