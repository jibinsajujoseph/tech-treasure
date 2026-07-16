import ShipIcon from '../assets/ShipIcon';
import './HealthIndicator.css';

interface HealthIndicatorProps {
  health: number;
  maxHealth: number;
}

export default function HealthIndicator({ health, maxHealth }: HealthIndicatorProps) {
  const sinkLevel = maxHealth - health;

  return (
    <div className="health-indicator">
      <div className="health-indicator__ship">
        <ShipIcon sinkLevel={sinkLevel} />
      </div>
      <div className="health-indicator__text">
        <span className="health-indicator__label">Hull Integrity</span>
        <div className="health-indicator__bar">
          <div
            className="health-indicator__fill"
            style={{
              width: `${(health / maxHealth) * 100}%`,
              backgroundColor:
                health > 4 ? '#2ecc71' : health > 2 ? '#f39c12' : '#e74c3c',
            }}
          />
        </div>
        <span className="health-indicator__count">{health} / {maxHealth}</span>
      </div>
    </div>
  );
}
