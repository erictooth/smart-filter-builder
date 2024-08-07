import { createComparator } from "../utilities/createComparator";

export const In = createComparator(
	"In",
	<T extends unknown[]>(value: T, source: T[number]) => value.includes(source)
);
