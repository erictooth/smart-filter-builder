import { NotIn } from "../NotIn";

it("positive case", () => {
	expect(NotIn([5])(4)).toBe(true);
});

it("negative case", () => {
	expect(NotIn([5])(5)).toBe(false);
});
