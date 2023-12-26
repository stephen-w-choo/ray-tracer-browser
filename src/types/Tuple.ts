const EPSILON = 0.00001;

class Tuple {
	x: number;
	y: number;
	z: number;
	w: number;

	constructor(x: number, y: number, z: number, w: number = 0) {
		this.x = x;
		this.y = y;
		this.z = z;
		this.w = w;
	}

	// private function to compare two floats
	private floatEquals(a: number, b: number) {
		return Math.abs(a - b) < EPSILON;
	}

	isValid() {
		return this.w === 0 || this.w === 1;
	}

	equals(other: Tuple) {
		return (
			FloatEquals(this.x, other.x) &&
			FloatEquals(this.y, other.y) &&
			FloatEquals(this.z, other.z) &&
			FloatEquals(this.w, other.w)
		);
	}

	plus(other: Tuple) {
		return new Tuple(
			this.x + other.x,
			this.y + other.y,
			this.z + other.z,
			this.w + other.w
		);
	}

	minus(other: Tuple) {
		return new Tuple(
			this.x - other.x,
			this.y - other.y,
			this.z - other.z,
			this.w - other.w
		);
	}

	times(scalar: number) {
		return new Tuple(
			this.x * scalar,
			this.y * scalar,
			this.z * scalar,
			this.w * scalar
		);
	}

	divide(scalar: number) {
		return new Tuple(
			this.x / scalar,
			this.y / scalar,
			this.z / scalar,
			this.w / scalar
		);
	}

	negate() {
		return new Tuple(-this.x, -this.y, -this.z, -this.w);
	}

	magnitude() {
		return Math.sqrt(this.x ** 2 + this.y ** 2 + this.z ** 2 + this.w ** 2);
	}

	normalize() {
		return new Tuple(
			this.x / this.magnitude(),
			this.y / this.magnitude(),
			this.z / this.magnitude(),
			this.w / this.magnitude()
		);
	}

	dot(other: Tuple) {
		return (
			this.x * other.x +
			this.y * other.y +
			this.z * other.z +
			this.w * other.w
		);
	}

	cross(other: Tuple) {
		return new Tuple(
			this.y * other.z - this.z * other.y,
			this.z * other.x - this.x * other.z,
			this.x * other.y - this.y * other.x,
			0
		);
	}
}

// class that extends Tuple and is used to represent a point
class Point extends Tuple {
	constructor(x: number, y: number, z: number) {
		super(x, y, z, 1);
	}
}

// class that extends Tuple and is used to represent a vector
class Vector extends Tuple {
	constructor(x: number, y: number, z: number) {
		super(x, y, z, 0);
	}
}

function createTuple(x: number, y: number, z: number, w: number) {
	return new Tuple(x, y, z, w);
}

function createPoint(x: number, y: number, z: number) {
	return new Point(x, y, z);
}

function createVector(x: number, y: number, z: number) {
	return new Vector(x, y, z);
}

function FloatEquals(a: number, b: number) {
	return Math.abs(a - b) < EPSILON;
}

export {
	Tuple,
	Point,
	Vector,
	createTuple,
	createPoint,
	createVector,
	FloatEquals,
};
