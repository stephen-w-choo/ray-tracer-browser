import { FloatEquals } from "../../utils/matrixUtils"

class Color {
	// note - I'm not especially happy with this implementation
	// I originally inherited from Tuple to prevent code duplication
	// The issue is that the original methods are pure functions, returning a new Tuple
	// as a result the inherited methods will return a Tuple, not a Color
	// The issue is that I'm mixing up OOP and pure functions - either I make the
	// original methods impure, returning the original object, or I take the methods
	// out of the class and keep them as pure functions
	// The only way I can think of is to duplicate the methods, which is not ideal
	r: number
	g: number
	b: number

	constructor(r: number, g: number, b: number) {
		this.r = r
		this.g = g
		this.b = b
	}

	equals(other: Color) {
		return (
			FloatEquals(this.r, other.r) &&
			FloatEquals(this.g, other.g) &&
			FloatEquals(this.b, other.b)
		)
	}

	plus(other: Color) {
		return new Color(this.r + other.r, this.g + other.g, this.b + other.b)
	}

	minus(other: Color) {
		return new Color(this.r - other.r, this.g - other.g, this.b - other.b)
	}

	times(scalar: number | Color) {
		if (scalar instanceof Color) {
			return new Color(
				this.r * scalar.r,
				this.g * scalar.g,
				this.b * scalar.b
			)
		}
		return new Color(this.r * scalar, this.g * scalar, this.b * scalar)
	}
}

function createColor(r: number, g: number, b: number) {
	return new Color(r, g, b)
}

export { Color, createColor }
