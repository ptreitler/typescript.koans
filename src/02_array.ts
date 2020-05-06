// # Lodash / Underscore in TypeScript
// Let's write our own version of Lodash in TypeScript!
// In this lesson we're going to learn about a couple of Typescript concepts (or
// type systems in general). Specifically, this is what you'll know as soon as
// all tests pass:

// 1. How to use interfaces.
// 2. How to use generic types (<T>).
// 3. How to use default and optional parameters.

// ## Array functions

/**
 * ### chunk
 * chunk creates an array of elements split into groups the length of size. If
 * array can't be split evenly, the final chunk will be the remaining elements.
 * Two-dimensional arrays can be expressed using the T[][].
 *
 *  ## Examples
 *  _.chunk(["a", "b", "c", "d"], 2) => [["a", "b"], ["c", "d"]]
 *  _.chunk(["a", "b", "c", "d"], 3) => [["a", "b", "c"], ["d"]]
 *  _.chunk(["a", "b", "c"]) => [["a"], ["b"], ["c"]]
 * */
export function chunk<T>(input: Array<T>, size: number = 1): Array<Array<T>> {
  return Array(Math.ceil(input.length / size))
    .fill(0)
    .map((_, i) => input.slice(i * size, i * size + size));
}

/**
 * ### compact
 * compact accepts an array as an argument and returns an array.
 * The returned array does not contain falsey values (such as 0, null,
 * undefined, NaN).
 *
 * ## Examples
 * _.compact([1, undefined, 2, undefined, 3]) => [1, 2, 3]
 * _.compact([1, NaN, 2, NaN, 3]) => [1, 2, 3]
 * _.compact([1, null, 2, null, 3]) => [1, 2, 3]
 * _.compact([1, 0, 2, 0, 3]) => [1, 2, 3]
 * _.compact([1, undefined, NaN, null, 0, 2, 3]) => [1, 2, 3]
 */
export function compact(input: Array<any>): Array<any> {
  return input.filter((item) => item);
}

/**
 * ### head
 * head takes in an array and returns its first item.
 *
 *  ## Examples
 *  _.head([1, 2, 3]) => 1
 *  _.head([]) => undefined
 */
export function head<T>(input: Array<T>): T {
  return input[0];
}

/**
 * ### initial
 * initial returns a slice of the passed in array, excluding its last item.
 *
 * ## Examples
 *  _.initial<number>([1, 2, 3]) => [1, 2]
 *
 */
export function initial<T>(input: Array<T>): Array<T> {
  const length = input.length;
  const endIndex = Math.max(length - 1, 1);
  return input.slice(0, endIndex);
}

/**
 * ### last
 * last takes in an array and returns its last item.
 *
 * ## Examples
 * _.last([1, 2, 3]) => 3
 * _.last([]) => undefined
 *
 */
export function last(input: Array<any>): any {
  const length = input.length;
  if (length == 0) {
    return undefined;
  } else {
    return input[length - 1];
  }
}

/**
 * ### drop
 * drop takes in two arguments, an array and a count, and returns an array that
 * has count items removed from the beginning.
 * The count should be optional and default to 1.
 *
 * ## Examples
 * _.drop([1, 2, 3, 4], 2) => [3, 4]
 * _.drop([1, 2, 3, 4]) => [2, 3, 4]
 */
export function drop(input: Array<any>, count: number = 1): Array<any> {
  return input.slice(count, input.length);
}

/**
 * ### dropRight
 * dropRight works like drop, except that it removes items from the end of the
 * passed in array.
 *
 * ## Examples
 * _.dropRight([1, 2, 3, 4], 2) => [1, 2]
 * _.dropRight([1, 2, 3, 4]) => [1, 2, 3]
 *
 */
export function dropRight(input: Array<any>, count: number = 1): Array<any> {
  return input.slice(0, input.length - count);
}

interface DropWhilePredicate<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}
/**
 * ### dropWhile
 * dropWhile works similar to drop. It removes items from the beginning of the
 * array until the predicate returns false.
 *
 * ## Examples
 * _.dropWhile([1, 2, 3, 4, 5, 1], value => value < 3) => [3, 4, 5, 1]
 *
 */

function negate<T>(predicate: DropWhilePredicate<T>): DropWhilePredicate<T> {
  return function () {
    return !predicate.apply(this, arguments);
  };
}

export function dropWhile<T>(
  collection: Array<T>,
  predicate: DropWhilePredicate<T>
): Array<T> {
  const startIndex = collection.findIndex(negate(predicate));
  return collection.slice(startIndex, collection.length);
}

/**
 * ### dropRightWhile
 * dropRightWhile works similar to dropWhile, except that it iterates over the
 * passed in array in reversed order.
 *
 * ## Examples
 * _.dropRightWhile([5, 4, 3, 2, 1], value => value < 3) => [5, 4, 3]
 *
 */
export function dropRightWhile<T>(
  collection: Array<T>,
  predicate: DropWhilePredicate<T>
) {
  const endOffset = collection.slice().reverse().findIndex(negate(predicate));
  return collection.slice(0, collection.length - endOffset);
}

/**
 * ### fill
 * fill mutates the passed in array. It fills collection[start] up to
 * collection[end] with a specified value.
 *
 * ## Examples
 * _.fill<any>([4, 6, 8, 10], "* ", 1, 3) => [4, "* ", "* ", 10]
 */
export function fill<T>(
  collection: Array<T>,
  replacement: T,
  startIndex: number,
  endIndex: number
) {
  const result = collection.slice();

  for (let i = startIndex; i < endIndex; i++) {
    result[i] = replacement;
  }

  return result;
}

// Here we define an interface for the predicate used in the findIndex function.
export interface FindIndexPredicate<T> {
  (value?: T, index?: number, collection?: Array<T>): boolean;
}

/**
 * ### findIndex
 * findIndex accepts three arguments:
 * 1. The array to be traversed.
 * 2. An iteratee function.
 * 3. The index from where we should start traversing the array.
 *
 * ## Examples
 * _.findIndex([4, 6, 8, 10], () => false) => -1
 * _.findIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findIndex([4, 6, 6, 8, 10], value => value === 6, 2) => 2
 *
 */
export function findIndex<T>(
  collection: Array<T>,
  predicate: FindIndexPredicate<T>,
  startIndex: number = 0
): number {
  const foundIndex = collection.slice(startIndex).findIndex(predicate);
  return foundIndex == -1 ? foundIndex : startIndex + foundIndex;
}

/**
 * ### findLastIndex
 * findLastIndex works line findIndex, but traverses the collection backwards.
 * The third argument is the index from where we start traversing the array.
 *
 * ## Examples
 * _.findLastIndex([4, 6, 8, 10], () => false) => -1
 * _.findLastIndex([4, 6, 8, 10], value => value === 6) => 1
 * _.findLastIndex([4, 6, 8, 6, 10], value => value === 6) => 3
 * _.findLastIndex([4, 6, 6, 8, 10], value => value === 6, 1) => 1
 *
 */
export function findLastIndex<T>(
  collection: Array<T>,
  predicate: FindIndexPredicate<T>,
  startIndex: number = collection.length - 1
) {
  for (let i = startIndex; i >= 0; i--) {
    if (predicate(collection[i], i, collection)) return i;
  }

  return -1;
}

/**
 * ### nth
 * Given an array, should return the nth item of the passed in array.
 *
 * ## Examples
 * _.nth<number>([1, 2, 3], 0) => 1
 * _.nth<number>([1, 2, 3], 1) => 2
 * _.nth<number>([1, 2, 3], 2) => 3
 * _.nth<number>([1, 2, 3]) => 1
 *
 */

export function nth<T>(array: Array<T>, n: number = 0): T {
  return array[n];
}

/**
 * ### zip
 *
 * ## Examples
 * // We can also use something called "union types" here.
 * _.zip<string | number | boolean>(["a", "b"], [1, 2], [true, false]) => [["a", 1, true], ["b", 2, false]]
 */
export function zip<T, U, V>(
  array1: Array<T>,
  array2: Array<U>,
  array3: Array<V>
): Array<Array<T | U | V>> {
  let result = new Array();

  for (let i = 0; i < array1.length; i++) {
    let entry = new Array();
    entry.push(array1[i], array2[i], array3[i]);
    result.push(entry);
  }

  return result;
}
