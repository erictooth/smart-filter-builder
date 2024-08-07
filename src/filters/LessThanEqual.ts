import { createComparator } from "../utilities/createComparator";

export const LessThanEqual = createComparator(
	"LessThanEqual",
	(value: number, source: number) => source <= value
);
