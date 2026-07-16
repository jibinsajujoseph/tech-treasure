import { WORD_BANK, CATEGORIES } from '../data/wordBank';
import type { CategoryKey } from '../data/wordBank';

/**
 * Simple seeded pseudo-random number generator (mulberry32).
 * Used to support a future "Daily Treasure Hunt" seeded mode.
 */
function seededRandom(seed: number): () => number {
  return () => {
    seed |= 0;
    seed = (seed + 0x6d2b79f5) | 0;
    let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
    t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
    return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
  };
}

/**
 * Selects one random word per category in island order.
 * Accepts an optional seed for future daily-challenge mode.
 */
export function selectWords(seed?: number): string[] {
  const rng = seed !== undefined ? seededRandom(seed) : Math.random;
  const categoryKeys: CategoryKey[] = CATEGORIES.map((c) => c.key);

  return categoryKeys.map((key) => {
    const words = WORD_BANK[key];
    const index = Math.floor(rng() * words.length);
    return words[index];
  });
}
