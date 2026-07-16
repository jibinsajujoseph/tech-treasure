import './WordDisplay.css';

interface WordDisplayProps {
  word: string;
  guessedLetters: string[];
  revealed?: boolean; // show all letters (e.g. on loss)
}

export default function WordDisplay({ word, guessedLetters, revealed = false }: WordDisplayProps) {
  return (
    <div className="word-display" aria-label="Word to guess">
      {word.split('').map((letter, i) => {
        const show = revealed || guessedLetters.includes(letter);

        return (
          <span
            key={`${letter}-${i}`}
            className={`word-display__letter ${show ? 'word-display__letter--revealed' : ''}`}
          >
            {show ? letter : ''}
            <span className="word-display__underline" />
          </span>
        );
      })}
    </div>
  );
}
