export const ExactMatch = <Value extends string | number>(value: Value) => {
	const filterPredicate = <
		Source extends Value extends string ? string : number
	>(
		source: Source
	) => (source as string) === (value as string);

	filterPredicate.toObject = (source = "#VALUE") => ({
		filter: "ExactMatch",
		source,
		value,
	});

	return filterPredicate;
};
