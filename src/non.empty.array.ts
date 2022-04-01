/**
 * This is a type that represents an array that must have at least one value, enforced by a transpiler check. Because this is a transpile-time check,
 * you may need to use the isNonEmptyArray typeguard for arrays that are populated at runtime.
 */
export type NonEmptyArray<T> = [T, ...T[]];

/**
 * Typeguard for NonEmptyArray<T>. Guarantees that a given array is not an empty array.
 */
export const isNonEmptyArray = <T>(arr: T[]): arr is NonEmptyArray<T> => {
    return arr.length > 0;
};
