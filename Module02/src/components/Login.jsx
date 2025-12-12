import React, { useState } from 'react'
import { login, signup } from '../api/mockApi'

export default function Login({ onLogin }){
  const [mode, setMode] = useState('login')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [msg, setMsg] = useState('')

  async function submit(e){
    e.preventDefault()
    setLoading(true)
    try{
      if (mode==='login') await login(username,password)
      else await signup(username,password)
      setMsg('OK')
      onLogin && onLogin()
    }catch(err){ setMsg('Error') }
    setLoading(false)
  }

  return (
    <div className="login">
      <div style={{marginBottom:8}}>
        <button onClick={()=>setMode('login')} className="btn">Login</button>
        <button onClick={()=>setMode('signup')} className="btn">Sign up</button>
      </div>
      <form onSubmit={submit}>
        <div>
          <input placeholder="username" value={username} onChange={e=>setUsername(e.target.value)} />
        </div>
        <div>
          <input placeholder="password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <div style={{marginTop:8}}>
          <button className="btn" type="submit" disabled={loading}>{mode==='login'?'Login':'Sign up'}</button>
        </div>
        <div>{msg}</div>
      </form>
    </div>
  )
}
