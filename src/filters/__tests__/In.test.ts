import { In } from "../In";

it("positive case", () => {
	expect(In(["test"])("test")).toBe(true);
});

it("negative case", () => {
	expect(In(["test"])("")).toBe(false);
});
