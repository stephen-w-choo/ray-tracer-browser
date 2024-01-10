import fs from "fs"
import { Canvas } from "../../models/environment/Canvas"

const HEADER = "P3"
const PPM_MAX = 255

function toPPMColor(color: number): string {
	color = Math.min(1, Math.max(0, color))
	return Math.round(color * PPM_MAX).toString()
}

async function makePPM(canvas: Canvas, outputFileName: string) {
	const fileLines: string[] = []

	fileLines.push(HEADER)
	fileLines.push(`${canvas.width} ${canvas.height}`)
	fileLines.push(PPM_MAX.toString())

	let line = []
	// the below can probably be turned into a reduce but I don't have the brains right now
	for (let y = canvas.height - 1; y >= 0; y--) {
		for (let x = 0; x < canvas.width; x++) {
			let color = canvas.pixel.get(y, x)
			line.push(
				// prettier-ignore
				`${toPPMColor(color.r)} ${toPPMColor(color.g)} ${toPPMColor(color.b)} `
			)
			if (line.length >= 5) {
				fileLines.push(line.join(""))
				line = []
			}
		}
	}

	if (line.length > 0) {
		// if there are any remaining colors in the line array
		fileLines.push(line.join(""))
	}

	fileLines.push("") // adding a newline at the end of the file

	fs.writeFileSync(outputFileName, fileLines.join("\n"))
}

export { makePPM }
