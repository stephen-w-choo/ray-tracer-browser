import { FloatEquals, identity, matrixMultiply, rotationXMatrix, scalingMatrix, translationMatrix } from "../utils/matrixUtils"
import { Tuple } from "./Tuple"

class Matrix {
	mat: number[][]
	m: number
	n: number

	constructor(nums: number[][]) {
		this.mat = nums
		this.m = nums.length
		this.n = nums[0].length
	}

	static identity(n: number | undefined = undefined): Matrix {
        if (typeof n !== "number") {
            return new Matrix(identity())
        } else {
            return new Matrix(
                Array(n)
                    .fill(0)
                    .map((_, index) => {
                        const rowArray = Array(n).fill(0)
                        rowArray[index] = 1
                        return rowArray
                    })
            )
        }
	}

	get(row: number, col: number): number {
		if (row >= 0 && row < this.n && col >= 0 && col < this.m) {
			return this.mat[row][col]
		} else {
			throw new Error("out of bounds")
		}
	}

	equals(other: Matrix) {
		for (let i = 0; i < this.m; i++) {
			for (let j = 0; j < this.n; j++) {
				if (!FloatEquals(this.mat[i][j], other.mat[i][j])) return false
			}
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
				result[i] += this.mat[i][j] * otherMat[j]
			}
		}

		return result
	}

	times(other: Matrix): Matrix
	times(other: Tuple): Tuple
	times(other: Matrix | Tuple) {
		if (other instanceof Matrix) {
			return new Matrix(matrixMultiply(this.mat, other.mat))
		}
		if (other instanceof Tuple) {
			return new Tuple(...this.timesTuple(other))
		}
		throw new Error("Target is not valid multiplication target")
	}

    transpose(): Matrix {
        let result: number[][] = Array(this.n)
            .fill(0)
            .map(() => Array(this.m).fill(0))

        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                result[j][i] = this.mat[i][j]
            }
        }

        return new Matrix(result)
    }

    determinant(): number {
        if (this.m !== this.n) throw new Error("Matrix is not square")

        if (this.m === 2) {
            return this.mat[0][0] * this.mat[1][1] - this.mat[0][1] * this.mat[1][0]
        }

        let result = 0

        for (let i = 0; i < this.m; i++) {
            // will recurse back on determinant() through cofactor, up to base case
            result += this.mat[0][i] * this.cofactor(0, i) 
        }

        return result
    }

    submatrix(a: number, b: number): Matrix {
        if (a >= this.m || b >= this.n || a < 0 || b < 0) {
            throw new Error("Out of bounds")
        }

        let result: number[][] = Array(this.m - 1)
            .fill(0)
            .map(() => Array(this.n - 1).fill(null))

        for (let i = 0; i < this.m - 1; i++) {
            for (let j = 0; j < this.n - 1; j++) {
                result[i][j] = this.mat[i >= a ? i + 1 : i][j >= b ? j + 1 : j]
            }
        }

        return new Matrix(result)
    }

    minor(i: number, j: number): number {
        return this.submatrix(i, j).determinant()
    }

    cofactor(i: number, j: number): number {
        let minor = this.minor(i, j)
        return (i + j) % 2 == 0 ? minor : -minor
    }

    invert(): Matrix {
        if (this.determinant() === 0) throw new Error("Matrix is not invertible")

        let result: number[][] = Array(this.m)
            .fill(0)
            .map(() => Array(this.n).fill(null))

        for (let i = 0; i < this.m; i++) {
            for (let j = 0; j < this.n; j++) {
                // for each element, get the cofactor
                let c = this.cofactor(i, j)
                // transpose and divide by determinant
                result[j][i] = c / this.determinant()
            }
        }

        return new Matrix(result)
    }

    // matrix transformation functions for fluent API
    translate(x: number, y: number, z: number): Matrix {
        return new Matrix(
            matrixMultiply(
                translationMatrix(x, y, z),
                this.mat
            )
        )
    }

    scale(x: number, y: number, z: number): Matrix {
        return new Matrix(
            matrixMultiply(
                scalingMatrix(x, y, z),
                this.mat
            )
        )
    }

    rotateX(radians: number): Matrix {
        return new Matrix(
            matrixMultiply(
                rotationXMatrix(radians),
                this.mat
            )
        )
    }
}

export { Matrix }
