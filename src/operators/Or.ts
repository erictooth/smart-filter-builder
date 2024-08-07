import { type Predicates } from "../types";

export const Or: any = (...predicates: Predicates) => {
	const operatorPredicate = (value: unknown) =>
		predicates.some((predicate) => predicate(value));

	operatorPredicate.toObject = () => {
		return {
			type: "or",
			predicates: predicates.map((predicate) => predicate.toObject()),
		};
	};

	return operatorPredicate;
};
Or.type = "connective";
Or.arity = 2;
