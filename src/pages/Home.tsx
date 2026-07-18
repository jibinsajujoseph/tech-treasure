import './Home.css';

interface HomeProps {
  onStart: () => void;
  hasSavedGame: boolean;
  soundEnabled: boolean;
  onToggleSound: () => void;
}

export default function Home({ onStart, hasSavedGame, soundEnabled, onToggleSound }: HomeProps) {
  return (
    <div className="home-v2">
      <div className="home-v2__overlay">
        <div className="home-v2__modal-container">
          <div className="home-v2__main">
            {/* Logo */}
            <div className="home-v2__logo-container">
              <img src="/assets/logo.png" alt="Akumen Tech Treasure" className="home-v2__logo" />
            </div>

            {/* Buttons Menu */}
            <div className="home-v2__menu">
              <button className="img-btn start-btn" onClick={onStart}>
                <img src="/assets/start-button.png" alt="Start Button Background" />
                <span className="start-btn-text">
                  <span className="wood-btn__icon">🧭</span>
                  {hasSavedGame ? 'RESUME ADVENTURE' : 'START ADVENTURE'}
                </span>
              </button>

              <button className="img-btn sound-btn" onClick={onToggleSound}>
                <img src="/assets/button.png" alt="Sound Toggle Background" className="sound-btn-bg" />
                <span className="sound-btn-text">
                  <span className="sound-icon">🔊</span>
                  SOUND: <span className={soundEnabled ? 'text-green' : 'text-muted'}>{soundEnabled ? 'ON' : 'OFF'}</span>
                </span>
              </button>
            </div>
          </div>

          {/* Bottom Left: Captain's Log */}
          <div className="home-v2__captains-log-img-container">
            <img src="/assets/captains-log.png" alt="Captain's Log" className="home-v2__captains-log-img" />
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
        </div>
      </div>
    </div>
  );
}
