export type FrameData = {
	camera: [number, number, number]
	height: number
	scale: [number, number, number]
}

export const lightFrames: FrameData[] = [
	{ camera: [14.14, 10, 0.0], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [11.44, 10, 8.31], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [4.37, 10, 13.45], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-4.37, 10, 13.45], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-11.44, 10, 8.31], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-14.14, 10, 0.0], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-11.44, 10, -8.31], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-4.37, 10, -13.45], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [4.37, 10, -13.45], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [11.44, 10, -8.31], height: 1.0, scale: [1.0, 1.0, 1.0] },
]

export const bounceFrames: FrameData[] = [
	{ camera: [-10, 10, -10], height: 1.0, scale: [1.0, 1.0, 1.0] },
	{ camera: [-10, 10, -10], height: 0.75, scale: [1.08, 0.89, 1.08] },
	{ camera: [-10, 10, -10], height: 0.61, scale: [1.13, 0.83, 1.13] },
	{ camera: [-10, 10, -10], height: 0.57, scale: [1.15, 0.81, 1.15] },
	{ camera: [-10, 10, -10], height: 0.63, scale: [1.14, 0.83, 1.14] },
	{ camera: [-10, 10, -10], height: 0.8, scale: [1.1, 0.9, 1.1] },
	{ camera: [-10, 10, -10], height: 1.07, scale: [1.03, 1.01, 1.03] },
	{ camera: [-10, 10, -10], height: 1.45, scale: [0.94, 1.17, 0.94] },
	{ camera: [-10, 10, -10], height: 1.68, scale: [0.87, 1.27, 0.87] },
	{ camera: [-10, 10, -10], height: 1.5, scale: [0.9, 1.2, 0.9] },
]
