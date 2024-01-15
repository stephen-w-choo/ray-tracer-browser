import { Canvas } from "../../models/environment/Canvas"
import { Light, lighting } from "../../models/objectModels/Light"
import { Ray } from "../../models/objectModels/Ray"
import { Sphere } from "../../models/objectModels/Sphere"
import { Color } from "../../models/objectPrimitives/Color"
import { Tuple, createPoint } from "../../models/objectPrimitives/Tuple"
import { hit } from "../../utils/rayUtils"

// Global vars
const CAMERA_FOV = 10.0
const [topCornerY, topCornerX] = [-(CAMERA_FOV / 2), -(CAMERA_FOV / 2)]
const CAMERA_DISTANCE = 10
const SPHERE_COLOR: [number, number, number] = [1, 0.2, 1]
const LIGHT_COLOR: [number, number, number] = [1, 1, 1]
const SPHERE_AMBIENT_REFLECTIVITY = 0.15

// Local vars
const LIGHT_POSITION: [number, number, number] = [10, 10, -10]
const HEIGHT = 1.0
const SCALE: [number, number, number] = [1.0, 1.0, 1.0]
const CANVAS_SIZE: [number, number] = [100, 100]

export async function drawBallWithLightShader(
	lightPosition: [number, number, number],
	height: number,
	scale: [number, number, number],
	canvasSize: [number, number]
): Promise<Canvas> {
	let canvas = new Canvas(...canvasSize)
	let sphere = new Sphere().translate(0, height, 0).scale(...scale)

	sphere.material.color = new Color(...SPHERE_COLOR)
	sphere.material.ambi = SPHERE_AMBIENT_REFLECTIVITY

	let rayOrigin = createPoint(0, 0, -5)

	let light = new Light(
		createPoint(...lightPosition),
		new Color(...LIGHT_COLOR)
	)

	let canvasScale = CAMERA_FOV / canvas.height // 0.1

	for (let canvasY = 0; canvasY < canvas.height; canvasY++) {
		for (let canvasX = 0; canvasX < canvas.width; canvasX++) {
			// determine the relative point of the pixel
			let cameraPoint = pixelToCameraPoint(canvasY, canvasX, canvasScale)
			let r = createRay(rayOrigin, cameraPoint)
			let intersections = r.intersect(sphere)
			let firstHit = hit(intersections)
			if (firstHit !== null) {
				let point = r.position(firstHit.t)
				let normalV = firstHit.object.normalAt(point)
				let eyeV = r.direction.negate()

				let color = lighting(
					sphere.material,
					light,
					point,
					eyeV,
					normalV
				)
				canvas.pixel.set(canvasY, canvasX, color)
			}
		}
	}

	return canvas
}

function pixelToCameraPoint(y: number, x: number, scale: number): Tuple {
	return createPoint(
		topCornerX + x * scale,
		topCornerY + y * scale,
		CAMERA_DISTANCE
	)
}

function createRay(origin: Tuple, destination: Tuple): Ray {
	// subtract the two points to get a vector
	// then normalise the vector
	return new Ray(origin, destination.minus(origin).normalize())
}

drawBallWithLightShader(LIGHT_POSITION, HEIGHT, SCALE, CANVAS_SIZE)