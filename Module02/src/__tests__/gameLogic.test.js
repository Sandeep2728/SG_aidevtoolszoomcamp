import { describe, it, expect } from 'vitest'
import { getNextHead, moveSnake, checkSelfCollision } from '../utils/gameLogic'

describe('gameLogic', ()=>{
  it('wraps coordinates in pass-through', ()=>{
    const head = {x:19,y:10}
    const dir = {x:1,y:0}
    const next = getNextHead(head,dir,20,'pass-through')
    expect(next.x).toBe(0)
  })

  it('does not wrap in walls model', ()=>{
    const head = {x:19,y:10}
    const dir = {x:1,y:0}
    const next = getNextHead(head,dir,20,'walls')
    expect(next.x).toBe(20)
  })

  it('moves snake and grows when requested', ()=>{
    const s = [{x:5,y:5},{x:4,y:5}]
    const dir = {x:1,y:0}
    const moved = moveSnake(s,dir,true,20,'pass-through')
    expect(moved.length).toBe(3)
    expect(moved[0].x).toBe(6)
  })

  it('detects self collision', ()=>{
    const s = [{x:2,y:2},{x:2,y:3},{x:3,y:3},{x:3,y:2},{x:2,y:2}]
    expect(checkSelfCollision(s)).toBe(true)
  })
})
