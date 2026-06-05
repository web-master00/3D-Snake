# Garden Snake

A reimagined classic Snake game with an organic forest theme, animated Three.js
background, DOM particle effects, and a synthesised eat sound — no audio file
required.

## Tech Stack

- HTML / SCSS / Vanilla JavaScript (ES modules)
- [Three.js r128](https://threejs.org/) — animated background scene
- Web Audio API — synthesised eat sound
- Google Fonts — Lora (serif) + DM Mono (UI)
- Font Awesome — icons

## Features

- Day / night themes with smooth transitions (top-bar toggle + settings toggle)
- Three difficulty levels (Easy / Medium / Hard) with per-level snake colours
- Animated Three.js background: floating spores + drifting vine segments
- Particle bursts on eat, scattered fragments on death
- Pulsing food and glowing snake head
- Per-segment opacity & scale taper so the body fades toward the tail
- Score + per-level record persistence (`localStorage`)
- Wall collision in Hard mode, edge teleport otherwise
- Keyboard, touch, and on-screen arrow controls
- Pause / resume / restart / main menu flow
- Responsive layout down to 480px

## Project Layout

```text
index.html
styles/
  main.scss            ← entry stylesheet
  main.css             ← compiled output
  base/
    _variables.scss    ← palette, typography, level colours
    _mixins.scss       ← layout / button mixins
  media/
    media.scss         ← responsive breakpoints
src/
  main.js              ← bootstrap + game loop + theme sync
  controls/            ← keyboard / mobile / teleport / board setup
  game/
    snake/             ← move, draw, eat, collision check
    food/              ← create, draw
  state/               ← shared game state
  settings/
    index.js           ← settings barrel
    levels/            ← level data, records, wall collision, colours
    sound/
      synth.js         ← Web Audio eat sound
      toggle.js        ← mute persistence
    theme/             ← light / dark mode
  three/
    background.js      ← Three.js spore + vine background scene
  ui/
    buttons.js         ← centralised DOM references
    modals.js          ← modal show/hide helpers
    pause.js           ← pause / resume
    gameOver.js        ← death detection + game-over modal
    restartGame.js     ← restart helper
    eventsUI.js        ← UI button wiring
    particles.js       ← DOM particle FX (eat / death)
sound/                 ← (legacy, no longer required)
```

## Quick Start

1. Compile SCSS:

   ```bash
   npx sass styles/main.scss:styles/main.css styles/media/media.scss:styles/media/media.css
   ```

   Add `--watch` for live recompiles while editing styles.

2. Open `index.html` in a browser. No bundler required — modules load natively.

   For local file imports, serve via a simple static server, for example:

   ```bash
   npx serve .
   ```

## How to Play

- Arrow keys (or on-screen arrows on mobile) to move the snake.
- Eat the apple to grow and increase your score.
- Avoid biting your own tail.
- In Hard mode, walls also kill — easy and medium teleport across edges.
- Beat the per-level record (gold "New record!" message on the game-over screen).

## Theme & Audio

- Top-bar moon/sun button toggles dark / light instantly.
- Volume button mutes the eat sound (persisted via `localStorage`).
- The eat sound is synthesised at runtime using the Web Audio API — no `.mp3`
  file is loaded.

## Three.js

Loaded from cdnjs (`three.min.js r128`) as a global. `src/three/background.js`
reads the global `THREE` directly, so there is no bundler requirement. The
background canvas is fixed behind the page and pointer-events:none, so it
never interferes with gameplay.

## Live Demo

https://snake-game-rouge-eta.vercel.app/
