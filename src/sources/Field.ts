import { type Predicate } from "../types";

export const Field = (key: string, predicate: Predicate) => {
	const fieldPredicate = (record: Record<string, any>) =>
		predicate(record[key]);

	fieldPredicate.toObject = () => predicate.toObject(key);

	return fieldPredicate;
};
