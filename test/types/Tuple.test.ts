import {createTuple, createPoint, createVector, FloatEquals } from "../../src/types/Tuple"
import {describe, expect, test} from '@jest/globals'

describe('testing classes', ()=> {
  test('test point', () => {
    let a = createPoint(4, -4, 3)
    expect(a.x).toBe(4)
    expect(a.y).toBe(-4)
    expect(a.z).toBe(3)
    expect(a.w).toBe(1)
  })
  test('test vector', () => {
    let a = createVector(4, -4, 3)
    expect(a.x).toBe(4)
    expect(a.y).toBe(-4)
    expect(a.z).toBe(3)
    expect(a.w).toBe(0)
  })
})

describe('testing addition', () => {
  test('adding two tuples', () => {
    let a = createPoint(3, -2, 5)
    let b = createVector(-2, 3, 1)
    expect(a.plus(b)).toEqual(createPoint(1, 1, 6))
  });
})

describe('testing subtraction', () => {
  test('subtracting two points', () => {
    let a = createPoint(3, 2, 1)
    let b = createPoint(5, 6, 7)
    expect(a.minus(b)).toEqual(createVector(-2, -4, -6))
  })
  test('subtracting a vector from a point', () => {
    let a = createPoint(3, 2, 1)
    let b = createVector(5, 6, 7)
    expect(a.minus(b)).toEqual(createPoint(-2, -4, -6))
  })
  test('subtracting two vectors', () => {
    let a = createVector(3, 2, 1)
    let b = createVector(5, 6, 7)
    expect(a.minus(b)).toEqual(createVector(-2, -4, -6))
  })
})

describe('testing negation', () => {
  test('negating a tuple', () => {
    let a = createTuple(1, -2, 3, -4)
    expect(a.negate()).toEqual(createTuple(-1, 2, -3, 4))
  })
})

describe('testing multiplication', () => {
  test('multiplying a tuple by a scalar', () => {
    let a = createTuple(1, -2, 3, -4)
    expect(a.times(3.5).equals(createTuple(3.5, -7, 10.5, -14))).toBe(true)
  })
  test('multiplying a tuple by a fraction', () => {
    let a = createTuple(1, -2, 3, -4)
    expect(a.times(0.5).equals(createTuple(0.5, -1, 1.5, -2))).toBe(true)
  })
})

describe('testing division', () => {
  test('dividing a tuple by a scalar', () => {
    let a = createTuple(1, -2, 3, -4)
    expect(a.divide(2).equals(createTuple(0.5, -1, 1.5, -2))).toBe(true)
  })
})

describe('testing magnitude', () => {
  test('computing the magnitude of vector(1, 0, 0)', () => {
    let a = createVector(1, 0, 0)
    expect(a.magnitude()).toBe(1)
  })
  test('computing the magnitude of vector(0, 1, 0)', () => {
    let a = createVector(0, 1, 0)
    expect(a.magnitude()).toBe(1)
  })
  test('computing the magnitude of vector(0, 0, 1)', () => {
    let a = createVector(0, 0, 1)
    expect(a.magnitude()).toBe(1)
  })
  test('computing the magnitude of vector(1, 2, 3)', () => {
    let a = createVector(1, 2, 3)
    expect(a.magnitude()).toBe(Math.sqrt(14))
  })
  test('computing the magnitude of vector(-1, -2, -3)', () => {
    let a = createVector(-1, -2, -3)
    expect(FloatEquals(a.magnitude(), Math.sqrt(14))).toBe(true)
  })
})

// testing normalisation

describe('testing normalisation', () => {
  test('normalising vector(4, 0, 0) gives (1, 0, 0)', () => {
    let a = createVector(4, 0, 0)
    expect(a.normalize().equals(createVector(1, 0, 0))).toBe(true)
  })
  test('normalising vector(1, 2, 3)', () => {
    let a = createVector(1, 2, 3)
    expect(a.normalize().equals(createVector(0.26726, 0.53452, 0.80178))).toBe(true)
  })
  test('magnitude of normalised vector', () => {
    let a = createVector(1, 2, 3)
    expect(FloatEquals(a.normalize().magnitude(), 1)).toBe(true)
  })
})
