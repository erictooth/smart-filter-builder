import { type Predicate, type FilterPredicate } from "../types";

type Conjunctions = Record<
	string,
	{
		precedence: number;
		symbol: string;
	}
>;

const defaultConjunctions: Conjunctions = {
	and: {
		precedence: 2,
		symbol: " && ",
	},
	or: {
		precedence: 1,
		symbol: " || ",
	},
};

type Filters = Record<string, (predicateObj: FilterPredicate) => string>;

const defaultFilters: Filters = {
	Contains: (predicateObj) =>
		`${predicateObj.source} LIKE ${JSON.stringify(predicateObj.value)}`,
	GreaterThan: (predicateObj) =>
		`${predicateObj.source} > ${JSON.stringify(predicateObj.value)}`,
	GreaterThanEqual: (predicateObj) =>
		`${predicateObj.source} >= ${JSON.stringify(predicateObj.value)}`,
	Is: (predicateObj) =>
		`${predicateObj.source} == ${JSON.stringify(predicateObj.value)}`,
	IsNot: (predicateObj) =>
		`${predicateObj.source} != ${JSON.stringify(predicateObj.value)}`,
	LessThan: (predicateObj) =>
		`${predicateObj.source} < ${JSON.stringify(predicateObj.value)}`,
	LessThanEqual: (predicateObj) =>
		`${predicateObj.source} <= ${JSON.stringify(predicateObj.value)}`,
};

const parenthesize = (
	parentPrecedence: number,
	childPrecedence: number,
	result: string
) => {
	if (parentPrecedence < childPrecedence) {
		return `(${result})`;
	}
	return result;
};

export const predicateToCEL = (
	config: { conjunctions?: Conjunctions; filters?: Filters } = {}
) => {
	const filters: Filters = { ...defaultFilters, ...config.filters };
	const conjunctions: Conjunctions = {
		...defaultConjunctions,
		...config.conjunctions,
	};

	return (predicate: Predicate): string => {
		const predicateObj = predicate.toObject();

		const conjunctionToString = (predicateObj: any) => {
			const parentConjunction = conjunctions[predicateObj.type]!;
			return predicateObj.predicates
				.map((predicate: any) => {
					const childConjunction = conjunctions[predicate.type]!;
					return parenthesize(
						childConjunction?.precedence,
						parentConjunction.precedence,
						predicateToString(predicate)
					);
				})
				.join(parentConjunction.symbol);
		};

		const predicateToString = (predicateObj: any) => {
			if ("type" in predicateObj && predicateObj.type !== "comparator") {
				return conjunctionToString(predicateObj);
			}

			const filterToString = filters[predicateObj.name];
			if (!filterToString) {
				throw new Error(`Unknown filter type ${JSON.stringify(predicateObj)}`);
			}
			return filterToString(predicateObj);
		};

		return predicateToString(predicateObj);
	};
};
