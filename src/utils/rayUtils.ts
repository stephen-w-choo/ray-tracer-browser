import {
	Intersection,
	Intersections,
} from "../models/objectModels/Intersection"
import { Ray } from "../models/objectModels/Ray"
import { Sphere } from "../models/objectModels/Sphere"
import { Matrix } from "../models/objectPrimitives/Matrix"

function intersections(ray: Ray, sphere: Sphere): Intersections {
	ray = transformRay(ray, sphere.transformation.invert())

	let sphereToRay = ray.origin.minus(sphere.origin)

	let a = ray.direction.dot(ray.direction)
	let b = 2 * ray.direction.dot(sphereToRay)
	let c = sphereToRay.dot(sphereToRay) - sphere.radius

	let discriminant = b ** 2 - 4 * a * c

	if (discriminant < 0) {
		return []
	}

	return [
		{ t: (-b - Math.sqrt(discriminant)) / (2 * a), object: sphere },
		{ t: (-b + Math.sqrt(discriminant)) / (2 * a), object: sphere },
	]
}

function hit(intersections: Intersections): Intersection | null {
	return intersections.reduce(
		(accu, curr) => {
			if (curr.t >= 0 && (accu === null || curr.t < accu.t)) {
				return curr
			}
			return accu
		},
		null as Intersection | null
	)
}

function transformRay(ray: Ray, transformation: Matrix) {
	return new Ray(
		transformation.times(ray.origin),
		transformation.times(ray.direction)
	)
}

export { hit, intersections as intersection, transformRay }
