import { Matrix } from "../../src/models/objectPrimitives/Matrix"
import { Tuple, createPoint } from "../../src/models/objectPrimitives/Tuple"

describe("Matrix type test", () => {
	test("2x2 matrix should be represented properly", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			-3, 5,
			1, -2,
		]), 2, 2)

		// Then
		expect(matrix.get(0, 0)).toBe(-3)
		expect(matrix.get(0, 1)).toBe(5)
		expect(matrix.get(1, 0)).toBe(1)
		expect(matrix.get(1, 1)).toBe(-2)
	})

	test("3x3 matrix should be represented properly", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			-3, 5, 0,
			1, -2, -7,
			0, 1, 1,
		]), 3, 3)

		// Then
		expect(matrix.get(0, 0)).toBe(-3)
		expect(matrix.get(1, 1)).toBe(-2)
		expect(matrix.get(2, 2)).toBe(1)
	})

	test("Equality of matrices", () => {
		// Given
		const matrix1 = new Matrix(new Float32Array([
			-3, 5, 0,
			1, -2, -7,
			0, 1, 1,
		]), 3, 3)
		const matrix2 = new Matrix(new Float32Array([
			-3, 5, 0,
			1, -2, -7,
			0, 1, 1,
		]), 3, 3)

		// Then
		expect(matrix1.equals(matrix2)).toBe(true)
	})

	test("Inequality of matrices", () => {
		// Given
		const matrix1 = new Matrix(new Float32Array([
			-3, 5, 0,
			1, -2, -7,
			0, 1, 1,
		]), 3, 3)

		const matrix2 = new Matrix(new Float32Array([
			-3, 5, 0,
			1, -2, -7,
			0, 1, 2,
		]), 3, 3)

		// Then
		expect(matrix1.equals(matrix2)).toBe(false)
	})

	test("Multiplying two matrices", () => {
		// Given
		const matrix1 = new Matrix(new Float32Array([
			1, 2, 3, 4,
			5, 6, 7, 8,
			9, 8, 7, 6,
			5, 4, 3, 2,
		]))

		const matrix2 = new Matrix(new Float32Array([
			-2, 1, 2, 3,
			3, 2, 1, -1,
			4, 3, 6, 5,
			1, 2, 7, 8,
		]))

		// Then
		const expectedMatrix = new Matrix(new Float32Array([
			20, 22, 50, 48,
			44, 54, 114, 108,
			40, 58, 110, 102,
			16, 26, 46, 42,
		]))

		expect(matrix1.times(matrix2).equals(expectedMatrix)).toBe(true)
	})

	test("Multiplying a matrix by a tuple", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			1, 2, 3, 4,
			2, 4, 4, 2,
			8, 6, 4, 1,
			0, 0, 0, 1,
		]))

		const tuple = new Tuple(1, 2, 3, 1)

		// Then
		const expectedTuple = new Tuple(18, 24, 33, 1)

		expect(matrix.times(tuple).equals(expectedTuple)).toBe(true)
	})

	test("Creating identity matrix", () => {
		// Given
		const identity = Matrix.identity(2)

		// Then
		const expectedMatrix = new Matrix(new Float32Array([
			1, 0,
			0, 1,
		]), 2, 2)

		expect(identity.equals(expectedMatrix)).toBe(true)
	})

	test("Identity matrix returns the same matrix when multiplied", () => {
		// Given
		const identity = Matrix.identity(4)
		const matrix = new Matrix(new Float32Array([
			0, 1, 2, 4,
			1, 2, 4, 8,
			2, 4, 8, 16,
			4, 8, 16, 32,
		]))

		// Then
		expect(identity.times(matrix).equals(matrix)).toBe(true)
		expect(matrix.times(identity).equals(matrix)).toBe(true)
	})

	test("Transposing matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			0, 9, 3, 0,
			9, 8, 0, 8,
			1, 8, 5, 3,
			0, 0, 5, 8,
		]))

		const expectedTransposedMatrix = new Matrix(new Float32Array([
			0, 9, 1, 0,
			9, 8, 8, 0,
			3, 0, 5, 5,
			0, 8, 3, 8,
		]))

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
		const matrix = new Matrix(new Float32Array([
			1, 5,
			-3, 2,
		]), 2, 2)

		// Then
		expect(matrix.determinant()).toBe(17)
	})

	test("Submatrix of 3x3 matrix is 2x2 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			1, 5, 0,
			-3, 2, 7,
			0, 6, -3,
		]), 3, 3)

		// Then
		const expectedSubmatrix = new Matrix(new Float32Array([
			-3, 2,
			0, 6,
		]), 3, 3)
		
		console.log(matrix.submatrix(0, 2))

		expect(matrix.submatrix(0, 2).equals(expectedSubmatrix)).toBe(true)
	})

	test("Submatrix of 4x4 matrix is 3x3 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			-6, 1, 1, 6,
			-8, 5, 8, 6,
			-1, 0, 8, 2,
			-7, 1, -1, 1,
		]))

		// Then
		const expectedSubmatrix = new Matrix(new Float32Array([
			-6, 1, 6,
			-8, 8, 6,
			-7, -1, 1,
		]), 3, 3)

		expect(matrix.submatrix(2, 1).equals(expectedSubmatrix)).toBe(true)
	})

	test("Minor of 3x3 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			3, 5, 0,
			2, -1, -7,
			6, -1, 5,
		]), 3, 3)

		// Then
		expect(matrix.minor(1, 0)).toBe(25)
	})

	test("Calculating the cofactor of a 3x3 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			3, 5, 0,
			2, -1, -7,
			6, -1, 5,
		]), 3, 3)

		// Then
		expect(matrix.cofactor(0, 0)).toBe(-12)
		expect(matrix.cofactor(1, 0)).toBe(-25)
	})

	test("Calculating the determinant of a 3x3 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			1, 2, 6,
			-5, 8, -4,
			2, 6, 4,
		]), 3, 3)

		// Then
		expect(matrix.cofactor(0, 0)).toBe(56)
		expect(matrix.cofactor(0, 1)).toBe(12)
		expect(matrix.cofactor(0, 2)).toBe(-46)
		expect(matrix.determinant()).toBe(-196)
	})

	test("Calculating the determinant of a 4x4 matrix", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			-2, -8, 3, 5,
			-3, 1, 7, 3,
			1, 2, -9, 6,
			-6, 7, 7, -9,
		]), 4, 4)

		// Then
		expect(matrix.cofactor(0, 0)).toBe(690)
		expect(matrix.cofactor(0, 1)).toBe(447)
		expect(matrix.cofactor(0, 2)).toBe(210)
		expect(matrix.cofactor(0, 3)).toBe(51)
		expect(matrix.determinant()).toBe(-4071)
	})

	test("Determinant of a non-invertible matrix is 0", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			-4, 2, -2, -3,
			9, 6, 2, 6,
			0, -5, 1, -5,
			0, 0, 0, 0,
		]))

		// Then
		expect(matrix.determinant()).toBe(0)
	})

	test("Determinant of an invertible matrix is not 0", () => {
		// Given
		const matrix = new Matrix(new Float32Array([
			6, 4, 4, 4,
			5, 5, 7, 6,
			4, -9, 3, -7,
			9, 1, 7, -6,
		]))

		// Then
		expect(matrix.determinant()).toBe(-2120)
	})

	test("Inverting a matrix", () => {
		// Given
		const matrix1 = new Matrix(new Float32Array([
			-5, 2, 6, -8,
			1, -5, 1, 8,
			7, 7, -6, -7,
			1, -3, 7, 4,
		]))
		const invertedMatrix1 = new Matrix(new Float32Array([
			0.21805, 0.45113, 0.2406, -0.04511,
			-0.80827, -1.45677, -0.44361, 0.52068,
			-0.07895, -0.22368, -0.05263, 0.19737,
			-0.52256, -0.81391, -0.30075, 0.30639,
		]))

		const matrix2 = new Matrix(new Float32Array([
			8, -5, 9, 2,
			7, 5, 6, 1,
			-6, 0, 9, 6,
			-3, 0, -9, -4,
		]))
		const invertedMatrix2 = new Matrix(new Float32Array([
			-0.15385, -0.15385, -0.28205, -0.53846,
			-0.07692, 0.12308, 0.02564, 0.03077,
			0.35897, 0.35897, 0.4359, 0.92308,
			-0.69231, -0.69231, -0.76923, -1.92308,
		]))

		const matrix3 = new Matrix(new Float32Array([
			9, 3, 0, 9,
			-5, -2, -6, -3,
			-4, 9, 6, 4,
			-7, 6, 6, 2,
		]))
		const invertedMatrix3 = new Matrix(new Float32Array([
			-0.04074, -0.07778, 0.14444, -0.22222,
			-0.07778, 0.03333, 0.36667, -0.33333,
			-0.02901, -0.1463, -0.10926, 0.12963,
			0.17778, 0.06667, -0.26667, 0.33333,
		]))

		// Then
		expect(matrix1.invert().equals(invertedMatrix1)).toBe(true)
		expect(matrix2.invert().equals(invertedMatrix2)).toBe(true)
		expect(matrix3.invert().equals(invertedMatrix3)).toBe(true)
	})

	test("Multiplying a product by its inverse returns the original matrix", () => {
		// Given
		const matrix1 = new Matrix(new Float32Array([
			3, -9, 7, 3,
			3, -8, 2, -9,
			-4, 4, 4, 1,
			-6, 5, -1, 1,
		]))
		const matrix2 = new Matrix(new Float32Array([
			8, 2, 2, 2,
			3, -1, 7, 0,
			7, 0, 5, 4,
			6, -2, 0, 5,
		]))

		// Then
		expect(
			matrix1.times(matrix2).times(matrix2.invert()).equals(matrix1)
		).toBe(true)
	})
})

describe("Matrix transformations tests", () => {
	test("Multiplying by a translation matrix", () => {
		// Given
		const transform = Matrix.identity().translate(5, -3, 2)
		const p = new Tuple(-3, 4, 5, 1)

		// Then
		const expectedTuple = new Tuple(2, 1, 7, 1)
		expect(transform.times(p).equals(expectedTuple)).toBe(true)
	})

	test("Multiplying by the inverse of a translation matrix", () => {
		// Given
		const transform = Matrix.identity().translate(5, -3, 2)
		const inv = transform.invert()
		const p = new Tuple(-3, 4, 5, 1)

		// Then
		const expectedTuple = new Tuple(-8, 7, 3, 1)
		expect(inv.times(p).equals(expectedTuple)).toBe(true)
	})

	test("Translation does not affect vectors", () => {
		// Given
		const transform = Matrix.identity().translate(5, -3, 2)
		const v = new Tuple(-3, 4, 5, 0)

		// Then
		expect(transform.times(v).equals(v)).toBe(true)
	})

	test("A scaling matrix applied to a point", () => {
		// Given
		const transform = Matrix.identity().scale(2, 3, 4)
		const p = new Tuple(-4, 6, 8, 1)

		// Then
		const expectedTuple = new Tuple(-8, 18, 32, 1)
		expect(transform.times(p).equals(expectedTuple)).toBe(true)
	})

	test("A scaling matrix applied to a vector", () => {
		// Given
		const transform = Matrix.identity().scale(2, 3, 4)
		const v = new Tuple(-4, 6, 8, 0)

		// Then
		const expectedTuple = new Tuple(-8, 18, 32, 0)
		expect(transform.times(v).equals(expectedTuple)).toBe(true)
	})

	test("Multiplying by the inverse of a scaling matrix should shrink tuple", () => {
		// Given
		const transform = Matrix.identity().scale(2, 3, 4)
		const shrinkingMatrix = transform.invert()
		const v = new Tuple(-4, 6, 8, 0)

		// Then
		const expectedTuple = new Tuple(-2, 2, 2, 0)
		expect(shrinkingMatrix.times(v).equals(expectedTuple)).toBe(true)
	})

	test("Scaling with a negative value results in tuple being reflected", () => {
		// Given
		const transform = Matrix.identity().scale(-1, 1, 1)
		const p = new Tuple(2, 3, 4, 1)

		// Then
		const expectedTuple = new Tuple(-2, 3, 4, 1)
		expect(transform.times(p).equals(expectedTuple)).toBe(true)
	})

	test("Rotating a point around the x-axis", () => {
		// Given
		const p = new Tuple(0, 1, 0, 1)
		const halfQuarter = Matrix.identity().rotateX(Math.PI / 4)
		const fullQuarter = Matrix.identity().rotateX(Math.PI / 2)

		// Then
		expect(
			halfQuarter
				.times(p)
				.equals(new Tuple(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2, 1))
		).toBe(true)
		expect(fullQuarter.times(p).equals(new Tuple(0, 0, 1, 1))).toBe(true)
	})

	test("Rotating a point around the y-axis", () => {
		// Given
		const p = createPoint(0, 0, 1)
		const halfQuarter = Matrix.identity().rotateY(Math.PI / 4)
		const fullQuarter = Matrix.identity().rotateY(Math.PI / 2)

		// Then
		expect(
			halfQuarter
				.times(p)
				.equals(createPoint(Math.sqrt(2) / 2, 0, Math.sqrt(2) / 2))
		).toBe(true)
		expect(fullQuarter.times(p).equals(createPoint(1, 0, 0))).toBe(true)
	})

	test("Rotating a point around the z-axis", () => {
		// Given
		const p = createPoint(0, 1, 0)
		const halfQuarter = Matrix.identity().rotateZ(Math.PI / 4)
		const fullQuarter = Matrix.identity().rotateZ(Math.PI / 2)

		// Then
		expect(
			halfQuarter
				.times(p)
				.equals(createPoint(-Math.sqrt(2) / 2, Math.sqrt(2) / 2, 0))
		).toBe(true)
		expect(fullQuarter.times(p).equals(createPoint(-1, 0, 0))).toBe(true)
	})

	test("A shearing transformation moves x in proportion to y", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(1, 0, 0, 0, 0, 0)

		// Then
		expect(transform.times(p).equals(createPoint(5, 3, 4))).toBe(true)
	})

	test("A shearing transformation moves x in proportion to z", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(0, 1, 0, 0, 0, 0)

		// Then
		expect(transform.times(p).equals(createPoint(6, 3, 4))).toBe(true)
	})

	test("A shearing transformation moves y in proportion to x", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(0, 0, 1, 0, 0, 0)

		// Then
		expect(transform.times(p).equals(createPoint(2, 5, 4))).toBe(true)
	})

	test("A shearing transformation moves y in proportion to z", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(0, 0, 0, 1, 0, 0)

		// Then
		expect(transform.times(p).equals(createPoint(2, 7, 4))).toBe(true)
	})

	test("A shearing transformation moves z in proportion to x", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(0, 0, 0, 0, 1, 0)

		// Then
		expect(transform.times(p).equals(createPoint(2, 3, 6))).toBe(true)
	})

	test("A shearing transformation moves z in proportion to y", () => {
		// Given
		const p = createPoint(2, 3, 4)
		const transform = Matrix.identity().shearing(0, 0, 0, 0, 0, 1)

		// Then
		expect(transform.times(p).equals(createPoint(2, 3, 7))).toBe(true)
	})

	test("Chaining transformations produces the same result as performing them in sequence", () => {
		// Given
		const p = createPoint(1, 0, 1)
		const A = Matrix.identity().rotateX(Math.PI / 2)
		const B = Matrix.identity().scale(5, 5, 5)
		const C = Matrix.identity().translate(10, 5, 7)
		const chained = Matrix.identity()
			.rotateX(Math.PI / 2)
			.scale(5, 5, 5)
			.translate(10, 5, 7)

		// When
		const p2 = A.times(p)
		const p3 = B.times(p2)
		const p4 = C.times(p3)
		const chainedP = chained.times(p)

		// Then
		expect(p2.equals(createPoint(1, -1, 0))).toBe(true)
		expect(p3.equals(createPoint(5, -5, 0))).toBe(true)
		expect(p4.equals(createPoint(15, 0, 7))).toBe(true)
		expect(p4.equals(chainedP)).toBe(true)
	})
})
