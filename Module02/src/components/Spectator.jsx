import React, { useState } from 'react'

export default function Spectator({ players=[], follow=null, setFollow }){
  return (
    <div style={{marginTop:12}}>
      <h4>Watching</h4>
      <div>
        {players.map(p=> (
          <div key={p.id} style={{display:'flex',justifyContent:'space-between',alignItems:'center',padding:'6px 0'}}>
            <div style={{display:'flex',alignItems:'center',gap:8}}>
              <strong>{p.username}</strong>
              <span style={{color:p.color}}>●</span>
            </div>
            <div>
              <button className="btn" onClick={()=>setFollow(p.id)} disabled={follow===p.id}>{follow===p.id? 'Watching':'Watch'}</button>
            </div>
          </div>
        ))}
      </div>
      <div style={{marginTop:8}}>
        {follow ? <div>Following: {players.find(p=>p.id===follow)?.username}</div> : <div>Not following anyone</div>}
      </div>
    </div>
  )
}
