/* eslint-disable @typescript-eslint/no-explicit-any */

/**
 * Returns the next property of given property in an object
 */
export const getNextKey = (object: Record<string, any>, key: string) => {
  const keys = Object.keys(object);
  const index = keys.indexOf(key);
  return index !== -1 && keys[index + 1];
};

/**
 * Returns the previous property of given property in an object
 */
export const getPreviousKey = (object: Record<string, any>, key: string) => {
  const keys = Object.keys(object);
  const index = keys.indexOf(key);
  return index !== -1 && keys[index - 1];
};

/**
 * Check if object have empty fields
 */
export const objectHasEmptyValue = (object: Record<string, any>) => {
  for (const value of Object.values(object)) {
    if (!value) return true;
  }
  return false;
};

/**
 * Checks if var is object or not
 *
 * console.log(isObject({}));              // Will return: true
 * console.log(isObject([]));              // Will return: false
 * console.log(isObject(null));            // Will return: false
 * console.log(isObject(REGEX));           // Will return: false
 * console.log(isObject(function () {}));  // Will return: false
 * @param o
 */
// eslint-disable-next-line @typescript-eslint/ban-types
export const isObject = (o: Object) => {
  return o instanceof Object && o.constructor === Object;
};
