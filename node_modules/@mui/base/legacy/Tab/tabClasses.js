import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Tab';
export function getTabUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var tabClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'selected', 'disabled']);