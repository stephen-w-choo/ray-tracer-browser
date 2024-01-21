import FfmpegCommand from 'fluent-ffmpeg'
import { join } from "path"

export function makeVideo(
    directory: string, 
    filePattern: string,
    framerate: number,
    outputFileName: string
) {
    /* Takes a directory and file pattern as strings, loads all the images, and 
    outputs a video in the same directory */
    
    // @ts-ignore - the types are installed, but it's still not recognising the
    // FFmpegCommand constructor
    const command = new FfmpegCommand()
    
    command.addInput(join(directory, filePattern))
        .fps(framerate)
        .output(join(directory,outputFileName))
        .run()
}