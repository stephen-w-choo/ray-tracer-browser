/*
Utility functions for matrix operations.

These are designed to work directly with arrays, rather than the Matrix class 
This is to avoid the overhead of instantiating and referencing from a Matrix object
*/

import { Matrix } from "../models/objectPrimitives/Matrix"

const EPSILON = 0.00001

function identity(): Float32Array {
	return new Float32Array([
		1, 0, 0, 0,
		0, 1, 0, 0,
		0, 0, 1, 0,
		0, 0, 0, 1, 
	])
}

function matrixMultiply(a: Matrix, b: Matrix): Matrix {
	if (a.n !== b.m) {
		throw new Error("Matrices are not compatible for multiplication")
	}

	let result = new Float32Array(a.m * b.n)

	for (let i = 0; i < a.m; i++) {
		for (let j = 0; j < a.n; j++) {
			for (let k = 0; k < a.n; k++) {
				result[i * b.n + j] += a.get(i, k) * b.get(k, j)
			}
		}
	}
	
	return new Matrix(result, a.m, b.n)
}

function translationMatrix(x: number, y: number, z: number): Matrix {
	return new Matrix(
		new Float32Array([
			1, 0, 0, x,
			0, 1, 0, y,
			0, 0, 1, z,
			0, 0, 0, 1,
		])
	)
}

function scalingMatrix(x: number, y: number, z: number): Matrix {
	return new Matrix(
		new Float32Array([
			x, 0, 0, 0,
			0, y, 0, 0,
			0, 0, z, 0,
			0, 0, 0, 1,
		])
	)
}

function rotationXMatrix(radians: number): Matrix {
    return new Matrix(
        new Float32Array([
            1, 0, 0, 0,
            0, Math.cos(radians), -Math.sin(radians), 0,
            0, Math.sin(radians), Math.cos(radians), 0,
            0, 0, 0, 1,
        ])
    );
}

function rotationYMatrix(radians: number): Matrix {
    return new Matrix(
        new Float32Array([
            Math.cos(radians), 0, Math.sin(radians), 0,
            0, 1, 0, 0,
            -Math.sin(radians), 0, Math.cos(radians), 0,
            0, 0, 0, 1,
        ])
    );
}

function rotationZMatrix(radians: number): Matrix {
    return new Matrix(
        new Float32Array([
            Math.cos(radians), -Math.sin(radians), 0, 0,
            Math.sin(radians), Math.cos(radians), 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1,
        ])
    );
}

function shear(
    xy: number,
    xz: number,
    yx: number,
    yz: number,
    zx: number,
    zy: number
): Matrix {
    return new Matrix(
        new Float32Array([
            1, xy, xz, 0,
            yx, 1, yz, 0,
            zx, zy, 1, 0,
            0, 0, 0, 1,
        ])
    );
}

function FloatEquals(a: number, b: number) {
	return Math.abs(a - b) < EPSILON
}

export {
	FloatEquals,
	identity,
	matrixMultiply,
	rotationXMatrix,
	rotationYMatrix,
	rotationZMatrix,
	scalingMatrix,
	shear,
	translationMatrix,
}
