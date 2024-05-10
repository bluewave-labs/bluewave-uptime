import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Select';
export function getSelectUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var selectClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'button', 'listbox', 'popup', 'active', 'expanded', 'disabled', 'focusVisible']);