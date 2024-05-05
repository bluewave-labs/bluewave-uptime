import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'MenuItem';
export function getMenuItemUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuItemClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'disabled', 'focusVisible']);