import { useReducer, useEffect, useCallback, useRef } from 'react';
import { gameReducer, initialState } from '../engine/gameReducer';
import type { GameState, GameAction } from '../engine/gameReducer';
import { audioController } from '../utils/audio';

const STORAGE_KEY = 'akumen-tech-treasure-state';

function loadState(): GameState | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return null;
    return JSON.parse(raw) as GameState;
  } catch {
    return null;
  }
}

function saveState(state: GameState) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
  } catch {
    // silently ignore quota errors
  }
}

export function useGame() {
  const saved = loadState();
  const [state, dispatch] = useReducer(gameReducer, saved ?? initialState);
  const prevState = useRef(state);

  // Persist every state change
  useEffect(() => {
    saveState(state);
    
    // Audio side effects
    if (state.soundEnabled !== prevState.current.soundEnabled) {
      if (state.status === 'playing' || state.status === 'won-word') {
        audioController.setBgmEnabled(state.soundEnabled);
      }
    }

    if (state.status !== prevState.current.status) {
      if (state.status === 'playing' && (prevState.current.status === 'idle' || prevState.current.status === 'lost-run' || prevState.current.status === 'won-run')) {
        audioController.playBgm(state.soundEnabled);
      } else if (state.status === 'lost-run') {
        audioController.stopBgm();
        audioController.playLose(state.soundEnabled);
      } else if (state.status === 'won-run') {
        audioController.stopBgm();
        audioController.playFinalSuccess(state.soundEnabled);
      } else if (state.status === 'won-word') {
        audioController.playSuccess(state.soundEnabled);
      } else if (state.status === 'idle') {
        audioController.stopBgm();
      }
    }

    prevState.current = state;
  }, [state]);

  // Physical keyboard listener
  useEffect(() => {
    if (state.status !== 'playing') return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        audioController.playClick(state.soundEnabled);
        dispatch({ type: 'GUESS_LETTER', letter: key });
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.status, state.soundEnabled]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const guessLetter = useCallback((letter: string) => {
    audioController.playClick(state.soundEnabled);
    dispatch({ type: 'GUESS_LETTER', letter });
  }, [state.soundEnabled]);
  const useHint = useCallback(() => dispatch({ type: 'USE_HINT' }), []);
  const advanceIsland = useCallback(() => dispatch({ type: 'WIN_WORD' }), []);
  const toggleSound = useCallback(() => dispatch({ type: 'TOGGLE_SOUND' }), []);

  const typedDispatch = useCallback((action: GameAction) => dispatch(action), []);

  return {
    state,
    dispatch: typedDispatch,
    startGame,
    restart,
    guessLetter,
    useHint,
    advanceIsland,
    toggleSound,
  };
}
