export const LessThanEqual = (value: number) => {
	const filterPredicate = (source: number) => source <= value;

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "LessThanEqual",
			source,
			value,
		} as const);

	return filterPredicate;
};
