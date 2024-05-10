import { generateUtilityClasses } from '../generateUtilityClasses';
import { generateUtilityClass } from '../generateUtilityClass';
const COMPONENT_NAME = 'Modal';
export function getModalUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const modalClasses = generateUtilityClasses(COMPONENT_NAME, ['root', 'hidden', 'backdrop']);