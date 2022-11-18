import { PredicateObject } from "../types";

const precedence = {
	and: 2,
	or: 1,
};

const parenthesize = (
	parentType: keyof typeof precedence,
	childType: keyof typeof precedence,
	result: string
) => {
	if (precedence[childType] < precedence[parentType]) {
		return `(${result})`;
	}
	return result;
};

const predicateObjToCEL = (predicateObj: PredicateObject): string => {
	if ("type" in predicateObj) {
		switch (predicateObj.type) {
			case "or": {
				const [left, right] = predicateObj.predicates as any;
				const leftStr = parenthesize("or", left.type, predicateObjToCEL(left));
				const rightStr = parenthesize(
					"or",
					right.type,
					predicateObjToCEL(right)
				);
				return `${leftStr} || ${rightStr}`;
			}
			case "and": {
				const [left, right] = predicateObj.predicates as any;
				const leftStr = parenthesize("and", left.type, predicateObjToCEL(left));
				const rightStr = parenthesize(
					"and",
					right.type,
					predicateObjToCEL(right)
				);
				return `${leftStr} && ${rightStr}`;
			}
			default:
				throw new Error(`Unknown operator ${JSON.stringify(predicateObj)}`);
		}
	}

	switch (predicateObj.filter) {
		case "ExactMatch":
			return `${predicateObj.source} == ${JSON.stringify(predicateObj.value)}`;
		case "PartialMatch":
			return `${predicateObj.source} LIKE ${JSON.stringify(
				predicateObj.value
			)}`;
		default:
			throw new Error(`Unknown filter type ${JSON.stringify(predicateObj)}`);
	}
};

export const predicateToCEL = (predicate: any): string => {
	return predicateObjToCEL(predicate.toObject());
};
