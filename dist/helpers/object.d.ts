/**
 * Returns the next property of given property in an object
 */
export declare const getNextKey: (object: Record<string, any>, key: string) => string | false;
/**
 * Returns the previous property of given property in an object
 */
export declare const getPreviousKey: (object: Record<string, any>, key: string) => string | false;
/**
 * Check if object have empty fields
 */
export declare const objectHasEmptyValue: (object: Record<string, any>) => boolean;
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
export declare const isObject: (o: Object) => boolean;
