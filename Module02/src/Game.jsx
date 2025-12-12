import React, { useEffect, useRef, useState } from 'react'
import { moveSnake, checkSelfCollision, getNextHead, placeFood } from './utils/gameLogic'

const CELL = 32
const GRID = 20

function Cell({x,y,color,children}){
  const style = { gridColumn: x+1, gridRow: y+1, background: color || 'transparent' }
  return <div className="cell" style={style}>{children}</div>
}

export default function Game({ model='pass-through', user, otherPlayers=[], watching=null }){
  const [snake, setSnake] = useState([{x:10,y:10},{x:9,y:10},{x:8,y:10}])
  const [dir, setDir] = useState({x:1,y:0})
  const [food, setFood] = useState(placeFood(snake, GRID))
  const [running, setRunning] = useState(true)
  const [score, setScore] = useState(0)
  const keyRef = useRef(null)

  useEffect(()=>{ keyRef.current = (e) => handleKey(e); window.addEventListener('keydown', keyRef.current); return ()=> window.removeEventListener('keydown', keyRef.current) },[dir,running])

  useEffect(()=>{
    const iv = setInterval(()=>{
      if (!running) return
      setSnake(s => {
        const nextHead = getNextHead(s[0], dir, GRID, model)
        // wall collision
        if (model === 'walls' && (nextHead.x <0 || nextHead.x>=GRID || nextHead.y<0 || nextHead.y>=GRID)){
          setRunning(false)
          return s
        }
        const newSnake = [nextHead, ...s]
        let ate = nextHead.x===food.x && nextHead.y===food.y
        if (!ate) newSnake.pop(); else { setFood(placeFood(newSnake, GRID)); setScore(prev=>prev+10) }
        if (checkSelfCollision(newSnake)) { setRunning(false) }
        return newSnake
      })
    }, 180)
    return ()=> clearInterval(iv)
  },[dir,model,food,running])

  function handleKey(e){
    if (!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key)) return
    const d = {ArrowUp:{x:0,y:-1}, ArrowDown:{x:0,y:1}, ArrowLeft:{x:-1,y:0}, ArrowRight:{x:1,y:0}}[e.key]
    // prevent reversing
    setDir(prev => (prev.x === -d.x && prev.y === -d.y) ? prev : d)
  }

  function reset(){ setSnake([{x:10,y:10},{x:9,y:10},{x:8,y:10}]); setDir({x:1,y:0}); setFood(placeFood(snake, GRID)); setRunning(true); setScore(0) }

  return (
    <div>
      <div className="canvas">
        <div className="board">
          <div className="grid" style={{gridTemplateColumns:`repeat(${GRID},32px)`, gridTemplateRows:`repeat(${GRID},32px)`}}>
            {Array.from({length:GRID}).map((_,y)=>Array.from({length:GRID}).map((__,x)=>{
              const isFood = (food.x===x && food.y===y)
              const bodyIndex = snake.findIndex(s=>s.x===x && s.y===y)
              // check other players
              let other = null
              let otherHead = false
              for (const p of otherPlayers) {
                if (p.snake.some((s,i)=>{ if (s.x===x && s.y===y){ if (i===0) otherHead=true; return true } return false })) { other = p; break }
              }

              return (
                <div key={`${x}-${y}`} className="cell">
                  {/* other player's segment */}
                  {other ? (
                    <div className={`segment other-segment ${watching===other.id? 'followed':''}`} style={{background: other.color}}>
                      {otherHead ? <div className={`player-label ${watching===other.id? 'followed':''}`}>{other.username}</div> : null}
                    </div>
                  ) : null}

                  {/* player's snake segment */}
                  {bodyIndex>=0 ? <div className={`segment ${bodyIndex===0? 'head':''}`} /> : null}

                  {/* food */}
                  {isFood ? <div className="food-dot" /> : null}
                </div>
              )
            }))}
          </div>
        </div>
      </div>
      <div className="controls">
        <div>Score: {score} {user ? <span> — {user.username}</span> : <span>(not logged)</span>}</div>
        <button className="btn" onClick={()=>setRunning(r=>!r)}>{running? 'Pause':'Resume'}</button>
        <button className="btn" onClick={reset}>Reset</button>
      </div>
    </div>
  )
}
