import { Tuple } from "./Tuple";

class Color extends Tuple {
	constructor(r: number, g: number, b: number) {
		super(r, g, b, 0);
	}

	times(scalar: number | Color) {
		if (scalar instanceof Color) {
			return new Color(
				this.x * scalar.x,
				this.y * scalar.y,
				this.z * scalar.z
			);
		}
		return new Color(this.x * scalar, this.y * scalar, this.z * scalar);
	}
}

function createColor(r: number, g: number, b: number) {
	return new Color(r, g, b);
}

export { Color, createColor };
