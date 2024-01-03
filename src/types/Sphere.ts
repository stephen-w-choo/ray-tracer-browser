import { Tuple } from "./Tuple"

class Sphere {
	// TODO - implement other properties
	// for now will default
	position: Tuple
	radius: number

	constructor() {
		this.position = new Tuple(0, 0, 0, 1)
		this.radius = 1
	}
}

export { Sphere }
