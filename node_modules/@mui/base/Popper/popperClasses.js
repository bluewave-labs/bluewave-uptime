import { generateUtilityClass } from '../generateUtilityClass';
import { generateUtilityClasses } from '../generateUtilityClasses';
const COMPONENT_NAME = 'Popper';
export function getPopperUtilityClass(slot) {
  return generateUtilityClass(COMPONENT_NAME, slot);
}
export const popperClasses = generateUtilityClasses(COMPONENT_NAME, ['root']);