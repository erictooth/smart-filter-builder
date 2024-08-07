import { createComparator } from "../utilities/createComparator";

export const IsNot = createComparator(
	"IsNot",
	<T>(value: T, source: T) => value !== source
);
