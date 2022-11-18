import { ExactMatch } from "../../filters";
import { And } from "../And";
import { Or } from "../Or";

it("works correctly with one argument", () => {
	expect(Or(ExactMatch("test"))("test")).toBe(true);
	expect(And(ExactMatch("test"))("test")).toBe(true);
});

it("works correctly with two arguments", () => {
	expect(Or(ExactMatch("test"), ExactMatch("nomatch"))("test")).toBe(true);
	expect(Or(ExactMatch("nomatch"), ExactMatch("nomatch"))("test")).toBe(false);
	expect(And(ExactMatch("test"), ExactMatch("test"))("test")).toBe(true);
	expect(And(ExactMatch("test"), ExactMatch("nomatch"))("test")).toBe(false);
});

it("works correctly with three arguments", () => {
	expect(
		Or(ExactMatch("test"), ExactMatch("nomatch"), ExactMatch("nomatch"))("test")
	).toBe(true);
	expect(
		Or(
			ExactMatch("nomatch"),
			ExactMatch("nomatch"),
			ExactMatch("nomatch")
		)("test")
	).toBe(false);
	expect(
		And(ExactMatch("test"), ExactMatch("test"), ExactMatch("test"))("test")
	).toBe(true);
	expect(
		And(
			ExactMatch("test"),
			ExactMatch("nomatch"),
			ExactMatch("nomatch")
		)("test")
	).toBe(false);
});
