import { Color, createColor } from "./Color"

export class Canvas {
	width: number
	height: number
	canvasArray: Color[][]

	constructor(y: number, x: number) {
		this.height = y
		this.width = x
		this.canvasArray = []

		for (let i = 0; i < y; i++) {
			let row: Color[] = []
			for (let j = 0; j < x; j++) {
				row.push(createColor(0, 0, 0))
			}
			this.canvasArray.push(row)
		}
	}

	get pixel() {
		return {
			get: (y: number, x: number): Color => {
				if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
					return this.canvasArray[y][x]
				} else {
					throw new Error("Pixel coordinates are out of bounds")
				}
			},
			set: (y: number, x: number, color: Color) => {
				if (x >= 0 && x < this.width && y >= 0 && y < this.height) {
                    y = Math.round(y)
                    x = Math.round(x)

					this.canvasArray[y][x] = color
				} else {
					throw new Error("Pixel coordinates are out of bounds")
				}
			},
		}
	}
}
