import './GameOver.css';

interface GameOverProps {
  word: string;
  islandName: string;
  onRestart: () => void;
}

export default function GameOver({ word, islandName, onRestart }: GameOverProps) {
  return (
    <div className="gameover-v2">
      <div className="gameover-v2__content">
        <h1 className="gameover-v2__title">YE LOST YER NERVE, MATEY!</h1>
        
        <p className="gameover-v2__text">
          THE SEA CLAIMS YOUR JOURNEY AT <strong>{islandName}</strong>.<br/>
          THE WORD WAS: <strong className="gameover-v2__word">{word}</strong>
        </p>

        <div className="gameover-v2__skull">💀</div>

        <p className="gameover-v2__prompt text-muted">
          THE TREASURE MAP FRAGMENTS SCATTER TO THE WINDS...<br/>
          BUT THE SEA ALWAYS OFFERS ANOTHER CHANCE.
        </p>

        <button className="wood-btn wood-btn--primary gameover-v2__btn" onClick={onRestart}>
          ⚓ START A NEW HUNT
        </button>
      </div>
    </div>
  );
}
