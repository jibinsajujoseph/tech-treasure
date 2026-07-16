import { useReducer, useEffect, useCallback } from 'react';
import { gameReducer, initialState } from '../engine/gameReducer';
import type { GameState, GameAction } from '../engine/gameReducer';

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

  // Persist every state change
  useEffect(() => {
    saveState(state);
  }, [state]);

  // Physical keyboard listener
  useEffect(() => {
    if (state.status !== 'playing') return;

    const handler = (e: KeyboardEvent) => {
      const key = e.key.toUpperCase();
      if (/^[A-Z]$/.test(key)) {
        dispatch({ type: 'GUESS_LETTER', letter: key });
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [state.status]);

  const startGame = useCallback(() => dispatch({ type: 'START_GAME' }), []);
  const restart = useCallback(() => dispatch({ type: 'RESTART' }), []);
  const guessLetter = useCallback((letter: string) => dispatch({ type: 'GUESS_LETTER', letter }), []);
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
