import { CATEGORIES } from '../data/wordBank';
import { selectWords } from './wordSelector';
import { isWordComplete } from './helpers';

/* ------------------------------------------------------------------ */
/*  Types                                                              */
/* ------------------------------------------------------------------ */
export type GameStatus = 'idle' | 'playing' | 'won-word' | 'lost-run' | 'won-run';

export interface GameState {
  words: string[];          // 5 words, index = island number (0–4)
  currentIsland: number;    // 0–4
  category: string;         // display name for the current island's category
  islandName: string;       // display name for the island itself
  guessedLetters: string[]; // letters guessed on the CURRENT island
  hintVisible: boolean;     // whether the text hint is shown for the current word
  health: number;           // shared health pool across the whole run
  maxHealth: number;
  status: GameStatus;
  soundEnabled: boolean;    // stored for future use
}

/* ------------------------------------------------------------------ */
/*  Actions                                                            */
/* ------------------------------------------------------------------ */
export type GameAction =
  | { type: 'START_GAME' }
  | { type: 'GUESS_LETTER'; letter: string }
  | { type: 'USE_HINT' }
  | { type: 'WIN_WORD' }
  | { type: 'LOSE_RUN' }
  | { type: 'WIN_RUN' }
  | { type: 'RESTART' }
  | { type: 'TOGGLE_SOUND' }
  | { type: 'HYDRATE'; state: GameState };

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */
const MAX_HEALTH = 6;

/* ------------------------------------------------------------------ */
/*  Initial state                                                      */
/* ------------------------------------------------------------------ */
export const initialState: GameState = {
  words: [],
  currentIsland: 0,
  category: '',
  islandName: '',
  guessedLetters: [],
  hintVisible: false,
  health: MAX_HEALTH,
  maxHealth: MAX_HEALTH,
  status: 'idle',
  soundEnabled: true,
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */
function freshGame(): GameState {
  const words = selectWords();
  return {
    ...initialState,
    words,
    currentIsland: 0,
    category: CATEGORIES[0].name,
    islandName: CATEGORIES[0].island,
    health: MAX_HEALTH,
    status: 'playing',
  };
}

/* ------------------------------------------------------------------ */
/*  Reducer                                                            */
/* ------------------------------------------------------------------ */
export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    /* ---- Start / Restart ---- */
    case 'START_GAME': {
      return { ...freshGame(), soundEnabled: state.soundEnabled };
    }

    case 'RESTART': {
      return { ...initialState, soundEnabled: state.soundEnabled };
    }

    /* ---- Hydrate from local storage ---- */
    case 'HYDRATE': {
      return action.state;
    }

    /* ---- Guess a letter ---- */
    case 'GUESS_LETTER': {
      if (state.status !== 'playing') return state;

      const letter = action.letter.toUpperCase();
      if (state.guessedLetters.includes(letter)) return state;

      const currentWord = state.words[state.currentIsland];
      const newGuessed = [...state.guessedLetters, letter];
      const isCorrect = currentWord.includes(letter);

      let newHealth = state.health;
      if (!isCorrect) {
        newHealth = state.health - 1;
      }

      // Check loss
      if (newHealth <= 0) {
        return {
          ...state,
          guessedLetters: newGuessed,
          health: 0,
          status: 'lost-run',
        };
      }

      // Check word complete
      if (isCorrect && isWordComplete(currentWord, newGuessed)) {
        // Check if this was the last island
        if (state.currentIsland === 4) {
          return {
            ...state,
            guessedLetters: newGuessed,
            health: newHealth,
            status: 'won-run',
          };
        }
        return {
          ...state,
          guessedLetters: newGuessed,
          health: newHealth,
          status: 'won-word',
        };
      }

      return {
        ...state,
        guessedLetters: newGuessed,
        health: newHealth,
      };
    }

    /* ---- Hint: toggle text clue visibility (free, unlimited) ---- */
    case 'USE_HINT': {
      if (state.status !== 'playing') return state;
      return { ...state, hintVisible: !state.hintVisible };
    }

    /* ---- Advance to next island ---- */
    case 'WIN_WORD': {
      if (state.status !== 'won-word') return state;
      const nextIsland = state.currentIsland + 1;
      return {
        ...state,
        currentIsland: nextIsland,
        category: CATEGORIES[nextIsland].name,
        islandName: CATEGORIES[nextIsland].island,
        guessedLetters: [],
        hintVisible: false,
        status: 'playing',
      };
    }

    /* ---- Loss — requires button press to restart ---- */
    case 'LOSE_RUN': {
      return state; // status already set to 'lost-run' by GUESS_LETTER
    }

    /* ---- Full victory ---- */
    case 'WIN_RUN': {
      return state; // status already set to 'won-run' by GUESS_LETTER / USE_HINT
    }

    /* ---- Toggle sound preference ---- */
    case 'TOGGLE_SOUND': {
      return { ...state, soundEnabled: !state.soundEnabled };
    }

    default:
      return state;
  }
}
