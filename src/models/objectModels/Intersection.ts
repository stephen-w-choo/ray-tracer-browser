import { Sphere } from "./Sphere"

type Intersection = {
	t: number
	object: Sphere // TODO - will become a union type in the future
}

type Intersections = Intersection[]
// TODO - possibly convert into a heap
// still unclear on

export { Intersection, Intersections }
