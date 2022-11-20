export const GreaterThanEqual = (value: number) => {
	const filterPredicate = (source: number) => source >= value;

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "GreaterThanEqual",
			source,
			value,
		} as const);

	return filterPredicate;
};
