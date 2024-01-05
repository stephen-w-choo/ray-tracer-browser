import { Canvas } from "../../models/environment/Canvas"

const PIXEL_SIZE = 1

function displayCanvas(domCanvas: HTMLCanvasElement, canvas: Canvas) {
	domCanvas.style.height = `${canvas.height * PIXEL_SIZE}px`
	domCanvas.style.width = `${canvas.width * PIXEL_SIZE}px`

	const ctx = domCanvas.getContext("2d")
	if (!ctx) throw new Error("Invalid Canvas DOM context")

	const imageArray = canvas.canvasArray

	for (let y = 0; y < imageArray.length; y++) {
		for (let x = 0; x < imageArray[y].length; x++) {
			let color = imageArray[y][x]
			ctx.fillStyle = `rgb(${color.r}, ${color.g}, ${color.b})`
			ctx.fillRect(x * PIXEL_SIZE, y * PIXEL_SIZE, PIXEL_SIZE, PIXEL_SIZE)
		}
	}
}
