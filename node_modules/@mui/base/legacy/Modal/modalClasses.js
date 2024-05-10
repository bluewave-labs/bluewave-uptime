import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';
var COMPONENT_NAME = 'Modal';
export function getModalUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var modalClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden', 'backdrop']);