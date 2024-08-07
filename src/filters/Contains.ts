import { createComparator } from "../utilities/createComparator";

type ContainsOptions = {
	caseInsensitive?: boolean;
};

export const Contains = <T extends string>(
	value: T,
	options: ContainsOptions = {}
) =>
	createComparator("Contains", (value: T, source: string) => {
		if (options.caseInsensitive) {
			return source.toLowerCase().indexOf(value.toLowerCase()) !== -1;
		} else {
			return source.indexOf(value) !== -1;
		}
	})(value);
