export type ComparatorModel<V = unknown, S = unknown> = {
	readonly type: "comparator";
	readonly name: string;
	readonly source: S;
	readonly value: V;
};

export type ConnectiveModel = {
	readonly type: "connective";
	readonly name: string;
	readonly operands: PredicateModel[];
};

export type PredicateModel = ConnectiveModel | ComparatorModel;
