import { createComparator } from "../utilities/createComparator";

export const LessThan = createComparator(
	"LessThan",
	(value: number, source: number) => source < value
);
