import TreasureChestIcon from '../assets/TreasureChestIcon';
import { CATEGORIES } from '../data/wordBank';
import './Victory.css';

interface VictoryProps {
  words: string[];
  onPlayAgain: () => void;
}

export default function Victory({ words, onPlayAgain }: VictoryProps) {
  return (
    <div className="victory">
      <div className="victory__glow" />

      <div className="victory__content">
        <span className="victory__confetti">🎉</span>

        <h1 className="victory__title">You Found the Treasure!</h1>
        <p className="victory__subtitle">
          All five map pieces assembled — the legendary hoard is yours, Captain!
        </p>

        <div className="victory__chest">
          <TreasureChestIcon isOpen />
        </div>

        <div className="victory__map">
          <h2 className="victory__map-title">🗺️ Your Treasure Map</h2>
          <div className="victory__map-pieces">
            {CATEGORIES.map((cat, i) => (
              <div key={cat.key} className="victory__piece">
                <span className="victory__piece-island">{cat.island}</span>
                <span className="victory__piece-word">{words[i]}</span>
                <span className="victory__piece-category">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        <button className="victory__btn" onClick={onPlayAgain}>
          🏴‍☠️ Set Sail Again
        </button>
      </div>
    </div>
  );
}
