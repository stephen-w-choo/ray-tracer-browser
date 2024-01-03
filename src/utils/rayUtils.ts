import { Intersection, Intersections } from "../types/Intersection"
import { Ray } from "../types/Ray"
import { Sphere } from "../types/Sphere"

function intersection(ray: Ray, sphere: Sphere): Intersections {
	let sphereToRay = ray.origin.minus(sphere.position)

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
    return intersections.reduce((accu, curr) => {
        if (curr.t >= 0 && (accu === null || curr.t < accu.t)) {
            return curr
        } 
        return accu
    }, null as Intersection | null)
}

export { hit, intersection }
