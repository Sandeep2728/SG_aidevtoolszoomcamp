// Pure game logic helpers (testable)

export function getNextHead(head, dir, gridSize, model){
  let nx = head.x + dir.x
  let ny = head.y + dir.y
  if (model === 'pass-through'){
    nx = (nx + gridSize) % gridSize
    ny = (ny + gridSize) % gridSize
  }
  return { x: nx, y: ny }
}

export function moveSnake(snake, dir, grow=false, gridSize=20, model='pass-through'){
  const head = snake[0]
  const next = getNextHead(head, dir, gridSize, model)
  const newSnake = [next, ...snake]
  if (!grow) newSnake.pop()
  return newSnake
}

export function checkSelfCollision(snake){
  const head = snake[0]
  return snake.slice(1).some(s => s.x===head.x && s.y===head.y)
}

export function placeFood(snake, gridSize){
  const occupied = new Set(snake.map(s=>`${s.x},${s.y}`))
  for (let i=0;i<1000;i++){
    const x = Math.floor(Math.random()*gridSize)
    const y = Math.floor(Math.random()*gridSize)
    if (!occupied.has(`${x},${y}`)) return {x,y}
  }
  return {x:0,y:0}
}
