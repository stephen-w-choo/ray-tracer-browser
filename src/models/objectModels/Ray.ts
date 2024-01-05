import { identity } from "../../utils/matrixUtils"
import { intersection, transformRay } from "../../utils/rayUtils"
import { Matrix } from "../objectPrimitives/Matrix"
import { Sphere } from "./Sphere"
import { Tuple } from "../objectPrimitives/Tuple"

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

	transform() {
		return new TransformationBuilder(this)
	}
}

class TransformationBuilder {
	originalRay: Ray
	transformation: Matrix

	constructor(ray: Ray, matrix = Matrix.identity()) {
		this.originalRay = ray
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

	build() {
		return transformRay(this.originalRay, this.transformation) 
	}
}

export { Ray }
