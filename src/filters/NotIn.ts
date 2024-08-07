import { createComparator } from "../utilities/createComparator";

export const NotIn = createComparator(
	"NotIn",
	<T extends unknown[]>(value: T, source: T[number]) => !value.includes(source)
);
