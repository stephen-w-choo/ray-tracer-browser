import { Matrix } from "../objectPrimitives/Matrix"
import { Tuple } from "../objectPrimitives/Tuple"

class Sphere {
	// TODO - implement other properties
	// for now will default
	origin: Tuple
	radius: number
	transformation: Matrix

	constructor(matrix = Matrix.identity()) {
		this.origin = new Tuple(0, 0, 0, 1)
		this.radius = 1
		this.transformation = matrix
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

	normal(point: Tuple): Tuple {
		// let invertedTransformation = this.transformation.invert()

		// // convert point from world space to object space
		// // get the normalised vector in the object space
		// let objectNormal = invertedTransformation
		// 			.times(point)
		// 			.minus(this.origin)

		// // now convert the normalised vector back to the world space
		// let worldNormal = invertedTransformation
		// 			.transpose()
		// 			.times(objectNormal)
		// console.log(`transformation : ${this.transformation.mat}`)

		let objectPoint = this.transformation.invert().times(point)
		// console.log(`objectPoint : ${objectPoint.x}, ${objectPoint.y}, ${objectPoint.z}`)
		let objectNormal = objectPoint.minus(this.origin)
		// console.log(`objectNormal : ${objectNormal.x}, ${objectNormal.y}, ${objectNormal.z}`)
		let worldNormal = this.transformation
			.invert()
			.transpose()
			.times(objectNormal)
		// console.log(`worldNormal ${worldNormal.x}, ${worldNormal.y}, ${worldNormal.z}`)

		worldNormal.w = 0
		// console.log(worldNormal)
		return worldNormal.normalize()
	}
}

export { Sphere }
