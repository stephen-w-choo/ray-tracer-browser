import { Canvas } from "../../src/types/Canvas"
import { createColor } from "../../src/types/Color"

describe("Canvas", () => {
	test("Canvas should create a Canvas object of the right height, width, with white Colors", () => {
		// Given
		const c = new Canvas(20, 10)

		// Then
		expect(c.height).toBe(20)
		expect(c.width).toBe(10)
		for (let i = 0; i < 20; i++) {
			for (let j = 0; j < 10; j++) {
				expect(c.pixel.get(i, j).equals(createColor(0, 0, 0))).toBe(
					true
				)
			}
		}
	})
})
