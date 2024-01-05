import { Ray } from "../../src/models/objectModels/Ray"
import { Sphere } from "../../src/models/objectModels/Sphere"
import { Matrix } from "../../src/models/objectPrimitives/Matrix"
import { createPoint, createVector } from "../../src/models/objectPrimitives/Tuple"
import { hit } from "../../src/utils/rayUtils"

describe("Ray", () => {
	test("Creating and querying a ray", () => {
		// Given
		const origin = createPoint(1, 2, 3)
		const direction = createVector(4, 5, 6)
		const r = new Ray(origin, direction)

		// Then
		expect(r.origin.equals(origin)).toBe(true)
		expect(r.direction.equals(direction)).toBe(true)
	})

	test(".position() computes the point at a given distance from the ray", () => {
		// Given
		const r = new Ray(createPoint(2, 3, 4), createVector(1, 0, 0))

		// Then
		expect(r.position(0).equals(createPoint(2, 3, 4))).toBe(true)
		expect(r.position(1).equals(createPoint(3, 3, 4))).toBe(true)
		expect(r.position(-1).equals(createPoint(1, 3, 4))).toBe(true)
		expect(r.position(2.5).equals(createPoint(4.5, 3, 4))).toBe(true)
	})
})

describe("Ray-Sphere intersection", () => {
	test("A ray intersects a sphere at two points", () => {
		// Given
		const r = new Ray(createPoint(0, 0, -5), createVector(0, 0, 1))
		const s = new Sphere()

		// When
		const intersections = r.intersect(s)

		// Then
		expect(intersections.length).toBe(2)
		expect(intersections[0]).toStrictEqual({ t: 4, object: s })
		expect(intersections[1]).toStrictEqual({ t: 6, object: s })
	})

	test("A ray intersects a sphere at a tangent", () => {
		// Given
		const r = new Ray(createPoint(0, 1, -5), createVector(0, 0, 1))
		const s = new Sphere()

		// When
		const intersections = r.intersect(s)

		// Then
		expect(intersections.length).toBe(2)
		expect(intersections[0]).toStrictEqual({ t: 5, object: s })
		expect(intersections[1]).toStrictEqual({ t: 5, object: s })
	})

	test("A ray misses a sphere", () => {
		// Given
		const r = new Ray(createPoint(0, 2, -5), createVector(0, 0, 1))
		const s = new Sphere()

		// When
		const intersections = r.intersect(s)

		// Then
		expect(intersections.length).toBe(0)
	})

	test("A ray originates inside a sphere", () => {
		// Given
		const r = new Ray(createPoint(0, 0, 0), createVector(0, 0, 1))
		const s = new Sphere()

		// When
		const intersections = r.intersect(s)

		// Then
		expect(intersections.length).toBe(2)
		expect(intersections[0]).toStrictEqual({ t: -1, object: s })
		expect(intersections[1]).toStrictEqual({ t: 1, object: s })
	})
})

describe("Ray hits", () => {
	test("The hit, when all intersections have positive t", () => {
		// Given
		const s = new Sphere()
		const i1 = { t: 1, object: s }
		const i2 = { t: 2, object: s }
		const xs = [i1, i2]

		// When
		const i = hit(xs)

		// Then
		expect(i).toStrictEqual(i1)
	})

	test("The hit, when some intersections have negative t", () => {
		// Given
		const s = new Sphere()
		const i1 = { t: -1, object: s }
		const i2 = { t: 1, object: s }
		const xs = [i1, i2]

		// When
		const i = hit(xs)

		// Then
		expect(i).toStrictEqual(i2)
	})

	test("There should be no hit, if all intersections are negative", () => {
		// Given
		const s = new Sphere()
		const i1 = { t: -2, object: s }
		const i2 = { t: -1, object: s }
		const xs = [i1, i2]

		// When
		const i = hit(xs)

		// Then
		expect(i).toBeNull()
	})

	test("The hit is always the lowest non-negative intersection", () => {
		// Given
		const s = new Sphere()
		const i1 = { t: 5, object: s }
		const i2 = { t: 7, object: s }
		const i3 = { t: -3, object: s }
		const i4 = { t: 2, object: s }
		const xs = [i1, i2, i3, i4]

		// When
		const i = hit(xs)

		// Then
		expect(i).toStrictEqual(i4)
	})
})

describe("Ray transformations", () => {
	test("Translating a ray", () => {
		// Given
		let r = new Ray(createPoint(1, 2, 3), createVector(0, 1,0))
	
		// When
		let r2 = r.transform().translate(3,4,5).build()

		// Then
		expect(r2.origin.equals(createPoint(4, 6, 8))).toBe(true)
		expect(r2.direction.equals(createVector(0, 1, 0))).toBe(true)
	})

	test("Scaling a ray", () => {
		// Given
		let r = new Ray(createPoint(1, 2, 3), createVector(0, 1, 0))

		// When
		let r2 = r.transform().scale(2, 3, 4).build()

		// Then
		expect(r2.origin.equals(createPoint(2, 6, 12))).toBe(true)
		expect(r2.direction.equals(createVector(0, 3, 0))).toBe(true)
	})
})

describe("Sphere transformations", () => {
	test("A sphere's default transformation", () => {
		// Given
		let s = new Sphere()

		// Then
		expect(s.transformation.equals(Matrix.identity())).toBe(true)
	})

	test("Changing a sphere's transformation", () => {
		// Given
		let s1 = new Sphere()
		let s2 = new Sphere()
		let t = Matrix.identity().translate(2, 3, 4)
		
		// When
		s1.translate(2, 3, 4)
		s2.transform(t)
		
		// Then
		expect(s1.transformation.equals(t)).toBe(true)
		expect(s2.transformation.equals(t)).toBe(true)
	})

	test("Intersecting a scaled sphere with a ray", () => {
		// Given
		let r = new Ray(createPoint(0, 0, -5), createVector(0, 0, 1))
		let s = new Sphere()

		// When
		s.scale(2, 2, 2)

		// Then
		let xs = r.intersect(s)
		expect(xs.length).toBe(2)
		expect(xs[0].t).toBe(3)
		expect(xs[1].t).toBe(7)
	})

	test("Intersecting a translated sphere with a ray", () => {
		// Given
		let r = new Ray(createPoint(0, 0, -5), createVector(0, 0, 1))
		let s = new Sphere()

		// When
		s.translate(5, 0, 0)

		// Then
		let xs = r.intersect(s)
		expect(xs.length).toBe(0)
	})
})