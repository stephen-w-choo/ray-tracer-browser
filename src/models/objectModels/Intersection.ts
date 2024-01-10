import { Sphere } from "./Sphere"

type Intersection = {
	t: number
	object: Sphere // TODO - will become a union type in the future
}

type Intersections = Intersection[]
// TODO - possibly convert into a heap - unsure if it's faster than
// running a linear search each time

function intersectionOf(t: number, object: Sphere): Intersection {
	return { t, object }
}

export { Intersection, Intersections, intersectionOf }
