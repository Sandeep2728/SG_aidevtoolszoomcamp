import React, { useEffect, useRef, useState } from 'react'

function randomFood(rows, cols, snake) {
  const taken = new Set(snake.map(s => `${s.x},${s.y}`))
  while (true) {
    const x = Math.floor(Math.random() * cols)
    const y = Math.floor(Math.random() * rows)
    const key = `${x},${y}`
    if (!taken.has(key)) return { x, y }
  }
}

export default function Game({ rows = 20, cols = 20, speed = 120 }) {
  const [snake, setSnake] = useState([{ x: Math.floor(cols/2), y: Math.floor(rows/2) }])
  const [dir, setDir] = useState({ x: 1, y: 0 })
  const dirRef = useRef(dir)
  const [food, setFood] = useState(() => randomFood(rows, cols, snake))
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const moveTimer = useRef(null)

  useEffect(() => { dirRef.current = dir }, [dir])

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Space') { setRunning(r => !r); return }
      const keyMap = {
        ArrowUp: { x: 0, y: -1 },
        ArrowDown: { x: 0, y: 1 },
        ArrowLeft: { x: -1, y: 0 },
        ArrowRight: { x: 1, y: 0 }
      }
      const nd = keyMap[e.code]
      if (!nd) return
      // Prevent reversing
      if (snake.length > 1 && nd.x === -dirRef.current.x && nd.y === -dirRef.current.y) return
      setDir(nd)
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [snake])

  useEffect(() => {
    if (!running) return
    moveTimer.current = setInterval(() => {
      setSnake(prev => {
        const head = prev[0]
        const d = dirRef.current
        let nx = head.x + d.x
        let ny = head.y + d.y
        // wrap around
        if (nx < 0) nx = cols - 1
        if (nx >= cols) nx = 0
        if (ny < 0) ny = rows - 1
        if (ny >= rows) ny = 0
        const newHead = { x: nx, y: ny }
        // collision with tail
        if (prev.some(s => s.x === newHead.x && s.y === newHead.y)) {
          // game over -> reset
          setScore(0)
          setFood(randomFood(rows, cols, [{x: Math.floor(cols/2), y: Math.floor(rows/2)}]))
          setDir({ x: 1, y: 0 })
          setRunning(false)
          return [{ x: Math.floor(cols/2), y: Math.floor(rows/2) }]
        }
        const ate = newHead.x === food.x && newHead.y === food.y
        const next = [newHead, ...prev]
        if (!ate) next.pop()
        else {
          setScore(s => s + 1)
          setFood(randomFood(rows, cols, next))
        }
        return next
      })
    }, speed)
    return () => clearInterval(moveTimer.current)
  }, [running, speed, rows, cols, food])

  function reset() {
    setSnake([{ x: Math.floor(cols/2), y: Math.floor(rows/2) }])
    setDir({ x: 1, y: 0 })
    setFood(randomFood(rows, cols, []))
    setScore(0)
    setRunning(true)
  }

  const grid = []
  const snakeSet = new Set(snake.map(s => `${s.x},${s.y}`))
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      const key = `${x},${y}`
      let cls = 'cell'
      if (snake[0].x === x && snake[0].y === y) cls += ' head'
      else if (snakeSet.has(key)) cls += ' body'
      else if (food.x === x && food.y === y) cls += ' food'
      grid.push(<div className={cls} key={key} />)
    }
  }

  return (
    <div className="game-wrap">
      <div className="info">
        <div>Score: {score}</div>
        <div className="controls">
          <button onClick={() => setRunning(r => !r)}>{running ? 'Pause' : 'Resume'}</button>
          <button onClick={reset}>Restart</button>
        </div>
      </div>
      <div className="board" style={{ gridTemplateColumns: `repeat(${cols}, 1fr)` }}>
        {grid}
      </div>
    </div>
  )
}

