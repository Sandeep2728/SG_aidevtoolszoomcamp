// Centralized mocked backend calls and simulated multiplayer updates

let currentUser = null

export function login(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = { username }
      resolve({ username, token: 'mock-token' })
    }, 200)
  })
}

export function signup(username, password) {
  return new Promise((resolve) => {
    setTimeout(() => {
      currentUser = { username }
      resolve({ username, token: 'mock-token' })
    }, 300)
  })
}

export function getCurrentUser() {
  return currentUser
}

export function getLeaderboard() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve([
        { username: 'alice', score: 420 },
        { username: 'bob', score: 380 },
        { username: 'carol', score: 150 }
      ])
    }, 150)
  })
}

// Simulate other players game states and periodic updates.
// callback receives array of player states like {id, username, snake, color, score}
export function subscribeToGameUpdates(callback) {
  const players = [
    createSimPlayer('alice', 'red'),
    createSimPlayer('bob', 'blue')
  ]

  // initial emit
  callback(players.map(p => p.toState()))

  const iv = setInterval(() => {
    players.forEach(p => p.step())
    callback(players.map(p => p.toState()))
  }, 300)

  return () => clearInterval(iv)
}

function createSimPlayer(username, color) {
  const id = username
  const gridSize = 20
  let snake = [ {x:5,y:5}, {x:4,y:5}, {x:3,y:5} ]
  let dir = {x:1,y:0}
  let score = 0
  const maxLength = 12 // prevent unbounded growth in mocked players

  function randomTurn(){
    const r = Math.random()
    if (r<0.25) dir = {x:1,y:0}
    else if (r<0.5) dir = {x:-1,y:0}
    else if (r<0.75) dir = {x:0,y:1}
    else dir = {x:0,y:-1}
  }

  return {
    toState() { return { id, username, snake: snake.slice(), color, score } },
    step() {
      if (Math.random()<0.3) randomTurn()
      const head = snake[0]
      const nx = (head.x + dir.x + gridSize) % gridSize
      const ny = (head.y + dir.y + gridSize) % gridSize
      snake.unshift({x:nx,y:ny})
      // only grow rarely and cap the length to avoid filling the board
      const growNow = Math.random() < 0.06 // ~6% chance to 'eat'
      if (growNow && snake.length < maxLength) {
        score += 10
      } else {
        // normal move: remove tail
        snake.pop()
      }
    }
  }
}

export function fetchInitialGameState() {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ gridSize: 20 })
    }, 50)
  })
}
