import { Color } from "../objectPrimitives/Color"
import { Tuple } from "../objectPrimitives/Tuple"
import { Material } from "./Material"

class Light {
	pos: Tuple
	intensity: Color
	constructor(pos: Tuple, intensity: Color) {
		// TODO - debugging only, remove in prod
		if (pos.w !== 1) throw new Error("Not a point")
		this.pos = pos
		this.intensity = intensity
	}
}

function lighting(
	material: Material,
	light: Light,
	point: Tuple,
	eyeV: Tuple,
	normalV: Tuple
) {
	// implementation of Phong shader algorithm
	// three lighting sources to be combined
	let ambientLight: Color
	let diffuseLight: Color
	let specularLight: Color

	// effective colour is a mix of material + light colour + material ambient reflectivity
	let effectiveColor = material.color.times(light.intensity)
	ambientLight = effectiveColor.times(material.ambi)

	// vector from light to the point
	let lightV = light.pos.minus(point).normalize()

	// check if light source is shining on the point
	let lightDotNormal = lightV.dot(normalV)
	if (lightDotNormal < 0) {
		diffuseLight = new Color(0, 0, 0)
		specularLight = new Color(0, 0, 0)
	} else {
		diffuseLight = effectiveColor
			.times(material.diffuse)
			.times(lightDotNormal)
		let reflectV = lightV.negate().reflect(normalV)

		let reflectDotEye = reflectV.dot(eyeV)

		if (reflectDotEye <= 0) {
			specularLight = new Color(0, 0, 0)
		} else {
			let factor = reflectDotEye ** material.shininess
			specularLight = light.intensity
				.times(material.specular)
				.times(factor)
		}
	}
	return ambientLight.plus(specularLight).plus(diffuseLight)
}

export { Light, lighting }
