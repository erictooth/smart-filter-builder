import { ExactMatch, PartialMatch } from "../../filters";
import { combinePredicates } from "../combinePredicates";
import { Or } from "../../operators";

it("combines a single predicate correctly", () => {
	expect(combinePredicates(ExactMatch("test"))("test")).toBe(true);
});

it("combines multiple predicates with an operator correctly", () => {
	expect(
		combinePredicates(PartialMatch("testt"), ExactMatch("test"), Or)("testtest")
	).toBe(true);
});
