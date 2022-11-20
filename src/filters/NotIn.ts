export const NotIn = <T extends any[]>(value: T) => {
	const filterPredicate = (source: any) => !value.includes(source);

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "NotIn",
			source,
			value,
		} as const);

	return filterPredicate;
};
