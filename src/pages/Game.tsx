import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
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

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < state.maxHealth; i++) {
      hearts.push(
        <span key={`heart-${i}`} className={`status-icon ${i < state.health ? 'status-icon--filled' : 'status-icon--empty'}`}>
          {i < state.health ? '❤️' : '🖤'}
        </span>
      );
    }
    return hearts;
  };

  const renderSkulls = () => {
    const skulls = [];
    const wrongGuesses = state.maxHealth - state.health;
    for (let i = 0; i < state.maxHealth; i++) {
      skulls.push(
        <span key={`skull-${i}`} className={`status-icon skull-icon ${i < wrongGuesses ? 'status-icon--filled' : 'status-icon--empty'}`}>
          💀
        </span>
      );
    }
    return skulls;
  };

  const renderTreasureProgress = () => {
    const gems = [];
    for (let i = 0; i < 5; i++) {
      gems.push(
        <div key={`gem-${i}`} className={`gem-slot ${i < state.currentIsland ? 'gem-slot--filled' : ''}`}>
          {i < state.currentIsland && <span className="gem-icon">💎</span>}
        </div>
      );
    }
    return gems;
  };

  const renderIslandProgress = () => {
    return (
      <div className="island-progress-v2">
        {[0, 1, 2, 3, 4].map((idx) => {
          const isActive = idx === state.currentIsland;
          const isPast = idx < state.currentIsland;
          return (
            <div key={idx} className={`island-node ${isActive ? 'active' : ''} ${isPast ? 'past' : ''}`}>
              <div className="island-node__icon">
                {isPast && <span className="icon-check">✅</span>}
                {isActive && <span className="icon-island">🏝️</span>}
                {!isPast && !isActive && <span className="icon-question">❓</span>}
              </div>
              <span className="island-node__label">Island {idx + 1}</span>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="game-v2">
      {/* Top Navigation */}
      <header className="game-v2__top-nav">
        <div className="game-v2__logo-wrap">
          <img src="/assets/logo.png" alt="Akumen Tech Treasure" className="game-v2__logo-img" />
        </div>
        
        <div className="game-v2__island-tracker">
          {renderIslandProgress()}
        </div>

        <button className="wood-btn wood-btn--small" onClick={onRestart}>
          <span className="wood-btn__icon">🧭</span> NEW HUNT
        </button>
      </header>

      {/* Main Content Area */}
      <div className="game-v2__main">
        
        {/* Left Sidebar: Ship Status */}
        <aside className="game-v2__sidebar">
          <div className="wood-panel ship-status-panel">
            <h3 className="wood-panel__title">SHIP STATUS</h3>
            
            <div className="status-section">
              <label>Hull Integrity</label>
              <div className="status-icons">{renderHearts()}</div>
            </div>
            
            <div className="status-section">
              <label>Wrong Guesses</label>
              <div className="status-icons">{renderSkulls()}</div>
            </div>

            <div className="sidebar-character">
              <img src="/assets/game_skeleton.png" alt="Skeleton Captain" className="skeleton-img" />
              <div className="speech-bubble">
                Keep yer wits about ye, Captain!
              </div>
            </div>
          </div>
        </aside>

        {/* Center: Game Area */}
        <div className="game-v2__center">
          <div className="island-header">
            <h2 className="island-title">{state.islandName}</h2>
            <p className="island-category">CATEGORY: {state.category}</p>
          </div>

          <div className="clue-parchment">
            <div className="clue-header">
              <h3 className="parchment-title">CLUE</h3>
              <button 
                className={`clue-toggle ${state.hintVisible ? 'active' : ''}`} 
                onClick={onHint} 
                disabled={!isPlaying}
                title="Toggle Clue"
              >
                ℹ️
              </button>
            </div>
            {state.hintVisible ? (
              <p className="parchment-text">{WORD_HINTS[currentWord] ?? 'No clue available.'}</p>
            ) : (
              <p className="parchment-text text-muted text-center">Click the info icon to reveal the clue.</p>
            )}
          </div>

          <div className="word-display-wrapper">
            <WordDisplay
              word={currentWord}
              guessedLetters={state.guessedLetters}
            />
          </div>

          <div className="keyboard-wrapper">
            <Keyboard
              guessedLetters={state.guessedLetters}
              correctLetters={correctLetters}
              onGuess={onGuess}
              disabled={!isPlaying}
            />
          </div>
        </div>

        {/* Right: Treasure Progress */}
        <aside className="game-v2__right">
          <div className="wood-panel treasure-progress">
            <h3 className="wood-panel__title">TREASURE PROGRESS</h3>
            <div className="gems-container">
              {renderTreasureProgress()}
            </div>
          </div>
        </aside>

      </div>

      {/* Won-word modal */}
      <Modal isOpen={wonWord}>
        <div className="parchment-modal text-center">
          <h2 className="parchment-title">🗺️ MAP PIECE FOUND!</h2>
          <p className="parchment-text">
            Ye've conquered <strong>{state.islandName}</strong> and found a piece of the treasure map!
          </p>
          <p className="parchment-text" style={{ fontSize: '18px', color: '#2e4d1b', fontWeight: 'bold' }}>
            The word was: {currentWord}
          </p>
          <button className="wood-btn wood-btn--primary" onClick={onAdvance} style={{ marginTop: '20px' }}>
            ⛵ SAIL TO NEXT ISLAND
          </button>
        </div>
      </Modal>
    </div>
  );
}
