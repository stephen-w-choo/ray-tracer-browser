import { Tuple, Point, Vector } from "../types/Tuple"
import { FloatEquals } from "../utils/matrixUtils"

// Projectile type that is composed of an instance of a Tuple and a Vector
interface Projectile {
	position: Point
	velocity: Vector
}

interface Environment {
	gravity: Vector
	wind: Vector
}

function tick(env: Environment, proj: Projectile): Projectile {
	const position = proj.position.plus(proj.velocity)
	const velocity = proj.velocity.plus(env.gravity).plus(env.wind)
	return { position, velocity }
}

// run the tick function 100 times
function run() {
	const env: Environment = {
		gravity: new Vector(0, -0.1, 0),
		wind: new Vector(-0.01, 0, 0),
	}

	const proj: Projectile = {
		position: new Point(0, 1, 0),
		velocity: new Vector(1, 1, 0).normalize(),
	}

	for (let i = 0; i < 100; i++) {
		const newProj = tick(env, proj)
		proj.position = newProj.position
		proj.velocity = newProj.velocity
	}
}

export { Projectile, Environment, tick }
