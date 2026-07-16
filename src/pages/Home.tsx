import { useState } from 'react';
import Modal from '../components/Modal';
import './Home.css';

interface HomeProps {
  onStart: () => void;
  hasSavedGame: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Home({ onStart, hasSavedGame, soundEnabled, onToggleSound }: HomeProps) {
  const [showHowToPlay, setShowHowToPlay] = useState(false);

  return (
    <div className="home-v2">
      {/* Top Bar (Omitting non-functional settings/achievements as requested) */}
      <div className="home-v2__top-bar">
      </div>

      <div className="home-v2__main">
        {/* Logo */}
        <div className="home-v2__logo-container">
          <img src="/assets/logo.png" alt="Akumen Tech Treasure" className="home-v2__logo" />
        </div>

        {/* Buttons Menu */}
        <div className="home-v2__menu">
          <button className="wood-btn wood-btn--primary" onClick={onStart}>
            <span className="wood-btn__icon">🧭</span>
            {hasSavedGame ? 'RESUME ADVENTURE' : 'START ADVENTURE'}
          </button>

          <button className="wood-btn" onClick={() => setShowHowToPlay(true)}>
            <span className="wood-btn__icon">📖</span>
            HOW TO PLAY
          </button>

          <button className="wood-btn" onClick={onToggleSound}>
            <span className="wood-btn__icon">🔊</span>
            SOUND: <span className={soundEnabled ? 'text-green' : 'text-muted'}>{soundEnabled ? 'ON' : 'OFF'}</span>
          </button>
        </div>
      </div>

      {/* Bottom Left: Captain's Log */}
      <div className="home-v2__captains-log">
        <h3 className="parchment-title">☠️ CAPTAIN'S LOG</h3>
        <p className="parchment-text">
          Five islands stand between you and the ultimate tech treasure. Sharpen your mind, trust your wit, and claim what's yours!
        </p>
      </div>

      {/* Bottom Right: Treasure Chest */}
      <div className="home-v2__chest-container">
        <img src="/assets/start_chest.png" alt="Treasure Chest" className="home-v2__chest-img" />
      </div>

      {/* Bottom Status Bar */}
      <div className="home-v2__status-bar">
        <span className="text-green">☠️ WELCOME, CAPTAIN!</span>
        <span className="separator">|</span>
        <span className="text-muted">COMPLETE 5 ISLANDS TO UNCOVER THE LEGENDARY TREASURE.</span>
      </div>

      {/* How To Play Modal */}
      <Modal isOpen={showHowToPlay}>
        <div className="parchment-modal">
          <h2 className="parchment-title">📖 HOW TO PLAY</h2>
          <ul className="parchment-list">
            <li><strong>The Map:</strong> Conquer 5 islands to assemble the treasure map.</li>
            <li><strong>The Challenge:</strong> Guess the tech-themed word on each island.</li>
            <li><strong>The Ship:</strong> You share 6 lives across all 5 islands. If your ship sinks, you start over!</li>
            <li><strong>Clues:</strong> Free text clues are available for each word if ye get stuck.</li>
          </ul>
          <button className="wood-btn" onClick={() => setShowHowToPlay(false)}>
            CLOSE
          </button>
        </div>
      </Modal>
    </div>
  );
}
