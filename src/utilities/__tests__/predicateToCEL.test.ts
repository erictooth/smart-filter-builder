import { Is } from "../../filters";
import { predicateToCEL } from "../predicateToCEL";
import { combinePredicates } from "../combinePredicates";
import { Field } from "../../sources";
import { And, Or } from "../../operators";

it("outputs a single predicate correctly", () => {
	expect(predicateToCEL()(Field("title", Is("test")))).toEqual(
		'title == "test"'
	);
});

it("outputs combined predicates correctly", () => {
	const predicate = combinePredicates(
		Field("browser.name", Is("Chrome")),
		Field("browser.version", Is("70")),
		And,
		Field("browser.name", Is("Safari")),
		Field("browser.version", Is("12")),
		And,
		Field("browser.name", Is("Firefox")),
		Field("browser.version", Is("50")),
		And,
		Or,
		Or
	);
	expect(predicateToCEL()(predicate)).toEqual(
		`browser.version == "50" && browser.name == "Firefox" || browser.version == "12" && browser.name == "Safari" || browser.version == "70" && browser.name == "Chrome"`
	);
});

it("adds minimal parentheses when required", () => {
	const predicate = Or(
		And(
			Or(
				Field("browser.name", Is("Chrome")),
				Field("browser.name", Is("Edge"))
			),
			Field("browser.version", Is(79))
		),
		And(Field("browser.name", Is("Firefox")), Field("browser.version", Is(67))),
		And(Field("browser.name", Is("Safari")), Field("browser.version", Is(13)))
	);
	expect(predicateToCEL()(predicate)).toEqual(
		`(browser.name == "Chrome" || browser.name == "Edge") && browser.version == 79 || browser.name == "Firefox" && browser.version == 67 || browser.name == "Safari" && browser.version == 13`
	);
});
