import { useGame } from './hooks/useGame';
import Home from './pages/Home';
import Game from './pages/Game';
import Victory from './pages/Victory';
import GameOver from './pages/GameOver';
import WaveBackground from './assets/WaveBackground';
import { CATEGORIES } from './data/wordBank';
import './App.css';

function App() {
  const { state, startGame, restart, guessLetter, useHint, advanceIsland } = useGame();

  const hasSavedGame = state.status !== 'idle';

  const handleStart = () => {
    if (state.status === 'idle') {
      startGame();
    }
    // If already playing (resumed from localStorage), the game page will show
  };

  const renderScreen = () => {
    switch (state.status) {
      case 'idle':
        return <Home onStart={handleStart} hasSavedGame={false} />;

      case 'playing':
      case 'won-word':
        return (
          <Game
            state={state}
            onGuess={guessLetter}
            onHint={useHint}
            onAdvance={advanceIsland}
            onRestart={restart}
          />
        );

      case 'lost-run':
        return (
          <GameOver
            word={state.words[state.currentIsland]}
            islandName={CATEGORIES[state.currentIsland]?.island ?? 'Unknown'}
            onRestart={restart}
          />
        );

      case 'won-run':
        return <Victory words={state.words} onPlayAgain={restart} />;

      default:
        return <Home onStart={handleStart} hasSavedGame={hasSavedGame} />;
    }
  };

  return (
    <div className="app">
      <div className="app__waves">
        <WaveBackground />
      </div>
      {renderScreen()}
    </div>
  );
}

export default App;
