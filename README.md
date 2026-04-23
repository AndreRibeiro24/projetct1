# 🎰 Echoes in the Barrel

A browser-based Russian Roulette inspired game built with vanilla JavaScript, HTML and CSS. Face off against a skeleton opponent in a deadly game of chance — load the shotgun, take your shot, and pray it's a blank.

---

## 🎮 Gameplay

Each round, the shotgun is loaded with a random mix of live and blank rounds and shuffled. Players take turns shooting — either at themselves or at the opponent. If you shoot yourself with a blank, you keep your turn. Last one standing moves to the next round.

- **3 lives** each per round
- **6 chambers** loaded with 1–5 live rounds
- Survive as many rounds as possible and beat your longest run

---

## 🤖 Opponent AI

The skeleton opponent calculates the odds before every shot:

- More **live rounds** remaining → shoots at the player
- More **blank rounds** remaining → shoots at itself
- **Equal odds** → random decision

---

## 💀 Easter Egg

There's a 5% chance the gun jams and explodes in the shooter's face — instant elimination. Good luck.

---

## 🕹️ Controls

| Button | Action |
|--------|--------|
| `Shoot Self` | Fire the shotgun at yourself |
| `Shoot Opponent` | Fire the shotgun at the opponent |
| `Sound On/Off` | Toggle all game audio |
| `Restart` | Start a new game from the end screen |

---

## 🛠️ Built With

- **HTML5**
- **CSS3** — custom pixel/dark theme with CSS variables
- **Vanilla JavaScript** — no frameworks or libraries
- **Web Audio API** — for sound effects and OST
- **localStorage** — for persisting the longest run record

---

## 📁 Project Structure

```
├── index.html
├── styles/
│   └── styles.css
├── src/
│   ├── game.js       # Core game logic and UI
│   ├── gun.js        # Gun class — loading, shuffling, shooting
│   ├── player.js     # Player class
│   └── opponent.js   # Opponent class with AI logic
└── media/
    ├── images/       # Pixel art portraits, shotgun sprites
    └── audio/        # OST and sound effects
```

---

## 🚀 Play It

👉 [Play on GitHub Pages](https://your-github-username.github.io/your-repo-name)

---

## 📚 About

Built as a class project. Inspired by [Buckshot Roulette](https://mikeklubnika.itch.io/buckshot-roulette).
