"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.areArraysEqual = areArraysEqual;
function areArraysEqual(array1, array2, itemComparer = (a, b) => a === b) {
  return array1.length === array2.length && array1.every((value, index) => itemComparer(value, array2[index]));
}