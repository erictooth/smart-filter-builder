import { Is, Contains } from "../../filters";
import { combinePredicates } from "../combinePredicates";
import { Or } from "../../operators";

it("combines a single predicate correctly", () => {
	expect(combinePredicates(Is("test"))("test")).toBe(true);
});

it("combines multiple predicates with an operator correctly", () => {
	expect(combinePredicates(Contains("testt"), Is("test"), Or)("testtest")).toBe(
		true
	);
});
