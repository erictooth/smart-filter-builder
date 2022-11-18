import { type Operator, type Predicate } from "../types";

export const And: any = (left: Predicate, right: Predicate) => {
	const operatorPredicate = (value: unknown) => left(value) && right(value);

	operatorPredicate.toObject = () => {
		return {
			type: "and",
			predicates: [left.toObject(), right.toObject()],
		};
	};

	return operatorPredicate;
};
And.type = "operator";
