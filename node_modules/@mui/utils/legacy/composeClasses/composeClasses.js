export default function composeClasses(slots, getUtilityClass) {
  var classes = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : undefined;
  var output = {};
  Object.keys(slots).forEach(
  // `Object.keys(slots)` can't be wider than `T` because we infer `T` from `slots`.
  // @ts-expect-error https://github.com/microsoft/TypeScript/pull/12253#issuecomment-263132208
  function (slot) {
    output[slot] = slots[slot].reduce(function (acc, key) {
      if (key) {
        var utilityClass = getUtilityClass(key);
        if (utilityClass !== '') {
          acc.push(utilityClass);
        }
        if (classes && classes[key]) {
          acc.push(classes[key]);
        }
      }
      return acc;
    }, []).join(' ');
  });
  return output;
}