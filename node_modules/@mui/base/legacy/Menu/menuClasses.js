import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
var COMPONENT_NAME = 'Menu';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export var menuClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'listbox', 'expanded']);