/**
 * Returns letters in the word that have not yet been guessed.
 */
export function getUnrevealedLetters(word: string, guessedLetters: string[]): string[] {
  const unique = [...new Set(word.split(''))];
  return unique.filter((letter) => !guessedLetters.includes(letter));
}

/**
 * Returns true if all letters of the word have been guessed.
 */
export function isWordComplete(word: string, guessedLetters: string[]): boolean {
  return getUnrevealedLetters(word, guessedLetters).length === 0;
}

/**
 * Returns the number of wrong guesses (letters guessed that are NOT in the word).
 */
export function countWrongGuesses(word: string, guessedLetters: string[]): number {
  return guessedLetters.filter((letter) => !word.includes(letter)).length;
}

/**
 * Returns true if the letter is A-Z (uppercase).
 */
export function isValidLetter(key: string): boolean {
  return /^[A-Z]$/.test(key);
}
