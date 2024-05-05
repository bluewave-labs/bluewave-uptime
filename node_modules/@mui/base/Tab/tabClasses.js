import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Tab';
export function getTabUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const tabClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'selected', 'disabled']);