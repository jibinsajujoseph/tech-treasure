import './GameOver.css';

interface GameOverProps {
  word: string;
  islandName: string;
  onRestart: () => void;
}

export default function GameOver({ word, islandName, onRestart }: GameOverProps) {
  return (
    <div className="gameover-v2">
      <div className="gameover-v2__modal-container">
        
        <div className="gameover-v2__header">
          <h1 className="gameover-v2__title-large">YE LOST YER NERVE,<br/>MATEY!</h1>
        </div>

        <div className="gameover-v2__content-grid">
          <div className="gameover-text-panel">
            <p className="gameover-v2__text">
              THE SEA CLAIMS YOUR JOURNEY AT <br/><strong className="text-highlight">{islandName}</strong>.
            </p>
            
            <div className="gameover-v2__word-box">
              <span className="word-label">THE WORD WAS</span>
              <span className="word-value">{word}</span>
            </div>
            
            <div className="gameover-divider"></div>
            
            <p className="gameover-v2__prompt">
              THE TREASURE MAP FRAGMENTS SCATTER TO THE WINDS...<br/>
              BUT THE SEA ALWAYS OFFERS ANOTHER CHANCE.
            </p>
          </div>
        </div>

        <div className="gameover-play-btn-wrapper">
          <button className="gameover-sail-btn" onClick={onRestart}>
            <img src="/assets/button.png" alt="" className="gameover-sail-btn__bg" />
            <span className="gameover-sail-btn__text">
              ⚓ START A NEW HUNT
            </span>
          </button>
        </div>

      </div>
    </div>
  );
}
