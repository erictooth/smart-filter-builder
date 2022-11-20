export const Is = <T>(value: T) => {
	const filterPredicate = (source: T) => value === source;

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "Is",
			source,
			value,
		} as const);

	return filterPredicate;
};
