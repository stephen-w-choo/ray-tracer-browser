import { materialOf } from "../../src/models/objectModels/Material"
import { Ray } from "../../src/models/objectModels/Ray"
import { Sphere } from "../../src/models/objectModels/Sphere"
import { Matrix } from "../../src/models/objectPrimitives/Matrix"
import {
	createPoint as pointAt,
	createVector as vectorTo,
} from "../../src/models/objectPrimitives/Tuple"

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
		let r = new Ray(pointAt(0, 0, -5), vectorTo(0, 0, 1))
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
		let r = new Ray(pointAt(0, 0, -5), vectorTo(0, 0, 1))
		let s = new Sphere()

		// When
		s.translate(5, 0, 0)

		// Then
		let xs = r.intersect(s)
		expect(xs.length).toBe(0)
	})
})

describe("Getting the normal of a sphere surface", () => {
	test("The normal on a sphere surface at a point in the x-axis", () => {
		// Given
		let s = new Sphere()

		// When
		let n = s.normalAt(pointAt(1, 0, 0))

		// Then
		expect(n.equals(vectorTo(1, 0, 0))).toBe(true)
	})

	test("The normal on a sphere surface at a point on the y axis", () => {
		// Given
		let s = new Sphere()

		// When
		let n = s.normalAt(pointAt(0, 1, 0))

		// Then
		expect(n.equals(vectorTo(0, 1, 0))).toBe(true)
	})

	test("The normal on a sphere at a point on the z axis", () => {
		// Given
		let s = new Sphere()

		// When
		let n = s.normalAt(pointAt(0, 0, 1))

		// Then
		expect(n.equals(vectorTo(0, 0, 1))).toBe(true)
	})

	test("The normal on a sphere at a point at a non-axial point", () => {
		// Given
		let s = new Sphere()

		// When
		let n = s.normalAt(
			pointAt(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
		)

		// Then
		expect(
			n.equals(
				vectorTo(Math.sqrt(3) / 3, Math.sqrt(3) / 3, Math.sqrt(3) / 3)
			)
		).toBe(true)
	})

	test("Computing the normal on a translated sphere", () => {
		// Given
		let s = new Sphere().translate(0, 1, 0)

		// When
		let n = s.normalAt(pointAt(0, 1.70711, -0.70711))

		// Then
		expect(n.equals(vectorTo(0, 0.70711, -0.70711))).toBe(true)
	})

	test("Computing the normal on a transformed sphere", () => {
		// Given
		let s = new Sphere().rotateZ(Math.PI / 5).scale(1, 0.5, 1)

		// When
		let n = s.normalAt(pointAt(0, Math.sqrt(2) / 2, -Math.sqrt(2) / 2))

		// Then
		expect(n.equals(vectorTo(0, 0.97014, -0.24254))).toBe(true)
	})
})

describe("Sphere materials", () => {
	test("A sphere has a default material", () => {
		// Given
		let s = new Sphere()
		let defaultMaterial = materialOf()

		// When
		let m = s.material

		// Then
		expect(m.color.equals(defaultMaterial.color)).toBe(true)
		expect(m.ambi).toBe(defaultMaterial.ambi)
		expect(m.diffuse).toBe(defaultMaterial.diffuse)
		expect(m.shininess).toBe(defaultMaterial.shininess)
		expect(m.specular).toBe(defaultMaterial.specular)
	})

	test("A sphere may be assigned a material", () => {
		// Given
		let newMaterial = materialOf()
		newMaterial.ambi = 1
		let s = new Sphere(Matrix.identity(), newMaterial)

		// Then
		expect(s.material.ambi).toBe(1)
	})
})
