import {Projectile, Environment, tick} from '../../src/environment/environment'
import {createPoint, createVector} from '../../src/types/Tuple'

describe('Environment where projectile starts 1 unit above origin', () => {
  const env: Environment = {
    gravity: createVector(0, -0.1, 0),
    wind: createVector(-0.01, 0, 0)
  }

  const proj: Projectile = {
    position: createPoint(0, 1, 0),
    velocity: createVector(1, 1, 0).normalize()
  }

  let newProj = tick(env, proj)

  it('should eventually reach the ground', () => {
    // run tick 100 times
    for (let i = 0; i < 100; i++) {
      newProj = tick(env, newProj)
    }
    expect(newProj.position.y).toBeLessThanOrEqual(0)
  })
})
