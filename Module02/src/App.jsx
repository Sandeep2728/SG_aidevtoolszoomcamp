import React, { useEffect, useState } from 'react'
import Game from './Game'
import Login from './components/Login'
import Leaderboard from './components/Leaderboard'
import Spectator from './components/Spectator'
import { getCurrentUser, fetchInitialGameState, subscribeToGameUpdates, getLeaderboard } from './api/mockApi'

export default function App(){
  const [user, setUser] = useState(getCurrentUser())
  const [model, setModel] = useState('pass-through')
  const [players, setPlayers] = useState([])
  const [leaderboard, setLeaderboard] = useState([])
  const [watching, setWatching] = useState(null)

  useEffect(()=>{
    fetchInitialGameState().then(()=>{})
    const unsub = subscribeToGameUpdates((states)=> setPlayers(states))
    getLeaderboard().then(setLeaderboard)
    return unsub
  },[])

  useEffect(()=> setUser(getCurrentUser()), [user])

  return (
    <div className="app">
      <div className="left">
        <div className="header">
          <div>
            <label>Model: </label>
            <select value={model} onChange={e=>setModel(e.target.value)}>
              <option value="pass-through">Pass-through (wrap edges)</option>
              <option value="walls">Walls (die on wall)</option>
            </select>
          </div>
          <div>
            {user ? <span className="player">{user.username}</span> : <Login onLogin={() => setUser(getCurrentUser())} />}
          </div>
        </div>

        <Game model={model} user={user} otherPlayers={players} watching={watching} />

      </div>

      <div className="right">
        <Leaderboard items={leaderboard} />
        <Spectator players={players} follow={watching} setFollow={setWatching} />
      </div>
    </div>
  )
}
