import { drawBall } from "../build/demo/ball/ball-animate.js"

const defaultBall = { camera: [-10, 10, -10], height: 1.0, scale: [1.0, 1.0, 1.0] }
let CANVAS_SIZE = [100, 100]

const canvas = document.getElementById("canvas")
console.log(drawBall(
    defaultBall.camera,
    defaultBall.height,
    defaultBall.scale,
    CANVAS_SIZE
))