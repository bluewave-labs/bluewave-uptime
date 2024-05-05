import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Option';
export function getOptionUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var optionClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'selected', 'highlighted']);