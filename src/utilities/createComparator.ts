import { ComparatorModel } from "../interfaces/PredicateModel";

export const createComparator =
	<V, S>(name: string, compare: (value: V, source: S) => boolean) =>
	(value: V) => {
		const comparator = (source: S) => compare(value, source);
		comparator.toObject = (source: S): ComparatorModel<V, S> => ({
			name,
			source,
			value,
			type: "comparator",
		});
		return comparator;
	};
