import { Color, createColor } from "../../src/models/objectPrimitives/Color"

describe("Color", () => {
	test("Colors contain the right fields", () => {
		const color = new Color(-0.5, 0.4, 1.7)
		expect(color.r).toBe(-0.5)
		expect(color.g).toBe(0.4)
		expect(color.b).toBe(1.7)
	})
	test("Adding colors", () => {
		const c1 = createColor(0.9, 0.6, 0.75)
		const c2 = createColor(0.7, 0.1, 0.25)
		expect(c1.plus(c2).equals(createColor(1.6, 0.7, 1.0))).toBe(true)
		expect(c1.minus(c2).equals(createColor(0.2, 0.5, 0.5))).toBe(true)
	})
	test("Multiplying a color by a scalar", () => {
		const c = createColor(-0.5, 0.4, 1.7)
		expect(c.times(2).equals(createColor(-1, 0.8, 3.4))).toBe(true)
	})
	test("Multiplying colors", () => {
		const c1 = createColor(1, 0.2, 0.4)
		const c2 = createColor(0.9, 1, 0.1)
		expect(c1.times(c2).equals(createColor(0.9, 0.2, 0.04))).toBe(true)
	})
})
