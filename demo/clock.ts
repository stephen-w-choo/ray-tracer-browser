import { Canvas } from "../src/types/Canvas"
import { Color } from "../src/types/Color"
import { Matrix } from "../src/types/Matrix"
import { Tuple, createPoint } from "../src/types/Tuple"
import { makePPM } from "../src/utils/bunUtils/makePPM"

const pointsToDraw: Tuple[] = []

const CANVAS_SIZE = 500
const POINT_DISTANCE = (3 / 8) * CANVAS_SIZE

const canvas = new Canvas(CANVAS_SIZE, CANVAS_SIZE)

const origin = createPoint(CANVAS_SIZE / 2, CANVAS_SIZE / 2, 0)
const startPoint = createPoint(0, POINT_DISTANCE, 0)

for (let i = 0; i < 12; i++) {
	let clockTranslation = Matrix.identity()
		.rotateZ(i * -(Math.PI / 6))
		.translate(origin.x, origin.y, origin.z)
	pointsToDraw.push(clockTranslation.times(startPoint))
}

pointsToDraw.forEach(point => {
	canvas.pixel.set(point.y, point.x, new Color(255, 255, 255))
})

makePPM(canvas, "clock.ppm")
