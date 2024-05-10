export declare function isNumber(value: unknown): value is number;
export declare function isFunction(value: any): value is Function;
export declare function isObject<TObject = Record<PropertyKey, any>>(value: unknown): value is TObject;
export declare function localStorageAvailable(): boolean;
export declare function escapeRegExp(value: string): string;
/**
 * Follows the CSS specification behavior for min and max
 * If min > max, then the min have priority
 */
export declare const clamp: (value: number, min: number, max: number) => number;
/**
 * Create an array containing the range [from, to[
 */
export declare function range(from: number, to: number): number[];
/**
 * Based on `fast-deep-equal`
 *
 * MIT License
 *
 * Copyright (c) 2017 Evgeny Poberezkin
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in all
 * copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
 * SOFTWARE.
 * We only type the public interface to avoid dozens of `as` in the function.
 */
export declare function isDeepEqual<T>(actual: any, expected: T): actual is T;
export declare function randomNumberBetween(seed: number, min: number, max: number): () => number;
export declare function deepClone(obj: Record<string, any>): any;
/**
 * Mark a value as used so eslint doesn't complain. Use this instead
 * of a `eslint-disable-next-line react-hooks/exhaustive-deps` because
 * that hint disables checks on all values instead of just one.
 */
export declare function eslintUseValue(_: any): void;
