import { Matrix } from "../objectPrimitives/Matrix"
import { Tuple } from "../objectPrimitives/Tuple"

class Sphere {
	// TODO - implement other properties
	// for now will default
	position: Tuple
	radius: number
	transformation: Matrix

	constructor(matrix = Matrix.identity()) {
		this.position = new Tuple(0, 0, 0, 1)
		this.radius = 1
		this.transformation = matrix
	}

	translate(x: number, y: number, z: number) {
		this.transformation = this.transformation.translate(x, y, z)
		return this
	}

	scale(x: number, y: number, z: number) {
		this.transformation = this.transformation.scale(x, y, z)
		return this
	}

	rotateX(radians: number) {
		this.transformation = this.transformation.rotateX(radians)
		return this
	}

	rotateY(radians: number) {
		this.transformation = this.transformation.rotateY(radians)
		return this
	}

	rotateZ(radians: number) {
		this.transformation = this.transformation.rotateZ(radians)
		return this
	}

	shear(
		xy: number,
		xz: number,
		yx: number,
		yz: number,
		zx: number,
		zy: number
	) {
		this.transformation = this.transformation.shearing(xy, xz, yx, yz, zx, zy)
		return this
	}
}

export { Sphere }
