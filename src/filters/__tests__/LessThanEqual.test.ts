import { LessThanEqual } from "../LessThanEqual";

it("positive case", () => {
	expect(LessThanEqual(5)(5)).toBe(true);
	expect(LessThanEqual(5)(1)).toBe(true);
});

it("negative case", () => {
	expect(LessThanEqual(5)(10)).toBe(false);
});
