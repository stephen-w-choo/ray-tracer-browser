import { Intersection } from "../../src/models/objectModels/Intersection"
import { Sphere } from "../../src/models/objectModels/Sphere"

describe("Intersections", () => {
	test("An intersection encapsulates t and object", () => {
		// Given
		const s = new Sphere()
		const i: Intersection = { t: 3.5, object: s }

		// Then
		expect(i.t).toBe(3.5)
		expect(i.object).toBe(s)
	})

	test("Aggregating intersections", () => {
		// Given
		const s = new Sphere()
		const i1: Intersection = { t: 1, object: s }
		const i2: Intersection = { t: 2, object: s }

		// When
		const xs = [i1, i2]

		// Then
		expect(xs.length).toBe(2)
		expect(xs[0].t).toBe(1)
		expect(xs[1].t).toBe(2)
	})

	test("Aggregating intersections", () => {
		// Given
		const s = new Sphere()
		const i1: Intersection = { t: 1, object: s }
		const i2: Intersection = { t: 2, object: s }

		// When
		const xs = [i1, i2]

		// Then
		expect(xs.length).toBe(2)
		expect(xs[0].t).toBe(1)
		expect(xs[1].t).toBe(2)
	})
})
