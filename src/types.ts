export type FilterPredicate = {
	filter: string;
	source: string;
	value: unknown;
};

export type OperatorPredicate = {
	type: string;
	predicates: PredicateObject[];
};

export type PredicateObject = FilterPredicate | OperatorPredicate;

export type Predicate = {
	(value: any): boolean;
	toObject: (value?: any) => PredicateObject;
};

export type Operator = {
	<T extends Predicate[]>(...args: T): Predicate;
	length: number;
	type: "operator";
	toObject: (value?: any) => PredicateObject;
};

export type Predicates = (Predicate | Operator)[];
