import { PredicateObject } from "../types";

const precedence = {
  and: 2,
  or: 1,
};

const parenthesize = (
  parentType: keyof typeof precedence,
  childType: keyof typeof precedence,
  result: string
) => {
  if (precedence[childType] < precedence[parentType]) {
    return `(${result})`;
  }
  return result;
};

const predicateObjToCEL = (predicateObj: PredicateObject): string => {
  if ("type" in predicateObj) {
    switch (predicateObj.type) {
      case "or": {
        return predicateObj.predicates
          .map((predicate: any) =>
            parenthesize("or", predicate.type, predicateObjToCEL(predicate))
          )
          .join(" || ");
      }
      case "and": {
        return predicateObj.predicates
          .map((predicate: any) =>
            parenthesize("and", predicate.type, predicateObjToCEL(predicate))
          )
          .join(" && ");
      }
      default:
        throw new Error(`Unknown operator ${JSON.stringify(predicateObj)}`);
    }
  }

  switch (predicateObj.filter) {
    case "ExactMatch":
      return `${predicateObj.source} == ${JSON.stringify(predicateObj.value)}`;
    case "PartialMatch":
      return `${predicateObj.source} LIKE ${JSON.stringify(
        predicateObj.value
      )}`;
    default:
      throw new Error(`Unknown filter type ${JSON.stringify(predicateObj)}`);
  }
};

export const predicateToCEL = (predicate: any): string => {
  return predicateObjToCEL(predicate.toObject());
};
