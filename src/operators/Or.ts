import { type Operator, type Predicate } from "../types";

export const Or: any = (left: Predicate, right: Predicate) => {
	const operatorPredicate = (value: unknown) => left(value) || right(value);

	operatorPredicate.toObject = () => {
		return {
			type: "or",
			predicates: [left.toObject(), right.toObject()],
		};
	};

	return operatorPredicate;
};
Or.type = "operator";
