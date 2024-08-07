import { Contains } from "../Contains";

it("positive case", () => {
	expect(Contains("test")("test")).toBe(true);
	expect(Contains("test", { caseInsensitive: true })("TEST")).toBe(true);
});

it("negative case", () => {
	expect(Contains("test")("abcd")).toBe(false);
	expect(Contains("test")("TEST")).toBe(false);
});
