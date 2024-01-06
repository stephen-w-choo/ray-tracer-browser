import { Color } from "../objectPrimitives/Color";

interface Material {
    color: Color,
    ambi: number,
    diffuse: number,
    specular: number,
    shininess: number
}

function materialOf(
    color: Color = new Color(1, 1, 1),
    ambi: number = 0.1,
    diffuse: number = 0.9,
    specular: number = 0.9,
    shininess: number = 200.0
) {
    return { color, ambi, diffuse, specular, shininess }
}

export { Material, materialOf }