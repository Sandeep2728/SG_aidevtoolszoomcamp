# Snake — Mock Multiplayer (Module02)

This is a small React/Vite app that implements a local, mocked multiplayer Snake game.

Features (mocked backend):
- Two game models: `pass-through` (wrap edges) and `walls` (die on wall collision)
- Login / Sign up UI (mocked)
- Leaderboard (mocked)
- Spectator list (mocked other players that move randomly)
- Centralized mocked API in `src/api/mockApi.js`
- Pure game logic helpers in `src/utils/gameLogic.js` with tests

How to run

1. Install dependencies:

```powershell
cd Module02
npm install
npm run dev
```

2. Run tests:

```powershell
npm run test
```

Notes
- Backend is entirely mocked. All calls go through `src/api/mockApi.js` so you can later swap implementations easily.
- The app is intentionally small and designed to be interactive without a real backend.
