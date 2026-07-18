import WordDisplay from '../components/WordDisplay';
import Keyboard from '../components/Keyboard';
import Modal from '../components/Modal';
import { useHudScale } from '../hooks/useHudScale';
import type { GameState } from '../engine/gameReducer';
import { WORD_HINTS, CATEGORIES } from '../data/wordBank';
import './Game.css';

interface GameProps {
  state: GameState;
  onGuess: (letter: string) => void;
  onHint: () => void;
  onAdvance: () => void;
  onRestart: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Game({ state, onGuess, onHint, onAdvance, onRestart, soundEnabled, onToggleSound }: GameProps) {
  const currentWord = state.words[state.currentIsland] ?? '';
  const correctLetters = state.guessedLetters.filter((l) => currentWord.includes(l));
  const isPlaying = state.status === 'playing';
  const wonWord = state.status === 'won-word';
  const wrongGuesses = state.maxHealth - state.health;
  const hudScale = useHudScale();

  const islandImages = [
    '/assets/island1.png',
    '/assets/island2.png',
    '/assets/island3.png',
    '/assets/island4.png',
    '/assets/island5.png',
  ];

  const renderHearts = () => {
    const hearts = [];
    for (let i = 0; i < 5; i++) {
      hearts.push(
        <img
          key={`heart-${i}`}
          src="/assets/integrity.png"
          alt={i < state.health ? 'Heart full' : 'Heart empty'}
          className={`status-img-icon ${i >= state.health ? 'status-img-icon--empty' : ''}`}
        />
      );
    }
    return hearts;
  };

  const renderSkulls = () => {
    const skulls = [];
    for (let i = 0; i < 5; i++) {
      skulls.push(
        <img
          key={`skull-${i}`}
          src="/assets/wrong.png"
          alt={i < wrongGuesses ? 'Wrong guess' : 'No wrong guess'}
          className={`status-img-icon skull-img-icon ${i >= wrongGuesses ? 'status-img-icon--empty' : ''}`}
        />
      );
    }
    return skulls;
  };

  const renderTreasureProgress = () => {
    const gems = [];
    for (let i = 0; i < 5; i++) {
      gems.push(
        <div key={`gem-${i}`} className={`gem-slot-v2 ${i < state.currentIsland ? 'gem-slot-v2--filled' : ''}`}>
          {i < state.currentIsland && (
            <img src="/assets/progress-gem.png" alt="Progress gem" className="gem-img" />
          )}
        </div>
      );
    }
    return gems;
  };

  const renderIslandProgress = () => {
    return (
      <div className="island-tracker">
        {[0, 1, 2, 3, 4].map((idx) => {
          const isActive = idx === state.currentIsland;
          const isPast = idx < state.currentIsland;
          const isFuture = idx > state.currentIsland;
          return (
            <div key={idx} className="island-tracker__node-wrapper">
              <div className={`island-tracker__node ${isActive ? 'island-tracker__node--active' : ''} ${isPast ? 'island-tracker__node--past' : ''} ${isFuture ? 'island-tracker__node--future' : ''}`}>
                <div className="island-tracker__img-wrap">
                  <img
                    src={islandImages[idx]}
                    alt={CATEGORIES[idx]?.island ?? `Island ${idx + 1}`}
                    className="island-tracker__img"
                  />
                  {isActive && <div className="island-tracker__glow" />}
                  {isPast && <div className="island-tracker__completed-overlay" />}
                  {isFuture && <div className="island-tracker__locked-overlay" />}
                </div>
                <span className="island-tracker__number">{idx + 1}</span>
                <span className="island-tracker__name">{CATEGORIES[idx]?.island ?? `Island ${idx + 1}`}</span>
              </div>
              {/* Dashed connector between nodes */}
              {idx < 4 && <div className={`island-tracker__connector ${idx < state.currentIsland ? 'island-tracker__connector--done' : ''}`} />}
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <div className="game-v2">
      {/* Scaled HUD Layer */}
      <div
        className="game-v2__hud"
        style={{
          transform: `scale(${hudScale})`,
        }}
      >
        {/* ── Logo ── */}
        <div className="game-v2__logo-wrap">
          <img src="/assets/ingame-logo.png" alt="Akumen Tech Treasure" className="game-v2__logo-img" />
        </div>

        {/* ── Island Navigation ── */}
        <div className="game-v2__island-tracker">
          {renderIslandProgress()}
        </div>

        {/* ── Right Controls ── */}
        <div className="game-v2__top-right-actions">
          <button className="new-hunt-btn" onClick={onRestart} aria-label="New Hunt">
            <img src="/assets/new-hunt-button.png" alt="" className="new-hunt-btn__bg" />
            <span className="new-hunt-btn__text">
              <span className="new-hunt-btn__icon">🧭</span> New Hunt
            </span>
          </button>
          <div className="top-right-square-btns">
            <button className="square-btn" onClick={onToggleSound} aria-label={soundEnabled ? 'Mute sound' : 'Enable sound'}>
              <img src="/assets/square-button.png" alt="" className="square-btn__bg" />
              <span className="square-btn__icon">{soundEnabled ? '🔊' : '🔇'}</span>
            </button>
            <button className="square-btn" aria-label="Settings">
              <img src="/assets/square-button.png" alt="" className="square-btn__bg" />
              <span className="square-btn__icon">⚙️</span>
            </button>
          </div>
        </div>

        {/* ── Left Sidebar: Ship Status ── */}
        <aside className="game-v2__sidebar">
          <div className="ship-status-panel">
            <img src="/assets/status-board.png" alt="" className="ship-status-panel__bg" />
            <div className="ship-status-panel__content">

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
              </div>
            </div>
          </div>
        </aside>

        {/* ── Center: Game Area ── */}
        <div className="game-v2__center">
          {/* Clue Board */}
          <div className="clue-board">
            <img src="/assets/clue-board.png" alt="" className="clue-board__bg" />
            <div className="clue-board__content">
              <div className="clue-board__header">
                <h2 className="clue-board__island-title">{state.islandName}</h2>
                <p className="clue-board__category">Category: {state.category}</p>
              </div>

              <div className="clue-board__clue-section">
                <div className="clue-board__clue-label">
                  <span>CLUE</span>
                  <button
                    className={`clue-toggle ${state.hintVisible ? 'active' : ''}`}
                    onClick={onHint}
                    disabled={!isPlaying}
                    title="Toggle Clue"
                  >
                    ⓘ
                  </button>
                </div>
                {state.hintVisible ? (
                  <p className="clue-board__clue-text">{WORD_HINTS[currentWord] ?? 'No clue available.'}</p>
                ) : (
                  <p className="clue-board__clue-text clue-board__clue-text--hidden">Click the info icon to reveal the clue.</p>
                )}
              </div>
            </div>
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

        {/* ── Bottom-Right: Treasure Progress ── */}
        <aside className="game-v2__treasure">
          <div className="treasure-progress-panel">
            <img src="/assets/progress-board.png" alt="" className="treasure-progress-panel__bg" />
            <div className="treasure-progress-panel__content">
              <div className="gems-container-v2">
                {renderTreasureProgress()}
              </div>
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
