import { createComparator } from "../utilities/createComparator";

export const Is = createComparator(
	"Is",
	<T>(value: T, source: T) => value === source
);
