import { Tuple } from "./Tuple"
import { intersection } from "../utils/rayUtils"
import { Sphere } from "./Sphere"

class Ray {
	origin: Tuple
	direction: Tuple

	constructor(origin: Tuple, direction: Tuple) {
		if (origin.w !== 1) throw new Error("origin is not a point")
		if (direction.w !== 0) throw new Error("direction is not a vector")

		this.origin = origin
		this.direction = direction
	}

	position(t: number) {
		return this.origin.plus(this.direction.times(t))
	}

	intersect(object: Sphere) {
		return intersection(this, object)
	}
}

export { Ray }
