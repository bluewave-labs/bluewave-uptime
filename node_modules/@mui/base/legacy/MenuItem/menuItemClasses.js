import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'MenuItem';
export function getMenuItemUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var menuItemClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'focusVisible']);