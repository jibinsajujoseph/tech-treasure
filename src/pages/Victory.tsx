import './Victory.css';

interface VictoryProps {
  words: string[];
  onPlayAgain: () => void;
}

export default function Victory({ onPlayAgain }: VictoryProps) {
  return (
    <div className="victory-v2">
      {/* Background Effects */}
      <div className="victory-v2__confetti"></div>

      <div className="victory-v2__header">
        <div className="victory-v2__ribbon">
          <h2>CONGRATULATIONS, CAPTAIN!</h2>
        </div>
        <h1 className="victory-v2__title">YE FOUND THE<br/>TECH TREASURE!</h1>
      </div>

      <div className="victory-v2__main">
        
        {/* Left: Skeleton Character */}
        <div className="victory-v2__character">
          <img src="/assets/victory_skeleton.png" alt="Happy Skeleton Captain" className="victory-skeleton-img" />
        </div>

        {/* Center: Treasure Chest */}
        <div className="victory-v2__chest">
          <img src="/assets/victory_chest.png" alt="Glowing Treasure Chest" className="victory-chest-img" />
        </div>

        {/* Right: Summary Panel */}
        <div className="victory-v2__summary">
          <div className="parchment-panel text-center">
            <h3 className="parchment-title">YOUR TREASURE</h3>
            <div className="victory-gems">
              {[0, 1, 2, 3, 4].map(i => (
                <span key={i} className="victory-gem">💎</span>
              ))}
            </div>
          </div>
          
          <button className="wood-btn wood-btn--primary" onClick={onPlayAgain} style={{ marginTop: '24px' }}>
            PLAY AGAIN
          </button>
        </div>

      </div>
    </div>
  );
}
