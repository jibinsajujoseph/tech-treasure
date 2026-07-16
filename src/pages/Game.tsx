import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
import HealthIndicator from '../components/HealthIndicator';
import IslandProgress from '../components/IslandProgress';
import HintButton from '../components/HintButton';
import Modal from '../components/Modal';
import type { GameState } from '../engine/gameReducer';
import { WORD_HINTS } from '../data/wordBank';
import './Game.css';

interface GameProps {
  state: GameState;
  onGuess: (letter: string) => void;
  onHint: () => void;
  onAdvance: () => void;
  onRestart: () => void;
}

export default function Game({ state, onGuess, onHint, onAdvance, onRestart }: GameProps) {
  const currentWord = state.words[state.currentIsland] ?? '';
  const correctLetters = state.guessedLetters.filter((l) => currentWord.includes(l));
  const isPlaying = state.status === 'playing';
  const wonWord = state.status === 'won-word';

  return (
    <div className="game">
      {/* Header bar */}
      <header className="game__header">
        <img src="/assets/logo.png" alt="Akumen Tech Treasure" className="game__header-logo" />
        <button className="game__new-hunt" onClick={onRestart} title="Abandon current hunt and start fresh">
          New Hunt
        </button>
      </header>

      {/* Island progress */}
      <IslandProgress currentIsland={state.currentIsland} completedUpTo={state.currentIsland} />

      {/* Main game area */}
      <div className="game__main">
        {/* Left: Health indicator */}
        <aside className="game__health-panel">
          <HealthIndicator health={state.health} maxHealth={state.maxHealth} />
        </aside>

        {/* Center: Word + Keyboard */}
        <div className="game__play-area">
          <div className="game__island-info">
            <span className="game__island-name">🏝️ {state.islandName}</span>
            <span className="game__category">Category: {state.category}</span>
          </div>

          <WordDisplay
            word={currentWord}
            guessedLetters={state.guessedLetters}
          />

          <div className="game__actions">
            <HintButton onClick={onHint} disabled={!isPlaying} active={state.hintVisible} />
          </div>

          {state.hintVisible && (
            <div className="game__hint-text">
              <span className="game__hint-label">💡 Clue:</span>
              <span className="game__hint-clue">{WORD_HINTS[currentWord] ?? 'No hint available'}</span>
            </div>
          )}

          <Keyboard
            guessedLetters={state.guessedLetters}
            correctLetters={correctLetters}
            onGuess={onGuess}
            disabled={!isPlaying}
          />
        </div>
      </div>

      {/* Won-word modal */}
      <Modal isOpen={wonWord}>
        <div className="game__modal-island-won">
          <span className="game__modal-icon">🗺️</span>
          <h2 className="game__modal-title">Map Piece Found!</h2>
          <p className="game__modal-text">
            Ye've conquered <strong>{state.islandName}</strong> and found a piece of the treasure map!
          </p>
          <p className="game__modal-word">
            The word was: <strong>{currentWord}</strong>
          </p>
          <p className="game__modal-progress">
            {state.currentIsland + 1} of 5 pieces collected
          </p>
          <button className="game__modal-btn" onClick={onAdvance}>
            ⛵ Sail to Next Island
          </button>
        </div>
      </Modal>
    </div>
  );
}
