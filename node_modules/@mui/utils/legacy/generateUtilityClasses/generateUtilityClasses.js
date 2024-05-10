import generateUtilityClass from '../generateUtilityClass';
export default function generateUtilityClasses(componentName, slots) {
  var globalStatePrefix = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'Mui';
  var result = {};
  slots.forEach(function (slot) {
    result[slot] = generateUtilityClass(componentName, slot, globalStatePrefix);
  });
  return result;
}