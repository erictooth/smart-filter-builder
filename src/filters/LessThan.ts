export const LessThan = (value: number) => {
	const filterPredicate = (source: number) => source < value;

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "LessThan",
			source,
			value,
		} as const);

	return filterPredicate;
};
