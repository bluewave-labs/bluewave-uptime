"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.fastObjectShallowCompare = fastObjectShallowCompare;
const is = Object.is;
function fastObjectShallowCompare(a, b) {
  if (a === b) {
    return true;
  }
  if (!(a instanceof Object) || !(b instanceof Object)) {
    return false;
  }
  let aLength = 0;
  let bLength = 0;

  /* eslint-disable no-restricted-syntax */
  /* eslint-disable guard-for-in */
  for (const key in a) {
    aLength += 1;
    if (!is(a[key], b[key])) {
      return false;
    }
    if (!(key in b)) {
      return false;
    }
  }

  /* eslint-disable-next-line @typescript-eslint/naming-convention, @typescript-eslint/no-unused-vars */
  for (const _ in b) {
    bLength += 1;
  }
  /* eslint-enable no-restricted-syntax */
  /* eslint-enable guard-for-in */

  return aLength === bLength;
}