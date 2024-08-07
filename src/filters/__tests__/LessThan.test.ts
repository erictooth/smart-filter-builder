import { LessThan } from "../LessThan";

it("positive case", () => {
	expect(LessThan(5)(1)).toBe(true);
});

it("negative case", () => {
	expect(LessThan(5)(5)).toBe(false);
});
