import { Canvas } from "../../models/environment/Canvas";
import { Ray } from "../../models/objectModels/Ray";
import { Sphere } from "../../models/objectModels/Sphere";
import { Color } from "../../models/objectPrimitives/Color";
import { Tuple, createPoint } from "../../models/objectPrimitives/Tuple";
import { makePPM } from "../../utils/bunUtils/makePPM";
import { hit } from "../../utils/rayUtils";

// represents the size of the camera field of view
let CAMERA_FOV = 10.0
let [topCornerY, topCornerX] = [-(CAMERA_FOV / 2), -(CAMERA_FOV / 2)]
let CAMERA_DISTANCE = 10
// slope = Math.abs(rayOrigin.z) / 10
// silhouetteSize = ((wallDistance - rayOrigin.z) * slope) * 2 which is 6
// use a WORLD_SIZE of 10.0 - will capture the silhouette

function main() {
    let canvas = new Canvas(200, 200)
    let sphere = new Sphere().translate(0, 0, 5)
    let rayOrigin = createPoint(0, 0, -5)
    
    let canvasScale = CAMERA_FOV / canvas.height // 0.1
    let highlightColor = new Color(255, 255, 100)

    for (let canvasY = 0; canvasY < canvas.height; canvasY++) {
        for (let canvasX = 0; canvasX < canvas.width; canvasX++) {
            // determine the relative point of the pixel
            let cameraPoint = pixelToCameraPoint(canvasY, canvasX, canvasScale)
            let r = createRay(rayOrigin, cameraPoint)
            let intersections = r.intersect(sphere)
            if (hit(intersections)) {
                canvas.pixel.set(canvasY, canvasX, highlightColor)
            }
        }
    }

    makePPM(canvas, "silhouette.ppm")
}

function pixelToCameraPoint(y: number, x: number, scale: number): Tuple {
    return createPoint(
        topCornerX + x * scale, 
        topCornerY + y * scale, 
        CAMERA_DISTANCE
    )
}

function createRay(origin: Tuple, destination: Tuple): Ray {
    // subtract the two points to get a vector
    // then normalise the vector
    return new Ray(
        origin, 
        destination.minus(origin).normalize()
    )
}

main()