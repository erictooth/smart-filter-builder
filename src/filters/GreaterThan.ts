export const GreaterThan = (value: number) => {
	const filterPredicate = (source: number) => source > value;

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "GreaterThan",
			source,
			value,
		} as const);

	return filterPredicate;
};
