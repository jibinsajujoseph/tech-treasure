import ShipIcon from '../assets/ShipIcon';
import './GameOver.css';

interface GameOverProps {
  word: string;
  islandName: string;
  onRestart: () => void;
}

export default function GameOver({ word, islandName, onRestart }: GameOverProps) {
  return (
    <div className="gameover">
      <div className="gameover__content">
        <div className="gameover__ship-sunk">
          <ShipIcon sinkLevel={6} />
        </div>

        <h1 className="gameover__title">Ye Lost Yer Nerve, Matey!</h1>
        <p className="gameover__text">
          The sea claims your journey at <strong>{islandName}</strong>.
          <br />
          The word was: <strong className="gameover__word">{word}</strong>
        </p>

        <div className="gameover__skull">💀</div>

        <p className="gameover__prompt">
          The treasure map fragments scatter to the winds…
          <br />
          But the sea always offers another chance.
        </p>

        <button className="gameover__btn" onClick={onRestart}>
          ⚓ Start a New Hunt
        </button>
      </div>
    </div>
  );
}
