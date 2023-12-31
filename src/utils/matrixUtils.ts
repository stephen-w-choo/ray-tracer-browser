/*
Utility functions for matrix operations.

These are designed to work directly with 2D arrays, rather than the Matrix class 
This is to avoid the overhead of instantiating and referencing from a Matrix
*/

const EPSILON = 0.00001

function identity() {
    return [
        [1, 0, 0, 0],
        [0, 1, 0, 0], 
        [0, 0, 1, 0],
        [0, 0, 0, 1],
    ]
}

function matrixMultiply(a: number[][], b: number[][]) {
    if (a[0].length !== b.length) {
        throw new Error("Matrices are not compatible for multiplication")
    }
    
    let result: number[][] = Array(a.length)
        .fill(0)
        .map(() => Array(b[0].length).fill(0))

    for (let i = 0; i < a.length; i++) {
        for (let j = 0; j < a[0].length; j++) {
            for (let k = 0; k < a[0].length; k++) {
                result[i][j] += a[i][k] * b[k][j]
            }
        }
    }
    return result
}

function translationMatrix(x: number, y: number, z: number): number[][] {
    return [
        [1, 0, 0, x],
        [0, 1, 0, y], 
        [0, 0, 1, z],
        [0, 0, 0, 1],
    ]
}

function scalingMatrix(x: number, y: number, z: number): number[][] {
    return [
        [x, 0, 0, 0],
        [0, y, 0, 0], 
        [0, 0, z, 0],
        [0, 0, 0, 1],
    ]
}

function rotationXMatrix(radians: number): number[][] {
    return [
        [1, 0, 0, 0],
        [0, Math.cos(radians), -Math.sin(radians), 0], 
        [0, Math.sin(radians), Math.cos(radians), 0],
        [0, 0, 0, 1],
    ]
}

// function rotationY

function FloatEquals(a: number, b: number) {
	return Math.abs(a - b) < EPSILON
}

export { 
    FloatEquals, 
    identity, 
    matrixMultiply, 
    scalingMatrix,
    rotationXMatrix,
    translationMatrix, 
}

