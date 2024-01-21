import {
	FloatEquals,
	identity,
	matrixMultiply,
	rotationXMatrix,
	rotationYMatrix,
	rotationZMatrix,
	scalingMatrix,
	shear,
	translationMatrix,
} from "../../utils/matrixUtils"
import { Tuple } from "./Tuple"

class Matrix {
	mat: Float32Array
	m: number
	n: number

	constructor(nums: Float32Array, m = 4, n = 4) {
		this.mat = nums
		this.m = m
		this.n = n
	}

	static identity(n: number | undefined = undefined): Matrix {
		if (typeof n !== "number") {
			return new Matrix(identity())
		} else {
			const identityMat = new Float32Array(n * n)
			for (let i = 0; i < n; i++) {
				identityMat[i * n + i] = 1
			}

			return new Matrix(
				identityMat,
				n,
				n
			)
		}
	}

	get(row: number, col: number): number {
		if (row >= 0 && row < this.n && col >= 0 && col < this.m) {
			return this.mat[row * this.n + col]
		} else {
			throw new Error("out of bounds")
		}
	}

	set(row: number, col: number, val: number) {
		if (row >= 0 && row < this.n && col >= 0 && col < this.m) {
			this.mat[row * this.n + col] = val
		} else {
			throw new Error("out of bounds")
		}
	}

	equals(other: Matrix) {
		for (let i = 0; i < this.mat.length; i++) {
			if (!FloatEquals(this.mat[i], other.mat[i])) return false
		}
		return true
	}

	private timesTuple(other: Tuple): [number, number, number, number] {
		if (this.n !== 4) {
			throw new Error(
				"Matrix is not compatible for multiplication with Tuple"
			)
		}

		let otherMat: number[] = [other.x, other.y, other.z, other.w]

		let result: [number, number, number, number] = [0, 0, 0, 0]

		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				result[i] += this.get(i,j) * otherMat[j]
			}
		}

		return result
	}

	times(other: Matrix): Matrix
	times(other: Tuple): Tuple
	times(other: Matrix | Tuple) {
		if (other instanceof Matrix) {
			return matrixMultiply(this, other)
		}
		if (other instanceof Tuple) {
			return new Tuple(...this.timesTuple(other))
		}
		throw new Error("Target is not valid multiplication target")
	}

	transpose(): Matrix {
		let result: Float32Array = new Float32Array(this.m * this.n)

		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				result[i * this.n + j] = this.get(j, i)
			}
		}

		return new Matrix(result)
	}

	determinant(): number {
		if (this.m !== this.n) throw new Error("Matrix is not square")

		if (this.m === 2) {
			return (
				this.mat[0] * this.mat[3] -
				this.mat[1] * this.mat[2]
			)
		}

		let result = 0
		
		for (let i = 0; i < this.m; i++) {
			// will recurse back on determinant() through cofactor, up to base case
			result += this.mat[0 + i] * this.cofactor(0, i)
		}

		return result
	}

	submatrix(a: number, b: number): Matrix {
		if (a >= this.m || b >= this.n || a < 0 || b < 0) {
			throw new Error("Out of bounds")
		}

		let result: Matrix = new Matrix(new Float32Array((this.m - 1) * (this.n - 1)), this.m - 1, this.n - 1)

		for (let i = 0; i < this.m - 1; i++) {
			for (let j = 0; j < this.n - 1; j++) {
				result.set(i, j, this.get(i >= a ? i + 1 : i, j >= b ? j + 1 : j))
			}
		}

		return result
	}

	minor(i: number, j: number): number {
		return this.submatrix(i, j).determinant()
	}

	cofactor(i: number, j: number): number {
		let minor = this.minor(i, j)
		return (i + j) % 2 == 0 ? minor : -minor
	}

	invert(): Matrix {
		if (this.determinant() === 0)
			throw new Error("Matrix is not invertible")

		let result: Float32Array = new Float32Array(this.m * this.n)

		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				// for each element, get the cofactor
				let c = this.cofactor(i, j)
				// transpose and divide by determinant
				result[j * this.n + i] = c / this.determinant()
			}
		}

		return new Matrix(result)
	}

	// matrix transformation functions for fluent API
	translate(x: number, y: number, z: number): Matrix {
		return matrixMultiply(translationMatrix(x, y, z), this)
	}

	scale(x: number, y: number, z: number): Matrix {
		return matrixMultiply(scalingMatrix(x, y, z), this)
	}

	rotateX(radians: number): Matrix {
		return matrixMultiply(rotationXMatrix(radians), this)
	}

	rotateY(radians: number): Matrix {
		return matrixMultiply(rotationYMatrix(radians), this)
	}

	rotateZ(radians: number): Matrix {
		return matrixMultiply(rotationZMatrix(radians), this)
	}

	shearing(
		xy: number,
		xz: number,
		yx: number,
		yz: number,
		zx: number,
		zy: number
	): Matrix {
		return matrixMultiply(shear(xy, xz, yx, yz, zx, zy), this)
	}
}

export { Matrix }
