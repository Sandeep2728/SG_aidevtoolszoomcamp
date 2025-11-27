import React from 'react'
import Game from './Game'

export default function App() {
  return (
    <div className="app">
      <h1>Snake (React)</h1>
      <Game rows={20} cols={20} speed={120} />
      <footer className="footer">Use arrow keys to move. Space to pause.</footer>
    </div>
  )
}
