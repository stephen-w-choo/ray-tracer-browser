import { Canvas } from "../../models/environment/Canvas"
import {
	Environment,
	Projectile,
	tick,
} from "../../models/environment/twoDimensionalEnv"
import { Color } from "../../models/objectPrimitives/Color"
import { createPoint, createVector } from "../../models/objectPrimitives/Tuple"
import { makePPM } from "../../utils/bunUtils/makePPM"

const start = createPoint(0, 1, 0)
const velocity = createVector(1, 1.8, 0).normalize().times(11.25)

const gravity = createVector(0, -0.1, 0)
const wind = createVector(-0.01, 0, 0)

let projectile: Projectile = {
	position: start,
	velocity: velocity,
}
const environment: Environment = {
	gravity: gravity,
	wind: wind,
}

const canvas = new Canvas(550, 900)

const highlightColor = new Color(255, 255, 0)

for (let i = 0; i < 100; i++) {
	try {
		canvas.pixel.set(
			projectile.position.y,
			projectile.position.x,
			highlightColor
		)
	} catch (error) {
		console.log(error)
		break // out of bounds, stop the loop
	}

	console.log(projectile)
	projectile = tick(environment, projectile)
}

makePPM(canvas, "projectile.ppm")
