import { generateUtilityClass } from '../generateUtilityClass';
export function generateUtilityClasses(componentName, slots) {
  var result = {};
  slots.forEach(function (slot) {
    result[slot] = generateUtilityClass(componentName, slot);
  });
  return result;
}