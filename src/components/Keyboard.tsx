import './Keyboard.css';

interface KeyboardProps {
  guessedLetters: string[];
  correctLetters: string[];
  onGuess: (letter: string) => void;
  disabled: boolean;
}

const ROWS = [
  ['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
  ['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
  ['Z', 'X', 'C', 'V', 'B', 'N', 'M'],
];

export default function Keyboard({ guessedLetters, correctLetters, onGuess, disabled }: KeyboardProps) {
  const getKeyClass = (letter: string) => {
    if (!guessedLetters.includes(letter)) return 'key';
    if (correctLetters.includes(letter)) return 'key key--correct';
    return 'key key--wrong';
  };

  return (
    <div className="keyboard" role="group" aria-label="On-screen keyboard">
      {ROWS.map((row, i) => (
        <div className="keyboard__row" key={i}>
          {row.map((letter) => (
            <button
              key={letter}
              className={getKeyClass(letter)}
              onClick={() => onGuess(letter)}
              disabled={disabled || guessedLetters.includes(letter)}
              aria-label={`Guess letter ${letter}`}
              aria-disabled={disabled || guessedLetters.includes(letter)}
            >
              {letter}
            </button>
          ))}
        </div>
      ))}
    </div>
  );
}
