import { ComparatorModel, ConnectiveModel } from "./interfaces/PredicateModel";

export type Predicate = {
	(value: any): boolean;
	toObject: (value?: any) => ComparatorModel;
};

export type Operator = {
	<T extends Predicate[]>(...args: T): Predicate;
	ary: number;
	type: "operator";
	toObject: (value?: any) => ConnectiveModel;
};

export type Predicates = (Predicate | Operator)[];
