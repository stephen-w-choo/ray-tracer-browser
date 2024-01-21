import fs from "fs"
import { Canvas } from "../../src/models/environment/Canvas"
import { createColor } from "../../src/models/objectPrimitives/Color"
import { makePPM } from "../../src/utils/bunUtils/makePPM"

// Set up File IO mocks
jest.mock("fs", () => ({
	writeFileSync: jest.fn(),
}))

const writeFileSyncMock = fs.writeFileSync as jest.MockedFunction<
	typeof fs.writeFileSync
>

// Tests
describe("Making a PPM file", () => {
	test("Creating a PPM file", () => {
		// Given
		const testCanvas = new Canvas(3, 5)
		const c1 = createColor(1.5, 0, 0)
		const c2 = createColor(0, 0.5, 0)
		const c3 = createColor(-0.5, 0, 1)

		const expectedPPMFile = `P3
5 3
255
0 0 0 0 0 0 0 0 0 0 0 0 0 0 255 
0 0 0 0 0 0 0 128 0 0 0 0 0 0 0 
255 0 0 0 0 0 0 0 0 0 0 0 0 0 0 
`
		// When
		testCanvas.pixel.set(0, 0, c1)
		testCanvas.pixel.set(1, 2, c2)
		testCanvas.pixel.set(2, 4, c3)

		makePPM(testCanvas, "test.ppm")

		// Then
		expect(writeFileSyncMock).toHaveBeenNthCalledWith(
			1,
			"test.ppm",
			expectedPPMFile
		)
	})

	test("Longer lines should be split before the 70 character limit", () => {
		// Given
		const testCanvas = new Canvas(2, 10)
		const c = createColor(1, 0.8, 0.6)
		fs.writeFileSync

		// When
		for (let y = 0; y < testCanvas.height; y++) {
			for (let x = 0; x < testCanvas.width; x++) {
				testCanvas.pixel.set(y, x, c)
			}
		}

		// Then
		makePPM(testCanvas, "test.ppm")

		const [_, fileData] = writeFileSyncMock.mock.calls[1]
		const lines = (fileData as string).split("\n")

		lines.forEach(line => {
			expect(line.length).toBeLessThanOrEqual(70)
		})
	})
})
