import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Menu';
export function getMenuUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const menuClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'listbox', 'expanded']);