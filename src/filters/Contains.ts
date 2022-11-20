type ContainsOptions = {
	caseInsensitive?: boolean;
};

export const Contains = <Value extends string>(
	value: Value,
	options: ContainsOptions = {}
) => {
	const filterPredicate = <Source extends string>(source: Source) => {
		if (options.caseInsensitive) {
			return source.toLowerCase().indexOf(value.toLowerCase()) !== -1;
		} else {
			return source.indexOf(value) !== -1;
		}
	};

	filterPredicate.toObject = (source = "#VALUE") =>
		({
			filter: "Contains",
			source,
			value,
		} as const);

	return filterPredicate;
};
