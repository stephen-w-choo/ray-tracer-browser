import { Matrix } from "../objectPrimitives/Matrix"
import { Tuple } from "../objectPrimitives/Tuple"
import { Material, materialOf } from "./Material"

class Sphere {
	// TODO - implement other properties
	// for now will default
	origin: Tuple
	radius: number
	transformation: Matrix
	material: Material

	constructor(matrix = Matrix.identity(), material = materialOf()) {
		this.origin = new Tuple(0, 0, 0, 1)
		this.radius = 1
		this.transformation = matrix
		this.material = material
	}

	transform(transformation: Matrix) {
		this.transformation = transformation.times(this.transformation)
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
		this.transformation = this.transformation.shearing(
			xy,
			xz,
			yx,
			yz,
			zx,
			zy
		)
		return this
	}

	normalAt(point: Tuple): Tuple {
		let inverted = this.transformation.invert()
		let objectNormal = inverted.times(point).minus(this.origin)
		let worldNormal = inverted.transpose().times(objectNormal)

		worldNormal.w = 0
		return worldNormal.normalize()
	}
}

export { Sphere }
