import IslandIcon from '../assets/IslandIcon';
import { CATEGORIES } from '../data/wordBank';
import './IslandProgress.css';

interface IslandProgressProps {
  currentIsland: number;
  completedUpTo: number; // islands 0..completedUpTo-1 are done
}

export default function IslandProgress({ currentIsland, completedUpTo }: IslandProgressProps) {
  return (
    <div className="island-progress" role="navigation" aria-label="Island progress">
      <div className="island-progress__track">
        {CATEGORIES.map((cat, i) => {
          const completed = i < completedUpTo;
          const active = i === currentIsland;

          return (
            <div key={cat.key} className="island-progress__step">
              {/* Connector line */}
              {i > 0 && (
                <div
                  className={`island-progress__connector ${
                    i <= completedUpTo ? 'island-progress__connector--filled' : ''
                  }`}
                />
              )}

              <div className={`island-progress__island ${active ? 'island-progress__island--active' : ''}`}>
                <IslandIcon
                  completed={completed}
                  active={active}
                  index={i}
                  className="island-progress__icon"
                />
              </div>

              <span
                className={`island-progress__label ${
                  completed ? 'island-progress__label--done' : active ? 'island-progress__label--active' : ''
                }`}
              >
                {cat.island}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
