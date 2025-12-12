/** @vitest-environment jsdom */
import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import App from '../App'
import { vi, test, expect } from 'vitest'

vi.mock('../api/mockApi', ()=>({
  login: async ()=> ({ username:'test', token:'t'}),
  signup: async ()=> ({ username:'test', token:'t'}),
  getCurrentUser: ()=> null,
  getLeaderboard: async ()=> [{username:'a',score:10}],
  fetchInitialGameState: async ()=> ({}),
  subscribeToGameUpdates: (cb)=> { cb([]); return ()=>{} }
}))

test('can render app and login', async ()=>{
  render(<App />)
  // login input exists
  const username = screen.getByPlaceholderText('username')
  fireEvent.change(username, {target:{value:'me'}})
  const password = screen.getByPlaceholderText('password')
  fireEvent.change(password, {target:{value:'pw'}})
  // There are two 'Login' buttons (mode toggle and submit). pick the submit button
  const submitBtn = document.querySelector('button[type="submit"]')
  fireEvent.click(submitBtn)
  // after successful mock login, Login component remains but we expect no crash
  expect(screen.getByText('Leaderboard')).toBeDefined()
})
