import { join } from 'path'
import { makeVideo } from '../../utils/bunUtils/makeVideo'
import { makePPM } from '../../utils/bunUtils/makePPM'
import { drawBallWithLightShader } from './drawBall'
import { lightFrames, FrameData } from './frames'
import fs from 'fs'

const args = process.argv.slice(2)
const outputDirectory = join(__dirname, args[0])
const imageName = args[0].split("/").pop() // image name is the last part of the path
const canvasSize: number = parseInt(args[1])

// Change as needed
const SPINNING_BALL_INTERVALS = 24
const CURRENT_FRAMES = lightFrames
const FRAME_RATE = 24

function makeSpinningBallFrameData(divisions: number): FrameData[] {
    let res: FrameData[] = []

    for (let i = 0; i < divisions; i++) {
        let angle = (i / divisions) * Math.PI * 2

        let x = Math.cos(angle) * 10
        let z = Math.sin(angle) * 10
        res.push({
            camera: [x, 10, z],
            height: 1.0,
            scale: [1.0, 1.0, 1.0]
        })
    }

    return res
}

async function makeBallFrames(
    framesData: FrameData[], 
    outputImageDirectory: string,
    canvasSize: [number, number]
) {
    // get the outputImageDirectoryName
    const outputImageDirectoryName = outputImageDirectory.split("/").pop()

	for (let index = 0; index < framesData.length; index++) {
        const frame = framesData[index]
		const formattedIndex = index.toString()

		let canvas = await drawBallWithLightShader(
			frame.camera,
			frame.height - 1.5,
			frame.scale,
			canvasSize
		)
		makePPM(
            canvas, 
            join(outputImageDirectory, `${outputImageDirectoryName}${formattedIndex}.ppm`)
        )
        console.log(`Finished frame ${formattedIndex}`)
	}
}

async function main() {
    // start timer
    const startTime = new Date().getTime()

    // make a directory for the output images
    try {
        fs.mkdirSync(outputDirectory)
    } catch (e) {
        // do nothing if the directory already exists
    }

    // get the frame data to be used
    const FrameData = makeSpinningBallFrameData(SPINNING_BALL_INTERVALS)

    // make the frames
	await makeBallFrames(
        FrameData,
        outputDirectory,
        [canvasSize, canvasSize]
    )

	makeVideo(
        outputDirectory,
        `${imageName}%d.ppm`,
        FRAME_RATE,
        `${imageName}.mp4`
    )

    // end timer
    const endTime = new Date().getTime()

    // print the time elapsed
    console.log(`Time elapsed: ${(endTime - startTime) / 1000}s`)
}

main()