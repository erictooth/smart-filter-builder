import { ExactMatch, PartialMatch } from "../../filters";
import { predicateToCEL } from "../predicateToCEL";
import { combinePredicates } from "../combinePredicates";
import { Field } from "../../sources";
import { And, Or } from "../../operators";

it("outputs a single predicate correctly", () => {
	expect(predicateToCEL(Field("title", ExactMatch("test")))).toEqual(
		'title == "test"'
	);
});

it("outputs combined predicates correctly", () => {
	const predicate = combinePredicates(
		Field("browser.name", ExactMatch("Chrome")),
		Field("browser.version", ExactMatch("70")),
		And,
		Field("browser.name", ExactMatch("Safari")),
		Field("browser.version", ExactMatch("12")),
		And,
		Field("browser.name", ExactMatch("Firefox")),
		Field("browser.version", ExactMatch("50")),
		And,
		Or,
		Or
	);
	expect(predicateToCEL(predicate)).toEqual(
		`browser.version == "50" && browser.name == "Firefox" || browser.version == "12" && browser.name == "Safari" || browser.version == "70" && browser.name == "Chrome"`
	);
});

it("adds minimal parentheses when required", () => {
	const predicate = combinePredicates(
		Field("browser.name", ExactMatch("Chrome")),
		Field("browser.version", ExactMatch("70")),
		And,
		Field("browser.version", ExactMatch("12")),
		Field("os", ExactMatch("macOS")),
		And,
		Field("browser.version", ExactMatch("11")),
		Field("os", ExactMatch("iOS")),
		And,
		Or,
		Field("browser.name", ExactMatch("Safari")),
		And,
		Field("browser.name", ExactMatch("Firefox")),
		Field("browser.version", ExactMatch("50")),
		And,
		Or,
		Or
	);
	expect(predicateToCEL(predicate)).toEqual(
		`browser.version == "50" && browser.name == "Firefox" || browser.name == "Safari" && (os == "iOS" && browser.version == "11" || os == "macOS" && browser.version == "12") || browser.version == "70" && browser.name == "Chrome"`
	);
});
