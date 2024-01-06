import { Tuple, createPoint, createVector } from "../../src/models/objectPrimitives/Tuple"
import { Light, lighting } from "../../src/models/objectModels/Light"
import { Color, createColor } from "../../src/models/objectPrimitives/Color"
import { Material, materialOf } from "../../src/models/objectModels/Material"

describe("Point light tests", () => {
    test("A point light has a position and intensity", () => {
        // Given 
        let intensity = new Color(1, 1, 1)
        let position = createPoint(0, 0, 0)

        // When
        let light = new Light(position, intensity)

        // Then
        expect(light.pos).toBe(position)
        expect(light.intensity).toBe(intensity)
    })
})

describe("Phong reflection tests", () => {
    let m: Material
    let position: Tuple

    beforeAll(() => {
        m = materialOf()
        position = createPoint(0, 0, 0)
    })

    test("Lighting with the eye between the light and the surface", () => {
        // Given
        let eyeV = createVector(0, 0, -1)
        let normalV = createVector(0, 0, -1)
        let light = new Light(createPoint(0, 0, -10), new Color(1, 1, 1))
        
        // When
        let result = lighting(
            m,
            light,
            position,
            eyeV,
            normalV    
        )

        // Then
        expect(result.equals(createColor(1.9, 1.9, 1.9))).toBe(true)
    })

    test("Lighting with the eye between light and surface, eye offset 45 degrees", () => {
        // Given
        let eyeV = createVector(0, Math.sqrt(2) / 2, Math.sqrt(2) / 2)
        let normalV = createVector(0, 0, -1)
        let light = new Light(createPoint(0, 0, -10), new Color(1, 1, 1))

        // When
        let result = lighting(
            m,
            light,
            position,
            eyeV,
            normalV    
        )

        // Then
        expect(result.equals(createColor(1.0, 1.0, 1.0))).toBe(true) 
    })

    test("Lighting with the eye between light and surface, light offset 45 degrees", () => {
        // Given
        let eyeV = createVector(0, 0, -1)
        let normalV = createVector(0, 0, -1)
        let light = new Light(createPoint(0, 10, -10), new Color(1, 1, 1))

        // When
        let result = lighting(
            m,
            light,
            position,
            eyeV,
            normalV    
        )

        // Then
        expect(result.equals(createColor(0.7364, 0.7364, 0.7364))).toBe(true) 
    })

    test("Lighting with the eye in the path of the reflection vector", () => {
        // Given
        let eyeV = createVector(0, -Math.sqrt(2) / 2, -Math.sqrt(2) / 2)
        let normalV = createVector(0, 0, -1)
        let light = new Light(createPoint(0, 10, -10), new Color(1, 1, 1))

        // When
        let result = lighting(
            m,
            light,
            position,
            eyeV,
            normalV    
        )

        // Then
        expect(result.equals(createColor(1.6364, 1.6364, 1.6364))).toBe(true) 
    })

    test("Lighting with the eye on opposite side of the rays", () => {
        // Given
        let eyeV = createVector(0, 0, -1)
        let normalV = createVector(0, 0, -1)
        let light = new Light(createPoint(0, 0, 10), new Color(1, 1, 1))

        // When
        let result = lighting(
            m,
            light,
            position,
            eyeV,
            normalV    
        )

        // Then
        expect(result.equals(createColor(0.1, 0.1, 0.1))).toBe(true) 
    })
})