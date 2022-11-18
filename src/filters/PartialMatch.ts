export const PartialMatch = <Value extends string>(value: Value) => {
	const filterPredicate = <Source extends string>(source: Source) =>
		source.toLowerCase().indexOf(value.toLowerCase()) !== -1;

	filterPredicate.toObject = (source = "#VALUE") => ({
		filter: "PartialMatch",
		source,
		value,
	});

	return filterPredicate;
};
