import { IsNot } from "../IsNot";

it("positive case", () => {
	expect(IsNot("test")("")).toBe(true);
});

it("negative case", () => {
	expect(IsNot("test")("test")).toBe(false);
});
