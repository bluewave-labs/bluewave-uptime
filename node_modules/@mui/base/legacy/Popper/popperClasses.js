import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Popper';
export function getPopperUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var popperClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);