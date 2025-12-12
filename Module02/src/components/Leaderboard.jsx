import React from 'react'

export default function Leaderboard({ items=[] }){
  return (
    <div className="leaderboard">
      <h4>Leaderboard</h4>
      <ol>
        {items.map(i=> <li key={i.username}>{i.username} — {i.score}</li>)}
      </ol>
    </div>
  )
}
