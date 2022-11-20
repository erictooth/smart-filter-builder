import { type Predicate, type Predicates } from "../types";

/**
 *
 * @param predicates A list of predicates joined by `Operators` in postfix order
 * @returns A single predicate containing all joined predicates and operators
 */
export const combinePredicates = (...predicates: Predicates) => {
	const operands: Predicates = [];

	for (const predicate of predicates) {
		if ("type" in predicate && predicate["type"] === "operator") {
			operands.push(
				predicate.apply(
					null,
					Array.from({ length: predicate.ary }, () => operands.pop()!) as any
				)
			);
		} else {
			operands.push(predicate);
		}
	}

	if (operands.length !== 1) {
		throw new Error("Predicate could not be evaluated");
	}
	return operands.pop()! as Predicate;
};
