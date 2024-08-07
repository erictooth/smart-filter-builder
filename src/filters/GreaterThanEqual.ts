import { createComparator } from "../utilities/createComparator";

export const GreaterThanEqual = createComparator(
	"GreaterThanEqual",
	(value: number, source: number) => source >= value
);
