import { Is } from "../../filters";
import { And } from "../And";
import { Or } from "../Or";

it("works correctly with one argument", () => {
	expect(Or(Is("test"))("test")).toBe(true);
	expect(And(Is("test"))("test")).toBe(true);
});

it("works correctly with two arguments", () => {
	expect(Or(Is("test"), Is("nomatch"))("test")).toBe(true);
	expect(Or(Is("nomatch"), Is("nomatch"))("test")).toBe(false);
	expect(And(Is("test"), Is("test"))("test")).toBe(true);
	expect(And(Is("test"), Is("nomatch"))("test")).toBe(false);
});

it("works correctly with three arguments", () => {
	expect(Or(Is("test"), Is("nomatch"), Is("nomatch"))("test")).toBe(true);
	expect(Or(Is("nomatch"), Is("nomatch"), Is("nomatch"))("test")).toBe(false);
	expect(And(Is("test"), Is("test"), Is("test"))("test")).toBe(true);
	expect(And(Is("test"), Is("nomatch"), Is("nomatch"))("test")).toBe(false);
});
