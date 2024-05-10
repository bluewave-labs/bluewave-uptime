export function areArraysEqual(array1, array2) {
  var itemComparer = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : function (a, b) {
    return a === b;
  };
  return array1.length === array2.length && array1.every(function (value, index) {
    return itemComparer(value, array2[index]);
  });
}