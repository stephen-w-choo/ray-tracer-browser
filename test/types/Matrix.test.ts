import { Matrix } from "../../src/types/Matrix"
import { Tuple } from "../../src/types/Tuple"

describe("Matrix type test", () => {
	test("2x2 matrix should be represented properly", () => {
		// Given
		const matrix = new Matrix([
			[-3, 5],
			[1, -2],
		])

		// Then
		expect(matrix.mat[0][0]).toBe(-3)
		expect(matrix.mat[0][1]).toBe(5)
		expect(matrix.mat[1][0]).toBe(1)
		expect(matrix.mat[1][1]).toBe(-2)
	})

	test("3x3 matrix should be represented properly", () => {
		// Given
		const matrix = new Matrix([
			[-3, 5, 0],
			[1, -2, -7],
			[0, 1, 1],
		])

		// Then
		expect(matrix.get(0, 0)).toBe(-3)
		expect(matrix.get(1, 1)).toBe(-2)
		expect(matrix.get(2, 2)).toBe(1)
	})

	test("Equality of matrices", () => {
		// Given
		const matrix1 = new Matrix([
			[-3, 5, 0],
			[1, -2, -7],
			[0, 1, 1],
		])
		const matrix2 = new Matrix([
			[-3, 5, 0],
			[1, -2, -7],
			[0, 1, 1],
		])

		// Then
		expect(matrix1.equals(matrix2)).toBe(true)
	})

	test("Inequality of matrices", () => {
		// Given
		const matrix1 = new Matrix([
			[-3, 5, 0],
			[1, -2, -7],
			[0, 1, 1],
		])

		const matrix2 = new Matrix([
			[-3, 5, 0],
			[1, -2, -7],
			[0, 1, 2],
		])

		// Then
		expect(matrix1.equals(matrix2)).toBe(false)
	})

	test("Multiplying two matrices", () => {
		// Given
		const matrix1 = new Matrix([
			[1, 2, 3, 4],
			[5, 6, 7, 8],
			[9, 8, 7, 6],
			[5, 4, 3, 2],
		])

		const matrix2 = new Matrix([
			[-2, 1, 2, 3],
			[3, 2, 1, -1],
			[4, 3, 6, 5],
			[1, 2, 7, 8],
		])

		// Then
		const expectedMatrix = new Matrix([
			[20, 22, 50, 48],
			[44, 54, 114, 108],
			[40, 58, 110, 102],
			[16, 26, 46, 42],
		])

		expect(matrix1.times(matrix2).equals(expectedMatrix)).toBe(true)
	})

	test("Multiplying a matrix by a tuple", () => {
		// Given
		const matrix = new Matrix([
			[1, 2, 3, 4],
			[2, 4, 4, 2],
			[8, 6, 4, 1],
			[0, 0, 0, 1],
		])

		const tuple = new Tuple(1, 2, 3, 1)

		// Then
		const expectedTuple = new Tuple(18, 24, 33, 1)

		expect(matrix.times(tuple).equals(expectedTuple)).toBe(true)
	})

	test("Creating identity matrix", () => {
		// Given
		const identity = Matrix.identity(2)

		// Then
		const expectedMatrix = new Matrix([
			[1, 0],
			[0, 1],
		])

		expect(identity.equals(expectedMatrix)).toBe(true)
	})

    test("Identity matrix returns the same matrix when multiplied", () => {
        // Given
        const identity = Matrix.identity(4)
        const matrix = new Matrix([
            [0, 1, 2, 4],
            [1, 2, 4, 8],
            [2, 4, 8, 16],
            [4, 8, 16, 32]
        ])
        
        // Then
        expect(identity.times(matrix).equals(matrix)).toBe(true)
        expect(matrix.times(identity).equals(matrix)).toBe(true)
    })

    test("Transposing matrix", () => {
        // Given
        const matrix = new Matrix([
            [0, 9, 3, 0],
            [9, 8, 0, 8],
            [1, 8, 5, 3],
            [0, 0, 5, 8]
        ])

        const expectedTransposedMatrix = new Matrix([
            [0, 9, 1, 0],
            [9, 8, 8, 0],
            [3, 0, 5, 5],
            [0, 8, 3, 8]
        ])

        // Then
        expect(matrix.transpose().equals(expectedTransposedMatrix)).toBe(true)
    })

    test("Transposing identity matrix", () => {
        // Given
        const identity = Matrix.identity(4)

        // Then
        expect(identity.transpose().equals(identity)).toBe(true)
    })

    test("Determinant of 2x2 matrix", () => {
        // Given
        const matrix = new Matrix([
            [1, 5],
            [-3, 2]
        ])

        // Then
        expect(matrix.determinant()).toBe(17)
    })

    test("Submatrix of 3x3 matrix is 2x2 matrix", () => {
        // Given
        const matrix = new Matrix([
            [1, 5, 0],
            [-3, 2, 7],
            [0, 6, -3]
        ])

        // Then
        const expectedSubmatrix = new Matrix([
            [-3, 2],
            [0, 6]
        ])

        expect(matrix.submatrix(0, 2).equals(expectedSubmatrix)).toBe(true)
    })

    test("Submatrix of 4x4 matrix is 3x3 matrix", () => {
        // Given
        const matrix = new Matrix([
            [-6, 1, 1, 6],
            [-8, 5, 8, 6],
            [-1, 0, 8, 2],
            [-7, 1, -1, 1]
        ])

        // Then
        const expectedSubmatrix = new Matrix([
            [-6, 1, 6],
            [-8, 8, 6],
            [-7, -1, 1]
        ])

        expect(matrix.submatrix(2, 1).equals(expectedSubmatrix)).toBe(true)
    })

    test("Minor of 3x3 matrix", () => {
        // Given
        const matrix = new Matrix([
            [3, 5, 0],
            [2, -1, -7],
            [6, -1, 5]
        ])

        // Then
        expect(matrix.minor(1, 0)).toBe(25)
    })

    test("Calculating the cofactor of a 3x3 matrix", () => {
        // Given
        const matrix = new Matrix([
            [3, 5, 0],
            [2, -1, -7],
            [6, -1, 5]
        ])

        // Then
        expect(matrix.cofactor(0, 0)).toBe(-12)
        expect(matrix.cofactor(1, 0)).toBe(-25)
    })

    test("Calculating the determinant of a 3x3 matrix", () => {
        // Given
        const matrix = new Matrix([
            [1, 2, 6],
            [-5, 8, -4],
            [2, 6, 4]
        ])

        // Then
        expect(matrix.cofactor(0, 0)).toBe(56)
        expect(matrix.cofactor(0, 1)).toBe(12)
        expect(matrix.cofactor(0, 2)).toBe(-46)
        expect(matrix.determinant()).toBe(-196)
    })

    test("Calculating the determinant of a 4x4 matrix", () => {
        // Given
        const matrix = new Matrix([
            [-2, -8, 3, 5],
            [-3, 1, 7, 3],
            [1, 2, -9, 6],
            [-6, 7, 7, -9]
        ])

        // Then
        expect(matrix.cofactor(0, 0)).toBe(690)
        expect(matrix.cofactor(0, 1)).toBe(447)
        expect(matrix.cofactor(0, 2)).toBe(210)
        expect(matrix.cofactor(0, 3)).toBe(51)
        expect(matrix.determinant()).toBe(-4071)
    })

    test("Determinant of a non-invertible matrix is 0", () => {
        // Given
        const matrix = new Matrix([
            [-4, 2, -2, -3],
            [9, 6, 2, 6],
            [0, -5, 1, -5],
            [0, 0, 0, 0]
        ])

        // Then
        expect(matrix.determinant()).toBe(0)
    })

    test("Determinant of an invertible matrix is not 0", () => {
        // Given
        const matrix = new Matrix([
            [6, 4, 4, 4],
            [5, 5, 7, 6],
            [4, -9, 3, -7],
            [9, 1, 7, -6]
        ])

        // Then
        expect(matrix.determinant()).toBe(-2120)
    })

    test("Inverting a matrix", () => {
        // Given
        const matrix1 = new Matrix([
            [-5, 2, 6, -8],
            [1, -5, 1, 8],
            [7, 7, -6, -7],
            [1, -3, 7, 4]
        ])
        const invertedMatrix1 = new Matrix([
            [0.21805, 0.45113, 0.24060, -0.04511],
            [-0.80827, -1.45677, -0.44361, 0.52068],
            [-0.07895, -0.22368, -0.05263, 0.19737],
            [-0.52256, -0.81391, -0.30075, 0.30639]
        ])

        const matrix2 = new Matrix([
            [8, -5, 9, 2],
            [7, 5, 6, 1],
            [-6, 0, 9, 6],
            [-3, 0, -9, -4]
        ])
        const invertedMatrix2 = new Matrix([
            [-0.15385, -0.15385, -0.28205, -0.53846],
            [-0.07692, 0.12308, 0.02564, 0.03077],
            [0.35897, 0.35897, 0.43590, 0.92308],
            [-0.69231, -0.69231, -0.76923, -1.92308]
        ])

        const matrix3 = new Matrix([
            [9, 3, 0, 9],
            [-5, -2, -6, -3],
            [-4, 9, 6, 4],
            [-7, 6, 6, 2]
        ])
        const invertedMatrix3 = new Matrix([
            [-0.04074, -0.07778, 0.14444, -0.22222],
            [-0.07778, 0.03333, 0.36667, -0.33333],
            [-0.02901, -0.14630, -0.10926, 0.12963],
            [0.17778, 0.06667, -0.26667, 0.33333]
        ])

        // Then
        expect(matrix1.invert().equals(invertedMatrix1)).toBe(true)
        expect(matrix2.invert().equals(invertedMatrix2)).toBe(true)
        expect(matrix3.invert().equals(invertedMatrix3)).toBe(true)
    })

    test("Multiplying a product by its inverse returns the original matrix", () => {
        // Given
        const matrix1 = new Matrix([
            [3, -9, 7, 3],
            [3, -8, 2, -9],
            [-4, 4, 4, 1],
            [-6, 5, -1, 1]
        ])
        const matrix2 = new Matrix([
            [8, 2, 2, 2],
            [3, -1, 7, 0],
            [7, 0, 5, 4],
            [6, -2, 0, 5]
        ])

        // Then
        expect(matrix1.times(matrix2).times(matrix2.invert()).equals(matrix1)).toBe(true)
    })
})
