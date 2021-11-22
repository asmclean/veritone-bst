export enum COMPARATOR_RESULT {
  LESSER,
  GREATER,
  EQUAL,
};

export type Comparator<T> = (a: T, b: T) => COMPARATOR_RESULT;

export function naiveComparator<T>(a: T, b: T): COMPARATOR_RESULT {
  if (a === b) {
    return COMPARATOR_RESULT.EQUAL;
  }

  return a < b ? COMPARATOR_RESULT.LESSER : COMPARATOR_RESULT.GREATER;
}
