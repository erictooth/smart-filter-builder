import { GreaterThanEqual } from "../GreaterThanEqual";

it("positive case", () => {
	expect(GreaterThanEqual(5)(5)).toBe(true);
});

it("negative case", () => {
	expect(GreaterThanEqual(5)(1)).toBe(false);
});
