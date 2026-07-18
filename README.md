# 🏴‍☠️ Akumen Tech Treasure

A pirate-themed word-guessing adventure game where players sail across five islands, solving tech-themed word puzzles to uncover legendary treasure. Built with React, TypeScript, and Vite.

## 🎮 Gameplay

You are a **Captain** embarking on a treasure hunt across five themed islands. On each island, you must guess a hidden tech-related word — Hangman-style — before your ship's hull integrity runs out.

### The Five Islands

| # | Island | Category | Example Words |
|---|--------|----------|---------------|
| 1 | Merchant's Bay | Tech Companies | GOOGLE, APPLE, NVIDIA |
| 2 | Coder's Cay | Programming Languages | PYTHON, RUST, SWIFT |
| 3 | Stormy Seas | DevOps & Cloud | DOCKER, KUBERNETES, GIT |
| 4 | Machine Isle | AI | PROMPT, AGENT, NEURAL |
| 5 | Treasure Cove | General Tech | BROWSER, SERVER, CACHE |

### Rules

- **5 Hull Integrity points** — shared across all islands. Each wrong guess costs one point.
- **Clue system** — toggle a text hint for the current word at any time (free & unlimited).
- **Progress tracking** — collect a gem for each island conquered; fill all 5 to win.
- If your hull integrity reaches zero on any island, the run is lost.
- Conquer all 5 islands to uncover the full treasure map and claim victory!

## ✨ Features

- 🗺️ **Island-hopping progression** with animated island tracker and map reveal
- 🎯 **On-screen keyboard** with color-coded feedback (correct / incorrect / unused)
- 💡 **Clue system** with per-word hints
- 🎵 **Sound effects & background music** — looping BGM, key click sounds, success/failure cues
- 🔊 **Sound toggle** — enable or disable audio from the home screen or in-game
- 💾 **Auto-save** — game state persists in `localStorage` so you can resume anytime
- 📱 **Responsive HUD scaling** — UI adapts proportionally to viewport size
- 🏆 **Victory & Game Over screens** with themed artwork
- 🌊 **Animated wave background** on non-gameplay screens

## 🛠️ Tech Stack

| Layer | Technology |
|-------|------------|
| Framework | [React 19](https://react.dev) |
| Language | [TypeScript 6](https://www.typescriptlang.org) |
| Build Tool | [Vite 8](https://vite.dev) |
| Linting | [Oxlint](https://oxc.rs) |
| Styling | Vanilla CSS |
| Audio | Web Audio API (`HTMLAudioElement`) |
| State | `useReducer` + `localStorage` hydration |

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org) (v18+)
- npm

### Installation

```bash
git clone https://github.com/jibinsajujoseph/tech-treasure.git
cd tech-treasure
npm install
```

### Development

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

### Production Build

```bash
npm run build
npm run preview
```

## 📁 Project Structure

```
tech-treasure/
├── public/
│   └── assets/
│       ├── sounds/          # BGM, click, success, lose, final_success
│       ├── island[1-5].png  # Island artwork
│       ├── logo.png         # Home screen logo
│       └── ...              # UI boards, buttons, characters
├── src/
│   ├── assets/              # SVG components (WaveBackground)
│   ├── components/          # Reusable UI components
│   │   ├── HealthIndicator  # Hull integrity display
│   │   ├── HintButton       # Clue toggle button
│   │   ├── IslandProgress   # Island navigation tracker
│   │   ├── Keyboard         # On-screen letter keyboard
│   │   ├── Modal            # Overlay dialog
│   │   └── WordDisplay      # Hidden word letter slots
│   ├── data/
│   │   └── wordBank.ts      # Word lists, categories, and hints
│   ├── engine/
│   │   ├── gameReducer.ts   # Core game state & reducer logic
│   │   ├── helpers.ts       # Utility functions (word completion check)
│   │   └── wordSelector.ts  # Random word selection per category
│   ├── hooks/
│   │   ├── useGame.ts       # Game hook (reducer + localStorage + audio)
│   │   └── useHudScale.ts   # Responsive HUD scaling hook
│   ├── pages/
│   │   ├── Home             # Start screen with logo & adventure button
│   │   ├── Game             # Main gameplay screen
│   │   ├── Victory          # Win screen
│   │   └── GameOver         # Loss screen
│   ├── utils/
│   │   └── audio.ts         # AudioController singleton
│   ├── App.tsx              # Root component & screen router
│   └── main.tsx             # Entry point
├── index.html
├── package.json
├── vite.config.ts
└── tsconfig.json
```

## 🎯 Game Architecture

```
App (screen router)
 ├─ Home       →  START_GAME
 ├─ Game       →  GUESS_LETTER / USE_HINT / WIN_WORD / RESTART
 ├─ Victory    →  RESTART
 └─ GameOver   →  RESTART

useGame hook
 ├─ useReducer(gameReducer)   ← pure state transitions
 ├─ localStorage persistence  ← auto-save on every state change
 └─ audioController           ← side-effect sound playback
```

### State Flow

1. **`idle`** → Player is on the Home screen
2. **`playing`** → Actively guessing letters on an island
3. **`won-word`** → Current island conquered; modal shows map piece
4. **`won-run`** → All 5 islands conquered; Victory screen
5. **`lost-run`** → Hull integrity reached zero; Game Over screen

## 📜 Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start the Vite dev server with HMR |
| `npm run build` | Type-check and build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run Oxlint |

## 📄 License

This project is proprietary to [Akumen](https://akumenbyq.com).
