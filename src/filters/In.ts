export const In = <T extends any[]>(value: T) => {
	const filterPredicate = (source: any) => value.includes(source);

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "In",
			source,
			value,
		} as const);

	return filterPredicate;
};
