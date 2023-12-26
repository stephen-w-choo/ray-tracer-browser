import { Color, createColor } from "../../src/types/Color";

describe("Color", () => {
	test("Multiplying a color by a scalar", () => {
		const c = createColor(-0.5, 0.4, 1.7);
		expect(c.times(2).equals(createColor(-1, 0.8, 3.4))).toBe(true);
	});
	test("Multiplying colors", () => {
		const c1 = createColor(1, 0.2, 0.4);
		const c2 = createColor(0.9, 1, 0.1);
		expect(c1.times(c2).equals(createColor(0.9, 0.2, 0.04))).toBe(true);
	});
});
