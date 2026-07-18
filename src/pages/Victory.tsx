import './Victory.css';

interface VictoryProps {
  words: string[];
  onPlayAgain: () => void;
}

export default function Victory({ onPlayAgain }: VictoryProps) {
  return (
    <div className="victory-v2">
      <div className="victory-v2__modal-container">
        
        <div className="victory-v2__header">
          <h2 className="victory-v2__title-small">CONGRATULATIONS, CAPTAIN!</h2>
          <h1 className="victory-v2__title-large">YE FOUND THE<br/>TECH TREASURE!</h1>
        </div>

        <div className="victory-v2__content-grid">
          {/* Left: Skeleton */}
          <div className="victory-v2__left-col">
            <img src="/assets/victory_skeleton.png" alt="Happy Skeleton Captain" className="victory-skeleton-img" />
          </div>

          {/* Middle: Map */}
          <div className="victory-v2__mid-col">
            <div className="victory-map-wrapper">
              <img src="/assets/akumen-pirate-map.png" alt="Completed Map" className="victory-map-image" />
            </div>
          </div>

          {/* Right: Chest */}
          <div className="victory-v2__right-col">
            <img src="/assets/victory_chest.png" alt="Glowing Treasure Chest" className="victory-chest-img" />
          </div>
        </div>

        <div className="victory-play-btn-wrapper">
          <button className="sail-btn" onClick={onPlayAgain}>
            <img src="/assets/button.png" alt="" className="sail-btn__bg" />
            <span className="sail-btn__text">
              ⛵ PLAY AGAIN
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
