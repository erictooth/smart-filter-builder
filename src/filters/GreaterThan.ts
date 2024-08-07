import { createComparator } from "../utilities/createComparator";

export const GreaterThan = createComparator(
	"GreaterThan",
	(value: number, source: number) => source > value
);
