import { ComparatorModel, ConnectiveModel } from "./PredicateModel";

export type ComparatorPredicate<V = unknown, S = unknown> = {
	(source: S): boolean;
	toObject(source: S): ComparatorModel<V, S>;
	type: "comparator";
};

export type ConnectivePredicate = {
	<T extends ComparatorPredicate[]>(...args: T): Predicate;
	toObject(source: any): ConnectiveModel;
	type: "connective";
	arity: number;
};

export type Predicate = ComparatorPredicate | ConnectivePredicate;
