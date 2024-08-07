import { GreaterThan } from "../GreaterThan";

it("positive case", () => {
	expect(GreaterThan(5)(10)).toBe(true);
});

it("negative case", () => {
	expect(GreaterThan(5)(1)).toBe(false);
});
