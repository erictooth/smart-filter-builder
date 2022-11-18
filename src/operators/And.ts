import { type Predicates } from "../types";

export const And: any = (...predicates: Predicates) => {
	const operatorPredicate = (value: unknown) =>
		predicates.every((predicate) => predicate(value));

	operatorPredicate.toObject = () => {
		return {
			type: "and",
			predicates: predicates.map((predicate) => predicate.toObject()),
		};
	};

	return operatorPredicate;
};
And.type = "operator";
And.ary = 2;
