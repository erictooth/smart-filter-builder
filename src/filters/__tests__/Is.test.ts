import { Is } from "../Is";

it("positive case", () => {
	expect(Is("test")("test")).toBe(true);
});

it("negative case", () => {
	expect(Is("test")("")).toBe(false);
});
